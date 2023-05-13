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