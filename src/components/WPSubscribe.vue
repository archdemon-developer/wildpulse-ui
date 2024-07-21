<template>
  <div class="wp-subscribe__content">
    <h1 class="wp-subscribe__header">{{ props.header }}</h1>
    <div class="wp-subscribe__divider"></div>
    <h3 class="wp-subscribe__description">{{ props.description }}</h3>
    <form class="wp-subscribe-form" @submit.prevent="subscribeUser">
      <div class="wp-subscribe-form__input">
        <WPInput type="email" placeholder="Enter your email" />
        <WPButton type="submit">Subscribe</WPButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { WPButton, WPInput } from '@/components'

const subscribeUser = (event: Event): void => {
  console.log(event)
}

interface SubscribeProps {
  header: string
  description: string
}

const props: SubscribeProps = defineProps<SubscribeProps>()
</script>

<style scoped>
.wp-subscribe__content {
  width: 100%;
}

.wp-subscribe__divider {
  width: 50px;
  height: 2px;
  background-color: #333;
  margin: 15px auto;
}

.wp-subscribe__header {
  font-size: 32px;
  font-weight: bold;
}

.wp-subscribe__description {
  margin-bottom: 24px;
  font-size: 18px;
}

.wp-subscribe-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wp-subscribe-form__input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  gap: 10px;
}
</style>
