<script setup>
import { NButton, NModal, NCard, NInput, NSpace } from 'naive-ui'
import { ref } from 'vue'


const showForm = ref(false);

const HandleAddClick = () => {
  showForm.value = true;
}

const hideForm = () => {
  showForm.value = false;
  ram.value = ''
}

const submitForm = () => {
  // ....
  hideForm();
}

const ram = ref('')

</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false">
    <n-card style="width: 600px" title="Add RAM" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-space vertical>
        <n-input v-model:value="ram" type="text" placeholder="Ram" />
      </n-space>
      <template #footer>
        <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
        <n-button type="primary" @click="submitForm">Submit</n-button>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add RAM
  </n-button>
</template>

<style></style>