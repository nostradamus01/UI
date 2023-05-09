<script setup>
import { NTabs, NTab } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const handleUpdateValue = (value) => {
  console.log(route.name);
  router.push({ name: value });
}
</script>

<template>
  <main>
    <n-tabs :default-value="route.name" type="segment" @update:value="handleUpdateValue">
      <n-tab name="phoneDetails">
        Phone Details
      </n-tab>
      <n-tab name="brands">
        Brands
      </n-tab>
      <n-tab name="platforms">
        Platforms
      </n-tab>
      <n-tab name="oses">
        OS
      </n-tab>
      <n-tab name="phones">
        Phones
      </n-tab>
      <n-tab name="storages">
        Storages
      </n-tab>
      <n-tab name="rams">
        RAM
      </n-tab>
      <n-tab name="colors">
        Colors
      </n-tab>
      <n-tab name="images">
        Images
      </n-tab>
      <n-tab name="users">
        Users
      </n-tab>
      <n-tab name="countries">
        Countries
      </n-tab>
      <n-tab name="cities">
        Cities
      </n-tab>
    </n-tabs>
  </main>
  <router-view></router-view>
</template>

<style scoped>
main {
  padding: 2rem;
}
</style>
