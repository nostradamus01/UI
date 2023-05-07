<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
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
console.log(JSON.parse(localStorage.getItem("dbStore")));
</script>

<template>
  <Header></Header>
  <RouterView />
</template>

<style>
.table-toolbar {
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
}
</style>
