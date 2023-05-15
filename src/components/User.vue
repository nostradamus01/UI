<script setup>
import { useUsers } from '@/use/useUsers'
import { onMounted, computed } from 'vue'
import { NCard, NButton, NInputNumber, NCheckbox, NSpace, NIcon } from 'naive-ui'
import { usePhonesStore } from '@/stores/phonesStore'

const { dbStore, get } = useUsers();
// const phonesStore = usePhonesStore();
// const phonesList = ref([]);
const data = computed(() => {
  return dbStore.user;
})

onMounted(async () => {
  await get();
})
</script>

<template>
  <div class="user-container">
    <div class="first-last-name">
      <h2> {{ data.firstname }}</h2>
      <h2> {{ data.lastname }}</h2>
    </div>
    <n-card class="phone-card">
      <div class="card-cont">
        <div class="phone-image">
          <!-- <img :src="`/uploads/${phone.image}`" alt="smartphone image"> -->
          <img class="" src="/uploads/iPhone12_Green.jpg" alt="">
        </div>
        <div class="about">
          <div class="description">
            <!-- <span>{{ phone.name }}</span> <br>
            <span>{{ phone.ram + '/' + phone.storage + 'GB, ' + phone.color }}</span>
            <div class="price">{{ phone.price }}$</div> -->

          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<style lang="scss">
.user-container {
  width: 90%;
  margin: 0 auto;

  .first-last-name {
    display: flex;
    margin: 20px 0;
    gap: 20px;
  }

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
  }
}
</style>