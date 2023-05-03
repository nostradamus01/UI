<script setup>
import { ref, reactive, onMounted } from 'vue'
import { NButton, NUpload, NModal, NCard } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'


const isLoading = ref(false);
const showForm = ref(false);

const dbStore = useDBStore();


const HandleAddClick = () => {
  showForm.value = true;
}

const showModalRef = ref(false);
const previewImageUrlRef = ref("");
function handlePreview(file) {
  const { url } = file;
  previewImageUrlRef.value = url;
  showModalRef.value = true;
}

let fileList = [];

const submitForm = () => {
  console.log(fileList);
  fileList.forEach(async (file) => {
    const formData = new FormData();
    formData.append('formFile', file.file);
    console.log(formData);
    fetch('http://localhost:5169/api/Images/uploadImage', {
      method: "POST",
      body: formData
    });
  })
  hideForm();
}

const hideForm = () => {
  showForm.value = false;
}

const uploadRef = ref(null);

const handleChange = (data) => {
  console.log(data);
  fileList = data.fileList;
}

const images = reactive({
  names: []
})

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

</script>

<template>
  <n-modal v-model:show="showForm" :mask-closable="false">
    <n-card style="width: 600px" title="Upload Image" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-upload ref="uploadRef" :default-upload="false" multiple @change="handleChange" list-type="image-card">
        Click to upload image
      </n-upload>
      <template #footer>
        <n-button @click="hideForm" style="margin-right: 10px;">Close</n-button>
        <n-button type="primary" @click="submitForm">Submit</n-button>
      </template>
    </n-card>
  </n-modal>
  <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
    Upload Image
  </n-button>
  <h1>Uploaded Image</h1>
  <div v-for="name in images.names" class="images-conatiner">
    <img :src="`${url}uploads/${name}`" alt="">
  </div>
</template>

<style>
    .images-conatiner{
        display: flex;
    }
</style>