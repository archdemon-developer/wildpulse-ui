<template>
  <ul class="navbar-container">
    <slot name="navitems"></slot>
  </ul>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.navbar {
  &-container {
    display: flex;
    list-style: none;
  }
}
</style>
