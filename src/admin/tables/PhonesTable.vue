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
  key: "phoneDetailId",
  resizable: true,
  render(row) {
    const phoneDetail = dbStore.phoneDetails.find(element => element.id === row.phoneDetailId);
    if (phoneDetail) {
      return phoneDetail.model
    }
    return 'ho du apush ches';
  }
}, {
  title: "Color",
  key: "colorId",
  resizable: true,
  render(row) { 
    const color = dbStore.colors.find(element => element.id === row.colorId);
    if (color) {
      return color.name
    }
    return 'ho du apush ches';
  }
}, {
  title: "Storage",
  key: "storageId",
  resizable: true,
  render(row) {
    const storage = dbStore.storages.find(element => element.id === row.storageId);
    if (storage) {
      return storage.size + ' GB'
    }
    return 'ho du apush ches';
  }
}, {
  title: "RAM",
  key: "ramId",
  resizable: true,
  render(row) {
    const ram = dbStore.rams.find(element => element.id === row.ramId);
    if (ram) {
      return ram.size + ' GB'
    }
    return 'ho du apush ches';
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
  phoneDetailId: null,
  colorId: null,
  storageId: null,
  ramId: null
}

const data = reactive({ ...initialData });

const phoneDetails = computed(() => {
  const arr = []
  dbStore.phoneDetails.forEach(phoneDetail => {
    arr.push({
      label: phoneDetail.model,
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
  if (row) {
    Object.assign(data, row);
    form.mode = 'edit'
    form.title = 'Edit Phone details'
  } else {
    Object.assign(data, initialData);
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
  dbStore.phones = await getAll();
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
      <n-select v-model:value="data.phoneDetailId" :options="phoneDetails" placeholder="Phone Detail" />
      <n-select v-model:value="data.colorId" :options="colors" placeholder="Color" />
      <n-select v-model:value="data.storageId" :options="storages" placeholder="Storage" />
      <n-select v-model:value="data.ramId" :options="rams" placeholder="RAM" />
    </n-form>
  </Modal>
  <n-button type="primary" @click="addFn" class="table-toolbar">
    Add Phone details
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="tableData" />
  </n-spin>
</template>