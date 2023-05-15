<script setup>
import { NCard } from 'naive-ui'
import { ref, onMounted, computed } from 'vue'
import { usePhonesStore } from '@/stores/phonesStore'
import { useMain } from '@/use/useMain'
import { useRoute } from 'vue-router'

const route = useRoute();
const { getPhonesInCompare } = useMain();
const phonesStore = usePhonesStore();

 const phones = ref([]);
 onMounted(async () => {
  const temp = await getPhonesInCompare();
  console.log(temp)
  phones.value = await getPhonesInCompare();
})



const phonesList = computed(() => {
  return phonesStore.comparePhones;
})
// const options = ef([])[{
//   cpu: 'Hexa-core (2x3.46 GHz Everest + 4x2.02 GHz Sawtooth)',
//   gpu: 'Apple GPU (5-core graphics)',
//   os: 'iOS 16'
// }]

// phonesStore.compare.forEach(element => {
//   const phone = phonesStore.phones.find(phone => {
//     return phone.id === element
//   })

//   if (phone) {
//     phonesList.value.push(phone)
//   }
// });
</script>

<template>
  <div class="compare-cont container">
    <h1>Compare</h1>
    <div class="cards">
      <n-card v-for="phone in phonesList" :key="phone.id" class="phone-card">
        <div class="phone-image">
          <img :src="`/uploads/${phone.images[0]}`" alt="smartphone image">
        </div>
        <div class="about">
          <div class="description">
            <span>{{ phone.name }}</span> <br>
            <div class="price">{{ phone.price }}$</div>
          </div>
        </div>
        <div class="options">
          <div class="details">
            <p>Storage {{ phone.storage }} GB</p>
            <p>Ram {{ phone.ram }} GB</p>
            <p>Cpu {{ phone.platform?.cpu }} </p>
            <p>Gpu {{ phone.platform?.gpu }} </p>
            <p>Chipset {{ phone.platform?.chipset }} </p>
            <p>Depth {{ phone.phoneDetail?.depth }} </p>
            <p>Height {{ phone.phoneDetail?.height }} </p>
            <p>Width {{ phone.phoneDetail?.width }} </p>
            <p>Resolution {{ phone.phoneDetail?.resolution }} </p>
            <p>Screen Size {{ phone.phoneDetail?.screenSize }} </p>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<style lang="scss">
.compare-cont {
  width: 90%;
  margin: 0 auto;

  .cards {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .phone-image img {
    width: 150px;
  }

  .about {
    display: inline;

  }

  .phone-card {
    align-items: start;
    max-width: 300px;
  }

  .options {

    .details {
      margin-top: 30px;
      display: flex;
      flex-direction: column;

      p {
        margin: 10px 0;
        border-top: 1px solid black;
      }
    }
  }
}
</style>