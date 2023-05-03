<script setup>
import { ref, computed, h } from 'vue'
import { NDataTable, NButton, NSpin, NModal, NCard } from 'naive-ui'
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
}, {
  title: 'Action',
  key: 'actions',
  render(row) {
    const buttons =  [
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

const showForm = ref(false);

const isLoading = ref(false);

const dbStore = useDBStore();

const data = computed(() => {
  const platforms = dbStore.platforms;
  platforms.forEach((platform, index) => {
    platform.n = index + 1;
  });
  return platforms;
});

const HandleAddClick = () => {
  showForm.value = true;
}

const hideForm = () => {
  showForm.value = false;
}

const submitForm = () => {
  // ....
  hideForm();
}

</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false">
    <n-card
      style="width: 600px"
      title="Add Platform"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      Content
      <template #footer>
        <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
        <n-button type="primary" @click="submitForm">Submit</n-button>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Platform
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>