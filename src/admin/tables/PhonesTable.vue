<script setup>
import { NForm, NSelect, NButton, NSpin, NDataTable } from 'naive-ui';
import { ref, computed, h, reactive, onMounted, toRaw } from 'vue';
import Modal from '@/admin/Modal.vue';
import { usePhones } from '@/use/usePhones';

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Phone Details",
  key: "phoneDetail",
  resizable: true,
  render(row) {
    const phoneBrand = dbStore.brands.find(brand => brand.id === row.phoneDetail?.brandId);
    return row.phoneDetail ? phoneBrand?.name + ' ' + row.phoneDetail.model : '';
  }
}, {
  title: "Color",
  key: "color",
  resizable: true,
  render(row) { 
    return row.color ? row.color.name + ' (' + row.color.hex + ')' : '';
  }
}, {
  title: "Storage",
  key: "storage",
  resizable: true,
  render(row) {
    return row.storage ? row.storage.size + ' GB' : '';
  }
}, {
  title: "RAM",
  key: "ram",
  resizable: true,
  render(row) {
    return row.ram ? row.ram.size + ' GB' : '';
  }
}, {
  title: 'Action',
  key: 'actions',
  render(row) {
    const buttons = [
      h(
        NButton,
        {
          size: 'small',
          onClick: () => editFn(row)
        },
        { default: () => 'Edit' }
      ),
      h(
        NButton,
        {
          size: 'small',
          onClick: () => removeFn(row)
        },
        { default: () => 'Delete' }
      )
    ]
    return h(
      'div',
      {
        class: 'table-actions-conatiner'
      },
      buttons
    )
  }
}]

const { dbStore, getAll, add, edit, remove } = usePhones();

const tableData = computed(() => {
  const data = dbStore.phones;
  data.forEach((element, index) => {
    element.n = index + 1;
  });
  return data;
});

const isLoading = ref(false);
const isFormLoading = ref(false);

const form = reactive({
  title: 'Add Phone',
  mode: 'add',
  isVisible: false
});

const initialData = {
  phoneDetail: null,
  color: null,
  storage: null,
  ram: null
}

const data = reactive({ ...initialData });

const phoneDetails = computed(() => {
  const arr = []
  dbStore.phoneDetails.forEach(phoneDetail => {
    const phoneBrand = dbStore.brands.find(brand => brand.id === phoneDetail.brandId);
    arr.push({
      label: phoneBrand?.name + ' ' + phoneDetail.model,
      value: phoneDetail.id
    });
  });
  return arr;
});

const colors = computed(() => {
  const arr = []
  dbStore.colors.forEach(color => {
    arr.push({
      label: color.name + ` (${color.hex})`,
      value: color.id
    });
  });
  return arr;
});

const storages = computed(() => {
  const arr = []
  dbStore.storages.forEach(storage => {
    arr.push({
      label: storage.size + ' GB',
      value: storage.id
    });
  });
  return arr;
});

const rams = computed(() => {
  const arr = []
  dbStore.rams.forEach(ram => {
    arr.push({
      label: ram.size + ' GB',
      value: ram.id
    });
  });
  return arr;
});

const showForm = (row) => {
  Object.assign(data, initialData);
  if (row) {
    Object.assign(data, row);
    data.phoneDetail = row.phoneDetailId;
    data.color = row.colorId;
    data.storage = row.storageId;
    data.ram = row.ramId;
    form.mode = 'edit'
    form.title = 'Edit Phone details'
  } else {
    form.mode = 'add'
    form.title = 'Add Phone details'
  }
  form.isVisible = true;
}

const hideForm = () => {
  form.isVisible = false;
}

const getAllFn = async () => {
  isLoading.value = true;
  await getAll();
  isLoading.value = false;
}

const editFn = (row) => {
  showForm(row);
}

const removeFn = async (row) => {
  isLoading.value = true;
  await remove(row.id);
  getAllFn()
}

const addFn = () => {
  showForm();
}

const submit = async () => {
  isFormLoading.value = true;
  const obj = toRaw(data);
  if (form.mode === 'edit') {
    await edit(obj);
  } else {
    await add(obj);
  }
  close();
  getAllFn();
}

const close = () => {
  isFormLoading.value = false;
  hideForm();
}

onMounted(async () => {
  getAllFn();
});

</script>

<template>
  <Modal :isVisible="form.isVisible" :title="form.title" @close="close" @submit="submit" :is-loading="isFormLoading">
    <n-form ref="formRef" :model="data" class="my-form">
      <n-select v-model:value="data.phoneDetail" :options="phoneDetails" placeholder="Phone Detail" />
      <n-select v-model:value="data.color" :options="colors" placeholder="Color" />
      <n-select v-model:value="data.storage" :options="storages" placeholder="Storage" />
      <n-select v-model:value="data.ram" :options="rams" placeholder="RAM" />
    </n-form>
  </Modal>
  <n-button type="primary" @click="addFn" class="table-toolbar">
    Add Phone details
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="tableData" />
  </n-spin>
</template>