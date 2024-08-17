<template>
  <div class="wp-forgot-password">
    <div class="wp-forgot-password__header">
      <h1>Forgot Password</h1>
      <p>Enter your email to receive a reset link.</p>
    </div>
    <form @submit.prevent="emitSubmit" class="wp-forgot-password__form">
      <WPTextInput
        v-model="formData.email"
        type="email"
        :error="errors.email"
        placeholder="Enter your email*"
      />
      <WPButton type="submit">Get Reset Link</WPButton>
    </form>
    <WPActionLink class="wp-forgot-password__back" @click="$emit('back-to-login')">
      Back to Login
    </WPActionLink>
  </div>
</template>

<script setup lang="ts">
import { WPTextInput, WPButton, WPActionLink } from '@/components'
import { useForm } from '@/composables/useForm'

interface FormData {
  email: string
}

const { formData, errors, resetForm, clearErrors, isValidEmail } = useForm<FormData>({
  email: ''
})

const emit = defineEmits(['back-to-login', 'forgot-password-submit'])

const emitSubmit = () => {
  clearErrors()

  if (!formData.email) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email'
  } else {
    emit('forgot-password-submit', formData.email)
    resetForm()
  }
}
</script>

<style scoped>
.wp-forgot-password {
  width: 100%;
}

.wp-forgot-password__header {
  text-align: center;
  margin-bottom: 50px;
}

.wp-forgot-password__header h1 {
  font-size: 3rem;
}

.wp-forgot-password__header p {
  font-size: 1.25rem;
}

.wp-forgot-password__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.wp-forgot-password__back {
  display: block;
  margin: 20px auto 0;
  padding: 5px 0;
  text-align: center;
}
</style>
