<script setup>
import FilterIcon from '@/components/icons/FilterIcon.vue'
import CartIcon from '@/components/icons/CartIcon.vue'
import ScaleIcon from '@/components/icons/ScaleIcon.vue'
import { NCard, NButton, NIcon, NSpin, NCheckbox, NSpace, NSlider, NInputNumber } from 'naive-ui'
import { usePhonesStore } from '@/stores/phonesStore'
import { computed, ref } from 'vue'

const url = import.meta.env.BASE_URL;

const phonesStore = usePhonesStore();

const isLoading = ref(false);

const phonesList = computed(() => {
  return phonesStore.phones;
});

const addToCart = (id) => {
  phonesStore.addToCart(id);
}

const addToCompare = (id) => {
  phonesStore.addToCompare(id);
}

const isInCart = (id) => {
  return phonesStore.isInCart(id);
}

const isInCompare = (id) => {
  return phonesStore.isInCompare(id);
}

const sliderValue = ref([0, 3000]);

</script>

<template>
  <div class="main-content">
    <div class="inner-main container">
      <div class="filters-container">
        <div class="container-name">
          <h1>Filters</h1>
          <FilterIcon></FilterIcon>
        </div>
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
        <n-slider v-model:value="sliderValue" range :step="1" max="3000" />
        <n-space style="padding-top: 10px;">
          <n-input-number v-model:value="sliderValue[0]" :show-button="false"  size="small" style="width: 100px;"/>
          -
          <n-input-number v-model:value="sliderValue[1]" :show-button="false"  size="small" style="width: 100px;"/>
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
      <div class="phones-container">
        <div class="container-name">
          <h1>Smartphones</h1>
        </div>
        <n-spin :show="isLoading">
          <div class="phones-list">
            <n-card v-for="phone in phonesList" :key="phone.id" :title="phone.brand + ' ' + phone.model"
              class="phone-card">
              <template #cover>
                <div class="phone-image">
                  <img :src="`${url}uploads/${phone.image}`" alt="smartphone image">
                </div>
              </template>
              <div class="card-description">
                <span>{{ phone.ram + '/' + phone.storage + 'GB, ' + phone.color }}</span>
                <ScaleIcon class="compare-icon" :class="isInCompare(phone.id) ? 'added' : ''"
                  @click="() => { addToCompare(phone.id) }"></ScaleIcon>
              </div>
              <div class="card-content">
                <div class="price">{{ phone.price }}$</div>
                <n-button @click="() => { addToCart(phone.id) }" :type="isInCart(phone.id) ? 'primary' : ''">
                  <template #icon>
                    <n-icon>
                      <CartIcon></CartIcon>
                    </n-icon>
                  </template>
                  {{ isInCart(phone.id) ? 'Added' : 'Add to cart' }}
                </n-button>
              </div>
            </n-card>
          </div>
        </n-spin>
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

    .filter-name {
      margin-top: 14px;
      margin-bottom: 4px;
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

  .phones-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    padding: 10px 0;

    .phone-image {
      height: 260px;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }

    .card-description {
      font-size: 16px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      svg {
        cursor: pointer;
        height: 20px;

        &.added {
          color: green;
        }
      }
    }

    .card-content {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .price {
        font-size: 20px;
      }
    }
  }
}
</style>