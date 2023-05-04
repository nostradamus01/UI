<script setup>
import { reactive, toRaw } from 'vue'
import { NButton, NModal, NCard, NInput, NForm } from 'naive-ui'

const props = defineProps({
  showForm: Boolean
})

const form = reactive({
  title: 'Add Platform',
  mode: 'add',
  isVisible: false
});

const deleteFn = async (row) => {
  isLoading.value = true;
  await deletePlatform(row.id);
  getPlatformsFn();
}

const showForm = () => {
  form.isVisible = true;
}

const hideForm = () => {
  form.isVisible = false;
  formData.chipset = null;
  formData.cpu = null;
  formData.gpu = null;
}

const addFn = () => {
  form.title = 'Add Platform';
  form.mode = 'add';
  form.isVisible = true;
}

const submitForm = async () => {
  const data = toRaw(formData);
  const response = await addPlatform(data);
  console.log(response);
  hideForm();
}

const formData = reactive({
  chipset: null,
  cpu: null,
  gpu: null
});

const getPlatformsFn = async () => {
  isLoading.value = true;
  dbStore.platforms = await getPlatforms();
  isLoading.value = false;
}

const editFn = (row) => {
  formData.chipset = row.chipset;
  formData.cpu = row.cpu;
  formData.gpu = row.gpu;
  form.mode = 'edit';
  form.title = 'Edit Platform'
  showForm();
}

</script>

<template>
  <n-modal v-model:show="form.isVisible" :mask-closable="false" class="modal-form">
    <n-card style="width: 500px" :title="form.title" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" :model="formData" class="my-form">
        <n-input v-model:value="formData.chipset" placeholder="Chipset" />
        <n-input v-model:value="formData.gpu" placeholder="GPU" />
        <n-input v-model:value="formData.cpu" placeholder="CPU" />
      </n-form>
      <template #footer>
        <div style="display: flex; justify-content: flex-end;">
          <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
          <n-button type="primary" @click="submitForm">Submit</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="addFn" class="table-toolbar">
    Add Platform
  </n-button>
</template>

<style></style>