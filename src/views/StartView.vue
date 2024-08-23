<template>
  <div class="wp-start">
    <WPSignInForm
      v-if="!isSignUp && !isForgotPassword"
      @toggle-sign-up="toggleSignUp"
      @forgot-password="toggleForgotPassword"
      @sign-in-submit="handleSignInSubmit"
    />
    <WPSignUpForm
      v-if="isSignUp"
      @toggle-sign-in="toggleSignIn"
      @sign-up-submit="handleSignUpSubmit"
    />
    <WPForgotPasswordForm
      v-if="isForgotPassword"
      @back-to-login="toggleSignIn"
      @forgot-password-submit="handleForgotPasswordSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { WPSignInForm, WPSignUpForm, WPForgotPasswordForm } from '@/layouts'

import { useToastStore } from '@/stores/toast.store'

const toastStore = useToastStore()

const isSignUp = ref(false)
const isForgotPassword = ref(false)

const toggleSignUp = () => {
  isSignUp.value = true
}

const toggleSignIn = () => {
  isSignUp.value = false
  isForgotPassword.value = false
}

const toggleForgotPassword = () => {
  isForgotPassword.value = true
  isSignUp.value = false
}

const handleSignUpSubmit = (formData: any) => {
  toastStore.addToast({
    type: 'success',
    duration: 5000,
    message: 'Sign-up form submitted with data: ' + JSON.stringify(formData),
    position: 'top-right',
    title: 'Sign up successful'
  })
}

const handleSignInSubmit = (formData: any) => {
  toastStore.addToast({
    type: 'success',
    duration: 5000,
    message: 'Sign-in form submitted with data: ' + JSON.stringify(formData),
    position: 'top-right',
    title: 'Sign in successful'
  })
}

const handleForgotPasswordSubmit = (email: string) => {
  toastStore.addToast({
    type: 'success',
    duration: 5000,
    message: 'Reset link sent to your email: ' + email,
    position: 'top-right',
    title: 'Reset link sent successfully'
  })
}
</script>

<style scoped>
.wp-start {
  display: flex;
  max-width: 600px;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
}
</style>
