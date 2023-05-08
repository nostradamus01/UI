<script setup>
import { NForm, NSelect, NButton, NSpin, NDataTable } from 'naive-ui';
import { ref, computed, h, reactive, onMounted, toRaw } from 'vue';
import Modal from '@/components/Modal.vue';
import { usePhoneDetails } from '@/use/usePhoneDetails';

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Phone Details",
  key: "phoneDetailId",
  resizable: true
}, {
  title: "Color",
  key: "colorId",
  resizable: true
}, {
  title: "Storage",
  key: "storageId",
  resizable: true
}, {
  title: "RAM",
  key: "ramId",
  resizable: true
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
          onClick: () => deleteFn(row)
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

const { dbStore, getAll, add, edit, remove } = usePhoneDetails();

const tableData = computed(() => {
  const data = dbStore.phoneDetails;
  data.forEach((element, index) => {
    element.n = index + 1;
  });
  return data;
});

const isLoading = ref(false);
const isFormLoading = ref(false);

const form = reactive({
  title: 'Add OS',
  mode: 'add',
  isVisible: false
});

const initialData = {
  phoneDetails: null,
  color: null,
  storage: null,
  ram: null
}

const data = reactive({ ...initialData });

const oses = computed(() => {
  const arr = []
  dbStore.oses.forEach(os => {
    arr.push({
      label: os.name,
      value: os.id
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
  dbStore.phoneDetails = await getAll();
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
      <n-select v-model:value="data.phoneDetails" :options="phoneDetails" placeholder="Brand" />
      <n-select v-model:value="data.color" :options="colors" placeholder="Brand" />
      <n-select v-model:value="data.storage" :options="storages" placeholder="Brand" />
      <n-select v-model:value="data.ram" :options="rams" placeholder="Brand" />
    </n-form>
  </Modal>
  <n-button type="primary" @click="addFn" class="table-toolbar">
    Add Phone details
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="tableData" />
  </n-spin>
</template>