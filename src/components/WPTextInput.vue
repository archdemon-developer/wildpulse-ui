<template>
  <div class="wp-text-input">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="wp-text-input__container">
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autocomplete"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        :class="{ 'input-error': !!error }"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="wp-text-input__toggle"
        @click="togglePasswordVisibility"
        :aria-label="passwordToggleLabel"
      >
        <Icon :icon="isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'" />
      </button>
    </div>
    <small v-if="hint && !error" class="wp-text-input__hint">{{ hint }}</small>
    <small v-if="error" class="wp-text-input__error">{{ error }}</small>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

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
  error?: string
  hint?: string
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
  autocomplete: '',
  error: '',
  hint: ''
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const isPasswordVisible = ref(false)

const inputType = computed(() =>
  props.type === 'password' && !isPasswordVisible.value ? 'password' : 'text'
)

const passwordToggleLabel = computed(() =>
  isPasswordVisible.value ? 'Hide password' : 'Show password'
)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

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

.wp-text-input__container {
  position: relative;
}

.wp-text-input input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
  width: 100%;
}

.wp-text-input input:focus {
  border-color: var(--secondary);
  outline: none;
}

.wp-text-input input.input-error {
  border-color: var(--danger);
}

.wp-text-input__toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
}

.wp-text-input__hint {
  font-size: 12px;
  color: var(--black-light);
  margin-top: 5px;
}

.wp-text-input__error {
  font-size: 12px;
  color: var(--danger);
  margin-top: 5px;
}
</style>
