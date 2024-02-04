<script setup lang="ts">
import { WPLogo, WPNavBar, WPNavItems, WPNavItem } from "@/components";
import { ref, type Ref } from "vue";

interface NavItem {
  id: number;
  navigateTo: string;
  text: string;
}

const navItems: Ref<NavItem[]> = ref([
  {
    id: 1,
    navigateTo: "/forums",
    text: "Forums",
  },
  {
    id: 2,
    navigateTo: "/blogs",
    text: "Blogs",
  },
  {
    id: 3,
    navigateTo: "/start",
    text: "Start",
  },
]);
</script>

<template>
  <header class="header">
    <WPLogo navigate-to="/" />
    <WPNavBar>
      <template #navigation>
        <WPNavItems>
          <template #navitems>
            <WPNavItem
              v-for="navitem in navItems"
              :key="navitem.id"
              :navigateTo="navitem.navigateTo"
              :text="navitem.text"
            />
          </template>
        </WPNavItems>
      </template>
    </WPNavBar>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: map-get($map: $space, $key: 16) 0;
  max-width: 1200px;
}
</style>
