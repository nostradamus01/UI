<script setup>
import { NTabs, NTabPane } from 'naive-ui'
import PlatformsTable from '@/components/tables/PlatformsTable.vue'


</script>

<template>
  <main>
    <n-tabs default-value="phoneDetails" type="segment">
      <n-tab-pane name="phones" tab="Phones">
        Phones
      </n-tab-pane>
      <n-tab-pane name="phoneDetails" tab="Phone Details">
        Phone details
      </n-tab-pane>
      <n-tab-pane name="brands" tab="Brands">
        Brands
      </n-tab-pane>
      <n-tab-pane name="platforms" tab="Platforms">
        <PlatformsTable />
      </n-tab-pane>
      <n-tab-pane name="storages" tab="Storages">
        Storage
      </n-tab-pane>
      <n-tab-pane name="ram" tab="RAM">
        RAM
      </n-tab-pane>
      <n-tab-pane name="os" tab="OS">
        OS
      </n-tab-pane>
      <n-tab-pane name="colors" tab="Colors">
        Colors
      </n-tab-pane>
      <n-tab-pane name="images" tab="Images">
        Images
      </n-tab-pane>
      <n-tab-pane name="users" tab="Users">
        Users
      </n-tab-pane>
    </n-tabs>
  </main>
</template>

<style scoped>
  main {
    padding: 2rem;
  }
</style>
