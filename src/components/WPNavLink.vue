<template>
  <RouterLink :to="props.to" :class="['wp-route', variantClass]">
    {{ props.name }}
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ColorVariant } from '@/shared/ts/types'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

interface NavLinkProps {
  to: RouteLocationRaw
  name: string
  variant?: ColorVariant
}

const props = withDefaults(defineProps<NavLinkProps>(), {
  variant: 'primary'
})

const variantClass = computed(() => `wp-route--${props.variant}`)
</script>

<style scoped>
.wp-route {
  padding: 0 10px;
  text-decoration: none;
  color: var(--black);
  font-size: 1.2rem;
  transition: color 0.3s;
}

.wp-route--primary:hover {
  color: var(--primary);
}

.wp-route--secondary:hover {
  color: var(--secondary);
}

.wp-route--danger:hover {
  color: var(--danger);
}

.wp-route--warning:hover {
  color: var(--warning);
}

.wp-route--green:hover {
  color: var(--green);
}

.wp-route--dark:hover {
  color: var(--dark);
}

.wp-route--light:hover {
  color: var(--light);
}
</style>
