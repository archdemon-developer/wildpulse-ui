<template>
  <header class="wp-header">
    <WPNavLogo />
    <WPNavigation :routes="props.navRoutes" />
  </header>
</template>

<script setup lang="ts">
import { WPNavLogo, WPNavigation } from '@/components'
import type { Route } from '@/shared/ts/types'

interface HeaderProps {
  navRoutes: Route[]
}

const props: HeaderProps = defineProps<HeaderProps>()
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
