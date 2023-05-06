<template>
  <div
    ref="modalRef"
    class="modal fade"
    :data-bs-backdrop="backdropDisabled ? 'static' : true"
    :data-bs-keyboard="!backdropDisabled"
    @click.prevent="handleBackgroundClick"
  >
    <div
      class="modal-dialog modal-dialog-scrollable"
      :class="[{ 'modal-dialog-centered': isCentered === true }, size ? `modal-${size}` : '']"
    >
      <div class="modal-content">
        <div v-if="!hideHeader" class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="!hideFooter">
          <slot name="footer">
            <button type="button" class="btn btn-secondary" @click="close">關閉</button>
            <button type="button" class="btn btn-primary" @click="save">儲存</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: String,
  backdropDisabled: Boolean,
  isCentered: Boolean,
  size: {
    type: String,
    validator: (value: string) => ['sm', 'lg', 'xl'].includes(value)
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'save'): void
}>()

const modalRef = ref<HTMLElement | null>(null)
let modal: Modal
onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value)
  }
})

watch(
  () => props.modelValue,
  (modelValue) => {
    if (modelValue) {
      modal.show()
    } else {
      modal.hide()
    }
  }
)

function close() {
  emit('update:modelValue', false)
}

function save() {
  emit('save')
  close()
}

function handleBackgroundClick(event: MouseEvent | { target: HTMLElement | null }) {
  if (props.backdropDisabled) return
  if (event.target === modalRef.value) {
    close()
  }
}
</script>
