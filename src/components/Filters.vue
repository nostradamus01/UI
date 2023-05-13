<script setup>
import { ref } from 'vue'
import { NCheckbox, NSpace, NSlider, NInputNumber } from 'naive-ui'

const sliderValue = ref([0, 3000]);
</script>

<template>
  <div>
    <h2 class="filter-name">Brands</h2>
    <n-space vertical>
      <n-checkbox value="Option 1">
        Samsung
      </n-checkbox>
      <n-checkbox value="Option 21">
        Apple
      </n-checkbox>
      <n-checkbox value="Option 31">
        Xiaomi
      </n-checkbox>
      <n-checkbox value="Option 31">
        Nokia
      </n-checkbox>
      <n-checkbox value="Option 31">
        Huawei
      </n-checkbox>
    </n-space>
    <h2 class="filter-name">Price</h2>
    <n-slider v-model:value="sliderValue" range :step="1" :max="3000" />
    <n-space style="padding-top: 10px;">
      <n-input-number v-model:value="sliderValue[0]" :show-button="false" size="small" style="width: 100px;" />
      -
      <n-input-number v-model:value="sliderValue[1]" :show-button="false" size="small" style="width: 100px;" />
    </n-space>
    <h2 class="filter-name">Storage</h2>
    <n-space vertical>
      <n-checkbox value="Option 1">
        32 GB
      </n-checkbox>
      <n-checkbox value="Option 21">
        64 GB
      </n-checkbox>
      <n-checkbox value="Option 31">
        128 GB
      </n-checkbox>
      <n-checkbox value="Option 31">
        256 GB
      </n-checkbox>
      <n-checkbox value="Option 31">
        512 GB
      </n-checkbox>
    </n-space>
    <h2 class="filter-name">RAM</h2>
    <n-space vertical>
      <n-checkbox value="Option 1">
        2 GB
      </n-checkbox>
      <n-checkbox value="Option 21">
        3 GB
      </n-checkbox>
      <n-checkbox value="Option 31">
        4 GB
      </n-checkbox>
      <n-checkbox value="Option 31">
        6 GB
      </n-checkbox>
      <n-checkbox value="Option 31">
        8 GB
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