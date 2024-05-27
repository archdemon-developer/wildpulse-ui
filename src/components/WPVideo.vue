<template>
  <video :class="props.class" :autoplay="props.autoplay" :muted="props.muted" :loop="props.loop">
    <source :src="props.src" :type="props.type" />
    Your browser does not support the video tag.
  </video>
</template>

<script setup lang="ts">
interface VideoProps {
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  class?: string
  src: string
  type: string
}

const props: VideoProps = withDefaults(defineProps<VideoProps>(), {
  autoplay: false,
  muted: false,
  loop: false,
  class: ''
})
</script>

<style scoped></style>
