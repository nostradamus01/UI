<script setup>
import { NCard, NButton, NIcon, NSpin } from 'naive-ui'
import CartIcon from '@/icons/CartIcon.vue'
import ScaleIcon from '@/icons/ScaleIcon.vue'
import { usePhonesStore } from '@/stores/phonesStore'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const url = import.meta.env.BASE_URL;
const phonesStore = usePhonesStore();

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
  return phonesStore.cart.includes(id);
}
const isInCompare = (id) => {
  return phonesStore.compare.includes(id);
}
</script>

<template>
  <n-spin :show="phonesStore.isPhonesLoading">
    <div class="phones-list">
      <n-card v-for="phone in phonesList" :key="phone.id" :title="phone.name" class="phone-card">
        <template #cover>
          <div class="phone-image" @click="()=>{ router.push({ name: 'details', params: { id: phone.id } }) }">
            <img :src="`${url}uploads/${phone.image}`" alt="smartphone image">
          </div>
        </template>
        <div class="card-description">
          {{ phone.id }}
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
</template>

<style lang="scss">
.phones-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 320px));
  gap: 20px;
  padding: 10px 0;
  cursor: pointer;

  .phone-image {
    height: 260px;
  
      img{
        transition: 700ms linear;
      }
      &:hover{
        img{
          transform:scale(1.2);
        }
      }

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
</style>