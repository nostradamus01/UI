<script setup>
import { ref, computed } from 'vue'
import { NDataTable, NButton, NSpin } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Storages",
  key: "size",
  resizable: true
}]

const isLoading = ref(false);

const dbStore = useDBStore();

const data = computed(() => {
  const storages = dbStore.storages;
  storages.forEach((storage, index) => {
    storage.n = index + 1;
  });
  return storages;
});

</script>

<template>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Storage
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>