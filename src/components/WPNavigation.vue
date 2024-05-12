<template>
  <nav class="wp-navigation">
    <RouterLink to="/forums" class="wp-route">Forums</RouterLink>
    <RouterLink to="/blogs" class="wp-route">Blogs</RouterLink>
    <RouterLink to="/start" class="wp-route">Start</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
