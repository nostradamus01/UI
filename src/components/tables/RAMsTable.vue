<script setup>
import { ref, computed } from 'vue'
import { NDataTable, NButton, NSpin, NModal, NCard, NSpace, NInput } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "RAM",
  key: "size",
  resizable: true
}]

const isLoading = ref(false);

const dbStore = useDBStore();

const data = computed(() => {
  const rams = dbStore.rams;
  rams.forEach((ram, index) => {
    ram.n = index + 1;
  });
  return rams;
});

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
    <n-card style="width: 600px" title="Add Platform" :bordered="false" size="huge" role="dialog" aria-modal="true">
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
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style>

</style>