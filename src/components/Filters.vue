<script setup>
import { watch } from 'vue'
import { NCheckbox, NSpace, NSlider, NInputNumber } from 'naive-ui'
import { usePhonesStore } from '@/stores/phonesStore'
import { useMain } from '@/use/useMain';

const phonesStore = usePhonesStore();
const { getFiltered } = useMain();


let timeout = null;

watch(phonesStore.filters, () => {
  console.log(phonesStore.filters);
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    getFiltered();
  }, 200)
})
</script>

<template>
  <div>
    <h2 class="filter-name">Brands</h2>
    <n-space vertical>
      <n-checkbox v-for="(value, key) in phonesStore.filters.brands" v-model:checked="phonesStore.filters.brands[key]">
        {{ key }}
      </n-checkbox>
    </n-space>
    <h2 class="filter-name">Price</h2>
    <n-slider v-model:value="phonesStore.filters.price" range :step="1" :max="2500" />
    <n-space style="padding-top: 10px;">
      <n-input-number v-model:value="phonesStore.filters.price[0]" :show-button="false" size="small" style="width: 100px;" />
      -
      <n-input-number v-model:value="phonesStore.filters.price[1]" :show-button="false" size="small" style="width: 100px;" />
    </n-space>
    <h2 class="filter-name">Storage</h2>
    <n-space vertical>
      <n-checkbox v-for="(value, key) in phonesStore.filters.storage" v-model:checked="phonesStore.filters.storage[key]">
        {{ key }} GB
      </n-checkbox>
    </n-space>
    <h2 class="filter-name">RAM</h2>
    <n-space vertical>
      <n-checkbox v-for="(value, key) in phonesStore.filters.ram" v-model:checked="phonesStore.filters.ram[key]">
        {{ key }} GB
      </n-checkbox>
    </n-space>
  </div>
</template>

<style lang="scss">
.filter-name {
  margin-top: 14px;
  margin-bottom: 4px;
}
</style>