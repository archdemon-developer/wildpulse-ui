import type { Toast } from '@/shared/ts/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])
  let idCounter: number = 0

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const newToast = { id: idCounter++, ...toast }
    toasts.value.push(newToast)
    setTimeout(() => removeToast(newToast.id), newToast.duration || 3000)
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return {
    toasts,
    addToast,
    removeToast
  }
})
