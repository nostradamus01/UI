<script setup>
import { ref } from 'vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import Phones from '@/components/Phones.vue'
import Filters from '@/components/Filters.vue'

const isLoading = ref(false);
</script>

<template>
  <div class="main-content">
    <div class="inner-main container">
      <div class="filters-container">
        <div class="container-name">
          <h1>Filters</h1>
          <FilterIcon></FilterIcon>
        </div>
        <Filters></Filters>
      </div>
      <div class="phones-container">
        <div class="container-name">
          <h1>Smartphones</h1>
        </div>
        <Phones :isLoading="isLoading"></Phones>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-content {
  display: flex;
  justify-content: center;
  padding: 20px 0;

  .inner-main {
    display: flex;
    gap: 40px;

    .filters-container {
      flex: 1;
    }

    .container-name {
      display: flex;
      height: 40px;
      align-items: center;

      svg {
        height: 60%;
        margin-left: 10px;
      }
    }

    .phones-container {
      flex: 3;
    }
  }
}
</style>