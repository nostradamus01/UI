<script setup>
import { ref, computed, reactive, h } from 'vue'
import { NDataTable, NButton, NSpin, NModal, NCard, NSpace, NInput } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'

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

const showForm = ref(false);

const HandleAddClick = () => {
  showForm.value = true;
}

const hideForm = () => {
  showForm.value = false;
  platform.detailId = ''
  platform.colorId = ''
  platform.storageId = ''
  platform.ramId = ''
}

const submitForm = () => {
  // ....
  hideForm();
}

const platform = reactive({
  detailId: '',
  colorId: '',
  storageId: '',
  ramId: ''
})


</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false">
    <n-card style="width: 600px" title="Add Platform" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-space vertical>
        <n-input v-model:value="platform.detailId" type="text" placeholder="Phone Detail Id" />
        <n-input v-model:value="platform.colorId" type="text" placeholder="Color Id" />
        <n-input v-model:value="platform.storageId" type="text" placeholder="Storage Id" />
        <n-input v-model:value="platform.ramId" type="text" placeholder="Ram Id" />
      </n-space>
      <template #footer>
        <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
        <n-button type="primary" @click="submitForm">Submit</n-button>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Phone
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style>

</style>