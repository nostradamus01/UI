<script setup>
import { ref, computed, h } from 'vue';
import { NDataTable, NButton, NSpin } from 'naive-ui';
import { useDBStore } from '@/stores/dbStore';
import StorageForm from '../forms/StorageForm.vue';

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Storages",
  key: "size",
  resizable: true
}, {
  title: 'Action',
  key: 'actions',
  render(row) {
    const buttons = [
      h(
        NButton,
        {
          size: 'small',
          onClick: () => EditRow(row)
        },
        { default: () => 'Edit' }
      ),
      h(
        NButton,
        {
          size: 'small',
          onClick: () => DeleteRow(row)
        },
        { default: () => 'Delete' }
      )
    ]
    return h(
      'div',
      {
        class: 'table-actions-conatiner'
      },
      buttons
    )
  }
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
  <StorageForm />
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>