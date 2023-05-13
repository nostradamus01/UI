<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { NButton, NUpload, NModal, NCard, NSelect, NSpace, NSpin } from 'naive-ui'
import Modal from '@/admin/Modal.vue';
import { useImages } from '@/use/useImages'

const { dbStore, getAll, add, edit, remove } = useImages();

const tableData = computed(() => {
  return dbStore.images;
});

const isLoading = ref(false);
const isUploadFormLoading = ref(false);
const isEditFormLoading = ref(false);

const uploadForm = reactive({
  title: 'Upload Images',
  mode: 'add',
  isVisible: false
});

const editForm = reactive({
  title: 'Edit Image',
  mode: 'edit',
  isVisible: false
});

const showForm = (row) => {
  form.isVisible = true;
}

const hideForm = () => {
  form.isVisible = false;
}

const getAllFn = async () => {
  isLoading.value = true;
  dbStore.oses = await getAll();
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

// const addFn = () => {
//   showForm();
// }

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
  form.isVisible = true;
  hideForm();
}

onMounted(async () => {
  getAllFn();
});


const HandleAddClick = () => {
  showForm.value = true;
}

const HandleSelectClick = () => {
  showModal.value = true;
}

const showModalRef = ref(false);

const previewImageUrlRef = ref("");
function handlePreview(file) {
  const { url } = file;
  previewImageUrlRef.value = url;
  showModalRef.value = true;
}



const addFn = () => {
  fileList.forEach(async (file) => {
    const formData = new FormData();
    formData.append('formFile', file.file);
    console.log(formData);
    fetch('http://localhost:5169/api/Images/uploadImage', {
      method: "POST",
      body: formData
    });
  })
}

const uploadRef = ref(null);

let fileList = [];
const uploadImageFn = (data) => {
  fileList = data.fileList;
}

const images = reactive({
  names: []
})

const imgClickFn = (e) => {
  console.log(e);
}

onMounted(async () => {
  images.names = ['Picture1_7f77d8d2-70eb-4ad9-b92c-032bc71858ef.png']
  //   const response = await fetch('http://localhost:5169/api/Images/imageNames');
  //   if (response.status !== 200) {
  //     alert('error');
  //   } else {
  //     const data = await response.json();
  //     images.names = data;
  //   }
});

const url = import.meta.env.BASE_URL;
console.log(url);

const phoneDetails = computed(() => {
  const arr = []
  dbStore.phoneDetails.forEach(phoneDetail => {
    arr.push({
      label: phoneDetail.model,
      value: phoneDetail.id
    });
  });
  return arr;
});
const colors = ref([])

const isColorsDisabled = ref(true);
const phoneDetailSelectFn = (value, option) => {
  colors.value = [];
  isColorsDisabled.value = false
  const colorsArr = []
  dbStore.colors.forEach(color => {
    if (color.phoneDetailId === value) {
      colorsArr.push({
        label: color.name,
        value: color.id
      })
    }
  })
  colors.value = colorsArr;
}



</script>

<template>
  <Modal :isVisible="uploadForm.isVisible" :title="uploadForm.title" @close="close" @submit="submit"
    :is-loading="isUploadFormLoading">
    <n-upload :default-upload="false" multiple @change="uploadImageFn" list-type="image-card">
      Click to upload image
    </n-upload>
  </Modal>
  <Modal :isVisible="editForm.isVisible" :title="editForm.title" @close="close" @submit="submit"
    :is-loading="isEditFormLoading">
    <div class="img-container">
      <img :src="`${url}uploads/${images.names[0]}`" alt="">
      <n-space vertical class="n">
        <n-select @update:value="phoneDetailSelectFn" :options="phones" style="display: flex;" />
        <n-select :disabled="isColorsDisabled" :options="colors" />
      </n-space>
    </div>
  </Modal>
  <n-button type="primary" @click="addFn" class="table-toolbar">
    Upload Images
  </n-button>
  <h1>Uploaded Image</h1>
  <n-spin :show="isLoading">
    <div v-for="data in tableData" class="images-conatiner">
      <img :src="`${url}uploads/${data.name}`" alt="" @click="imgClickFn">
    </div>
  </n-spin>
</template>

<style>
.images-conatiner {
  display: flex;
}

.img-container {
  width: 100%;
  /* display: flex; */
  justify-content: space-between;
}

.img-container img {
  width: 180px;
  height: auto;
}

.n {
  width: 100%;
}
</style>