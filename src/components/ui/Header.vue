<script setup>
import CartIcon from '@/icons/CartIcon.vue';
import ScaleIcon from '@/icons/ScaleIcon.vue';
import UserIcon from '@/icons/UserIcon.vue';
import MobileIcon from '@/icons/MobileIcon.vue';
import { NDropdown, NAutoComplete, NBadge } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router'
import { usePhonesStore } from '@/stores/phonesStore'
import { ref, watch, computed } from 'vue'

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
    router.push('login')
  } else if (key === 'profile') {
    router.push('user')
  } else if (key === 'admin') {
    router.push('admin')
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
const itemsInCart = computed(() => {
  console.log(phonesStore.cart.length)
  return phonesStore.cart.length
})
const itemsInCompare = computed(() => {
  return phonesStore.compare.length
})

watch(searchValue, (newValue, oldValue) => {
  searchOptions.value = [];
  optionsArr.forEach(option => {
    if (option.label.toLowerCase().includes(newValue.toLowerCase())) {
      searchOptions.value.push(option);
    }
  })
})
</script>

<template>
  <header class="header">
    <div class="inner-header container">
      <div class="logo-container" @click="() => { router.push('/') }">
        <MobileIcon></MobileIcon>
      </div>
      <div class="search-container">
        <n-auto-complete class="search" v-model:value="searchValue" :options="searchOptions" clear-after-select
          placeholder="Search" />
      </div>
      <div class="toolbar">
        <n-badge :value="itemsInCompare">
          <ScaleIcon @click="() => { router.push('compare') }"></ScaleIcon>
        </n-badge>
        <n-badge :value="itemsInCart">
          <CartIcon @click="() => { router.push('cart') }"></CartIcon>
        </n-badge>
        <n-dropdown :options="userOptions" trigger="click" @select="handleSelect">
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