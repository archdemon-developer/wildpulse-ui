<template>
  <div class="wp-sign-up">
    <div class="wp-sign-up__header">
      <h1>Join Us!</h1>
      <p>Start your journey with us.</p>
    </div>
    <form class="wp-sign-up-form" @submit.prevent="emitSubmit">
      <WPTextInput
        v-model="formData.email"
        type="email"
        placeholder="Enter your email*"
        :error="errors.email"
      />
      <WPTextInput
        v-model="formData.username"
        type="text"
        placeholder="Enter your desired username*"
        :error="errors.username"
      />
      <WPTextInput
        v-model="formData.password"
        type="password"
        placeholder="Enter password*"
        :error="errors.password"
      />
      <WPTextInput
        v-model="formData.confirmPassword"
        type="password"
        placeholder="Confirm your password*"
        :error="errors.confirmPassword"
      />
      <WPButton type="submit">Sign up</WPButton>
    </form>
    <div class="wp-toggle-sign-in">
      <div class="wp-or">or</div>
      <span>
        Already have an account?
        <WPActionLink @click="$emit('toggle-sign-in')">Log in</WPActionLink>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WPActionLink, WPTextInput } from '@/components'
import WPButton from '@/components/WPButton.vue'
import { useForm } from '@/composables/useForm'

interface SignUpFormData {
  email: string
  username: string
  password: string
  confirmPassword: string
}

const { formData, errors, resetForm, clearErrors, isValidEmail } = useForm<SignUpFormData>({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const emit = defineEmits(['sign-up-submit', 'toggle-sign-in'])

const emitSubmit = () => {
  clearErrors()
  validateForm()
  if (Object.values(errors).every((error) => !error)) {
    emit('sign-up-submit', formData)
    resetForm()
  }
}

const validateForm = () => {
  if (!formData.email) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!formData.username) {
    errors.username = 'Username is required.'
  }

  if (!formData.password) {
    errors.password = 'Password is required.'
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }
}
</script>

<style scoped>
.wp-sign-up {
  width: 100%;
}

.wp-sign-up__header {
  text-align: center;
  margin-bottom: 50px;
}

.wp-sign-up h1 {
  font-size: 3rem;
}

.wp-sign-up p {
  font-size: 1.25rem;
}

.wp-sign-up-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.wp-toggle-sign-in {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
  align-items: center;
}

.wp-or {
  display: flex;
  align-items: center;
  text-align: center;
  color: #666;
  font-size: 14px;
  width: 100%;
}

.wp-or::before,
.wp-or::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ccc;
  margin: 0 1rem;
}
</style>
