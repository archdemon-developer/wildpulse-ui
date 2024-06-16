<template>
  <div class="wp-main">
    <WPHero :action="routeToLogin" :background-source="heroVideo" />
    <section class="wp-about">
      <WPCard v-for="card in cards" :key="card.id">
        <template #header v-if="card.title">
          {{ card.title }}
        </template>
        <template #media v-if="card.imgSrc">
          <img class="wp-home-view-card-img" :src="card.imgSrc" :alt="card.imgAlt" />
        </template>
        <template #content>
          <p>{{ card.content }}</p>
        </template>
        <template #footer>
          <WPNavLink
            v-for="action in card.actions"
            :to="action.to"
            :key="action.id"
            :name="action.name"
          />
        </template>
      </WPCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { WPHero, WPCard, WPNavLink } from '@/components'
import heroVideo from '@/assets/wp-connecting-wildlife-bg.mp4'
import cardBlogImg from '@/assets/wp-card-blog.png'
import { useRouter, type RouteLocationRaw } from 'vue-router'

const router = useRouter()

const routeToLogin = () => {
  router.push('/login')
}

interface Card {
  id: number
  title: string
  imgSrc?: string
  imgAlt?: string
  content: string
  actions: ActionProps[]
}

interface ActionProps {
  id: number
  to: RouteLocationRaw
  name: string
}

const cards: Card[] = [
  {
    id: 1,
    title: 'This is a card',
    imgSrc: cardBlogImg,
    imgAlt: 'Card image',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsa earum reprehenderit doloribus dicta soluta voluptatum labore ex laborum voluptatibus! Ratione reprehenderit ex ullam incidunt voluptate esse velit eum cum.',
    actions: [
      {
        id: 1,
        to: '/Forums',
        name: 'View'
      },
      {
        id: 2,
        to: '/signup',
        name: 'Start'
      }
    ]
  },
  {
    id: 2,
    title: 'This is a card',
    imgSrc: 'https://via.placeholder.com/150',
    imgAlt: 'Card image',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsa earum reprehenderit doloribus dicta soluta voluptatum labore ex laborum voluptatibus! Ratione reprehenderit ex ullam incidunt voluptate esse velit eum cum.',
    actions: [
      {
        id: 1,
        to: '/Forums',
        name: 'View'
      },
      {
        id: 2,
        to: '/signup',
        name: 'Start'
      }
    ]
  },
  {
    id: 3,
    title: 'This is a card',
    imgSrc: 'https://via.placeholder.com/150',
    imgAlt: 'Card image',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsa earum reprehenderit doloribus dicta soluta voluptatum labore ex laborum voluptatibus! Ratione reprehenderit ex ullam incidunt voluptate esse velit eum cum.',
    actions: [
      {
        id: 1,
        to: '/Forums',
        name: 'View'
      },
      {
        id: 2,
        to: '/signup',
        name: 'Start'
      }
    ]
  },
  {
    id: 4,
    title: 'This is a card',
    imgSrc: 'https://via.placeholder.com/150',
    imgAlt: 'Card image',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsa earum reprehenderit doloribus dicta soluta voluptatum labore ex laborum voluptatibus! Ratione reprehenderit ex ullam incidunt voluptate esse velit eum cum.',
    actions: [
      {
        id: 1,
        to: '/Forums',
        name: 'View'
      },
      {
        id: 2,
        to: '/signup',
        name: 'Start'
      }
    ]
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

.wp-home-view-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
