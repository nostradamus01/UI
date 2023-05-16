<script setup>
import { NButton, NModal, NCard, NInputNumber, NInput, NForm, NDatePicker, NSpin, NFormItemRow } from 'naive-ui'
import { reactive, ref } from "vue";

const validateCardNumber = (rule, value) => {
  const text = value + ''
  return text.length === 16;
}
const validateDate = (rule, value) => {
  const time = new Date();
  return value > time;
}
const validateCvc = (rule, value) => {
  const text = value + ''
  return text.length === 3;
}
const rules = ref({
  card: {
    required: true,
    message: "Card number must contain 16 characters",
    trigger: ["blur", "input"],
    validator: validateCardNumber
  },
  name: {
    required: true,
    message: "Please input Card Holder",
    trigger: ["blur", "input"],
  },
  date: {
    required: true,
    message: "Card must not be expired",
    trigger: ["blur", "input"],
    validator: validateDate
  },
  cvc: {
    required: true,
    message: "CVC must contain 3 characters",
    trigger: ["blur", "input"],
    validator: validateCvc
  }
})

const formValue = reactive({
  card: null,
  name: null,
  date: null,
  cvc: null
})

const formRef = ref(null);


const validate = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      emits('buy')
    }
  })

}

const emits = defineEmits(['close', 'buy']);
defineProps({
  isLoading: Boolean
});


</script>

<template>
  <n-modal class="modal">
    <n-spin :show="isLoading">
      <n-card class="card" title="Modal" :bordered="false" size="huge" role="dialog" aria-modal="true"
        style="width: 600px; ">
        <n-form class="form" :rules="rules" ref="formRef" :model="formValue">
          <n-form-item-row class="form-item" label="Card Number" path="card">
            <n-input-number class="item" v-model:value="formValue.card" :show-button="false" placeholder="Card Number" />
          </n-form-item-row>
          <n-form-item-row class="form-item" label="Card Holder" path="name">
            <n-input type="text" v-model:value="formValue.name" placeholder="Firstname and Lastname" />
          </n-form-item-row>
          <div class="input">
            <n-form-item-row class="form-item" label="Date" path="date">
              <n-date-picker v-model:value="formValue.date" type="month" clearable />
            </n-form-item-row>
            <n-form-item-row class="form-item" label="CVC" path="cvc">
              <n-input v-model:value="formValue.cvc" class="cvc" type="password" placeholder="CVC" />
            </n-form-item-row>
          </div>
          <div class="buy">
            <n-button size="large" @click="$emit('close')">
              Close
            </n-button>
            <n-button type="primary" :disabled="isDisabled" size="large" @click="validate">
              Pay
            </n-button>
          </div>
        </n-form>

      </n-card>
    </n-spin>
  </n-modal>
</template>

<style lang="scss"> .form {
   display: flex;
   flex-direction: column;
   gap: 10px;
   height: 400px;

   .input {
     display: flex;
     gap: 10px;
   }

   .cvc {
     width: 100px;
   }

   .buy {
     position: absolute;
     display: flex;
     gap: 10px;
     right: 0;
     bottom: 0;
   }

   .item {
     width: 100%;
   }
 }
</style>