<template>
  <section class="wp-hero">
    <WPVideo
      :autoplay="true"
      :loop="true"
      :muted="true"
      class="wp-hero-video"
      :src="props.backgroundSource"
      type="video/mp4"
    />
    <div class="wp-hero-content">
      <h1 class="wp-hero-header">
        Unlimited Wildlife Connection: Join enthusiasts worldwide to share discoveries.
      </h1>
      <p class="wp-hero-description">
        Engage in lively discussion and debate about your wildlife findings, embracing the true
        spirit of nature. Let the world discover the wonders of rare species through your
        contributions.
      </p>
      <WPButton type="button" variant="primary" :click="props.action">Start now</WPButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { WPButton, WPVideo } from '@/components'

interface HeroProps {
  action: (payload: MouseEvent) => void
  backgroundSource: string
}

const props: HeroProps = defineProps<HeroProps>()
</script>

<style scoped>
.wp-hero {
  position: relative;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 1200px;
  align-items: center;
}

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
</style>
