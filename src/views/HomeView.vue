<template>
  <div class="wp-main">
    <WPHero :action="routeToLogin" :background-source="heroVideo" />
    <section class="wp-about">
      <!-- TODO: Move this to a list of cards based on the type of content to render -->
      <WPAboutCard
        :img-src="blogImg"
        :img-alt="'card image'"
        :actions="[
          { to: '/forums', id: 1, name: 'View', variant: 'primary' },
          { to: '/start', id: 2, name: 'Start', variant: 'secondary' }
        ]"
        :content="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, reiciendis possimus! Temporibus cum illum corporis necessitatibus nobis molestiae ut optio. Omnis vitae fugit sapiente eos obcaecati, atque iure ducimus facere?'"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { WPHero, WPAboutCard } from '@/components'
import heroVideo from '@/assets/wp-connecting-wildlife-bg.mp4'
import blogImg from '@/assets/wp-card-blog.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const routeToLogin = () => {
  router.push('/login')
}
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
