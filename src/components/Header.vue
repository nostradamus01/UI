<script setup>
import CartIcon from '@/icons/CartIcon.vue';
import ScaleIcon from '@/icons/ScaleIcon.vue';
import UserIcon from '@/icons/UserIcon.vue';
import MyIcon from '@/icons/MyIcon.vue';
import MobileIcon from '@/icons/MobileIcon.vue';
import { NDropdown, NAutoComplete, NBadge } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router'
import { usePhonesStore } from '@/stores/phonesStore'
import { ref, watch, reactive, toRaw } from 'vue'

const router = useRouter();

const phonesStore = usePhonesStore();

const userOptions = ref([{
  label: 'Profile',
  key: 'profile'
}, {
  label: 'Admin Panel',
  key: 'admin'
}, {
  label: 'Logout',
  key: 'logout'
}]);

const handleSelect = (key) => {
  if (key === 'logout') {
    router.push({ name: 'login' })
  } else if (key === 'profile') {
    router.push({ name: 'user' })
  } else if (key === 'admin') {
    router.push({ name: 'admin' })
  }
}

const optionsArr = [{
  label: 'Apple iPhone 14 Pro Max',
  value: 'id01'
}, {
  label: 'Samsung Galaxy S23 Ultra',
  value: 'id02'
}];

const searchOptions = ref([]);
const searchValue = ref('');
const searchInput = ref(null);
let query = '';

const onDblClick = () => {
  location.reload();
}

const onKeyDown = async (e) => {
  if (e.key === 'Enter') {
    searchValue.value = query;
    router.push({ name: 'searchResult', params: { query: query } });
  }
}

watch(searchValue, (newValue, oldValue) => {
  searchOptions.value = [];
  if (newValue !== null && newValue.trim() !== '') {
    query = newValue;
    optionsArr.forEach(option => {
      if (option.label.toLowerCase().includes(newValue.toLowerCase())) {
        searchOptions.value.push(option);
      }
    })
  }
})
</script>

<template>
  <header class="header">
    <div class="inner-header container">
      <div class="logo-container" @click="() => { router.push({ name: 'home' }) }" @dblclick="onDblClick">
        <MyIcon class="myicon"></MyIcon>
        <MobileIcon class="mobileicon"></MobileIcon>
      </div>
      <div class="search-container">
        <n-auto-complete class="search" ref="searchInput" v-model:value="searchValue" :options="searchOptions"
          placeholder="Search" @keydown="onKeyDown" />
      </div>
      <div class="toolbar">
        <n-badge :value="phonesStore.compareSize">
          <ScaleIcon @click="() => { router.push({ name: 'compare' }) }"></ScaleIcon>
        </n-badge>
        <n-badge :value="phonesStore.cartSize">
          <CartIcon @click="() => { router.push({ name: 'cart' }) }"></CartIcon>
        </n-badge>
        <n-dropdown class="user-icon" :options="userOptions" trigger="click" @select="handleSelect">
          <UserIcon></UserIcon>
        </n-dropdown>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  background-color: #fff;
  display: flex;
  justify-content: center;
  height: 60px;

  .inner-header {
    height: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;

    .logo-container {
      height: 100%;
      padding: 12px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;

      svg {
        height: 100%;
      }

      .myicon {
        height: 55px;
      }

      .mobileicon {
        margin: -7px;
        height: 80%;
      }

    }

    .search-container {
      max-width: 600px;
      width: 100%;
    }

    .toolbar {
      display: flex;
      gap: 60px;
      height: 100%;
      padding: 16px 0;

      .user-icon {
        outline: none;
      }

      svg {
        cursor: pointer;
        color: #000;

        &:hover {
          color: #2f2f2f
        }
      }
    }
  }
}
</style>