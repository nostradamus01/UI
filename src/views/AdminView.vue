<script setup>
import { NTabs, NTab } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import Header from '@/admin/Header.vue';

const router = useRouter()
const route = useRoute()

const handleUpdateValue = (value) => {
  router.push({ name: value });
}
</script>

<template>
  <Header></Header>
  <main>
    <n-tabs :default-value="route.name" type="segment" @update:value="handleUpdateValue" class="admin-tabs">
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
    <router-view></router-view>
  </main>
  
</template>

<style lang="scss">
main {
  padding: 2rem;
}

.table-toolbar {
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
}

.admin-tabs {
  margin-bottom: 20px;
}
</style>
