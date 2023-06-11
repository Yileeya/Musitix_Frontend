<template>
  <div class="bg">
    <div class="container question-container">
      <div class="row">
        <div class="col-12">
          <h2>問題箱</h2>
          <form @submit="QuestionSubmit">            
            <div class="container">
              <div class="row">                
                <div class="col-12 col-lg">
                  <div class="mb-3 row">
                    <label for="email" class="col-auto col-form-label">問題類型:</label>
                    <div class="col">
                      <select name="type" class="form-select"  v-model="type">                        
                        <option value="1" selected>訂票</option>
                        <option value="2">付款</option>
                        <option value="3">票務</option>
                        <option value="4">退款</option>
                        <option value="5">其他</option>
                      </select>                      
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="subject" class="col-auto col-form-label">標題:</label>
                    <div class="col">
                      <input type="text" class="form-control" name="subject" v-model="subject" />
                      <p v-if="errors.subject" class="text-danger mb-0">{{ errors.subject }}</p>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="name" class="col-auto col-form-label">姓名:</label>
                    <div class="col">
                      <input type="text" class="form-control" name="name" v-model="name" />
                      <p v-if="errors.name" class="text-danger mb-0">{{ errors.name }}</p>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="email" class="col-auto col-form-label">電子信箱:</label>
                    <div class="col">
                      <input type="text" class="form-control" name="email" v-model="email" />
                      <p v-if="errors.email" class="text-danger mb-0">{{ errors.email }}</p>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="content" class="col-auto col-form-label">問題內容:</label>
                    <div class="col">
                      <textarea  class="form-control" name="content" v-model="content"></textarea>
                      <p v-if="errors.content" class="text-danger mb-0 ">{{ errors.content }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <p v-if="errorMessage != ''" class="text-danger ">{{ errorMessage }}</p>
                  
                  <div class="row mt-4">
                    <div class="col-12 text-center">
                      <button type="submit" class="btn save-btn" :disabled="isSubmitting">送出問題</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import newsMessage from '@/demoData/home/newsMessage'
import router from '@/router'
import { dateFormatUTC } from '@/utils/dateFormat'
import { getNews } from '@/apis/news/news'
import { useField, useForm } from 'vee-validate'
import { patchProfiles } from '@/apis/users/profile'
import { postQuestions, type QuestionsModel } from '@/apis/question/question'
import { useToast } from 'vue-toastification'

const Router = useRouter()
const Route = useRoute()
const Toast = useToast()
const simpleSchema = {
  email(value: string) {
    if (!value) {
      return '信箱不可為空';
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (value && !regex.test(value)) {
      return '信箱格式錯誤';
    }
   
    return true
  },
  subject(value:string){
    if (!value) {
      return '標題不可為空';
    }
    return true
  },
  name(value:string){
    if (!value) {
      return '姓名不可為空';
    }
    return true
  },
  content(value:string){
    if (!value) {
      return '內容不可為空';
    }
    return true
  },
};
const { handleSubmit, isSubmitting, errors } = useForm(
  { validationSchema: simpleSchema }
  );
const { value: type } = useField(() => 'type');
type.value = 1
const { value: subject } = useField(() => 'subject');
const { value: name } = useField(() => 'name');
const { value: email } = useField(() => 'email');
const { value: content } = useField(() => 'content');
const errorMessage = ref("")
const QuestionSubmit = handleSubmit(async (values) => {
  const Questions:QuestionsModel = {
    type:values.type,
    subject:values.subject,
    name:values.name,
    email:values.email,
    content:values.content   
  }
  await postQuestions(Questions)
    .then(response => {
      Toast.success("問題送出成功");   
      location.reload()   
    })
    .catch(error => {
      errorMessage.value = error.response.data.message
    })
});
</script>
<style scoped lang="scss">
.bg {
  min-height: inherit;
  background-image: url('../../assets/img/bg_lg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 40%;
  padding: 46px;
}

.question-container {
  padding: 32px 16px;
  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 48px;

  h2 {
    color: var(--primary-color);
    font-weight: bold;
    margin-bottom: 24px;
    @media (max-width: 992px) {
      text-align: center;
    }
  }
}
.col-form-label{
  min-width: 100px;
}
.form-select{
  width: 100px;
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
</style >
