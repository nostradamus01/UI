<script setup>
import { ref, computed, reactive, h } from 'vue'
import { NDataTable, NButton, NSpin } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'
import PhonesTableForm from '../forms/PhonesTableForm.vue';

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
  const phones = dbStore.phones;
  phones.forEach((phone, index) => {
    phone.n = index + 1;
  });
  return phones;
});

</script>

<template>
  <PhonesTableForm />
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style>

</style>