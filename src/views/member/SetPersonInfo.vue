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
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserProfileStore } from '@/stores/user'
import { useField, useForm } from 'vee-validate'
import CircleUserSvg from '@/components/icons/CircleUserSvg.vue'
import { getPreFilledInfo, putPreFilledInfo } from '@/apis/users/preFilledInfo'
import type {PreFilledInfo} from '@/apis/users/preFilledInfo'

const Router = useRouter()
const Route = useRoute()
const errorMessage = ref("")

const { handleSubmit, isSubmitting, errors } = useForm();
const { value: buyer } = useField(() => 'buyer');
const { value: email } = useField(() => 'email');
const { value: cellPhone } = useField(() => 'cellPhone');
const { value: address } = useField(() => 'address');
const GetValue = ref(true)
getPreFilledInfo().then(response=>{
    console.log(response)
    buyer.value = response.data.buyer
    email.value = response.data.email
    cellPhone.value = response.data.cellPhone
    address.value = response.data.address
    GetValue.value = true
})

const SetPreFilledInfo = handleSubmit(async (values) => { 
  const PreFilledInfoValue:PreFilledInfo = {
    buyer : values.buyer,
    email : values.email,
    cellPhone : values.cellPhone,
    address : values.address
  }
  await putPreFilledInfo(PreFilledInfoValue)
    .then(response => {
      alert(response.data.data)      
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
