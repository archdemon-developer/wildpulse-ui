<template>
  <div class="wp-sign-in__container">
    <div class="wp-sign-in__header">
      <h1>Welcome Back!</h1>
      <p>Pick up your journey from where you left off.</p>
    </div>
    <WPAlert v-if="alert.message" :message="alert.message" :type="alert.type" />
    <form @submit.prevent="handleSubmit" class="wp-sign-in__form">
      <WPTextInput
        v-model="formData.email"
        type="text"
        placeholder="Enter your email*"
        :error="errors.email"
      />
      <div class="password-field">
        <WPTextInput
          v-model="formData.password"
          :type="passwordVisibility ? 'text' : 'password'"
          placeholder="Enter your password*"
          :error="errors.password"
        />
        <Icon
          :icon="passwordVisibility ? 'mdi:eye' : 'mdi:eye-off'"
          class="password-toggle-icon"
          @click="togglePasswordVisibility"
        />
      </div>
      <div class="wp-sign-in__options">
        <div class="wp-sign-in__remember">
          <input type="checkbox" id="rememberMe" v-model="formData.shouldRememberMe" />
          <label for="rememberMe">Remember Me</label>
        </div>
        <WPActionLink @click="$emit('forgot-password')">Forgot Password?</WPActionLink>
      </div>
      <WPButton type="submit" :loading="isLoading">Login</WPButton>
      <div class="wp-sign-in__or">
        <span>OR</span>
      </div>
      <p class="wp-sign-in__link">
        Don't have an account? <WPActionLink @click="$emit('sign-up')">Sign Up</WPActionLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/useForm'
import { WPTextInput, WPButton, WPActionLink, WPAlert } from '@/components'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'

interface FormData {
  email: string
  password: string
  shouldRememberMe: boolean
}

const passwordVisibility = ref(false)

const togglePasswordVisibility = () => {
  passwordVisibility.value = !passwordVisibility.value
}

const { formData, errors, resetForm, clearErrors, isValidEmail } = useForm<FormData>({
  email: '',
  password: '',
  shouldRememberMe: false
})

const alert = reactive({
  message: '',
  type: 'error' as 'success' | 'error' | 'info' | 'warning'
})

const authStore = useAuthStore()
const { isLoading } = storeToRefs(authStore)
const { login } = authStore

const handleSubmit = async () => {
  clearErrors()
  validateForm()

  if (Object.values(errors).every((error) => !error)) {
    try {
      await login(formData.email, formData.password)
      alert.message = 'Login Successful'
      alert.type = 'success'
    } catch (err: any) {
      alert.message = err.message || 'Login failed.'
      alert.type = 'error'
    } finally {
      resetForm()
    }
  }
}

const validateForm = () => {
  if (!formData.email) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!formData.password) {
    errors.password = 'Password is required.'
  }
}
</script>

<style scoped>
.wp-sign-in {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.wp-sign-in__container {
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

.wp-sign-in__header {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 2rem;
}

.wp-sign-in__header h1 {
  font-size: 3rem;
  font-weight: 700;
  padding: 0.5rem 0;
}

.wp-sign-in__header p {
  padding: 0.5rem 0;
  font-size: 1.25rem;
}

.wp-sign-in__form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.wp-forgot-password__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.wp-sign-in__options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.wp-sign-in__remember {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.wp-sign-in__remember input {
  margin: 0;
}

.wp-sign-in__or {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.password-field {
  position: relative;
  display: flex;
  align-items: center;
}

.password-field input {
  width: 100%;
  padding-right: 2.5rem;
}

.password-toggle-icon {
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
  font-size: 1.25rem;
}

.wp-sign-in__or::before,
.wp-sign-in__or::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ccc;
  margin: 0 1rem;
}

.wp-sign-in__or span {
  font-size: 14px;
  color: #666;
}

.wp-sign-in__footer {
  text-align: center;
  margin-top: 1rem;
}

.wp-sign-in__link {
  margin-top: 0.5rem;
  font-size: 14px;
  text-align: center;
}
</style>
