<script setup>
import { NCard } from 'naive-ui'
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
  <div class="compare-cont">
    <h1>Compare</h1>
    <div class="cards">
      <n-card v-for="phone in phonesList" :key="phone.id" class="phone-card">
        <div class="phone-image">
          <img :src="`public/uploads/${phone.image}`" alt="smartphone image">
        </div>
        <div class="about">
          <div class="description">
            <span>{{ phone.brand + ' ' + phone.model }}</span> <br>
            <span>{{ phone.ram + '/' + phone.storage + 'GB, ' + phone.color }}</span>
            <div class="price">{{ phone.price }}$</div>
          </div>
        </div>
        <div class="options">
          <div class="details">
            <p> {{ options[0].cpu }}</p>
            <p> {{ options[0].gpu }}</p>
            <p> {{ options[0].os }}</p>
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
    align-items: start;
  }

  .phone-card {
    align-items: start;
    max-width: 300px;
  }

  .details {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    // gap: 20px;

    p {
      margin: 10px 0;
      border-top: 1px solid black;
    }
  }
}
</style>