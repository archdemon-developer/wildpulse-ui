<template>
  <div class="wp-sign-up__container">
    <div class="wp-sign-up__header">
      <h1>Join Us!</h1>
      <p>Create a new account to get started.</p>
    </div>
    <form @submit.prevent="handleSubmit" class="wp-sign-up__form">
      <WPTextInput v-model="username" type="text" placeholder="Enter your desired username*" />
      <WPTextInput v-model="email" type="text" placeholder="Enter your email*" />
      <WPTextInput v-model="firstname" type="text" placeholder="Enter your first name" />
      <WPTextInput v-model="lastname" type="text" placeholder="Enter your last name" />
      <WPTextInput v-model="password" type="password" placeholder="Enter password*" />
      <WPTextInput v-model="confirmPassword" type="password" placeholder="Confirm your password*" />
      <WPButton type="submit">Sign Up</WPButton>
      <div class="wp-sign-up__or">
        <span>or</span>
      </div>
      <p class="wp-sign-up__link">
        Already have an account? <WPActionLink @click="$emit('login')">Login</WPActionLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { WPTextInput, WPButton, WPActionLink } from '@/components'

const username = ref('')
const email = ref('')
const password = ref('')
const firstname = ref('')
const lastname = ref('')
const confirmPassword = ref('')

const handleSubmit = () => {
  console.log('Submitted:', {
    username: username.value,
    email: email.value,
    password: password.value,
    firstname: firstname.value,
    lastname: lastname.value,
    confirmPassword: confirmPassword.value
  })
}
</script>

<style scoped>
.wp-start {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.wp-sign-up__container {
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

.wp-sign-up__header {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 2rem;
}

.wp-sign-up__header h1 {
  font-size: 3rem;
  font-weight: 700;
  padding: 0.5rem 0;
}

.wp-sign-up__header p {
  padding: 0.5rem 0;
  font-size: 1.25rem;
}

.wp-sign-up__form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.wp-sign-up__options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.wp-sign-up__or {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.wp-sign-up__or::before,
.wp-sign-up__or::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ccc;
  margin: 0 1rem;
}

.wp-sign-up__or span {
  font-size: 14px;
  color: #666;
}

.wp-sign-up__footer {
  text-align: center;
  margin-top: 1rem;
}

.wp-sign-up__link {
  margin-top: 0.5rem;
  font-size: 14px;
  text-align: center;
}
</style>
