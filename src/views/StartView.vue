<template>
  <div class="wp-start">
    <WPLoginForm
      v-if="!isForgotPassword && !isSignUp"
      @forgot-password="toggleForgotPassword"
      @sign-up="toggleSignUp"
    />
    <WPSignUpForm
      v-if="!isForgotPassword && isSignUp"
      @forgot-password="toggleForgotPassword"
      @login="toggleSignUp"
    />
    <WPForgotPasswordForm v-if="isForgotPassword" @go-back="goBack" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { WPForgotPasswordForm, WPLoginForm, WPSignUpForm } from '@/components'

const isSignUp = ref(false)
const isForgotPassword = ref(false)

const toggleForgotPassword = (): void => {
  isForgotPassword.value = !isForgotPassword.value
}

const goBack = (): void => {
  isForgotPassword.value = false
  isSignUp.value = false
}

const toggleSignUp = (): void => {
  isSignUp.value = !isSignUp.value
}
</script>

<style scoped>
.wp-start {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
