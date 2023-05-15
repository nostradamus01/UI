<script setup>
import { NCard, NButton, NSpace, NRadioGroup, NRadioButton, NIcon } from 'naive-ui'
import CartIcon from '@/icons/CartIcon.vue'
import { ref, onMounted, computed } from 'vue'
import { usePhonesStore } from '@/stores/phonesStore'
import { useDBStore } from '@/stores/dbStore'
import { useRoute, useRouter } from 'vue-router'
import { useMain } from '@/use/useMain'

const route = useRoute();
const phonesStore = usePhonesStore();
const { getPhoneDetails } = useMain();

const load = async (id) => {
  await getPhoneDetails(id);
}

const details = computed(() => {
  return phonesStore.phoneDetails;
});

const selectedImg = ref('');

const selectImg = (img) => {
  selectedImg.value = img;
}

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

onMounted(async () => {
  await load(route.params.id);
  selectImg(phonesStore.phoneDetails.images[0]);
})
</script>

<template>
  <div class="details">
    <div class="inner-details">
      <div class="images">
        <img :src="`/uploads/${selectedImg}`" alt="smartphone image">
        <div class="mini-img">
          <img v-for="img in details?.images" :src="`/uploads/${img}`" alt="smartphone image" :class="selectedImg === img ? 'selected' : ''" @click="() => {
            selectImg(img);
          }">
        </div>
      </div>
      <div class="about">
        <h2>{{ details?.name }}</h2>
        <div class="color-details">
          <h3>Color</h3>
          <div class="mini-color">
            <h2>{{ details?.color?.name }} <span class="color-box"
                :style="{ backgroundColor: details?.color?.hex }"></span></h2>
          </div>
        </div>
        <div class="storige-details">
          <h3>Storage</h3>
          <div class="mini-storige">
            <h2>{{ details?.storage }} GB</h2>
          </div>
        </div>
        <div class="storige-details">
          <h3>Ram</h3>
          <div class="ram">
            <h2>{{ details?.ram }} GB</h2>
          </div>
        </div>

        <div class="price-details">
          <h3>Price</h3>
          <div class="mini-price">
            <span>{{ details?.price }}$</span>
          </div>
        </div>
        <div class="cart-details">
          <n-button @click="() => { addToCart(details.id) }" :type="isInCart(details.id) ? 'primary' : ''">
            <template #icon>
              <n-icon>
                <CartIcon></CartIcon>
              </n-icon>
            </template>
            {{ isInCart(details.id) ? 'Added' : 'Add to cart' }}
          </n-button>
        </div>
      </div>
    </div>
    <div class="too-details">
      <h1>Details</h1>
      <div class="table">
        <table>
          <tr>
            <td>OS Version</td>
            <td>{{ details.os }}</td>
          </tr>
          <tr>
            <td>Screen resolution</td>
            <td>{{ details.phoneDetail?.resolution }}</td>
          </tr>
          <tr>
            <td>Screen size</td>
            <td>{{ details.phoneDetail?.screenSize }}</td>
          </tr>
          <tr>
            <td>Chipset</td>
            <td>{{ details.platform?.chipset }}</td>
          </tr>
          <tr>
            <td>CPU</td>
            <td>{{ details.platform?.cpu }}</td>
          </tr>
          <tr>
            <td>GPU</td>
            <td>{{ details.platform?.gpu }}</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>{{ details.ram }} GB</td>
          </tr>
          <tr>
            <td>Storage</td>
            <td>{{ details.storage }} GB</td>
          </tr>
          <tr>
            <td>Battery capacity</td>
            <td>{{ details.phoneDetail?.batteryCapacity }} mAh</td>
          </tr>
          <tr>
            <td>Thickness</td>
            <td>{{ details.phoneDetail?.depth }} mm</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{{ details.phoneDetail?.height }} mm</td>
          </tr>
          <tr>
            <td>Width</td>
            <td>{{ details.phoneDetail?.width }} mm</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  .too-details {
    width: 645px;

    .table {
      display: flex;
      width: 100%;

      table {
        flex: 1;

        td {
          background-color: #ffffff;
          font-size: 18px;
          padding: 10px;
        }
      }
    }

    .announsed {
      display: flex;
    }

  }

  .inner-details {
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 550px;
    margin-top: 20px;

    .images {
      display: flex;
      flex-direction: column;
      margin-right: 30px;

      img {
        width: 400px;
        height: 400px;
      }

      .mini-img {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;

        img {
          width: 100px;
          height: 100px;

          &.selected {
            border: 2px solid green;
          }
        }
      }
    }

    .about {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 30px;

      .mini-color {
        display: flex;

        h2 {
          display: flex;
          align-items: center;

          .color-box {
            margin-left: 10px;
            height: 20px;
            width: 20px;
          }
        }

        .red {
          background-color: red;
          margin-right: 5px;
        }

        .green {
          background-color: green;
        }

      }

      .mini-storige {
        display: flex;
      }

      .mini-price {
        display: flex;

        span {
          font-size: 36px;
        }
      }
    }
  }
}
</style>