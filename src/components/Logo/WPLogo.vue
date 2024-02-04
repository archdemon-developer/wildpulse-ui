<script setup lang="ts">
import { WPLogoImageLight } from "@/components/";
import type { RouterLink } from "vue-router";

interface LogoProps {
  navigateTo: string;
}
const props: LogoProps = defineProps<LogoProps>();
</script>

<template>
  <div class="logo-container">
    <RouterLink :to="props.navigateTo">
      <WPLogoImageLight />
    </RouterLink>
  </div>
</template>

<style scoped lang="scss"></style>
