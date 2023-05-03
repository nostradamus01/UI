<script setup>
import { ref, computed, reactive, h } from 'vue'
import { NDataTable, NButton, NSpin, NModal, NCard, NSpace, NInput } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'

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

const isLoading = ref(false);

const dbStore = useDBStore();

const data = computed(() => {
  const phoneDetails = dbStore.phoneDetails;
  phoneDetails.forEach((phoneDetail, index) => {
    phoneDetail.n = index + 1;
  });
  return phoneDetails;
});

const showForm = ref(false);

const HandleAddClick = () => {
  showForm.value = true;
}

const hideForm = () => {
  showForm.value = false;
  platform.model = ''
  platform.releaseDate = ''
  platform.height = ''
  platform.width = ''
  platform.depth = ''
  platform.screensize = ''
  platform.resolution = ''
  platform.battery = ''
  platform.price = ''
  platform.discount = ''
}

const submitForm = () => {
  // ....
  hideForm();
}

const platform = reactive({
  model: '',
  releaseDate: '',
  height: '',
  width: '',
  depth: '',
  screensize: '',
  resolution: '',
  battery: '',
  price: '',
  discount: '',
})


</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false">
    <n-card style="width: 600px" title="Add Platform" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-space vertical>
        <n-input v-model:value="platform.model" type="text" placeholder="Model" />
        <n-input v-model:value="platform.releaseDate" type="text" placeholder="Release Date" />
        <n-input v-model:value="platform.height" type="text" placeholder="Height" />
        <n-input v-model:value="platform.width" type="text" placeholder="Width" />
        <n-input v-model:value="platform.depth" type="text" placeholder="Depth" />
        <n-input v-model:value="platform.screensize" type="text" placeholder="Screen Size" />
        <n-input v-model:value="platform.resolution" type="text" placeholder="Resolution" />
        <n-input v-model:value="platform.battery" type="text" placeholder="Battery Capacity" />
        <n-input v-model:value="platform.price" type="text" placeholder="Price" />
        <n-input v-model:value="platform.discount" type="text" placeholder="Discount" />
      </n-space>
      <template #footer>
        <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
        <n-button type="primary" @click="submitForm">Submit</n-button>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Add Phone Details
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style>

</style>