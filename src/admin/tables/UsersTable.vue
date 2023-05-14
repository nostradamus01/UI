<script setup>
import { ref, computed, h } from 'vue'
import { NDataTable, NSpin } from 'naive-ui'
import { useDBStore } from '@/stores/dbStore'

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
  key: "firstName",
  resizable: true
}, {
  title: "Last Name",
  key: "lastName",
  resizable: true
}, {
  title: "Email",
  key: "email",
  resizable: true
}, {
  title: "Country",
  key: "country",
  resizable: true
}, {
  title: "City",
  key: "city",
  resizable: true
}, {
  title: "Post Code",
  key: "postCode",
  resizable: true
}]

const isLoading = ref(false);

const dbStore = useDBStore();

const data = computed(() => {
  const users = dbStore.users;
  users.forEach((user, index) => {
    user.n = index + 1;
  });
  return users;
});

</script>

<template>
  <n-spin :show="isLoading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<style>

</style>