<script setup>
import { ref, onMounted } from 'vue'
import { useMain } from '@/use/useMain';
import FilterIcon from '@/icons/FilterIcon.vue'
import Phones from '@/components/Phones.vue'
import Filters from '@/components/Filters.vue'
import { usePhonesStore } from '@/stores/phonesStore'

const phonesStore = usePhonesStore();
const { getFiltered } = useMain();

const isPhotosVisible = ref(true);

onMounted(async () => {
  await getFiltered();
})
</script>

<template>
  <div class="main-content">
    <div class="inner-main container">
      <div class="photos" v-if="isPhotosVisible">
        <div class="photoN photo" @click="() => { phonesStore.filters.brands.Nokia = true; isPhotosVisible = false; }">
          <span>NOKIA</span>
          <img src="/images/photoN.jpg">
        </div>
        <div class="photoS photo" @click="() => { phonesStore.filters.brands.Samsung = true; isPhotosVisible = false; }">
          <span>SAMSUNG</span>
          <img src="/images/photoS.jpg">
        </div>
        <div class="photoI photo" @click="() => { phonesStore.filters.brands.Apple = true; isPhotosVisible = false; }">
          <span>APPLE</span>
          <img src="/images/photoI.jpg">
        </div>
        <div class="photoX photo" @click="() => { phonesStore.filters.brands.Xiaomi = true; isPhotosVisible = false; }">
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
          <Phones></Phones>
        </div>
      </div>
      <!-- <div class="gallery">
        <div class="galleryItem">
          <img
            src="https://images.pexels.com/photos/14411132/pexels-photo-14411132.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="" class="galleryImg">
        </div>
        <div class="galleryItem">
          <img src="https://images.pexels.com/photos/11420185/pexels-photo-11420185.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="" class="galleryImg">
        </div>
        <div class="galleryItem">
          <img src="https://images.pexels.com/photos/2417848/pexels-photo-2417848.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="" class="galleryImg">
        </div>
      </div>
      <div class="features">
        <div class="feature">
          <img class="featureIcon" src="/images/shipping.png" alt="">
          <span class="featureTitle">FREE SHIPPING</span>
          <span class="featureDesc">Free worldwide shipping on all orders.</span>
        </div>
        <div class="feature">
          <img class="featureIcon" src="/images/return.png" alt="">
          <span class="featureTitle">30 DAYS RETURN</span>
          <span class="featureDesc">No question return and easy refund in 14 days.</span>
        </div>
        <div class="feature">
          <img class="featureIcon" src="/images/gift.png" alt="">
          <span class="featureTitle">GIFT CARDS</span>
          <span class="featureDesc">Buy gift cards and use coupon codes easily.</span>
        </div>
        <div class="feature">
          <img class="featureIcon" src="/images/contact.png" alt="">
          <span class="featureTitle">CONTACT US!</span>
          <span class="featureDesc">Keep in touch via email and support system.</span>
        </div>
      </div> -->
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

    .gallery {
      display: flex;
      background-color: #1a1a1a;
    }

    .galleryItem {
      flex: 1;
      padding: 50px;
    }

    .galleryImg {
      width: 100%;
    }

    .features {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .featureIcon {
      width: 50px;
      height: 50px;
    }

    .featureTitle {
      font-size: 20px;
      font-weight: 600;
      margin: 20px;
    }

    .featureDesc {
      color: gray;
    }

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
}</style>