<script setup>
import { NInput, NDatePicker, NForm, NSelect, NInputNumber, NButton, NSpin, NDataTable } from 'naive-ui';
import { ref, computed, h, reactive, onMounted, toRaw } from 'vue';
import Modal from '@/admin/Modal.vue';
import { usePhoneDetails } from '@/use/usePhoneDetails';
import moment from 'moment';


const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Brand",
  key: "brandId",
  resizable: true,
  render(row) {
    const brand = dbStore.brands.find(element => element.id === row.brandId);
    if (brand) {
      return brand.name
    }
    return 'ho du apush ches';
  }
}, {
  title: "Model",
  key: "model",
  resizable: true
}, {
  title: "Release Date",
  key: "releaseDate",
  resizable: true,
  render(row) {
    let day = moment(new Date(row.releaseDate)).format("DD.MM.YYYY").toString();
    return day;
  }
}, {
  title: "Platform",
  key: "platformId",
  resizable: true,
  render(row) {
    // console.log('Id', row);
    let platform =  dbStore.platforms.find(element => element.id === row.platformId);
    if (platform) {
      return platform.chipset
    } 
    return 'ho du apush ches';
  }
},{
  title: "Os",
  key: "osId",
  resizable: true,
  render(row) {
    // console.log('Id', row);
    let os =  dbStore.oses.find(element => element.id === row.osId);
    if (os) {
      return os.name
    } 
    return 'ho du apush ches';
  }
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
          onClick: () => editFn(row)
        },
        { default: () => 'Edit' }
      ),
      h(
        NButton,
        {
          size: 'small',
          onClick: () => removeFn(row)
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

const { dbStore, getAll, add, edit, remove } = usePhoneDetails();

const tableData = computed(() => {
  const data = dbStore.phoneDetails;
  data.forEach((element, index) => {
    element.n = index + 1;
  });
  return data;
});

const isLoading = ref(false);
const isFormLoading = ref(false);

const form = reactive({
  title: 'Add OS',
  mode: 'add',
  isVisible: false
});

const initialData = {
  brand: null,
  model: null,
  releaseDate: (new Date()).getTime(),
  platform: null,
  os: null,
  height: null,
  width: null,
  depth: null,
  screenSize: null,
  resolution: null,
  batteryCapacity: null,
  price: null,
  discount: null,
}

const data = reactive({ ...initialData });

const brands = computed(() => {
  const arr = []
  dbStore.brands.forEach(brand => {
    arr.push({
      label: brand.name,
      value: brand.id
    });
  });
  return arr;
});

const platforms = computed(() => {
  const arr = []
  dbStore.platforms.forEach(platform => {
    arr.push({
      label: platform.chipset,
      value: platform.id
    });
  });
  return arr;
});

const oses = computed(() => {
  const arr = []
  dbStore.oses.forEach(os => {
    arr.push({
      label: os.name,
      value: os.id
    });
  });
  return arr;
});

const showForm = (row) => {
  if (row) {
    Object.assign(data, row);
    form.mode = 'edit'
    form.title = 'Edit Phone details'
  } else {
    Object.assign(data, initialData);
    form.mode = 'add'
    form.title = 'Add Phone details'
  }
  form.isVisible = true;
}

const hideForm = () => {
  form.isVisible = false;
}

const getAllFn = async () => {
  isLoading.value = true;
  dbStore.phoneDetails = await getAll();
  isLoading.value = false;
}

const editFn = (row) => {
  showForm(row);
}

const removeFn = async (row) => {
  isLoading.value = true;
  await remove(row.id);
  getAllFn()
}

const addFn = () => {
  showForm();
}

const submit = async () => {
  isFormLoading.value = true;
  const obj = toRaw(data);
  if (form.mode === 'edit') {
    await edit(obj);
  } else {
    await add(obj);
  }
  close();
  getAllFn();
}

const close = () => {
  isFormLoading.value = false;
  hideForm();
}

onMounted(async () => {
  getAllFn();
});

</script>

<template>
  <Modal :isVisible="form.isVisible" :title="form.title" @close="close" @submit="submit" :is-loading="isFormLoading">
    <n-form ref="formRef" :model="data" class="my-form">
      <n-select v-model:value="data.brand" :options="brands" placeholder="Brand" />
      <n-input v-model:value="data.model" placeholder="Model" />
      <n-date-picker v-model:value="data.releaseDate" type="datetime" placeholder="Released date" />
      <n-select v-model:value="data.platform" :options="platforms" placeholder="Platform" />
      <n-select v-model:value="data.os" :options="oses" placeholder="OS" />
      <n-input-number v-model:value="data.height" :show-button="false" placeholder="Height" />
      <n-input-number v-model:value="data.width" :show-button="false" placeholder="Width" />
      <n-input-number v-model:value="data.depth" :show-button="false" placeholder="Depth" />
      <n-input-number v-model:value="data.screenSize" :show-button="false" placeholder="Screen Size" />
      <n-input v-model:value="data.resolution" placeholder="Resolution" />
      <n-input-number v-model:value="data.batteryCapacity" :show-button="false" placeholder="Battery Capacity" />
      <n-input-number v-model:value="data.price" :show-button="false" placeholder="Price" />
      <n-input-number v-model:value="data.discount" :show-button="false" placeholder="Discount" />
    </n-form>
  </Modal>
  <n-button type="primary" @click="addFn" class="table-toolbar">
    Add Phone details
  </n-button>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="tableData" />
  </n-spin>
</template>