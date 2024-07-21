<template>
  <div class="wp-main">
    <section class="wp-hero">
      <WPHero
        :primary-action="hero.primaryAction"
        :background-source="hero.backgroundSource"
        :secondary-action="hero.secondaryAction"
        :description="hero.description"
        :header="hero.header"
        :primary-button-text="hero.primaryButtonText"
        :secondary-button-text="hero.secondaryButtonText"
      />
    </section>
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
    <section class="wp-subscribe">
      <WPSubscribe :header="subscribe.header" :description="subscribe.description" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { WPHero, WPFeatureCard, WPSubscribe } from '@/components'
import heroVideo from '@/assets/wp-connecting-wildlife-bg.mp4'
import blogImg from '@/assets/wp-card-blog.png'
import forumImg from '@/assets/wp-card-forums.png'
import badgeImg from '@/assets/wp-card-badges.png'
import { useRouter } from 'vue-router'
import type { Hero, LinkAction } from '@/shared/ts/types'

const router = useRouter()

const routeTo = (route: string) => {
  router.push(route)
}

interface Feature {
  id: number
  header: string
  imgSrc: string
  imgAlt: string
  content: string
  actions: LinkAction[]
}

interface Subscribe {
  header: string
  description: string
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
    imgSrc: forumImg,
    imgAlt: 'Forum Icon',
    content: 'Participate in discussions with other nature lovers and share your experiences.',
    actions: [{ id: 1, to: '/forums', name: 'Visit Forums', variant: 'primary' }]
  },
  {
    id: 3,
    header: 'Earn Badges',
    imgSrc: badgeImg,
    imgAlt: 'Badge Icon',
    content: 'Get recognized for your contributions and achievements within the community.',
    actions: [{ id: 1, to: '/badges', name: 'View Badges', variant: 'primary' }]
  }
]

const hero: Hero = {
  header: 'Unlimited Wildlife Connection: Join enthusiasts worldwide to share discoveries.',
  description:
    'Engage in lively discussion and debate about your wildlife findings, embracing the true spirit of nature. Let the world discover the wonders of rare species through your contributions.',
  primaryButtonText: 'Start now',
  secondaryButtonText: 'Checkout the Forums',
  backgroundSource: heroVideo,
  primaryAction: () => routeTo('/login'),
  secondaryAction: () => routeTo('/forums')
}

const subscribe: Subscribe = {
  header: 'Subscribe',
  description: 'Instead of signing up, try our newsletter first!'
}
</script>

<style scoped>
.wp-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.wp-hero {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.wp-about {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.wp-subscribe {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  margin: 0 auto;
  text-align: center;
}
</style>
