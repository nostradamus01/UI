<script setup>
import { NDataTable, NButton, NSpin, NModal, NCard, NInput, NForm } from 'naive-ui';
import { ref, computed, h, reactive } from 'vue';
import { useDBStore } from '@/stores/dbStore';

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

const showForm = ref(false);

const showFormFn = () => {
  showForm.value = true;
}

const submitForm = () => {
  // ....
  hideForm();
}

const formData = reactive({
  name: null
});

const hideForm = () => {
  showForm.value = false;
  formData.name = null;
}

</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false" class="modal-form">
    <n-card style="width: 500px" title="Add Brand" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" :model="formData" class="my-form">
        <n-input v-model:value="formData.name" placeholder="Name" />
      </n-form>
      <template #footer>
        <div style="display: flex; justify-content: flex-end;">
          <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
          <n-button type="primary" @click="submitForm">Submit</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="showFormFn" class="table-toolbar">
    Add Brand
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>