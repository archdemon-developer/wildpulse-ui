<template>
  <nav class="wp-navigation">
    <WPNavLink v-for="(route, index) in routes" :to="route.path" :key="index" :name="route.name" />
  </nav>
</template>

<script setup lang="ts">
import { WPNavLink } from '@/components'

const routes = [
  { path: '/forums', name: 'Forums' },
  { path: '/blogs', name: 'Blogs' },
  { path: '/start', name: 'Start' }
]
</script>

<style scoped></style>
