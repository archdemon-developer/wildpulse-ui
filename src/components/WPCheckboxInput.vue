<template>
  <div class="wp-checkbox-input">
    <input
      :id="props.id"
      type="checkbox"
      :checked="props.modelValue"
      :disabled="props.disabled"
      @change="handleChange"
    />
    <label :for="props.id">{{ props.label }}</label>
  </div>
</template>

<script setup lang="ts">
interface CheckBoxInputProps {
  modelValue: boolean
  label: string
  id: string
  disabled?: boolean
}

const props: CheckBoxInputProps = withDefaults(defineProps<CheckBoxInputProps>(), {
  disabled: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<style scoped>
.wp-checkbox-input {
  display: flex;
  align-items: center;
}

.wp-checkbox-input input {
  margin-right: 8px;
}

.wp-checkbox-input label {
  font-size: 16px;
  color: var(--black-light);
}
</style>
