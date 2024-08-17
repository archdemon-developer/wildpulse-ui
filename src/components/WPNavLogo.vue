<template>
  <RouterLink :class="props.classes" to="/">
    <div class="wp-logo">
      <WPImage :src="logoImg" alt="Wildpulse Logo" />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { WPImage } from '@/components'
import logoImg from '@/assets/wplogo-nav.png'

interface LogoProps {
  classes?: string
}

const props: LogoProps = defineProps<LogoProps>()
</script>

<style scoped>
.wp-logo {
  width: 300px;
  height: auto;
}
</style>
