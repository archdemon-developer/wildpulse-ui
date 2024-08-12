<template>
  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div v-if="visible" class="wp-alert" :class="`wp-alert--${type}`">
      <span class="wp-alert__message">{{ message }}</span>
      <button class="wp-alert__close" @click="closeAlert">×</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface WPAlertProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const props = defineProps<WPAlertProps>()

const visible = ref(false)

const closeAlert = () => {
  visible.value = false
}

const showAlert = () => {
  visible.value = true
}

if (props.duration) {
  setTimeout(closeAlert, props.duration)
}

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      showAlert()
    }
  }
)

onMounted(() => {
  if (props.message) {
    showAlert()
  }
})

// Transition hooks
const beforeEnter = (el: Element) => {
  ;(el as HTMLElement).style.opacity = '0'
}

const enter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.offsetHeight // trigger reflow
  element.style.transition = 'opacity 0.5s'
  element.style.opacity = '1'
  done()
}

const leave = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.style.transition = 'opacity 0.5s'
  element.style.opacity = '0'
  done()
}
</script>

<style scoped>
.wp-alert {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  font-size: 1rem;
  z-index: 1000; /* Ensure it's above other content */
}

.wp-alert__message {
  flex: 1;
}

.wp-alert__close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: inherit;
}

.wp-alert--success {
  background-color: #dff0d8;
  color: var(--primary);
}

.wp-alert--error {
  background-color: #f2dede;
  color: var(--danger);
}

.wp-alert--info {
  background-color: #d9edf7;
  color: var(--secondary);
}

.wp-alert--warning {
  background-color: #fcf8e3;
  color: var(--warning);
}

/* Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
