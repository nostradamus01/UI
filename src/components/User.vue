<script setup>
import { usePhonesStore } from '@/stores/phonesStore'
import { useUsers } from '@/use/useUsers'
import { onMounted, computed } from 'vue'

const { dbStore, get } = useUsers();

const data = computed(() => {
  return dbStore.user;
})

onMounted(async () => {
  await get();
})
</script>

<template>
  <div class="user-cont container">
    <h1>Profile</h1>

    First Name: {{ data.firstname }}
    Last Name: {{ data.lastname }}
    Username: {{ data.username }}
    Country: {{ data.country?.name }}
    City: {{ data.city?.name }}
  </div>
</template>

<style lang="scss">
.user-cont {
  width: 90%;
  margin: 0 auto;
}
</style>