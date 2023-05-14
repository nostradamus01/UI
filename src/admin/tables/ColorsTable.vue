<script setup>
import { NDataTable, NButton, NSpin, NForm, NInput, NColorPicker, NSelect } from 'naive-ui';
import { ref, computed, h, reactive,  onMounted, toRaw } from 'vue';
import Modal from '@/admin/Modal.vue';
import { useColors } from '@/use/useColors'

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
  title: "Name",
  key: "name",
  resizable: true
}, {
  title: "HEX",
  key: "hex",
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
const { dbStore, getAll, add, edit, remove } = useColors();

const tableData = computed(() => {
  const data = dbStore.colors;
  data.forEach((element, index) => {
    element.n = index + 1;
  });
  return data;
});

const isLoading = ref(false);
const isFormLoading = ref(false);

const form = reactive({
  title: 'Add Color',
  mode: 'add',
  isVisible: false
});

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

const initialData = {
  id: null,
  name: null,
  hex: null,
  phoneDetail: null
}

const data = reactive({...initialData});

const showForm = (row) => {
  Object.assign(data, initialData);
  if (row) {
    Object.assign(data, row);
    data.phoneDetail = row.phoneDetailId;
    form.mode = 'edit'
    form.title = 'Edit Color'
  } else {
    form.mode = 'add'
    form.title = 'Add Color'
  }
  form.isVisible = true;
}

const hideForm = () => {
  form.isVisible = false;
}

const getAllFn = async () => {
  isLoading.value = true;
  dbStore.colors = await getAll();
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
      <n-input v-model:value="data.name" placeholder="Name" />
      <n-color-picker  v-model:value="data.hex" :modes="['hex']" />
    </n-form>
  </Modal>
  <n-button type="primary" @click="addFn" class="table-toolbar">
    Add Color
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="tableData" />
  </n-spin>
</template>

<style></style>
