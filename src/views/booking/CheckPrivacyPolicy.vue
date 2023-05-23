<template>
  <div class="check-privacy">
    <input
      class="form-check-input"
      type="checkbox"
      id="checkPrivacy"
      :value="modelValue"
      @input="changeStatus(!modelValue)"
    />
    <label class="form-check-label" for="checkPrivacy">我已閱讀並同意購票規則與隱私權政策</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

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
</script>

<style lang="scss">
.check-privacy {
  margin-bottom: 2.5em;

  label {
    margin: 0 10px;
    color: white;
  }
}
</style>
