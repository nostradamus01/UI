<script setup>
import CartIcon from '@/components/icons/CartIcon.vue';
import ScaleIcon from '@/components/icons/ScaleIcon.vue';
import UserIcon from '@/components/icons/UserIcon.vue';
import MobileIcon from '@/components/icons/MobileIcon.vue';
import { NDropdown, NAutoComplete } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter();

const userOptions = ref([{
  label: 'Settings',
  key: 'settings'
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
  } else if (key === 'settings') {
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
    <div class="inner-header">
      <div class="logo-container" @click="() => { router.push('/') }">
        <MobileIcon></MobileIcon>
        <h1>MyMobile</h1>
      </div>
      <div class="search-container">
        <n-auto-complete class="search" v-model:value="searchValue" :options="searchOptions" clear-after-select
          placeholder="Search" />
      </div>
      <div class="toolbar">
        <ScaleIcon @click="() => { router.push('compare') }"></ScaleIcon>
        <CartIcon @click="() => { router.push('cart') }"></CartIcon>
        <n-dropdown :options="userOptions" trigger="click" @select="handleSelect">
          <UserIcon></UserIcon>
        </n-dropdown>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid #00000048;

  .inner-header {
    height: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    padding: 0 20px;

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

        &:hover {
          color: #2f2f2f
        }
      }
    }
  }
}
</style>