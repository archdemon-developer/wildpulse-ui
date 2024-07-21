<template>
  <component :is="componentType" v-bind="inputProps" :class="computedClass" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

type InputType = 'text' | 'email' | 'radio' | 'checkbox' | 'textarea' | 'password' | 'number'

interface InputProps {
  type: InputType
  value?: string | number
  placeholder?: string
  name?: string
  id?: string
  checked?: boolean
  disabled?: boolean
  required?: boolean
  rows?: number
  cols?: number
  class?: string
}

const props = defineProps<InputProps>()

const componentType = computed(() => {
  return props.type === 'textarea' ? 'textarea' : 'input'
})

const inputProps = computed(() => {
  const commonProps = {
    placeholder: props.placeholder,
    name: props.name,
    id: props.id,
    disabled: props.disabled,
    required: props.required
  }

  if (props.type === 'textarea') {
    return {
      ...commonProps,
      value: props.value,
      rows: props.rows,
      cols: props.cols
    }
  }

  if (props.type === 'checkbox' || props.type === 'radio') {
    return {
      ...commonProps,
      type: props.type,
      checked: props.checked
    }
  }

  return {
    ...commonProps,
    type: props.type,
    value: props.value
  }
})

const computedClass = computed(() => {
  return props.class ? props.class : 'wp-input'
})
</script>

<style scoped>
.wp-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

.wp-input::placeholder {
  color: var(--black);
}

.wp-input:focus {
  outline: none;
  border-color: var(--secondary-dark);
  box-shadow: 0 0 5px rgba(var(--secondary-dark), 0.5);
}
</style>
