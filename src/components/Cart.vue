<script setup>
import { NCard, NButton, NInputNumber, NCheckbox, NSpace, NIcon, useMessage } from 'naive-ui'
import { onMounted, ref, computed } from 'vue'
import { usePhonesStore } from '@/stores/phonesStore'
import CartIcon from '../icons/CartIcon.vue';
import { useRouter } from 'vue-router'
import { useDialog } from 'naive-ui'
import { useMain } from '@/use/useMain'
import CartModal from '@/components/CartModal.vue';

const { getPhonesInCart } = useMain();
const phonesStore = usePhonesStore();
const dialog = useDialog();
const router = useRouter();
const message = useMessage();

const phonesList = ref([]);

// const validator = (value) => {
//   return value > 0 && value < 10;
// }

const isDisabled = ref(true);
const checkedPhones = new Set();

const checkPhone = (id) => {
  checkedPhones.add(id);
  isDisabled.value = false;
};
const uncheckPhone = (id) => {
  checkedPhones.delete(id);
  if (checkedPhones.size === 0) {
    isDisabled.value = true;
  }
};

const isLoading = ref(false);


const handleBuy = async () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    const items = [];
    for (const item of checkedPhones) {
      phonesStore.userPhones.push(item);
      phonesStore.removeFromCart(item)
      items.push(item);
    }
    localStorage.setItem('userPhones', JSON.stringify(items));
    dialog.success({
      title: 'Success',
      content: 'You have successfully made a purchase',
      positiveText: 'OK',
      onPositiveClick: () => {
        router.push({ name: 'home' });
      }
    })
  }, 1000);
  const isVisible = false;
}



onMounted(async () => {
  isLoading.value = true;
  const result = await getPhonesInCart();
  phonesList.value = result;
  isLoading.value = false;
})

const showModal = ref(false);
const isModalLoading = ref(false);



const buy = () => {
  isModalLoading.value = (true);
  handleBuy();
}

const close = () => {
  showModal.value = false;
}
const removeFromCart = async (id) => {
  phonesStore.removeFromCart(id);
  isLoading.value = true;
  const result = await getPhonesInCart();
  phonesList.value = result;
  isLoading.value = false;
}
</script>


<template>
  <CartModal v-model:show="showModal" class="modal" @close="close" @buy="buy" :is-loading="isModalLoading" />
  <div class="cart-cont container">
    <h1>Cart</h1>
    <template v-if="phonesList.length === 0">
      <h1 style="text-align: center;">There is no phones</h1>
    </template>
    <template v-else>
      <n-card v-for="phone in phonesList" :key="phone.id" class="phone-card">
        <div class="card-cont">
          <div class="check">
            <n-space>
              <n-checkbox size="large" @update:checked="(value) => {
                if (value) {
                  checkPhone(phone.id);
                } else {
                  uncheckPhone(phone.id);
                }
              }" />
            </n-space>
          </div>
          <div class="phone-image">
            <img :src="`/uploads/${phone.images[0]}`" alt="smartphone image">
          </div>
          <div class="about">
            <div class="description">
              <span>{{ phone.name }}</span> <br>
              <span>{{ phone.ram + '/' + phone.storage + 'GB, ' + phone.color.name }}</span>
              <div class="price">{{ phone.price }}$</div>
            </div>
          </div>
        </div>
        <n-button class="delete" type="error" size="large" @click="() => { removeFromCart(phone.id) }">
          Delete
        </n-button>
      </n-card>
      <div class="buy">

        <n-button type="primary" :disabled="isDisabled" size="large" @click="showModal = true">
          <template #icon>
            <n-icon>
              <CartIcon />
            </n-icon>
          </template>
          Buy
        </n-button>
      </div>
    </template>
  </div>
</template>


<style lang="scss">
.cart-cont {
  width: 90%;
  margin: 0 auto;

  .phone-card {
    margin-top: 20px;
    position: relative;
    .delete {
      position: absolute;
      right: 5px;
      bottom: 10px;
    }
  }

  .card-cont {
    width: 100%;
    height: 150px;
    margin: 0 auto;
    display: flex;


    .phone-image {
      height: 100%;
      width: 150px;
      display: flex;
      align-items: start;
      justify-content: start;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }

    .about {
      flex: 2;
      height: 100%;
      align-items: start;
      margin: 10px;
    }

    .description {
      font-size: 20px;
    }

    .check {
      display: flex;
      width: 60px;
      align-items: center;
      justify-content: center;

      .n-checkbox .n-checkbox-box {
        height: 24px;
        width: 24px;
      }
    }
  }

  .modal {
    position: fixed;
    left: 450px;
  }

  .buy {
    margin-top: 20px;
    display: flex;
    align-items: end;
    justify-content: end;
  }
}
</style>