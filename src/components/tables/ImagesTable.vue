<script setup>
import { ref, computed } from 'vue'
import { NDataTable, NButton, NSpin, NUpload, NModal, NDivider } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'


const columns = [{
    title: 'No',
    key: 'n',
    width: 60
}, {
    title: "Phone",
    key: "name",
    resizable: true
}]

const isLoading = ref(false);

const dbStore = useDBStore();

// const data = computed(() => {
//     const images = dbStore.images;
//     images.forEach((img, index) => {
//         img.n = index + 1;
//     });
//     return images;
// });

const showModalRef = ref(false);
const previewImageUrlRef = ref("");
function handlePreview(file) {
    const { url } = file;
    previewImageUrlRef.value = url;
    showModalRef.value = true;
}

const fileList = ref([

]);

</script>

<template>
    <n-button type="primary" @click="HandleAddClick" class="table-toolbar">
        Add Image
    </n-button>
    <!-- <n-spin :show="isLoading">
        <n-data-table :columns="columns" :data="data" />
    </n-spin> -->
    <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :default-file-list="fileList"
        list-type="image-card">
        Click to Upload
    </n-upload>
</template>

<style></style>