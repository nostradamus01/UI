<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';


</script>

<template>
  <Header></Header>
  <div class="r-view">
      <RouterView></RouterView>
  </div>
  <Footer></Footer>
</template>

<style>
.r-view{
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
