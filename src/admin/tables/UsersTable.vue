<script setup>
import { ref, computed, onMounted } from 'vue'
import { NDataTable, NSpin } from 'naive-ui'
import { useUsers } from '@/use/useUsers'

const columns = [{
  title: 'No',
  key: 'n',
  width: 60
}, {
  title: "Username",
  key: "username",
  resizable: true
}, {
  title: "First Name",
  key: "firstname",
  resizable: true
}, {
  title: "Last Name",
  key: "lastname",
  resizable: true
}, {
  title: "Country",
  key: "country",
  resizable: true,
  render(row) { 
    return row.country?.name;
  }
}, {
  title: "City",
  key: "city",
  resizable: true,
  render(row) { 
    return row.city?.name;
  }
}, {
  title: "Post Code",
  key: "postcode",
  resizable: true
}]

const { dbStore, getAll } = useUsers();

const isLoading = ref(false);

const data = computed(() => {
  const users = dbStore.users;
  users.forEach((user, index) => {
    user.n = index + 1;
  });
  return users;
});

const getAllFn = async () => {
  isLoading.value = true;
  dbStore.users = await getAll();
  isLoading.value = false;
}

onMounted(async () => {
  getAllFn();
});
</script>

<template>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style>

</style>