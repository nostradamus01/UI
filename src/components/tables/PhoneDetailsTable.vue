<script setup>
import { ref, computed, h } from 'vue'
import { NDataTable, NButton, NSpin } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'
import PhoneDetailsForm from '@/components/forms/PhoneDetailsForm.vue';

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Model",
  key: "model",
  resizable: true
}, {
  title: "Release Date",
  key: "releaseDate",
  resizable: true
}, {
  title: "Height",
  key: "height",
  resizable: true
}, {
  title: "Width",
  key: "width",
  resizable: true
}, {
  title: "Depth",
  key: "depth",
  resizable: true
}, {
  title: "Screen Size",
  key: "screenSize",
  resizable: true
}, {
  title: "Resolution",
  key: "resolution",
  resizable: true
}, {
  title: "Battery Capacity",
  key: "batteryCapacity",
  resizable: true
}, {
  title: "Price",
  key: "price",
  resizable: true
}, {
  title: "Discount",
  key: "discount",
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
const dbStore = useDBStore();

const isLoading = ref(false);
const data = computed(() => {
  const phoneDetails = dbStore.phoneDetails;
  phoneDetails.forEach((phoneDetail, index) => {
    phoneDetail.n = index + 1;
  });
  return phoneDetails;
});

</script>

<template>
  <PhoneDetailsForm />
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>