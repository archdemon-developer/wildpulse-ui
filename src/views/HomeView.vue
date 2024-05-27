<template>
  <WPHero :action="routeToLogin" :background-source="heroVideo" />
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
