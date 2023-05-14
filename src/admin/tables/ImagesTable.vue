<script setup>
import { ref, reactive, onMounted, computed, toRaw } from 'vue'
import { NButton, NUpload, NModal, NCard, NSelect, NSpace, NSpin } from 'naive-ui'
import Modal from '@/admin/Modal.vue';
import { useImages } from '@/use/useImages'

const { dbStore, getAll, add, edit, remove, initialize } = useImages();

// **Upload functions**
// const isUploadFormLoading = ref(false);
// const uploadForm = reactive({
//   title: 'Upload Images',
//   mode: 'add',
//   isVisible: false
// });

// const previewImageUrlRef = ref("");
// function handlePreview(file) {
//   const { url } = file;
//   previewImageUrlRef.value = url;
//   showModalRef.value = true;
// }

// const addFn = () => {
//   fileList.forEach(async (file) => {
//     const formData = new FormData();
//     formData.append('formFile', file.file);
//     console.log(formData);
//     fetch('http://localhost:5169/api/Images/uploadImage', {
//       method: "POST",
//       body: formData
//     });
//   })
// }

// let fileList = [];
// const uploadImageFn = (data) => {
//   fileList = data.fileList;
// }
// **  **

const url = import.meta.env.BASE_URL;

const tableData = computed(() => {
  return dbStore.images;
});

const isLoading = ref(false);
const isEditFormLoading = ref(false);

const editForm = reactive({
  title: 'Edit Image',
  mode: 'edit',
  isVisible: false
});

const initialData = {
  name: null,
  phoneDetail: null,
  color: null
}

const data = reactive({ ...initialData });

const phoneDetails = computed(() => {
  const arr = []
  dbStore.phoneDetails.forEach(phoneDetail => {
    const phoneBrand = dbStore.brands.find(brand => brand.id === phoneDetail.brandId);
    arr.push({
      label: phoneBrand?.name + ' ' + phoneDetail.model,
      value: phoneDetail.id
    });
  });
  return arr;
});
const colors = ref([])

const isColorsDisabled = ref(true);
const phoneDetailSelectFn = (value) => {
  data.color = null;
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

const showEditForm = (imageData) => {
  console.log(imageData);
  Object.assign(data, initialData);
  if (imageData) {
    data.id = imageData.id;
    data.name = imageData.name;
    data.phoneDetail = imageData.phoneDetailId;
    data.color = imageData.colorId;
  }
  editForm.isVisible = true;
}

const hideEditForm = () => {
  editForm.isVisible = false;
}

const getAllFn = async () => {
  isLoading.value = true;
  await getAll();
  isLoading.value = false;
}

const imageClickFn = (imageData) => {
  showEditForm(imageData);
}

const submit = async () => {
  isEditFormLoading.value = true;
  const obj = toRaw(data);
  await edit(obj);
  close();
  getAllFn();
}

const close = () => {
  isEditFormLoading.value = false;
  hideEditForm();
}

onMounted(async () => {
  // await getAllFn();
  await initialize()
})
</script>

<template>
  <!-- <Modal :isVisible="uploadForm.isVisible" :title="uploadForm.title" @close="close" @submit="submit"
    :is-loading="isUploadFormLoading">
    <n-upload :default-upload="false" multiple @change="uploadImageFn" list-type="image-card">
      Click to upload image
    </n-upload>
  </Modal> -->
  <Modal :isVisible="editForm.isVisible" :title="editForm.title" @close="close" @submit="submit"
    :is-loading="isEditFormLoading">
    <div class="img-container">
      <img :src="`${url}uploads/${data.name}`" alt="">
    </div>
    <n-space vertical class="n">
      <n-select v-model:value="data.phoneDetail" @update:value="phoneDetailSelectFn" :options="phoneDetails" style="display: flex;" />
      <n-select v-model:value="data.color" :disabled="isColorsDisabled" :options="colors" />
    </n-space>
  </Modal>
  <!-- <n-button type="primary" @click="addFn" class="table-toolbar">
    Upload Images
  </n-button> -->
  <h1 style="margin-bottom: 10px;">Uploaded Images</h1>
  <n-spin :show="isLoading">
    <div class="images-conatiner">
      <div v-for="data in tableData" class="image" @click="() => { imageClickFn(data) }">
        <img :src="`${url}uploads/${data.name}`" alt="">
      </div>
    </div>
  </n-spin>
</template>

<style lang="scss">
.images-conatiner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;

  .image {
    overflow: hidden;
    background-color: #fff;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}

.img-container {
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    width: 200px;
    object-fit: contain;
  }
}

.n {
  width: 100%;
}
</style>