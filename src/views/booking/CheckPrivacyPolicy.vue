<template>
  <div>
    <div class="check-privacy text-center">
      <input
        class="form-check-input"
        type="checkbox"
        id="checkPrivacy"
        :checked="modelValue"
        @input="changeStatus(!modelValue)"
      />
      <label class="form-check-label" for="checkPrivacy">
        我已閱讀並同意
        <span @click.prevent="openModal">購票規則</span>與
        <span @click.prevent="openModal">隱私權政策</span>
      </label>
    </div>
    <modal
      v-model="showPrivacyModal"
      :size="'xl'"
      :is-centered="true"
      :hide-header="true"
      :hide-footer="true"
      class="privacy-modal text-center"
    >
      <h3>隱私權與個人資料保護政策</h3>
      <section class="privacy-content">
        <ol>
          <template v-for="item in bookingPrivacy">
            <li class="main-title">{{ item.title }}</li>
            <ol class="sec-ol">
              <li v-for="childItem in item.content">
                {{ childItem }}
              </li>
            </ol>
          </template>
        </ol>
      </section>
      <button class="btn btn-black" @click="closeModal">我已閱讀，並同意以上相關資訊</button>
    </modal>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import Modal from '@/components/Modal.vue'
import bookingPrivacy from '@/demoData/bookingPrivacy'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

function changeStatus(status: boolean) {
  emits('update:modelValue', status)
}

// modal設定
const showPrivacyModal = ref<boolean>(false)
const openModal = () => {
  showPrivacyModal.value = true
}
const closeModal = () => {
  changeStatus(true)
  showPrivacyModal.value = false
}
</script>

<style lang="scss">
.check-privacy {
  margin-bottom: 2.5em;

  label {
    margin: 0 10px;
    color: white;

    span {
      text-decoration: underline;
      margin: 0 3px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.privacy-modal {
  h3 {
    color: var(--primary-color);
    padding: 0 1.25em;
    border: 1px solid var(--primary-color);
    border-top: none;
    border-bottom: none;
    width: fit-content;
    margin: auto;
  }

  .privacy-content {
    text-align: left;
    margin: 2.5em 0;
    .main-title {
      list-style: cjk-ideographic;
      font-weight: bold;
    }
    .sec-ol {
      margin: 8px 0 8px -3em;
    }
  }
}
</style>
