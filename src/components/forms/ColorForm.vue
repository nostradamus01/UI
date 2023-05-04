<script setup>
import { NButton, NModal, NCard, NInput, NForm } from 'naive-ui';
import { ref } from 'vue';

const showForm = ref(false);

const HandleAddClick = () => {
  showForm.value = true;
}

const hideForm = () => {
  showForm.value = false;
  name.value = ''
}

const submitForm = () => {
  // ....
  hideForm();
}

const name = ref('')
</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false">
    <n-card style="width: 600px" title="Add Color" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" :model="formData" class="my-form">
        <n-input v-model:value="name" type="text" placeholder="Color" />
      </n-form>
      <template #footer>
        <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
        <n-button type="primary" @click="submitForm">Submit</n-button>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Color
  </n-button>
</template>