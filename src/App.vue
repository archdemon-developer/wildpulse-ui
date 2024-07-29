<script setup lang="ts">
import { WPHeader } from '@/components'
import { RouterView } from 'vue-router'
import type { Route } from './shared/ts/types'

const routes: Route[] = [
  { path: '/forums', name: 'Forums' },
  { path: '/blogs', name: 'Blogs' },
  { path: '/start', name: 'Start' }
]
</script>

<template><WPHeader :nav-routes="routes" /><RouterView /></template>

<style scoped></style>
