<script setup>
import { ref, computed } from 'vue'
import { NDataTable, NButton, NSpin } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Phone Detail Id",
  key: "phoneDetailId",
  resizable: true
}, {
  title: "Color Id",
  key: "colorId",
  resizable: true
}, {
  title: "Storage Id",
  key: "storageId",
  resizable: true
}, {
  title: "RAM Id",
  key: "ramId",
  resizable: true
}]

const isLoading = ref(false);

const dbStore = useDBStore();

const data = computed(() => {
  const phones = dbStore.phones;
  phones.forEach((phone, index) => {
    phone.n = index + 1;
  });
  return phones;
});

</script>

<template>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Phone
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style>

</style>