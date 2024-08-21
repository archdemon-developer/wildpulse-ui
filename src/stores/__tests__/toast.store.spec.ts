import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useToastStore } from '@/stores/toast.store'

describe('toast store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('checks if toasts array starts empty', () => {
    const toastStore = useToastStore()

    expect(toastStore.toasts.length).toEqual(0)
  })

  it('checks if toast is added successfully if we add toast', () => {
    const toastStore = useToastStore()

    toastStore.addToast({
      type: 'success',
      duration: 5000,
      message: 'test',
      position: 'top-right',
      title: 'Sign in successful'
    })

    expect(toastStore.toasts.length).toEqual(1)
    expect(toastStore.toasts[0].duration).toEqual(5000)
    expect(toastStore.toasts[0].message).toEqual('test')
    expect(toastStore.toasts[0].position).toEqual('top-right')
    expect(toastStore.toasts[0].type).toEqual('success')
  })

  it('checks if toast is removed when toast is removed', () => {
    const toastStore = useToastStore()

    toastStore.addToast({
      type: 'success',
      duration: 5000,
      message: 'test',
      position: 'top-right',
      title: 'Sign in successful'
    })

    toastStore.removeToast(toastStore.toasts[0].id)

    expect(toastStore.toasts.length).toEqual(0)
  })

  it('checks if toast is removed when timer runs out', () => {
    const toastStore = useToastStore()

    vi.useFakeTimers()

    toastStore.addToast({
      type: 'success',
      duration: 5000,
      message: 'test',
      position: 'top-right',
      title: 'Sign in successful'
    })

    vi.advanceTimersByTime(6000)

    expect(toastStore.toasts.length).toEqual(0)
  })

  it('uses default timer if no duration is provided', () => {
    const toastStore = useToastStore()

    vi.useFakeTimers()

    toastStore.addToast({
      type: 'success',
      message: 'test',
      position: 'top-right',
      title: 'Sign in successful'
    })

    vi.advanceTimersByTime(4000)

    expect(toastStore.toasts.length).toEqual(0)
  })
})
