<script setup lang="ts">
import { WPInput } from "@/components";
</script>

<template>
  <div class="start-container">
    <div class="toggle-container">
      <span>LOGIN</span>
      <span>SIGN UP</span>
    </div>
    <div class="login-container">
      <WPInput
        :type="'email'"
        :placeholder="'Enter your email'"
        :label="'Email'"
      />
      <WPInput
        :type="'password'"
        :placeholder="'Enter your password'"
        :label="'Password'"
      />
    </div>
    <div class="signup-container">
      <WPInput
        :type="'text'"
        :placeholder="'Enter your username'"
        :label="'Username'"
      />
      <WPInput
        :type="'email'"
        :placeholder="'Enter your email'"
        :label="'Email'"
      />
      <WPInput
        :type="'password'"
        :placeholder="'Enter your password'"
        :label="'Password'"
      />
      <WPInput
        :type="'password'"
        :placeholder="'Re-enter your password'"
        :label="'Confirm Password'"
      />
    </div>
  </div>
</template>

<style scoped lang="ts"></style>
