<script setup>
import { NModal, NCard, NInput, NSpace, NButton } from 'naive-ui';
import { ref, reactive, computed } from 'vue';
import { useDBStore } from '@/stores/dbStore'

const showForm = ref(false);

const HandleAddClick = () => {
  showForm.value = true;
}

const hideForm = () => {
  showForm.value = false;
  platform.detailId = ''
  platform.colorId = ''
  platform.storageId = ''
  platform.ramId = ''
}

const submitForm = () => {
  // ....
  hideForm();
}

const platform = reactive({
  detailId: '',
  colorId: '',
  storageId: '',
  ramId: ''
})

</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false">
    <n-card style="width: 600px" title="Add Phone" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-space vertical>
        <n-input v-model:value="platform.detailId" type="text" placeholder="Phone Detail Id" />
        <n-input v-model:value="platform.colorId" type="text" placeholder="Color Id" />
        <n-input v-model:value="platform.storageId" type="text" placeholder="Storage Id" />
        <n-input v-model:value="platform.ramId" type="text" placeholder="Ram Id" />
      </n-space>
      <template #footer>
        <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
        <n-button type="primary" @click="submitForm">Submit</n-button>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Phone
  </n-button>
</template>