<script setup>
import { ref, computed } from 'vue'
import { NDataTable, NButton, NSpin } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Chipset",
  key: "chipset",
  resizable: true
}, {
  title: "CPU",
  key: "cpu",
  resizable: true
}, {
  title: "GPU",
  key: "gpu",
  resizable: true
}]

const isLoading = ref(false);

const dbStore = useDBStore();

const data = computed(() => {
  const platforms = dbStore.platforms;
  platforms.forEach((platform, index) => {
    platform.n = index + 1;
  });
  return platforms;
});

</script>

<template>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Platform
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>