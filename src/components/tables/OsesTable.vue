<script setup>
import { ref, computed, h } from 'vue'
import { NDataTable, NButton, NSpin } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'
import OsForm from '@/components/forms/OsForm.vue';

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Name",
  key: "name",
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
  const oses = dbStore.oses;
  oses.forEach((os, index) => {
    os.n = index + 1;
  });
  return oses;
});

</script>

<template>
  <OsForm />
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>