<template>
  <RouterLink to="/">
    <div class="wp-logo">
      <WPImage :src="logoImg" alt="Wildpulse Logo" />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { WPImage } from '@/components'
import logoImg from '@/assets/wplogo-nav.png'
</script>

<style scoped>
.wp-logo {
  width: 300px;
  height: auto;
}
</style>
