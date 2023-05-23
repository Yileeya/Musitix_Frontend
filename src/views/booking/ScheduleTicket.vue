<template>
  <section>
    <div class="flex-table">
      <div class="flex-thead">
        <div class="flex-tr">
          <div class="flex-th" v-for="thIndex in 2" :key="'th' + thIndex">
            {{ thIndex === 1 ? '票種' : '價格' }}
          </div>
          <div class="flex-th">數量</div>
        </div>
      </div>
      <div class="flex-tbody" v-if="tickets.length">
        <Form :validation-schema="schema" ref="ticketForm">
          <div class="flex-tr" v-for="(item, index) in tickets" :key="item._id">
            <div
              class="flex-td"
              v-for="tdIndex in 2"
              :key="'td' + tdIndex"
              :class="[{ 'td-price': tdIndex === 2 }]"
            >
              <span v-if="tdIndex === 2">$ </span>
              {{ item[tdIndex === 1 ? 'categoryName' : 'price'] }}
            </div>
            <div class="flex-td">
              <div class="validate-text-input">
                <i
                  class="fa fa-minus"
                  @click="changeTicketNumberValue(item.buyNumber - 1, index)"
                />
                <validate-text-input
                  class="text-input"
                  :value="item.buyNumber"
                  :name="`number${item._id}`"
                  type="number"
                  @input="changeTicketNumberValue($event.target.value, index)"
                />
                <i class="fa fa-plus" @click="changeTicketNumberValue(item.buyNumber + 1, index)" />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
    <div class="total-number">
      <h4 class="total-text">總金額</h4>
      <h4 class="number">
        {{ totalPrice }}
      </h4>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import _ from 'lodash'
import * as Yup from 'yup'
import { Form } from 'vee-validate'
import ValidateTextInput from '@/components/ValidateTextInput.vue'
import type { TicketCategory } from '@/types/activity/ticketCategory'

const props = defineProps<{
  propsTickets: TicketCategory[]
}>()

// 設定ref
const ticketForm: Ref<any> = ref(null)

// 重組資料格式
const tickets = ref<TicketCategory[]>([])
tickets.value = _.map(props.propsTickets, (ticket) => {
  ticket.buyNumber = 0
  return ticket
})

// 設定防呆規則
const validateRule = Yup.number()
  .transform((value, originalValue) => {
    const trimmedValue = String(originalValue).trim()
    if (trimmedValue === '') return null
    return Number(trimmedValue)
  })
  .nullable()
  .integer('請輸入整數')
  .min(0, '最小值為0')
  .max(4, '最大值為4')
  .required('必填')

const validateSchemaItems: { [key: string]: any } = {}
_.forEach(tickets.value, (ticket) => {
  validateSchemaItems[`number${ticket._id}`] = validateRule
})
const schema = Yup.object().shape(validateSchemaItems)

// 防呆驗證
const validate = async () => {
  let result = await ticketForm.value?.validate()
  return result.valid
}

//票數變更邏輯處理
const changeTicketNumberValue = async (number: number, ticketsIndex: number) => {
  let resultNumber = number
  //0-4之間
  if (number < 0) resultNumber = 0
  else if (number > 4) resultNumber = 4

  tickets.value[ticketsIndex].buyNumber = Number(resultNumber)
  await ticketForm.value?.setFieldValue(
    `number${tickets.value[ticketsIndex]._id}`,
    Number(resultNumber)
  )
  await countTotalPrice()
}

//計算總價
const totalPrice = ref<number>(0)
const countTotalPrice = async () => {
  //檢測防呆有無通過
  let isPass = await validate()
  if (!isPass) return

  let sum = 0
  _.forEach(tickets.value, (ticket) => {
    sum += ticket.price * ticket.buyNumber
  })
  totalPrice.value = sum
}

//匯出function
defineExpose({
  validate
})
</script>

<style scoped lang="scss">
.flex-table {
  margin-top: 3em;

  .flex-tbody {
    .flex-tr {
      border-bottom: 1px solid var(--gray);
      padding: 20px 30px;

      .td-price {
        color: var(--primary-color);
      }

      .validate-text-input {
        display: inline-flex;
        align-items: baseline;

        .fa {
          color: #6a6a6a;

          &:hover {
            cursor: pointer;
          }
        }

        .text-input {
          width: 85px;
          margin: 0 1.25em;

          &:deep(input) {
            text-align: center;
          }
        }
      }
    }
  }
}

.total-number {
  color: var(--primary-color);
  display: flex;
  justify-content: flex-end;
  gap: 80px;
  margin: 3em 0 1em;

  .total-text:after {
    content: 'NTD $';
    padding: 0 1em;
  }
}

@media (max-width: 992px) {
  .flex-table {
    margin: 0;
    padding: 0;

    .flex-tbody {
      .flex-tr {
        padding: 15px 0;

        .flex-td {
          position: relative;
          width: 100%;
          margin-bottom: 0.5em;

          &:before {
            width: 100%;
            text-align: center;
            color: var(--primary-color);
            margin: 1em 0;
            border: 2px solid;
            border-bottom: none;
            border-top: none;
            font-size: 16px;
          }
        }

        .flex-td:nth-child(1):before {
          content: '票種';
        }

        .flex-td:nth-child(2) {
          span {
            display: contents;
          }

          &:before {
            content: '價格';
          }
        }
      }
    }
  }
  .total-number {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 2em 0 0;

    .total-text:after {
      display: none;
    }

    .number:before {
      content: 'NTD $';
      padding-right: 1em;
      margin-left: -3em;
    }
  }
}
</style>
