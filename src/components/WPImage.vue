<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :class="props.classes"
    :width="props.width"
    :height="props.height"
    :loading="props.loading"
    :title="props.title"
    :style="props.style"
  />
</template>

<script setup lang="ts">
type LoadingVariant = 'eager' | 'lazy'

interface ImgProps {
  src: string
  alt: string
  classes?: string
  width?: string | number
  height?: string | number
  loading?: LoadingVariant
  title?: string
  style?: string | Record<string, string | number>
}

const props: ImgProps = withDefaults(defineProps<ImgProps>(), {
  classes: '',
  width: undefined,
  height: undefined,
  loading: 'lazy',
  title: '',
  style: ''
})
</script>

<style scoped></style>
