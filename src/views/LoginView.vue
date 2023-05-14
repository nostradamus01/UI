<script setup>
import { NCard, NTabs, NTabPane, NForm, NFormItemRow, NInput, NButton, NFormItem, useMessage, NSelect } from 'naive-ui';
import { useRouter } from 'vue-router';
import MyIcon from '@/icons/MyIcon.vue';

import { reactive, ref, computed, toRaw } from "vue";
import { useUsers } from '@/use/useUsers';
import { useDBStore } from '@/stores/dbStore'

const { loadCountries, register, login } = useUsers();
const dbStore = useDBStore();
loadCountries();

const router = useRouter();
const formRef = ref(null);
const registerFormRef = ref(null);
const message = useMessage();

const validatePasswordStartWith = (rule, value) => {
  return !!signUpFormValue.password && signUpFormValue.password.startsWith(value) && signUpFormValue.password.length >= value.length;
}
const validatePasswordSame = (rule, value) => {
  return value === signUpFormValue.password;
}

const rules = ref({
  username: {
    required: true,
    message: "Please input your username",
    trigger: "blur"
  },
  password: [
    {
      required: true,
      message: "Password is required"
    }
  ],
  password1: [
    {
      required: true,
      message: "Re-entered password is required",
      trigger: ["input", "blur"]
    },
    {
      validator: validatePasswordStartWith,
      message: "Password is not same as re-entered password!",
      trigger: "input"
    },
    {
      validator: validatePasswordSame,
      message: "Password is not same as re-entered password!",
      trigger: ["blur", "password-input"]
    }
  ],
  firstname: {
    required: true,
    message: "Please input your First Name",
    trigger: "blur"
  },
  lastname: {
    required: true,
    message: "Please input your Last Name",
    trigger: "blur"
  }
});



const countries = computed(() => {
  const arr = []
  dbStore.countries.forEach(country => {
    arr.push({
      label: country.name,
      value: country.id
    });
  });
  return arr;
});

const cities = ref([]);

const isCitiesDisabled = ref(true);
const countrySelectFn = (value) => {
  signUpFormValue.city = null;
  cities.value = [];
  isCitiesDisabled.value = false
  const arr = []
  dbStore.cities.forEach(city => {
    if (city.countryId === value) {
      arr.push({
        label: city.name,
        value: city.id
      })
    }
  })
  cities.value = arr;
}

const formValue = reactive({
  username: null,
  password: null
})

const signUpFormValue = reactive({
  firstname: null,
  lastname: null,
  username: null,
  password: null,
  password1: null,
  postcode: null,
  country: null,
  city: null
})

const handleLogin = (e) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = toRaw(formValue);
      const loginResult = await login(data);
      if (loginResult) {
        router.push({ name: 'home' });
      }
      else {
        message.error("Wrong username or password");
      }
    } else {
      message.error('Something wrong');
    }
  })
}

const handleRegistration = (e) => {
  e.preventDefault();
  registerFormRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = toRaw(signUpFormValue);
      await register(data)
      router.push({ name: 'home' });
    } else {
      message.error("Something wrong");
    }
  })
}

</script>

<template>
  <div class="user-icon">
    <MyIcon class="my-icon" @click="() => { router.push({ name: 'home' }) }"></MyIcon>
  </div>
  <div class="login-container">
    <n-card class="login-card">
      <n-tabs class="card-tabs" default-value="signin" size="large" animated style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
        <n-tab-pane name="signin" tab="Sign in">
          <n-form :rules="rules" ref="formRef" :model="formValue">
            <n-form-item-row label="Username" path="username">
              <n-input v-model:value="formValue.username" placeholder="" />
            </n-form-item-row>
            <n-form-item-row label="Password" path="password">
              <n-input type="password" show-password-on="click" v-model:value="formValue.password" placeholder="" />
            </n-form-item-row>
          </n-form>
          <n-form-item class="login">
            <n-button @click="handleLogin">
              Login
            </n-button>
          </n-form-item>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="Sign up">
          <n-form :rules="rules" ref="registerFormRef" :model="signUpFormValue">
            <n-form-item-row label="First Name" path="firstname">
              <n-input v-model:value="signUpFormValue.firstname" placeholder="" />
            </n-form-item-row>
            <n-form-item-row label="Last Name" path="lastname">
              <n-input v-model:value="signUpFormValue.lastname" placeholder="" />
            </n-form-item-row>
            <n-form-item-row label="Username" path="username">
              <n-input v-model:value="signUpFormValue.username" placeholder="" />
            </n-form-item-row>
            <n-form-item-row label="Password" path="password">
              <n-input type="password" show-password-on="click" v-model:value="signUpFormValue.password" placeholder="" />
            </n-form-item-row>
            <n-form-item-row label="Reenter Password" path="password1">
              <n-input type="password" show-password-on="click" v-model:value="signUpFormValue.password1"
                placeholder="" />
            </n-form-item-row>
            <n-form-item-row label="Country" path="country">
              <n-select v-model:value="signUpFormValue.country" :options="countries" @update:value="countrySelectFn"
                placeholder="" />
            </n-form-item-row>
            <n-form-item-row label="City" path="city">
              <n-select v-model:value="signUpFormValue.city" :disabled="isCitiesDisabled" :options="cities"
                placeholder="" />
            </n-form-item-row>
            <n-form-item-row label="Post Code" path="postcode">
              <n-input v-model:value="signUpFormValue.postcode" placeholder="" />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="handleRegistration">
            Sign up
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
<style lang="scss">
.user-icon{
  display: flex;
  justify-content: center;

  .my-icon{
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 10px;
}
}

.login-container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;

  .login-card {
    max-width: 400px;
  }
}

.login {
  display: flex;
  justify-content: center;
}

.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}

.n-tabs-bar {
  display: none;
}
</style>