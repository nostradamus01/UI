<script setup>
import { ref, computed, h, onMounted } from 'vue'
import { NDataTable, NButton, NSpin } from 'naive-ui'
import { usePlatforms } from '@/use/usePlatforms'
import PlatformForm from '../forms/PlatformForm.vue';

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
}, {
  title: 'Action',
  key: 'actions',
  render(row) {
    const buttons = [
      h(
        NButton,
        {
          size: 'small',
          onClick: () => editFn(row)
        },
        { default: () => 'Edit' }
      ),
      h(
        NButton,
        {
          size: 'small',
          onClick: () => deleteFn(row)
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

const { dbStore,
  getPlatforms,
  addPlatform,
  editPlatform,
  deletePlatform } = usePlatforms();

const tableData = computed(() => {
  const platforms = dbStore.platforms;
  platforms.forEach((platform, index) => {
    platform.n = index + 1;
  });
  return platforms;
});

const isLoading = ref(false);

onMounted(async () => {
  getPlatformsFn();
})

</script>

<template>
  <PlatformForm />
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="tableData" />
  </n-spin>
</template>

<style></style>