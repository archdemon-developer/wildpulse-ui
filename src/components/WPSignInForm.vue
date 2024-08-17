<template>
  <div class="wp-sign-in">
    <div class="wp-sign-in-header">
      <h1>Welcome Back!</h1>
      <p>Pick up your journey from where you left off!</p>
    </div>
    <form class="wp-sign-in-form" @submit.prevent="emitSubmit">
      <WPTextInput
        v-model="formData.email"
        type="email"
        :error="errors.email"
        placeholder="Enter your Email*"
      />
      <WPTextInput
        v-model="formData.password"
        type="password"
        :error="errors.password"
        placeholder="Enter your password*"
      />
      <div class="wp-sign-in-misc">
        <WPCheckboxInput
          v-model="formData.shouldRememberMe"
          label="Remember me"
          id="remember-me-checkbox"
        />
        <WPActionLink @click="$emit('forgot-password')">Forgot Password?</WPActionLink>
      </div>
      <WPButton type="submit">Log in</WPButton>
    </form>
    <div class="wp-toggle-sign-up">
      <div class="wp-or">or</div>
      <span>
        Not an existing user?
        <WPActionLink @click="$emit('toggle-sign-up')">Sign up</WPActionLink>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WPActionLink, WPCheckboxInput, WPTextInput } from '@/components'
import WPButton from '@/components/WPButton.vue'
import { useForm } from '@/composables/useForm'

interface SignInFormData {
  email: string
  password: string
  shouldRememberMe: boolean
}

const { formData, errors, resetForm, clearErrors, isValidEmail } = useForm<SignInFormData>({
  email: '',
  password: '',
  shouldRememberMe: false
})

const emit = defineEmits(['sign-in-submit', 'toggle-sign-up', 'forgot-password'])

const emitSubmit = () => {
  clearErrors()
  validateForm()
  if (Object.values(errors).every((error) => !error)) {
    emit('sign-in-submit', formData)
    resetForm()
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
  width: 100%;
}

.wp-sign-in-header {
  text-align: center;
  margin-bottom: 50px;
}

.wp-sign-in-header h1 {
  font-size: 3rem;
}

.wp-sign-in-header p {
  font-size: 1.25rem;
}

.wp-sign-in-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.wp-sign-in-misc {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wp-toggle-sign-up {
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
