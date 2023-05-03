<script setup>
import { ref, computed } from 'vue'
import { NDataTable, NButton, NSpin } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Name",
  key: "name",
  resizable: true
}, {
  title: "HEX",
  key: "hex",
  resizable: true
}]

const isLoading = ref(false);

const dbStore = useDBStore();

const data = computed(() => {
  const colors = dbStore.colors;
  colors.forEach((color, index) => {
    color.n = index + 1;
  });
  return colors;
});

</script>

<template>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Color
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style>

</style>