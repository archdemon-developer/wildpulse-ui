<template>
  <RouterLink to="/">
    <div class="wp-logo">
      <img src="@/assets/wplogo-nav.png" alt="wildpulse logo" />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.wp-logo {
  width: 300px;
  height: auto;
}
</style>
