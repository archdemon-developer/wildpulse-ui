<template>
  <div class="wp-text-input">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="props.id"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :maxlength="props.maxlength"
      :minlength="props.minlength"
      :readonly="props.readonly"
      :disabled="props.disabled"
      :autocomplete="props.autocomplete"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

type InputType = 'text' | 'email' | 'password'

interface TextInputProps {
  modelValue: string
  type?: InputType
  placeholder?: string
  label?: string
  id?: string
  maxlength?: number
  minlength?: number
  readonly?: boolean
  disabled?: boolean
  autocomplete?: string
}

const props: TextInputProps = withDefaults(defineProps<TextInputProps>(), {
  type: 'text',
  placeholder: '',
  label: '',
  id: '',
  maxlength: 100,
  minlength: 0,
  readonly: false,
  disabled: false,
  autocomplete: ''
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement)?.value || '')
}

const handleChange = (event: Event) => {
  emit('change', (event.target as HTMLInputElement)?.value || '')
}

const handleBlur = (event: Event) => {
  emit('blur', event)
}

const handleFocus = (event: Event) => {
  emit('focus', event)
}
</script>

<style scoped>
.wp-text-input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.wp-text-input label {
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--black-light);
}

.wp-text-input input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.wp-text-input input:focus {
  border-color: var(--secondary);
  outline: none;
}
</style>
