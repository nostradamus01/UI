<script setup>
import { NCard, NButton, NInputNumber, NCheckbox, NSpace, NIcon, NSpin } from 'naive-ui'
import { ref } from 'vue'
import { usePhonesStore } from '@/stores/phonesStore'
import MoneyIcon from '@/icons/MoneyIcon.vue'
import CartIcon from '../icons/CartIcon.vue';
import { useRoute, useRouter } from 'vue-router'
import { useDialog } from 'naive-ui'


const phonesStore = usePhonesStore();
const phonesList = ref([]);
const count = ref(1);
const dialog = useDialog();
const router = useRouter();

phonesStore.cart.forEach(element => {
  const phone = phonesStore.phones.find(phone => {
    return phone.id === element
  })

  if (phone) {
    phonesList.value.push(phone)
  }
});

const validator = (value) => {
  return value > 0 && value < 10;
}

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
    dialog.success({
      title: 'Success',
      content: 'You have successfully made a purchase',
      positiveText: 'OK',
      onPositiveClick: () => {
        router.push({ name: 'home' });
      }
    })
  }, 1000);
}

</script>

<template>
  <n-spin :show="isLoading">
    <div class="cart-cont container">
      <h1>Cart</h1>
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
            <img :src="`/uploads/${phone.image}`" alt="smartphone image">
          </div>
          <div class="about">
            <div class="description">
              <span>{{ phone.name }}</span> <br>
              <span>{{ phone.ram + '/' + phone.storage + 'GB, ' + phone.color }}</span>
              <div class="price">{{ phone.price }}$</div>
              <n-input-number v-model:value="count" :validator="validator" placeholder="quantity" />
            </div>
          </div>
        </div>
      </n-card>
      <div class="buy">
        <n-button type="primary" :disabled="isDisabled" size="large" @click="handleBuy">
          <template #icon>
            <n-icon>
              <CartIcon />
            </n-icon>
          </template>
          Buy
        </n-button>
      </div>
    </div>
  </n-spin>
</template>


<style lang="scss">
.cart-cont {
  width: 90%;
  margin: 0 auto;

  .phone-card {
    margin-top: 20px;
  }

  .card-cont {
    width: 100%;
    height: 150px;
    margin: 0 auto;
    display: flex;


    .phone-image {
      width: 150px;
      display: flex;
      align-items: start;
      justify-content: start;

      img {
        width: 150px;
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

  .buy {
    margin-top: 20px;
    display: flex;
    align-items: end;
    justify-content: end;
  }
}
</style>