<template>
  <label v-if="isInlineLabel" :class="labelClass">
    <component :is="componentType" v-bind="inputProps" :class="inputClass" />
    <span>{{ label }}</span>
  </label>
  <div v-else :class="containerClass">
    <component :is="componentType" v-bind="inputProps" :class="inputClass" />
  </div>
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
  label?: string
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
    required: props.required,
    value: props.value
  }

  if (props.type === 'textarea') {
    return {
      ...commonProps,
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
    type: props.type
  }
})

const inputClass = computed(() => {
  const baseClass = ['text', 'email', 'textarea', 'password', 'number'].includes(props.type)
    ? 'wp-input'
    : 'wp-input-inline'
  return props.class ? `${baseClass} ${props.class}` : baseClass
})

const labelClass = computed(() => {
  return 'wp-label-inline'
})

const isInlineLabel = computed(() => {
  return props.type === 'checkbox' || props.type === 'radio'
})

const containerClass = computed(() => {
  return isInlineLabel.value ? '' : 'wp-input-container'
})
</script>

<style scoped>
.wp-input-container {
  width: 100%;
}

.wp-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.wp-input::placeholder {
  color: var(--black);
}

.wp-input:focus {
  outline: none;
  border-color: var(--secondary-light);
  box-shadow: 0 0 5px rgba(var(--secondary-light), 0.5);
}

.wp-input-inline {
  padding: 5px;
  width: auto;
  margin-right: 10px;
  vertical-align: middle;
}

.wp-label-inline {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.wp-label-inline span {
  margin-left: 5px;
  font-size: 14px;
  color: var(--text-color);
}
</style>
