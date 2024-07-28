<template>
  <div :class="[props.classes]">
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>
    <section v-if="$slots.default">
      <slot name="default"></slot>
    </section>
    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface CardProps {
  classes?: string
}
const props: CardProps = withDefaults(defineProps<CardProps>(), {
  classes: ''
})
</script>

<style scoped></style>
