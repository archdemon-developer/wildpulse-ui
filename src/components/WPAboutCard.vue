<template>
  <WPCard classes="wp-about-card">
    <template #header v-if="props.header">
      <h3 class="wp-about-card__header">{{ header }}</h3>
    </template>
    <template #default v-if="props.imgSrc || props.content">
      <img v-if="imgSrc" :src="imgSrc" :alt="imgAlt" class="wp-about-card__img" />
      <p v-if="content" class="wp-about-card__content">{{ content }}</p>
    </template>
    <template #footer v-if="props.actions">
      <div class="wp-about-card__actions">
        <WPNavLink
          v-for="action in actions"
          :key="action.id"
          :to="action.to"
          :name="action.name"
          :variant="action.variant"
        />
      </div>
    </template>
  </WPCard>
</template>

<script setup lang="ts">
import { WPCard, WPNavLink } from '@/components'
import type { LinkAction } from '@/shared/ts/types'

interface AboutCardProps {
  header?: string
  imgSrc?: string
  imgAlt?: string
  content?: string
  actions?: LinkAction[]
}

const props = withDefaults(defineProps<AboutCardProps>(), {
  header: '',
  imgSrc: '',
  imgAlt: '',
  content: ''
})
</script>

<style scoped>
.wp-about-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.wp-about-card:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.wp-about-card__header {
  font-size: 1.5em;
  font-weight: bold;
  padding: 16px;
  margin: 0;
}

.wp-about-card__img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.wp-about-card__content {
  padding: 16px;
  font-size: 1em;
  line-height: 1.5;
}

.wp-about-card__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px;
}
</style>
