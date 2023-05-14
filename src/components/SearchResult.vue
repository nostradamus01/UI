<script setup>
import { ref, onMounted } from 'vue'
import { useMain } from '@/use/useMain';
import Phones from '@/components/Phones.vue'
import { usePhonesStore } from '@/stores/phonesStore'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

console.log('ekel em');

const route = useRoute();
const phonesStore = usePhonesStore();

const main = useMain();

const doSearch = async (query) => {
  phonesStore.searchQuery = query;
  await main.getSearchResult();
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.query !== from.params.query) {
    await doSearch(to.params.query);
  }
});

onMounted(async () => {
  await doSearch(route.params.query);
})
</script>

<template>
  <div class="main-content">
    <div class="inner-main container">
      <div class="fil-phone">
        <div class="phones-container">
          <div class="container-name">
            <h1>Search Result: "{{ route.params.query }}"</h1>
          </div>
          <Phones></Phones>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-content {
  display: flex;
  justify-content: center;
  padding: 20px 0;

  .inner-main {
    display: flex;
    gap: 40px;
    flex-direction: column;

    .fil-phone {
      display: flex;
    }

    .filters-container {
      flex: 1;
      margin-right: 20px;
    }

    .container-name {
      display: flex;
      height: 40px;
      align-items: center;

      svg {
        height: 60%;
        margin-left: 10px;
      }
    }

    .photos {
      width: 100%;
      height: 320px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, auto);
      gap: 10px;
    }

    .photoN,
    .photoS,
    .photoI,
    .photoX {
      position: relative;
      cursor: pointer;
      overflow: hidden;
    }

    .photos img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo {
      img {
        transition: 700ms linear;
      }

      &:hover {
        img {
          transform: scale(1.2);
        }
      }


    }

    .photoN {
      span {
        position: absolute;
        z-index: 1;
        bottom: 0;
        right: 5px;
        font-size: 30px;
      }
    }


    .photoS {
      grid-column-start: 2;
      grid-row-start: 1;
      grid-row-end: 3;

      span {
        position: absolute;
        z-index: 1;
        right: 5%;
        font-size: 30px;
      }

    }

    .photoI {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 3;
      grid-column-end: 5;

      span {
        position: absolute;
        z-index: 1;
        right: 45%;
        bottom: 10%;
        font-size: 30px;
      }
    }

    .photoX {
      grid-column-start: 1;

      span {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 5px;
        font-size: 30px;
      }

    }

    .phones-container {
      flex: 3;
    }
  }
}


@media (max-width: 1000px) {
  .photos {
    display: none !important;
  }
}
</style>