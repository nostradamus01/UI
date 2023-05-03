<script setup>
import { ref, computed } from 'vue'
import { NDataTable, NButton, NSpin } from 'naive-ui'
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

</script>

<template>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add RAM
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style>

</style>