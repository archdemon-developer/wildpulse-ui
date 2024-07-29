<template>
  <div class="wp-footer__content">
    <p>&copy; {{ props.year }} {{ props.footerText }}. All Rights Reserved.</p>
    <nav class="wp-footer__links">
      <a v-for="(link, index) in links" :key="index" :href="link.path">{{ link.name }}</a>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { Route as FooterLink } from '@/shared/ts/types'

const props = defineProps<{
  year: number
  footerText: string
  links: FooterLink[]
}>()
</script>

<style scoped>
.wp-footer__content {
  max-width: 1200px;
  margin: 0 auto;
}

.wp-footer__content p {
  margin: 0;
  font-size: 0.875rem;
  color: #333;
}

.wp-footer__links {
  margin-top: 10px;
}

.wp-footer__links a {
  margin: 0 10px;
  color: var(--secondary);
  text-decoration: none;
  font-size: 0.875rem;
}

.wp-footer__links a:hover {
  text-decoration: underline;
}
</style>
