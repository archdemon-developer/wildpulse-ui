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

const toggleForgotPassword = () => {
  isForgotPassword.value = !isForgotPassword.value
  if (isForgotPassword.value) {
    resetAllStates()
  }
}

const goBack = () => {
  isForgotPassword.value = false
  isSignUp.value = false
  resetAllStates()
}

const toggleSignUp = () => {
  isSignUp.value = !isSignUp.value
  resetAllStates()
}

const resetAllStates = () => {
  // The reset logic could be moved to individual components
}
</script>

<style scoped>
.wp-start {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
