<script setup>
import MyIcon from '@/icons/MyIcon.vue';
import { useRouter, useRoute } from 'vue-router'


const router = useRouter();
</script>

<template>
  <header>
    <MyIcon class="my-icon" @click="() => { router.push({ name: 'home' }) }"></MyIcon>
    <h1>Admin Panel</h1>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 10px;
  background: linear-gradient(#18a05861, #ededed)
}
.my-icon{
  width: 50px;
  height: 50px;
  cursor: pointer;
}
h1 {
  font-size: 36px;
  font-weight: 700;
  color: #276444;
  cursor: pointer;
}
</style>