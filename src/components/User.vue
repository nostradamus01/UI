<script setup>
import { useUsers } from '@/use/useUsers'
import { onMounted, computed, ref } from 'vue'
import { NCard } from 'naive-ui'
import { usePhonesStore } from '@/stores/phonesStore'
import { useMain } from '@/use/useMain'
import { useRouter } from 'vue-router'

const router = useRouter();
const { dbStore, get } = useUsers();
// const phonesStore = usePhonesStore();
// const phonesList = ref([]);
const data = computed(() => {
  return dbStore.user;
})
const { getPhonesInprofile } = useMain();
const phonesStore = usePhonesStore();

const phones = ref([]);
onMounted(async () => {
  const temp = await getPhonesInprofile();
  console.log(temp)
  phones.value = await getPhonesInprofile();
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
    <div class="buys-cont">
      <n-card v-for="phone in phones" :key="phone.id" class="phone-card">
        <div class="card-cont">
          <div class="phone-image">
            <img :src="`/uploads/${phone.images[0]}`" alt="smartphone image"
              @click="() => { router.push({ name: 'details', params: { id: phone.id } }) }">
          </div>
          <div class="about">
            <div class="description">
              <span class="phone-name">{{ phone.name }}</span> <br>
              <span>{{ phone.ram + '/' + phone.storage + 'GB, ' + phone.color.name }}</span>
              <div class="price">{{ phone.price }}$</div>
            </div>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<style lang="scss">
.user-container {
  width: 90%;
  margin: 0 auto;

  .buys-cont {
    display: flex;
  }

  .first-last-name {
    display: flex;
    margin: 20px 0;
    gap: 20px;
  }

  .phone-card {
    margin-top: 20px;
    width: 50%;
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
        height: 100%;
        cursor: pointer;
      }
    }

    .about {
      flex: 2;
      height: 100%;
      align-items: start;
      margin: 10px;

      .phone-name {
        font-size: 24px;
      }
    }
  }
}
</style>