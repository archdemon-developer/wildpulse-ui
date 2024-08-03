<template>
  <div class="wp-sign-in__container">
    <div class="wp-sign-in__header">
      <h1>Welcome Back!</h1>
      <p>Pick up your journey from where you left off.</p>
    </div>
    <form @submit.prevent="handleSubmit" class="wp-sign-in__form">
      <WPTextInput v-model="usernameOrEmail" type="text" placeholder="Enter username or email*" />
      <WPTextInput v-model="password" type="password" placeholder="Enter password*" />
      <div class="wp-sign-in__options">
        <div class="wp-sign-in__remember">
          <input type="checkbox" id="rememberMe" v-model="rememberMe" />
          <label for="rememberMe">Remember Me</label>
        </div>
        <WPActionLink @click="$emit('forgot-password')">Forgot Password?</WPActionLink>
      </div>
      <WPButton type="submit">Login</WPButton>
      <div class="wp-sign-in__or">
        <span>or</span>
      </div>
      <p class="wp-sign-in__link">
        Don't have an account? <WPActionLink @click="$emit('sign-up')">Sign Up</WPActionLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { WPTextInput, WPButton, WPActionLink } from '@/components'

const usernameOrEmail = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleSubmit = () => {
  console.log('Submitted:', {
    usernameOrEmail: usernameOrEmail.value,
    password: password.value,
    rememberMe: rememberMe.value
  })
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
