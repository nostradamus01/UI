<script setup>
import { NCard, NTabs, NTabPane, NForm, NFormItemRow, NInput, NButton, NFormItem, useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import { reactive, ref } from "vue";

const router = useRouter();
const formRef = ref(null);
const message = useMessage();
const rules = ref({
  username: {
    required: true,
    message: "Please input your username",
    trigger: "blur"
  }, password: {
    required: true,
    message: "Please input your password",
    trigger: "blur"
  }
})

const formValue = reactive({
  username: "",
  password: ""
})

const handleValidateClick = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success("Valid");
    } else {
      console.log(errors);
      message.error("Invalid");
    }
  })
}

</script>

<template>
  <div class="login-container">
    <n-card class="login-card">
      <n-tabs class="card-tabs" default-value="signin" size="large" animated style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
        <n-tab-pane name="signin" tab="Sign in">
          <n-form :rules="rules" ref="formRef" :model="formValue">
            <n-form-item-row label="Username" path="username">
              <n-input v-model:value="formValue.username" />
            </n-form-item-row>
            <n-form-item-row label="Password" path="password">
              <n-input type="password" show-password-on="click" v-model:value="formValue.password"/>
            </n-form-item-row>
          </n-form>
          <n-form-item class="login">
            <n-button @click="handleValidateClick">
              Login
            </n-button>
          </n-form-item>
          <!-- <n-button type="primary" block secondary strong @click="() => {router.push('/')}">
                            Sign In
                          </n-button> -->
        </n-tab-pane>
        <n-tab-pane name="signup" tab="Sign up">
          <n-form>
            <n-form-item-row label="Username">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="Password">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="Reenter Password">
              <n-input />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="() => { router.push('/') }">
            Sign up
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
<style lang="scss">
.login-container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

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