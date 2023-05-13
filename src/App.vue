<script setup>
import { RouterView } from 'vue-router'
import { useServer } from '@/use/useServer.js'

useServer().initialize();
</script>

<template>
  <RouterView />
</template>