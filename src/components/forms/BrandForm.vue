<script setup>
import { NButton, NModal, NCard, NInput, NForm } from 'naive-ui';
import { ref, reactive } from 'vue';

const showForm = ref(false);

const showFormFn = () => {
  showForm.value = true;
}

const submitForm = () => {
  // ....
  hideForm();
}

const formData = reactive({
  name: null
});

const hideForm = () => {
  showForm.value = false;
  formData.name = null;
}
</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false" class="modal-form">
    <n-card style="width: 500px" title="Add Brand" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" :model="formData" class="my-form">
        <n-input v-model:value="formData.name" placeholder="Name" />
      </n-form>
      <template #footer>
        <div style="display: flex; justify-content: flex-end;">
          <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
          <n-button type="primary" @click="submitForm">Submit</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="showFormFn" class="table-toolbar">
    Add Brand
  </n-button>
</template>