<script setup>
import { ref } from 'vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import Phones from '@/components/Phones.vue'
import Filters from '@/components/Filters.vue'

const isLoading = ref(false);
</script>

<template>
  <div class="main-content">
    <div class="inner-main container">
      <div class="photos">
        <div class="photoN photo">
          <span>NOKIA</span>
          <img src="/images/photoN.jpg">
        </div>
        <div class="photoS photo">
          <span>SAMSUNG</span>
          <img src="/images/photoS.jpg">
        </div>
        <div class="photoI photo">
          <span>iPHONE</span>
          <img src="/images/photoI.jpg">
        </div>
        <div class="photoX photo">
          <span>XIAOMI</span>
          <img src="/images/photoX.jpg">
        </div>
      </div>
      <div class="fil-phone">
        <div class="filters-container">
          <div class="container-name">
            <h1>Filters</h1>
            <FilterIcon></FilterIcon>
          </div>
          <Filters></Filters>
        </div>
        <div class="phones-container">
          <div class="container-name">
            <h1>Smartphones</h1>
          </div>
          <Phones :isLoading="isLoading"></Phones>
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

    .fil-phone{
      display: flex;
    }
    .filters-container {
      flex: 1;
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
      img{
        transition: 700ms linear;
      }
      &:hover{
        img{
          transform:scale(1.2);
        }
      }


    }      
    .photoN{
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