<script setup>
import { NCard, NButton, NSpace, NRadioGroup, NRadioButton } from 'naive-ui'
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

const storages = [{
  value: "Rock'n'Roll Star",
  label: "256GB"
}, {
  value: "Shakermaker",
  label: "512GB"
}]
const rams = [{
  value: "Ram6",
  label: "6GB"
}, {
  value: "Ram4",
  label: "4GB"
}]

const colors = [{
  value: "red",
  label: ""
}, {
  value: "green",
  label: ""
}]
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
        <h2>iPhone 14 Pro Max</h2>
        <div class="color-details">
          <h3>Color</h3>
          <div class="mini-color">
            <n-space vertical>
              <n-radio-group v-model:value="value" name="radiobuttongroup2">
                <n-radio-button :key="colors[0].value" :value="colors[0].value" :label="colors[0].label" class="red" />
                <n-radio-button :key="colors[1].value" :value="colors[1].value" :label="colors[1].label" class="green" />
              </n-radio-group>
            </n-space>
          </div>
          <!-- <n-space item-style="display: flex;">
                                      <n-checkbox size="large" label="large" />
                                    </n-space> -->
        </div>
        <div class="storige-details">
          <h3>Storage</h3>
          <div class="mini-storige">
            <n-space vertical>
              <n-radio-group v-model:value="value" name="radiobuttongroup1" class="group">
                <n-radio-button v-for="storage in storages" :key="storage.value" :value="storage.value"
                  :label="storage.label" />
              </n-radio-group>
            </n-space>
          </div>
        </div>
        <div class="storige-details">
          <h3>Ram</h3>
          <div class="ram">
            <n-space vertical>
              <n-radio-group v-model:value="value" name="radiobuttongroup1" class="group">
                <n-radio-button v-for="ram in rams" :key="ram.value" :value="ram.value" :label="ram.label" />
              </n-radio-group>
            </n-space>
          </div>
        </div>

        <div class="price-details">
          <h3>Price</h3>
          <div class="mini-price">
            <span>999$</span>
          </div>
        </div>
        <div class="cart-details">
          <n-button type="primary"  size="large">
            Add to Cart
          </n-button>
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
    gap: 150px;
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

        .red {
          background-color: red;
          margin-right: 5px;
        }

        .green {
          background-color: green;
        }

        // div {
        //   width: 30px;
        //   height: 30px;
        //   margin: 10px;
        //   background-color: aqua;
        // }
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