<template>
  <div class="wp-toast__container">
    <WPToast
      v-for="toast in toasts"
      :key="toast.id"
      :id="toast.id"
      :title="toast.title"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
      :position="toast.position"
      @close="removeToast(toast.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast.store'
import { WPToast } from '@/components'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)

const removeToast = (id: number) => {
  toastStore.removeToast(id)
}
</script>

<style scoped>
.wp-toast__container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
}
</style>
