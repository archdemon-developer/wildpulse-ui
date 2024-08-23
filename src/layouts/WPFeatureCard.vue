<template>
  <WPCard classes="wp-feature-card" @mouseenter="flipped = true" @mouseleave="flipped = false">
    <template #header>
      <div :class="['wp-card-face', 'wp-card-front', { flipped: flipped }]">
        <WPImage :src="props.imgSrc" :alt="props.imgAlt" classes="wp-feature-icon" />
        <h3>{{ props.header }}</h3>
      </div>
    </template>
    <template #default>
      <div :class="['wp-card-face', 'wp-card-back', { flipped: flipped }]">
        <p>{{ props.content }}</p>
        <div class="wp-feature-card__actions">
          <WPButton
            v-for="action in props.actions"
            :key="action.id"
            type="button"
            variant="primary"
            @click="navigate(action.to, $event)"
          >
            {{ action.name }}
          </WPButton>
        </div>
      </div>
    </template>
  </WPCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { WPButton, WPCard, WPImage } from '@/components'
import { useRouter } from 'vue-router'
import type { LinkAction } from '@/shared/ts/types'

const props = defineProps<{
  header: string
  imgSrc: string
  imgAlt: string
  content: string
  actions: LinkAction[]
}>()

const router = useRouter()
const flipped = ref(false)

const navigate = (to: string, event: MouseEvent) => {
  event.stopPropagation()
  router.push(to)
}
</script>

<style scoped>
.wp-feature-card {
  position: relative;
  width: 100%;
  height: 250px;
  perspective: 1000px;
  cursor: pointer;
  text-align: center;
}

.wp-feature-card__actions {
  margin-top: 45px;
  text-align: center;
}

.wp-card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transition: transform 0.6s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.wp-card-front {
  background-color: #fff;
}

.wp-card-back {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
}

.wp-feature-card:hover .wp-card-front.flipped {
  transform: rotateY(180deg);
}

.wp-feature-card:hover .wp-card-back.flipped {
  transform: rotateY(0deg);
}

.wp-feature-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}
</style>
