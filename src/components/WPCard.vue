<template>
  <div :class="['wp-card', props.classes]">
    <div class="wp-card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="wp-card-content" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="wp-card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface CardProps {
  classes?: string
}
const props: CardProps = withDefaults(defineProps<CardProps>(), {
  classes: ''
})
</script>

<style scoped>
.wp-card {
  border: 1px solid #bbb;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
}

.wp-card-header,
.wp-card-footer,
.wp-card-content {
  padding: 10px;
}
.wp-card-body {
  padding: 10px;
}
</style>
