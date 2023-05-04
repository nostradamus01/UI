<script setup>
import { NDataTable, NButton, NSpin, NModal, NCard, NInput, NForm } from 'naive-ui';
import { ref, computed, h, reactive } from 'vue';
import { useDBStore } from '@/stores/dbStore';
import BrandForm from '@/components/forms/BrandForm.vue';

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
  const brands = dbStore.brands;
  brands.forEach((brand, index) => {
    brand.n = index + 1;
  });
  return brands;
});



</script>

<template>
  <BrandForm />
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>