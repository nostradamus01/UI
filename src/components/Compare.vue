<script setup>
import { NCard, NButton } from 'naive-ui'
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

const removeFromCompare = async (id) => {
  console.log(phonesStore.compare);
  phonesStore.removeFromCompare(id);
  await getPhonesInCompare();
}
</script>

<template>
  <div class="compare-cont container">
    <h1>Compare</h1>
    <template v-if="phonesList.length === 0">
      <h1 style="text-align: center;">There is no phones</h1>
    </template>
    <div class="cards" v-else>
      <n-card v-for="phone in phonesList" :key="phone.id" class="phone-card">
        <div class="phone-image">
          <img :src="`/uploads/${phone.images[0]}`" alt="smartphone image">
        </div>
        <div class="about">
          <div class="description">
            <div><span>{{ phone.name }}</span> </div>
            <div class="price">{{ phone.price }}$</div>
          </div>
        </div>
        <div class="options">
          <div class="details">
            <div>
              <p>Storage:</p> <span class="span">{{ phone.storage }} GB</span>
            </div>
            <div>
              <p>Ram:</p> <span class="span">{{ phone.ram }} GB</span>
            </div>
            <div style="height: 70px;">
              <p>Cpu:</p> <span class="span">{{ phone.platform?.cpu }}</span>
            </div>
            <div>
              <p>Gpu: </p> <span class="span">{{ phone.platform?.gpu }} </span>
            </div>
            <div style="height: 70px;">
              <p>Chipset:</p> <span class="span"> {{ phone.platform?.chipset }}</span>
            </div>
            <div>
              <p>Depth:</p> <span class="span"> {{ phone.phoneDetail?.depth }}mm</span>
            </div>
            <div>
              <p>Height:</p> <span class="span">{{ phone.phoneDetail?.height }} mm</span>
            </div>
            <div>
              <p>Width:</p> <span class="span"> {{ phone.phoneDetail?.width }}mm</span>
            </div>
            <div>
              <p>Resolution:</p> <span class="span">{{ phone.phoneDetail?.resolution }} px</span>
            </div>
            <div>
              <p>Screen Size:</p> <span class="span">{{ phone.phoneDetail?.screenSize }} inch</span>
            </div>
          </div>
        </div>
        <n-button class="delete" type="error" size="large" @click="() => { removeFromCompare(phone.id) }">
          X
        </n-button>
      </n-card>
    </div>
  </div>
</template>

<style lang="scss">
.compare-cont {
  width: 90%;
  margin: 0 auto;

  .n-card__content {
    position: relative;
    .delete {
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }

  .cards {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;


  }


  .phone-image {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .phone-image img {
    width: 150px;
  }

  .about {
    display: inline;

    .description {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 18px;

      .price {
        font-size: 24px;
      }
    }
  }

  .options {

    .details {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      // justify-content: center;

      div {
        display: flex;
        align-items: center;
        padding: 10px;
        margin: 2px 0;
        background-color: #ededed;
        border-left: 1px solid black;
        cursor: default;

        p {
          display: block;
          flex: 1.3;
        }

        .span {
          flex: 4.5;
          padding-left: 10px;
        }
      }

    }
  }
}
</style>