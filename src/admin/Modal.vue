<script setup>
import { NButton, NModal, NCard, NSpin } from 'naive-ui'

defineProps({
  isVisible: Boolean,
  isLoading: Boolean,
  title: String
});

defineEmits(['close', 'submit']);
</script>

<template>
  <n-modal :show="isVisible" :mask-closable="false" class="modal-form">
    <n-spin :show="isLoading">
      <n-card style="width: 500px" :title="title" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <slot></slot>
        <template #footer>
          <div style="display: flex; justify-content: flex-end;">
            <n-button @click="$emit('close')" style="margin-right: 10px;">Close</n-button>
            <n-button type="primary" @click="$emit('submit')">Submit</n-button>
          </div>
        </template>
      </n-card>
    </n-spin>
  </n-modal>
</template>

<style></style>