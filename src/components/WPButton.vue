<template>
  <button
    :class="[
      'wp-button',
      variantClass,
      sizeClass,
      { 'wp-button--block': block, 'wp-button--loading': loading }
    ]"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :aria-label="ariaLabel"
  >
    <template v-if="props.loading">
      <span class="wp-button__spinner"></span>
    </template>
    <Icon v-if="icon" :icon="icon" :class="['wp-button__icon']" />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ColorVariant } from '@/shared/ts/types'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

type ButtonSize = 'xs' | 'md' | 'lg'

type ButtonType = 'button' | 'reset' | 'submit'

interface ButtonProps {
  type: ButtonType
  disabled?: boolean
  loading?: boolean
  variant?: ColorVariant
  size?: ButtonSize
  icon?: string
  block?: boolean
  ariaLabel?: string
}

const props: ButtonProps = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  loading: false,
  variant: 'primary',
  size: 'md',
  icon: '',
  block: false,
  ariaLabel: ''
})

const variantClass = computed(() => `wp-button--${props.variant}`)
const sizeClass = computed(() => `wp-button--${props.size}`)
</script>

<style scoped>
.wp-button {
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.wp-button--primary {
  background-color: var(--primary);
}

.wp-button--secondary {
  background-color: var(--secondary);
}

.wp-button--danger {
  background-color: var(--danger);
}

.wp-button--warning {
  background-color: var(--warning);
}

.wp-button--green {
  background-color: var(--green);
}

.wp-button--dark {
  background-color: var(--black);
}

.wp-button--light {
  background-color: var(--white);
  color: var(--black);
}

.wp-button--primary:hover {
  background-color: var(--primary-dark);
}

.wp-button--danger:hover {
  background-color: var(--danger-dark);
}

.wp-button--green:hover {
  background-color: var(--green-dark);
}

.wp-button--secondary:hover {
  background-color: var(--secondary-dark);
}

.wp-button--warning:hover {
  background-color: var(--warning-dark);
}

.wp-button--dark:hover {
  background-color: var(--black-light);
}

.wp-button--light:hover {
  background-color: var(--white-dark);
}

.wp-button--xs {
  padding: 5px 10px;
  font-size: 0.8rem;
}

.wp-button--md {
  padding: 10px 20px;
  font-size: 1rem;
}

.wp-button--lg {
  padding: 15px 30px;
  font-size: 1.2rem;
}

.wp-button--block {
  display: block;
  width: 100%;
}

.wp-button--loading {
  cursor: wait;
}

.wp-button--light .wp-button__spinner {
  border-top: 2px solid var(--black);
}

.wp-button__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid var(--white);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

.wp-button__icon {
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
