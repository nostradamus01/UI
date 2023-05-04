<script setup>
import { NButton, NModal, NCard, NInput, NSpace } from 'naive-ui'
import { ref } from 'vue'

const showForm = ref(false);

const HandleAddClick = () => {
  showForm.value = true;
}

const hideForm = () => {
  showForm.value = false;
  storage.value = ''
}

const submitForm = () => {
  // ....
  hideForm();
}

const storage = ref('')

</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false">
    <n-card style="width: 600px" title="Add Storage" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-space vertical>
        <n-input v-model:value="storage" type="text" placeholder="Storages" />
      </n-space>
      <template #footer>
        <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
        <n-button type="primary" @click="submitForm">Submit</n-button>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Storage
  </n-button>
</template>

<style></style>