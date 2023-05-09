<script setup>
import { NCard, NTabs, NTabPane, NForm, NFormItemRow, NInput, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="login-container">
    <n-card class="login-card">
      <n-tabs class="card-tabs" default-value="signin" size="large" animated style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
        <n-tab-pane name="signin" tab="Sign in">
          <n-form>
            <n-form-item-row label="Username">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="Password">
              <n-input />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="() => {router.push('/')}">
            Sign In
          </n-button>
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
          <n-button type="primary" block secondary strong @click="() => {router.push('/')}">
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

.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>