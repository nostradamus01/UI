<script setup>
import { RouterView } from 'vue-router'
import { useServer } from '@/use/useServer.js'
import { NMessageProvider } from 'naive-ui'

useServer().initialize();
</script>

<template>
  <n-message-provider>
    <RouterView />
  </n-message-provider>
</template>

<style lang="scss">
.n-base-select-option__content .n-base-icon.n-base-select-option__check {
  display: none;
}
</style>