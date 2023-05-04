<script setup>
import { ref, computed, reactive, h } from 'vue'
import { NDataTable, NButton, NSpin, NModal, NCard, NInput, NDatePicker, NForm, NSelect, NInputNumber } from 'naive-ui'
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

const showFormFn = () => {
  showForm.value = true;
}

const submitForm = () => {
  // ....
  hideForm();
}

const brands = computed(() => {
  const brandsArr = []
  dbStore.brands.forEach(brand => {
    const obj = {};
    obj.label = brand.name,
    obj.value = brand.id
    brandsArr.push(obj);
  });
  return brandsArr;
});

const platforms = computed(() => {
  const platformsArr = []
  dbStore.platforms.forEach(platform => {
    const obj = {};
    obj.label = platform.chipset,
    obj.value = platform.id
    platformsArr.push(obj);
  });
  return platformsArr;
});

const formData = reactive({
  brand: null,
  model: null,
  releaseDate: (new Date()).getTime(),
  platform: null,
  height: null,
  width: null,
  depth: null,
  screenSize: null,
  resolution: null,
  batteryCapacity: null,
  price: null,
  discount: null,
});

const hideForm = () => {
  showForm.value = false;
  formData.model = null;
  formData.releaseDate = (new Date()).getTime()
  formData.height = null;
  formData.width = null;
  formData.depth = null;
  formData.screenSize = null;
  formData.resolution = null;
  formData.batteryCapacity = null;
  formData.price = null;
  formData.discount = null;
}

</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false" class="modal-form">
    <n-card style="width: 500px" title="Add Phone Details" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" :model="formData" label-placement="left" :label-width="120" class="my-form">
        <n-select v-model:value="formData.brand" :options="brands" placeholder="Brand" />
        <n-input v-model:value="formData.model" placeholder="Model" />
        <n-date-picker v-model:value="formData.releaseDate" type="datetime" placeholder="Released date" />
        <n-select v-model:value="formData.platform" :options="platforms" placeholder="Platform" />
        <n-input-number v-model:value="formData.height" :show-button="false" placeholder="Height" />
        <n-input-number v-model:value="formData.width" :show-button="false" placeholder="Width" />
        <n-input-number v-model:value="formData.depth" :show-button="false" placeholder="Depth" />
        <n-input-number v-model:value="formData.screenSize" :show-button="false" placeholder="Screen Size" />
        <n-input v-model:value="formData.resolution" placeholder="Resolution" />
        <n-input-number v-model:value="formData.batteryCapacity" :show-button="false" placeholder="Battery Capacity" />
        <n-input-number v-model:value="formData.price" :show-button="false" placeholder="Price" />
        <n-input-number v-model:value="formData.discount" :show-button="false" placeholder="Discount" />
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
    Add Phone Details
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style></style>