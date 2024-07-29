<template>
  <div class="wp-hero">
    <WPVideo
      :autoplay="true"
      :loop="true"
      :muted="true"
      class="wp-hero-video"
      :src="props.backgroundSource"
      type="video/mp4"
    />
    <div class="wp-hero-content">
      <h1 class="wp-hero-header">{{ props.header }}</h1>
      <p class="wp-hero-description">{{ props.description }}</p>
      <div class="wp-hero-buttons">
        <WPButton type="button" variant="primary" @click="primaryAction">
          {{ props.primaryButtonText }}
        </WPButton>
        <WPButton type="button" variant="secondary" @click="secondaryAction">
          {{ props.secondaryButtonText }}
        </WPButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WPButton, WPVideo } from '@/components'
import type { Hero as HeroProps } from '@/shared/ts/types'

const props: HeroProps = defineProps<HeroProps>()
</script>

<style scoped>
.wp-hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wp-hero-content {
  z-index: 1;
  width: 100%;
}

.wp-hero-header {
  font-size: 2rem;
  margin: 25px 0;
}

.wp-hero-description {
  font-size: 1.25rem;
  margin: 25px 0;
  max-width: 800px;
}

.wp-hero-buttons {
  display: flex;
  gap: 20px;
}

.wp-hero-buttons WPButton {
  flex: 1;
}
</style>
