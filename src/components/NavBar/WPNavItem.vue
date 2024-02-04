<script lang="ts" setup>
interface NavigationProps {
  navigateTo: string;
  text: string;
}

const props: NavigationProps = defineProps<NavigationProps>();
</script>
<template>
  <li class="navitem">
    <RouterLink :to="props.navigateTo" active-class="active">{{
      props.text
    }}</RouterLink>
  </li>
</template>
<style lang="scss" scoped>
.navitem {
  display: flex;
  padding: 0 map-get($map: $space, $key: 16);
  & a {
    text-decoration: none;
    color: $black-default;
    &:hover {
      color: $color-secondary;
      transition: color map-get($map: $transition, $key: normal);
    }
  }
}
.active {
  color: $color-secondary;
}
</style>
