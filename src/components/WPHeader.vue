<template>
  <header class="wp-header">
    <WPNavLogo />
    <WPNavigation />
  </header>
</template>

<script setup lang="ts">
import { WPNavLogo, WPNavigation } from '@/components'
</script>

<style scoped>
.wp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
}
</style>
