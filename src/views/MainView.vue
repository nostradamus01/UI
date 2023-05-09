<script setup>
import Header from '@/components/ui/Header.vue';
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
