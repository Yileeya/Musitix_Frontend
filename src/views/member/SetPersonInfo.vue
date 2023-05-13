<template>
  <div class="container account-body">
    <form @submit="SetPreFilledInfo">
      <div class="" v-if="GetValue">
        <div class="mb-3 row">
          <label for="buyer" class="col-auto col-form-label">訂購人姓名:</label>
          <div class="col">
            <input type="text" class="form-control" name="buyer" v-model="buyer" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="cellPhone" class="col-auto col-form-label">手機電話:</label>
          <div class="col">
            <input type="text" class="form-control" name="cellPhone" v-model="cellPhone" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="email" class="col-auto col-form-label">信箱:</label>
          <div class="col">
            <input type="text" class="form-control" name="email" v-model="email" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="address" class="col-auto col-form-label">地址:</label>
          <div class="col">
            <input type="text" class="form-control" name="address" v-model="address" />
          </div>
        </div>
        <p v-if="errorMessage != ''" class="text-danger text-center">{{ errorMessage }}</p>
        <div class="row mt-4">
          <div class="col-12 text-center">
            <button type="submit" class="btn save-btn" :disabled="isSubmitting">儲存</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { getPreFilledInfo, putPreFilledInfo } from '@/apis/users/preFilledInfo'
import type { PreFilledInfo } from '@/apis/users/preFilledInfo'
import { useToast } from 'vue-toastification'

const Toast = useToast()
const errorMessage = ref("")
const simpleSchema = {
  email(value: string) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (value && !regex.test(value)) {
      return '信箱格式錯誤';
    }
    return true
  }
};
const { handleSubmit, isSubmitting, errors } = useForm(
  { validationSchema: simpleSchema }
);
const { value: buyer } = useField(() => 'buyer');
const { errorMessage: emailErrorMessage, value: email } = useField(() => 'email',);
const { value: cellPhone } = useField(() => 'cellPhone');
const { value: address } = useField(() => 'address');
const GetValue = ref(false)

watch(() => emailErrorMessage.value, () => {
  errorMessage.value = emailErrorMessage.value ?? ""

})

getPreFilledInfo().then(response => {
  const data = response.data.data
  buyer.value = data.buyer
  email.value = data.email
  cellPhone.value = data.cellPhone
  address.value = data.address
  GetValue.value = true
})

const SetPreFilledInfo = handleSubmit(async (values) => {
  const PreFilledInfoValue: PreFilledInfo = {
    buyer: values.buyer,
    email: values.email,
    cellPhone: values.cellPhone,
    address: values.address
  }
  await putPreFilledInfo(PreFilledInfoValue)
    .then(response => {
      Toast.success("預填資料儲存成功");
    })
    .catch(error => {
      errorMessage.value = error.response.data.message
    })
});




</script>
<style scoped lang="scss">
.account-body {
  padding: 40px;
  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 48px;
  margin-bottom: 20px;
}

.save-btn {
  color: #FFFFFF;
  background-color: var(--primary-color);
  padding: 8px 68px;

  &:hover {
    color: black;
    background-color: var(--warning-color);

  }

}

.col-form-label {
  min-width: 110px;
}
</style >
