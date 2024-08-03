<template>
  <div class="wp-forgot-password">
    <div class="wp-forgot-password__header">
      <h1>Reset Your Password</h1>
      <p>Enter your email address below to receive a password reset link.</p>
    </div>
    <form @submit.prevent="handleResetPassword" class="wp-forgot-password__form">
      <WPTextInput v-model="resetEmail" type="text" placeholder="Enter your email*" />
      <WPButton type="submit">Get Reset Link</WPButton>
      <WPActionLink class="wp-forgot-password__link" @click="$emit('go-back')"
        >Go Back</WPActionLink
      >
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { WPTextInput, WPButton, WPActionLink } from '@/components'

const resetEmail = ref('')

const handleResetPassword = () => {
  console.log('Password reset link sent to:', resetEmail.value)
}
</script>

<style scoped>
.wp-forgot-password {
  padding: 2rem;
  border-radius: 8px;
  flex: 1;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wp-forgot-password__header {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 2rem;
}

.wp-forgot-password__header h1 {
  font-size: 3rem;
  font-weight: 700;
  padding: 0.5rem 0;
}

.wp-forgot-password__header p {
  padding: 0.5rem 0;
  font-size: 1.25rem;
}

.wp-forgot-password__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.wp-forgot-password__link {
  margin-top: 0.5rem;
  font-size: 14px;
  text-align: center;
}
</style>
