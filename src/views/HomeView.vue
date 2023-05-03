<script setup>
import { NTabs, NTabPane } from 'naive-ui'
import PlatformsTable from '@/components/tables/PlatformsTable.vue'
import BrandsTable from '@/components/tables/BrandsTable.vue';
import StoragesTable from '@/components/tables/StoragesTable.vue';
import OsesTable from '@/components/tables/OsesTable.vue';
import PhoneDetailsTable from '@/components/tables/PhoneDetailsTable.vue';
import PhonesTable from '@/components/tables/PhonesTable.vue';
import RAMsTable from '@/components/tables/RAMsTable.vue';
import ImagesTable from '@/components/tables/ImagesTable.vue';
import UsersTable from '@/components/tables/UsersTable.vue';
import ColorsTable from '@/components/tables/ColorsTable.vue';
</script>

<template>
  <main>
    <n-tabs default-value="phoneDetails" type="segment">
      <n-tab-pane name="phoneDetails" tab="Phone Details">
        <PhoneDetailsTable />
      </n-tab-pane>
      <n-tab-pane name="phones" tab="Phones">
        <PhonesTable />
      </n-tab-pane>
      <n-tab-pane name="brands" tab="Brands">
        <BrandsTable />
      </n-tab-pane>
      <n-tab-pane name="platforms" tab="Platforms">
        <PlatformsTable />
      </n-tab-pane>
      <n-tab-pane name="storages" tab="Storages">
        <StoragesTable />
      </n-tab-pane>
      <n-tab-pane name="ram" tab="RAM">
        <RAMsTable />
      </n-tab-pane>
      <n-tab-pane name="os" tab="OS">
        <OsesTable />
      </n-tab-pane>
      <n-tab-pane name="colors" tab="Colors">
        <ColorsTable />
      </n-tab-pane>
      <n-tab-pane name="images" tab="Images">
        <ImagesTable />
      </n-tab-pane>
      <n-tab-pane name="users" tab="Users">
        <UsersTable />
      </n-tab-pane>
    </n-tabs>
  </main>
</template>

<style scoped>
  main {
    padding: 2rem;
  }
</style>
