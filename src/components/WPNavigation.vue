<template>
  <nav class="wp-navigation">
    <WPNavLink
      v-for="(route, index) in props.routes"
      :to="route.path"
      :key="index"
      :name="route.name"
    />
  </nav>
</template>

<script setup lang="ts">
import { WPNavLink } from '@/components'
import type { Route } from '@/shared/ts/types'

interface NavProps {
  routes: Route[]
}
const props: NavProps = defineProps<NavProps>()
</script>

<style scoped></style>
