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
import forumImg from '@/assets/wp-card-forums.png'
import badgeImg from '@/assets/wp-card-badges.png'
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
    header: 'Explore Our Blogs',
    imgSrc: blogImg,
    imgAlt: 'Blog Icon',
    content: 'Read articles on various wildlife topics, written by experts and enthusiasts.',
    actions: [{ id: 1, to: '/blogs', name: 'Read Blogs', variant: 'primary' }]
  },
  {
    id: 2,
    header: 'Join Our Forums',
    imgSrc: forumImg, // Assume forumsImg is defined similarly to blogImg
    imgAlt: 'Forum Icon',
    content: 'Participate in discussions with other nature lovers and share your experiences.',
    actions: [{ id: 1, to: '/forums', name: 'Visit Forums', variant: 'primary' }]
  },
  {
    id: 3,
    header: 'Earn Badges',
    imgSrc: badgeImg, // Assume badgesImg is defined similarly to blogImg
    imgAlt: 'Badge Icon',
    content: 'Get recognized for your contributions and achievements within the community.',
    actions: [{ id: 1, to: '/badges', name: 'View Badges', variant: 'primary' }]
  }
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
