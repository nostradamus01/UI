<script setup>
import { NButton, NInputNumber, NForm, NDataTable, NSpin } from 'naive-ui';
import { ref, computed, h, reactive, onMounted, toRaw } from 'vue';
import Modal from '@/components/Modal.vue';
import { useStorages } from '@/use/useStorages'

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Size",
  key: "size",
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

const { dbStore, getAll, add, edit, remove } = useStorages();

const tableData = computed(() => {
  const data = dbStore.storages;
  data.forEach((element, index) => {
    element.n = index + 1;
  });
  return data;
});

const isLoading = ref(false);
const isFormLoading = ref(false);

const form = reactive({
  title: 'Add Storage',
  mode: 'add',
  isVisible: false
});

const initialData = {
  id: null,
  size: null
}

const data = reactive({...initialData});

const showForm = (row) => {
  if (row) {
    Object.assign(data, row);
    form.mode = 'edit'
    form.title = 'Edit Storage'
  } else {
    Object.assign(data, initialData);
    form.mode = 'add'
    form.title = 'Add Storage'
  }
  form.isVisible = true;
}

const hideForm = () => {
  form.isVisible = false;
}

const getAllFn = async () => {
  isLoading.value = true;
  dbStore.storages = await getAll();
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
      <n-input-number v-model:value="data.size" :show-button="false" placeholder="Size" />
    </n-form>
  </Modal>
  <n-button type="primary" @click="addFn" class="table-toolbar">
    Add Storages
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="tableData" />
  </n-spin>
</template>