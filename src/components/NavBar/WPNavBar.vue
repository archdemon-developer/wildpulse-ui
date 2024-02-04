<script setup lang="ts"></script>

<template>
  <nav class="navbar">
    <slot name="navigation"></slot>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
}
</style>
