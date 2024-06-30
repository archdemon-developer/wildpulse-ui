<template>
  <div class="wp-main">
    <WPHero :action="routeToLogin" :background-source="heroVideo" />
    <section class="wp-about">
      <WPFeatureCard
        v-for="feature in features"
        :key="feature.id"
        :header="feature.header"
        :imgSrc="feature.imgSrc"
        :imgAlt="feature.imgAlt"
        :content="feature.content"
        :actions="feature.actions"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { WPHero, WPFeatureCard } from '@/components'
import heroVideo from '@/assets/wp-connecting-wildlife-bg.mp4'
import blogImg from '@/assets/wp-card-blog.png'
import { useRouter } from 'vue-router'
import type { LinkAction } from '@/shared/ts/types'

const router = useRouter()

const routeToLogin = () => {
  router.push('/login')
}

interface Feature {
  id: number
  header: string
  imgSrc: string
  imgAlt: string
  content: string
  actions: LinkAction[]
}

const features: Feature[] = [
  {
    id: 1,
    header: 'Global Wildlife Network',
    imgSrc: blogImg,
    imgAlt: 'Global Network Icon',
    content: 'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.',
    actions: [{ id: 1, to: '/learn-more', name: 'Learn More', variant: 'primary' }]
  },
  {
    id: 2,
    header: 'Global Wildlife Network',
    imgSrc: blogImg,
    imgAlt: 'Global Network Icon',
    content: 'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.',
    actions: [{ id: 1, to: '/learn-more', name: 'Learn More', variant: 'primary' }]
  },
  {
    id: 3,
    header: 'Global Wildlife Network',
    imgSrc: blogImg,
    imgAlt: 'Global Network Icon',
    content: 'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.',
    actions: [{ id: 1, to: '/learn-more', name: 'Learn More', variant: 'primary' }]
  },
  {
    id: 4,
    header: 'Global Wildlife Network',
    imgSrc: blogImg,
    imgAlt: 'Global Network Icon',
    content: 'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.',
    actions: [{ id: 1, to: '/learn-more', name: 'Learn More', variant: 'primary' }]
  },
  {
    id: 5,
    header: 'Global Wildlife Network',
    imgSrc: blogImg,
    imgAlt: 'Global Network Icon',
    content: 'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.',
    actions: [{ id: 1, to: '/learn-more', name: 'Learn More', variant: 'primary' }]
  },
  {
    id: 6,
    header: 'Global Wildlife Network',
    imgSrc: blogImg,
    imgAlt: 'Global Network Icon',
    content: 'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.',
    actions: [{ id: 1, to: '/learn-more', name: 'Learn More', variant: 'primary' }]
  }
  // Add more features as needed
]
</script>

<style scoped>
.wp-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.wp-about {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
