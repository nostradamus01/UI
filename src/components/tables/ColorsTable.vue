<script setup>
import { NDataTable, NButton, NSpin, NModal, NCard, NSpace, NInput } from 'naive-ui';
import { ref, computed, h } from 'vue';
import { useDBStore } from '@/stores/dbStore';
import ColorForm from '@/components/forms/ColorForm.vue';

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
  const colors = dbStore.colors;
  colors.forEach((color, index) => {
    color.n = index + 1;
  });
  return colors;
});



</script>

<template>
  <ColorForm />
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>