<template>
  <transition name="scale-fade">
    <div
      v-if="isVisible"
      :class="['wp-toast', toastPosition, toastType]"
      @mouseover="pauseTimer"
      @mouseleave="startTimer"
    >
      <div class="wp-toast__icon">
        <Icon :icon="toastIcon" />
      </div>
      <div class="wp-toast__content">
        <strong class="wp-toast__title">{{ title }}</strong>
        <p class="wp-toast__message">{{ message }}</p>
      </div>
      <button class="wp-toast__close" @click="closeToast">
        <Icon icon="mdi:close" />
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import type { Toast as ToastProps } from '@/shared/ts/types'

const props = defineProps<ToastProps>()
const emit = defineEmits(['close'])
const isVisible = ref(true)
let timer: ReturnType<typeof setTimeout>

const toastPosition = computed(() => 'wp-toast__' + (props.position ? props.position : 'top-right'))

const toastType = computed(() => 'wp-toast__' + (props.type ? props.type : 'info'))

const toastIcon = computed(() => {
  switch (props.type) {
    case 'success':
      return 'mdi:check-circle'
    case 'warning':
      return 'mdi:alert-circle'
    case 'danger':
      return 'mdi:dangerous'
    case 'info':
    default:
      return 'mdi:information'
  }
})

const startTimer = () => {
  timer = setTimeout(() => {
    closeToast()
  }, props.duration || 1500)
}

const pauseTimer = () => {
  clearTimeout(timer)
}

const closeToast = () => {
  isVisible.value = false
  emit('close')
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.wp-toast {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-radius: 6px;
  position: fixed;
  z-index: 9999;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  min-width: 250px;
  max-width: 400px;
}

.wp-toast__icon {
  font-size: 24px;
  margin-right: 15px;
}

.wp-toast__content {
  flex: 1;
}

.wp-toast__title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.wp-toast__message {
  font-size: 14px;
  margin: 0;
}

.wp-toast__close {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 18px;
  margin-left: 15px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.wp-toast__close:hover {
  opacity: 1;
}

.wp-toast__top-right {
  top: 20px;
  right: 20px;
}

.wp-toast__bottom-right {
  bottom: 20px;
  right: 20px;
}

.wp-toast__bottom-left {
  bottom: 20px;
  left: 20px;
}

.wp-toast__top-left {
  top: 20px;
  left: 20px;
}

.wp-toast__info {
  background-color: var(--secondary-light);
  color: var(--secondary-dark);
}

.wp-toast__warning {
  background-color: var(--warning-light);
  color: var(--warning-dark);
}

.wp-toast__success {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}

.wp-toast__danger {
  background-color: var(--danger-light);
  color: var(--danger-dark);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
