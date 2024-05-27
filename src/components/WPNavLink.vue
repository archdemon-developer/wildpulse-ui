<template>
  <RouterLink :to="props.to" class="wp-route">{{ props.name }}</RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

interface NavLinkProps {
  to: RouteLocationRaw
  name: string
}

const props = defineProps<NavLinkProps>()
</script>

<style scoped>
.wp-route {
  padding: 0 10px;
  text-decoration: none;
  color: var(--black);
  font-size: 1.2rem;
}

.wp-route:hover {
  color: var(--primary);
  transition: color 0.3s;
}
</style>
