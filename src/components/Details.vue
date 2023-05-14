<script setup>
import { NCard, NButton, NSpace } from 'naive-ui'
import { ref } from 'vue'
import { usePhonesStore } from '@/stores/phonesStore'
import { useDBStore } from '@/stores/dbStore'

const phonesStore = usePhonesStore();
const phonesList = ref([]);
const options = [{
  cpu: 'Hexa-core (2x3.46 GHz Everest + 4x2.02 GHz Sawtooth)',
  gpu: 'Apple GPU (5-core graphics)',
  os: 'iOS 16'
}]

phonesStore.compare.forEach(element => {
  const phone = phonesStore.phones.find(phone => {
    return phone.id === element
  })

  if (phone) {
    phonesList.value.push(phone)
  }
});
</script>

<template>
  <div class="details">
    <div class="inner-details">
      <div class="images">
        <img :src="`/uploads/iPhone14ProMax_Deep-Purple.jpg`" alt="smartphone image">

        <div class="mini-img">
          <img :src="`/uploads/iPhone14ProMax_Deep-Purple.jpg`" alt="smartphone image">
          <img :src="`/uploads/iPhone14ProMax_Deep-Purple.jpg`" alt="smartphone image">
        </div>
      </div>
      <div class="about">
        <h2>iPhone14ProMax_Deep-Purple.jpg</h2>
        <div class="color-details">
          <h3>Color</h3>
          <div class="mini-color">
            <div></div>
            <div></div>
          </div>
          <!-- <n-space item-style="display: flex;">
            <n-checkbox size="large" label="large" />
          </n-space> -->
        </div>
        <div class="storige-details">
          <h3>Storige</h3>
          <div class="mini-storige">
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="price-details">
          <h3>Price</h3>
          <div class="mini-price">
            <span>999$</span>
          </div>
        </div>
        <div class="cart-details">
          <n-space>
            <n-button type="warning">
              Add to Cart
            </n-button>
          </n-space>
        </div>
      </div>

    </div>
    <div class="too-details">
      <h1>Details</h1>
      <div class="table">
        <table>
          <tr>
            <td>Real</td>
            <td>2022</td>
          </tr>
        </table>
        <table>
          <tr>
            <td>stast</td>
            <td>11111 oyukf gf</td>
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
    display: flex;
    flex-direction: column;

    .table {
      // width: 20%;
      display: flex;
      gap: 20px;

      table {
        flex: 1;
      }
    }

    .announsed {
      display: flex;
    }

  }

  .inner-details {
    display: flex;
    justify-content: center;
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

        div {
          width: 30px;
          height: 30px;
          margin: 10px;
          background-color: aqua;
        }
      }

      .mini-storige {
        display: flex;

        div {
          width: 70px;
          height: 30px;
          margin: 10px;
          background-color: rgb(9, 255, 0);
        }
      }

      .mini-price {
        display: flex;

        span {
          font-size: 50px;
        }
      }
    }
  }
}
</style>