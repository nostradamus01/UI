<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { NDialogProvider } from 'naive-ui';

</script>

<template>
  <n-dialog-provider>
    <Header></Header>
    <div class="r-view">
      <RouterView></RouterView>
    </div>
    <Footer></Footer>
  </n-dialog-provider>
</template>

<style>
.r-view {
  margin-bottom: 10px;
  min-height: 100vh;
}


@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
