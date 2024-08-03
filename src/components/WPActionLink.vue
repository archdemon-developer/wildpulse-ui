<template>
  <a
    :href="href"
    :class="['wp-action-link', { 'wp-action-link--disabled': disabled }]"
    @click.prevent="handleClick"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface WPActionLinkProps {
  href?: string
  disabled?: boolean
}

const props = defineProps<WPActionLinkProps>()
const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.wp-action-link {
  color: var(--secondary);
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s ease;
}

.wp-action-link:hover {
  text-decoration: underline;
}

.wp-action-link--disabled {
  color: var(--gray);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
