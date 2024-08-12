<script setup lang="ts">
import { WPHeader } from '@/components'
import { RouterView } from 'vue-router'
import type { Route } from '@/shared/ts/types'
import { useAuthStore } from './stores/auth'

const { isLoggedIn, user } = useAuthStore()

let routes: Route[] = []

if (isLoggedIn) {
  routes = [
    { path: '/forums', name: 'Forums' },
    { path: '/blogs', name: 'Blogs' },
    { path: '', name: 'Welcome, ' + user?.displayName }
  ]
} else {
  routes = [
    { path: '/forums', name: 'Forums' },
    { path: '/blogs', name: 'Blogs' },
    { path: '/start', name: 'Start' }
  ]
}
</script>

<template><WPHeader :nav-routes="routes" /><RouterView /></template>

<style scoped></style>
