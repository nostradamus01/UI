<script setup>
import { NDataTable } from 'naive-ui'

const props = defineProps({
  columns, data
});
</script>

<template>
        <n-data-table :columns="columns" :data="data"/>
</template>

<style scoped>

</style>