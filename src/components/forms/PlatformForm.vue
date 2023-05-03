<script setup>
import { NModal } from 'naive-ui'

const props = defineProps({
  showForm: Boolean
})


</script>

<template>
  <n-modal v-model:show="showForm" preset="dialog" title="Dialog">
    <template #header>
      <div>Add Platform</div>
    </template>
    <div>

    </div>
    <template #action>
      <div>action</div>
    </template>
  </n-modal>
</template>

<style></style>