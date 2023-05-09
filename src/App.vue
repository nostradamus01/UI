<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useDBStore } from '@/stores/dbStore';

const dbStore = useDBStore();
dbStore.resetAllData();

if (!localStorage.getItem("dbStore")) {
  const dbStore = {
    phoneDetails: [],
    platforms: [],
    brands: [],
    colors: [],
    images: [],
    oses: [],
    phones: [],
    rams: [],
    storages: [],
    users: [],
    countries: [],
    cities: [],
    carts: []
  }
  localStorage.setItem("dbStore", JSON.stringify(dbStore));
  
}
const data = JSON.parse(localStorage.getItem("dbStore"))
for (const key of Object.keys(data)) {
  dbStore[key] = data[key]
}
</script>

<template>
  <RouterView />
</template>

<style>
.table-toolbar {
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
}
</style>
