<template>
  <div class="wp-subscribe__content">
    <h1 class="wp-subscribe__header">{{ props.header }}</h1>
    <div class="wp-subscribe__divider"></div>
    <h3 class="wp-subscribe__description">{{ props.description }}</h3>
    <div class="wp-subscribe-form">
      <div class="wp-subscribe-form__input">
        <WPTextInput
          :model-value="subscriptionEmail"
          @change="updateSubscriptionEmail"
          type="email"
          placeholder="Enter your email"
        />
        <WPButton type="submit" @click="subscribeUser">Subscribe</WPButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WPButton, WPTextInput } from '@/components'
import { defineProps, ref } from 'vue'

const subscriptionEmail = ref('')

const updateSubscriptionEmail = (value: string) => {
  subscriptionEmail.value = value
}

const subscribeUser = (): void => {
  console.log(subscriptionEmail.value)
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
  align-items: center;
  justify-content: center;
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
