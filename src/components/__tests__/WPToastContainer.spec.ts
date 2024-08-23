/**
 * @vitest-environment happy-dom
 */
import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { WPToastContainer, WPToast } from '@/components'
import { useToastStore } from '@/stores/toast.store'
import { createTestingPinia } from '@pinia/testing'

describe('WPToastContainer.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(WPToastContainer, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
  })

  it('renders all toasts that have to be shown', async () => {
    const toastStore = useToastStore()

    toastStore.toasts = [
      {
        id: 1,
        title: 'Toast 1',
        message: 'Message 1',
        type: 'info',
        duration: 2000,
        position: 'top-right'
      },
      {
        id: 2,
        title: 'Toast 2',
        message: 'Message 2',
        type: 'success',
        duration: 3000,
        position: 'bottom-left'
      }
    ]

    await wrapper.vm.$nextTick()
    expect(wrapper.findAllComponents(WPToast)).toHaveLength(2)
  })

  it('calls removeToast when a WPToast emits a close event', async () => {
    const toastStore = useToastStore()

    toastStore.toasts = [
      {
        id: 1,
        title: 'Toast 1',
        message: 'Message 1',
        type: 'info',
        duration: 2000,
        position: 'top-right'
      }
    ]

    await wrapper.vm.$nextTick()

    const removeToastSpy = vi.spyOn(toastStore, 'removeToast')

    const toastComponent = wrapper.findComponent(WPToast)
    await toastComponent.vm.$emit('close')

    expect(removeToastSpy).toHaveBeenCalledOnce()
    expect(removeToastSpy).toHaveBeenCalledWith(toastStore.toasts[0].id)

    removeToastSpy.mockRestore()
  })

  it('calls removeToast multiple times if multiple WPToasts emit close events', async () => {
    const toastStore = useToastStore()

    toastStore.toasts = [
      {
        id: 1,
        title: 'Toast 1',
        message: 'Message 1',
        type: 'info',
        duration: 2000,
        position: 'top-right'
      },
      {
        id: 2,
        title: 'Toast 2',
        message: 'Message 2',
        type: 'success',
        duration: 3000,
        position: 'bottom-left'
      }
    ]

    await wrapper.vm.$nextTick()

    const removeToastSpy = vi.spyOn(toastStore, 'removeToast')

    const toastComponents = wrapper.findAllComponents(WPToast)

    await toastComponents[0].vm.$emit('close')
    await toastComponents[1].vm.$emit('close')

    expect(removeToastSpy).toHaveBeenCalledTimes(2)
    expect(removeToastSpy).toHaveBeenNthCalledWith(1, toastStore.toasts[0].id)
    expect(removeToastSpy).toHaveBeenNthCalledWith(2, toastStore.toasts[1].id)

    removeToastSpy.mockRestore()
  })
})
