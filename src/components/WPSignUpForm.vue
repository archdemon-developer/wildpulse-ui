<template>
  <div class="wp-sign-up__container">
    <div class="wp-sign-up__header">
      <h1>Join Us!</h1>
      <p>Create a new account to get started.</p>
    </div>
    <form @submit.prevent="handleSubmit" class="wp-sign-up__form">
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
      <div class="password-field">
        <WPTextInput
          v-model="formData.password"
          :type="passwordVisibility ? 'text' : 'password'"
          placeholder="Enter password*"
          :error="errors.password"
        />
        <Icon
          :icon="passwordVisibility ? 'mdi:eye' : 'mdi:eye-off'"
          class="password-toggle-icon"
          @click="togglePasswordVisibility"
        />
      </div>
      <div class="password-field">
        <WPTextInput
          v-model="formData.confirmPassword"
          :type="confirmPasswordVisibility ? 'text' : 'password'"
          placeholder="Confirm your password*"
          :error="errors.confirmPassword"
        />
        <Icon
          :icon="confirmPasswordVisibility ? 'mdi:eye' : 'mdi:eye-off'"
          class="password-toggle-icon"
          @click="toggleConfirmPasswordVisibility"
        />
      </div>
      <WPButton type="submit" :loading="isLoading">Sign Up</WPButton>
      <div class="wp-sign-up__or">
        <span>OR</span>
      </div>
      <p class="wp-sign-up__link">
        Already have an account? <WPActionLink @click="$emit('login')">Login</WPActionLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@/composables/useForm'
import { WPTextInput, WPButton, WPActionLink } from '@/components'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const { formData, errors, clearErrors, isValidEmail } = useForm<FormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const authStore = useAuthStore()
const { isLoading } = storeToRefs(authStore)
const { signup } = authStore

const passwordVisibility = ref(false)
const confirmPasswordVisibility = ref(false)

const togglePasswordVisibility = () => {
  passwordVisibility.value = !passwordVisibility.value
}

const toggleConfirmPasswordVisibility = () => {
  confirmPasswordVisibility.value = !confirmPasswordVisibility.value
}

const handleSubmit = async () => {
  clearErrors()
  validateForm()

  if (Object.values(errors).every((error) => !error)) {
    try {
      await signup(formData.email, formData.password, formData.username)
      alert('Successfully registered')
    } catch (err: any) {
      alert(err.message || 'Registration failed.')
    }
  }
}

const validateForm = () => {
  if (!formData.username) errors.username = 'Username is required.'
  if (!formData.email) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Invalid email format.'
  }
  if (!formData.password) {
    errors.password = 'Password is required.'
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.'
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }
}
</script>

<style scoped>
.wp-sign-up__container {
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wp-sign-up__header {
  text-align: center;
  margin-bottom: 2rem;
}

.wp-sign-up__header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0.5rem 0;
}

.wp-sign-up__header p {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

.wp-sign-up__form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.password-field {
  position: relative;
  display: flex;
  align-items: center;
}

.password-field input {
  width: 100%;
  padding-right: 2.5rem; /* Adjust based on icon size */
}

.password-toggle-icon {
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
  font-size: 1.25rem;
}

.wp-sign-up__or {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.wp-sign-up__or::before,
.wp-sign-up__or::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ccc;
  margin: 0 1rem;
}

.wp-sign-up__link {
  font-size: 14px;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
