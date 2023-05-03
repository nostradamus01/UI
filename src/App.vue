<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
</script>

<template>
  <Header></Header>
  <RouterView />
</template>

<style>
.table-toolbar {
  margin-bottom: 20px;
}
</style>
