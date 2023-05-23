<template>
  <section class="subscriber-info">
    <div class="title">
      <h4>訂購人資料</h4>
      <div class="check-group">
        <input
          class="form-check-input"
          type="checkbox"
          id="autoFilledData"
          v-model="autoFilledDataCheckBox"
        />
        <label class="form-check-label" for="autoFilledData"><span>帶入預填資料</span></label>
      </div>
    </div>
    <div class="input-area">
      <Form :validation-schema="schema" ref="preFilledInfoForm">
        <div
          v-for="(keyName, index) in Object.keys(filledInfoForm)"
          :key="keyName"
          class="form-control-group"
          :class="[{ 'width-half': index < 2 }]"
        >
          <div class="label-name">
            {{ correspondPreFilledInfo[keyName as keyof ExtendedPreFilledInfo] }}
          </div>
          <textarea
            v-if="keyName === 'remark'"
            v-model="filledInfoForm.remark"
            class="form-control"
            rows="2"
          />
          <validate-text-input
            v-else
            class="text-input"
            :value="filledInfoForm[keyName as keyof PreFilledInfo]"
            :name="keyName"
            type="text"
            :placeholder="`請填寫${correspondPreFilledInfo[keyName as keyof PreFilledInfo]}`"
            @input="changeValue($event.target.value, keyName as keyof PreFilledInfo)"
          />
        </div>
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import * as Yup from 'yup'
import { Form } from 'vee-validate'
import ValidateTextInput from '@/components/ValidateTextInput.vue'
import type { PreFilledInfo } from '@/apis/users/preFilledInfo'

//擴展 PreFilledInfo
type ExtendedPreFilledInfo = PreFilledInfo & {
  remark: string
}
const props = defineProps<{
  propsPreFilledInfo: PreFilledInfo
}>()

//欄位對應名稱
const correspondPreFilledInfo = {
  email: '聯絡信箱',
  buyer: '訂購人姓名',
  cellPhone: '手機電話',
  address: '聯絡地址',
  remark: '備註'
}

// 設定ref
const preFilledInfoForm: Ref<any> = ref(null)

// 設定基本資料
const autoFilledDataCheckBox = ref<boolean>(false)
const filledInfoForm = ref<ExtendedPreFilledInfo>({
  ...props.propsPreFilledInfo,
  ...{ remark: '' }
})

// 設定防呆規則
const requiredRule = Yup.string().required('必填')
const schema = Yup.object().shape({
  email: Yup.string().email('請填寫信箱格式').required('必填'),
  buyer: requiredRule,
  cellPhone: requiredRule,
  address: requiredRule
})

// 防呆驗證
const validate = async () => {
  let result = await preFilledInfoForm.value?.validate()
  return result.valid
}

// 數據變更
const changeValue = (value: string, keyName: keyof ExtendedPreFilledInfo) => {
  filledInfoForm.value[keyName] = value
}
// 帶入預填資料
const autoFilledInfoData = async () => {
  filledInfoForm.value = {
    ...props.propsPreFilledInfo,
    ...{
      remark: ''
    }
  }
  //向驗證模組更新資料
  for (const keyName of Object.keys(props.propsPreFilledInfo)) {
    await preFilledInfoForm.value?.setFieldValue(
      keyName as keyof PreFilledInfo,
      filledInfoForm.value[keyName as keyof PreFilledInfo]
    )
  }
}
// 清空資料
const clearInfoData = async () => {
  for (const keyName of Object.keys(filledInfoForm.value)) {
    changeValue('', keyName as keyof ExtendedPreFilledInfo)
    await preFilledInfoForm.value?.setFieldValue(keyName as keyof PreFilledInfo, '')
  }
}
// 清空錯誤訊息
const clearErrorMsg = async () => {
  for (const keyName of Object.keys(props.propsPreFilledInfo)) {
    await preFilledInfoForm.value?.setFieldError(keyName, '')
  }
}

// 帶入預填資料的checkbox
watch(
  () => autoFilledDataCheckBox.value,
  async (value) => {
    //帶入預填資料
    if (value) await autoFilledInfoData()
    else await clearInfoData()
    //欄位清空
    await clearErrorMsg()
  }
)

autoFilledDataCheckBox.value = true

//匯出function
defineExpose({
  validate
})
</script>

<style scoped lang="scss">
.subscriber-info {
  .title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    h4 {
      padding: 0 1em;
      color: var(--primary-color);
      border: 1px solid;
      border-bottom: none;
      border-top: none;
    }

    .check-group {
      display: inline-flex;
      align-items: center;

      .form-check-input {
        margin: 2px 10px 0;
      }
    }
  }

  .input-area {
    .width-half {
      &:nth-child(1) {
        padding-right: 12px;
      }

      &:nth-child(2) {
        padding-left: 12px;
      }
    }

    .form-control-group {
      margin: 1.5em 0;

      &.width-half {
        width: 50%;
        display: inline-flex;
        margin-bottom: 0;
        flex-direction: column;
      }

      .form-control:focus {
        border-color: var(--primary-color);
      }

      .label-name {
        margin-bottom: 5px;
      }
    }
  }

  @media (max-width: 992px) {
    .title {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      text-align: center;

      .check-group {
        justify-content: center;
      }
    }
    .input-area {
      .width-half {
        width: 100% !important;
        padding: 0 !important;
      }
    }
    .check-group {
      position: relative;
      width: 32px;
      height: 16px;
      margin: 20px auto 0 calc(50% - 5em);

      input {
        display: none;
      }

      input:checked + label {
        background-color: black;
      }

      label {
        display: block;
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: background-color 0.2s;
        border-radius: 34px;

        background-color: white;
        border: 1px solid black;

        span {
          display: none;
        }

        &:before {
          position: absolute;
          content: '';
          height: 12px;
          width: 12px;
          left: 2px;
          bottom: 1px;
          background-color: white;
          transition: transform 0.2s;
          border-radius: 50%;
        }
      }

      input:checked + label:before {
        transform: translateX(16px);
      }

      input:not(:checked) + label:before {
        background-color: #6c757d;
      }

      label:after {
        content: '帶入預填資料';
        position: absolute;
        left: 45px;
        top: -6px;
        width: 6em;
      }
    }
  }
}
</style>
