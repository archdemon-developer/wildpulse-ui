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
import { useToastStore, useAuthStore } from '@/stores'

const toastStore = useToastStore()
const authStore = useAuthStore()

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

const handleSignUpSubmit = async (formData: any) => {
  try {
    await authStore.signup(formData.email, formData.password, formData.username)
    toastStore.addToast({
      type: 'success',
      duration: 5000,
      message: 'Move to login page to login',
      position: 'top-right',
      title: 'Successful'
    })
  } catch (err: any) {
    toastStore.addToast({
      type: 'danger',
      duration: 5000,
      message: 'Error signing up',
      position: 'top-right',
      title: 'Error'
    })
  }
}

const handleSignInSubmit = async (formData: any) => {
  try {
    await authStore.login(formData.email, formData.password)
    toastStore.addToast({
      type: 'success',
      duration: 5000,
      message: 'You have logged in successfully',
      position: 'top-right',
      title: 'Successful'
    })
  } catch (err: any) {
    toastStore.addToast({
      type: 'danger',
      duration: 5000,
      message: 'Error logging in: Email or Password is incorrect',
      position: 'top-right',
      title: 'Error'
    })
  }
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
