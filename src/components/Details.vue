<script setup>
import { NCard, NButton, NSpace, NRadioGroup, NRadioButton } from 'naive-ui'
import { ref, onMounted, computed } from 'vue'
import { usePhonesStore } from '@/stores/phonesStore'
import { useDBStore } from '@/stores/dbStore'
import { useRoute, useRouter } from 'vue-router'
import { useMain } from '@/use/useMain';

const route = useRoute();
const phonesStore = usePhonesStore();
const { getPhoneDetails } = useMain();

const load = async (id) => {
  await getPhoneDetails(id);
}

const details = computed(() => {
  console.log(phonesStore.phoneDetails);
  return phonesStore.phoneDetails;
})



const options = [{
  cpu: 'Hexa-core (2x3.46 GHz Everest + 4x2.02 GHz Sawtooth)',
  gpu: 'Apple GPU (5-core graphics)',
  os: 'iOS 16'
}]


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

const ramValue = ref(0);
const storageValue = ref(0);
const colorValue = ref('');
const selectedImg = ref('');
const imgNames = ref([]);

onMounted(async () => {
  await load(route.params.id);
  ramValue.value = phonesStore.phoneDetails.rams[0];
  storageValue.value = phonesStore.phoneDetails.storages[0];
  colorValue.value = phonesStore.phoneDetails.colors[0].id;
  selectedImg.value = phonesStore.phoneDetails.colors[0].images[0];
  imgNames.value = phonesStore.phoneDetails.colors[0].images
})
</script>

<template>
  <div class="details">
    <div class="inner-details">
      <div class="images">
        <img :src="`/uploads/${selectedImg}`" alt="smartphone image">
        <div class="mini-img">
          <img v-for="img in imgNames" :src="`/uploads/${img}`" alt="smartphone image">
        </div>
      </div>
      <div class="about">
        <h2>{{ details.name }}</h2>
        <div class="color-details">
          <h3>Color</h3>
          <div class="mini-color">
            <n-space vertical>
              <n-radio-group v-model:value="colorValue" name="radiobuttongroup2">
                <n-radio-button v-for="color in details.colors" :key="color.id" :value="color.id" :style="{
                  backgroundColor: color.hex
                }" />
              </n-radio-group>
            </n-space>
            <!-- <div class="color" v-for="color in details.colors">{{  color.hex }}</div> -->
          </div>
          <!-- <n-space item-style="display: flex;">
                                      <n-checkbox size="large" label="large" />
                                    </n-space> -->
        </div>
        <div class="storige-details">
          <h3>Storage</h3>
          <div class="mini-storige">
            <n-space vertical>
              <n-radio-group v-model:value="storageValue" name="radiobuttongroup1" class="group">
                <n-radio-button v-for="storage in details.storages" :key="storage" :value="storage"
                  :label="storage + ' GB'" />
              </n-radio-group>
            </n-space>
          </div>
        </div>
        <div class="storige-details">
          <h3>Ram</h3>
          <div class="ram">
            <n-space vertical>
              <n-radio-group v-model:value="ramValue" name="radiobuttongroup1" class="group">
                <n-radio-button v-for="ram in details.rams" :key="ram" :value="ram" :label="ram + ' GB'" />
              </n-radio-group>
            </n-space>
          </div>
        </div>

        <div class="price-details">
          <h3>Price</h3>
          <div class="mini-price">
            <span>{{ details.price }}</span>
          </div>
        </div>
        <div class="cart-details">
          <n-button type="primary" size="large">
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
            <td>OS Version</td>
            <td>iOS 16</td>
          </tr>
          <tr>
            <td>Screen Type</td>
            <td>LTPO Super Retina XDR OLED</td>
          </tr>
          <tr>
            <td>Screen resolution</td>
            <td>1290 x 2796</td>
          </tr>
          <tr>
            <td>Screen size</td>
            <td>6.7 inch</td>
          </tr>
          <tr>
            <td>Chipset</td>
            <td>Apple A16 Bionic (4 nm)</td>
          </tr>
          <tr>
            <td>CPU</td>
            <td>2x3.46 GHz Everest + 4x2.02 GHz Sawtooth</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>6 GB</td>
          </tr>
          <tr>
            <td>Memory</td>
            <td>256 GB</td>
          </tr>
          <tr>
            <td>Battery capacity</td>
            <td>4323mAh</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>240 g</td>
          </tr>
          <tr>
            <td>Thickness</td>
            <td>7.9 mm</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>160.7 mm</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>77.6 mm</td>
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