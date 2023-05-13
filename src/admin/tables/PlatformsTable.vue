<script setup>
import { ref, computed, h, onMounted, reactive, toRaw } from 'vue'
import { NDataTable, NButton, NSpin, NInput, NForm } from 'naive-ui'
import { usePlatforms } from '@/use/usePlatforms'
import Modal from '@/admin/Modal.vue';

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Chipset",
  key: "chipset",
  resizable: true
}, {
  title: "CPU",
  key: "cpu",
  resizable: true
}, {
  title: "GPU",
  key: "gpu",
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

const { dbStore, getAll, add, edit, remove } = usePlatforms();

const tableData = computed(() => {
  const data = dbStore.platforms;
  data.forEach((element, index) => {
    element.n = index + 1;
  });
  return data;
});

const isLoading = ref(false);
const isFormLoading = ref(false);

const form = reactive({
  title: 'Add Platform',
  mode: 'add',
  isVisible: false
});

const initialData = {
  id: null,
  chipset: null,
  cpu: null,
  gpu: null
}

const data = reactive({...initialData});

const showForm = (row) => {
  if (row) {
    Object.assign(data, row);
    form.mode = 'edit'
    form.title = 'Edit Platform'
  } else {
    Object.assign(data, initialData);
    form.mode = 'add'
    form.title = 'Add Platform'
  }
  form.isVisible = true;
}

const hideForm = () => {
  form.isVisible = false;
}

const getAllFn = async () => {
  isLoading.value = true;
  dbStore.platforms = await getAll();
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
      <n-input v-model:value="data.chipset" placeholder="Chipset" />
      <n-input v-model:value="data.cpu" placeholder="CPU" />
      <n-input v-model:value="data.gpu" placeholder="GPU" />
    </n-form>
  </Modal>
  <n-button type="primary" @click="addFn" class="table-toolbar">
    Add Platform
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="tableData" />
  </n-spin>
</template>

<style></style>