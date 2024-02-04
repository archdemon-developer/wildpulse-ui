<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";

interface InputProps {
  type: InputTypeHTMLAttribute;
  placeholder: string;
  label: string;
}

const props: InputProps = defineProps<InputProps>();
</script>

<template>
  <div class="input-container">
    <label for="">{{ props.label }}</label>
    <input :type="props.type" :placeholder="props.placeholder" />
  </div>
</template>

<style scoped lang="scss"></style>
