<template>
  <div v-if="visible" class="wp-alert" :class="`wp-alert--${type}`">
    <span class="wp-alert__message">{{ message }}</span>
    <button class="wp-alert__close" @click="closeAlert">×</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface WPAlertProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const props = defineProps<WPAlertProps>()

const visible = ref(true)

const closeAlert = () => {
  visible.value = false
}

if (props.duration) {
  setTimeout(closeAlert, props.duration)
}

watch(
  () => props.message,
  () => {
    visible.value = true
  }
)
</script>

<style scoped>
.wp-alert {
  padding: 1rem 1.5rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  font-size: 1rem;
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
</style>
