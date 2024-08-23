<script setup lang="ts">
import { WPHeader } from '@/layouts'
import { RouterView } from 'vue-router'
import { WPToastContainer } from '@/components'
import type { Route } from '@/shared/ts/types'

let routes: Route[] = [
  { path: '/forums', name: 'Forums' },
  { path: '/blogs', name: 'Blogs' },
  { path: '/start', name: 'Start' }
]
</script>

<template><WPToastContainer /><WPHeader :nav-routes="routes" /><RouterView /></template>

<style scoped></style>
