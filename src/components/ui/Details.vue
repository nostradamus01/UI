<script setup>
import { useRouter, useRoute } from 'vue-router'

const route = useRoute();
const router = useRouter();


</script>

<template>
  <h1>Details {{ route.params.id }}</h1>
</template>

<style lang="scss">

</style>