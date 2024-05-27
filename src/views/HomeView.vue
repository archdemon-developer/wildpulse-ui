<template>
  <div class="main">
    <WPHero :action="routeToLogin" :background-source="heroVideo" />
  </div>
</template>

<script setup lang="ts">
import { WPHero } from '@/components'
import heroVideo from '@/assets/wp-connecting-wildlife-bg.mp4'
import { useRouter } from 'vue-router'

const router = useRouter()

const routeToLogin = () => {
  router.push('/login')
}
</script>

<style scoped></style>
