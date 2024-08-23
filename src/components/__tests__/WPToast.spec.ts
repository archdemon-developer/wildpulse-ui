import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import type { ToastPosition, Toast as ToastProps, ToastType } from '@/shared/ts/types'
import { WPToast } from '@/components'
import { Icon } from '@iconify/vue'

describe('WPToast.vue', () => {
  const defaultProps: ToastProps = {
    id: 1,
    title: 'Test Title',
    message: 'This is a test message',
    position: 'top-right',
    duration: 2000
  }

  it('renders the toast correctly without type prop', () => {
    const wrapper = mount(WPToast, {
      props: defaultProps,
      global: {
        components: {
          Icon
        }
      }
    })

    const toastDiv = wrapper.find('.wp-toast')
    expect(toastDiv.exists()).toBe(true)
    expect(toastDiv.classes()).toContain('wp-toast__top-right')
    expect(toastDiv.classes()).toContain('wp-toast__info')
    expect(wrapper.find('.wp-toast__title').text()).toBe('Test Title')
    expect(wrapper.find('.wp-toast__message').text()).toBe('This is a test message')
    expect((wrapper.vm as any).toastIcon).toEqual('mdi:information')
  })

  it('renders the toast correctly without duration prop and position, but closes in default of 1500ms', () => {
    vi.useFakeTimers()
    const wrapper = mount(WPToast, {
      props: {
        id: 1,
        title: 'Test Title',
        message: 'This is a test message'
      },
      global: {
        components: {
          Icon
        }
      }
    })

    const toastDiv = wrapper.find('.wp-toast')
    expect(toastDiv.exists()).toBe(true)
    expect(toastDiv.classes()).toContain('wp-toast__top-right')
    expect(toastDiv.classes()).toContain('wp-toast__info')
    expect(wrapper.find('.wp-toast__title').text()).toBe('Test Title')
    expect(wrapper.find('.wp-toast__message').text()).toBe('This is a test message')
    expect((wrapper.vm as any).toastIcon).toEqual('mdi:information')
    vi.advanceTimersByTime(2000)
    expect((wrapper.vm as any).isVisible).toBeFalsy()
  })

  it('renders the correct toast with the right classes for type', () => {
    const types: ToastType[] = ['info', 'warning', 'success', 'danger']

    types.forEach((type) => {
      const props: ToastProps = {
        ...defaultProps,
        type
      }

      const wrapper = mount(WPToast, {
        props: props,
        global: {
          components: {
            Icon
          }
        }
      })

      const toastDiv = wrapper.find('.wp-toast')
      expect(toastDiv.classes()).toContain('wp-toast__' + type)
    })
  })

  it('renders the correct toast with the right positions for position', () => {
    const positions: ToastPosition[] = ['top-left', 'bottom-left', 'bottom-right', 'top-right']

    positions.forEach((position) => {
      const props: ToastProps = {
        ...defaultProps,
        position
      }

      const wrapper = mount(WPToast, {
        props: props,
        global: {
          components: {
            Icon
          }
        }
      })

      const toastDiv = wrapper.find('.wp-toast')
      expect(toastDiv.classes()).toContain('wp-toast__' + position)
    })
  })

  it('emits the close event correctly when close icon is clicked', () => {
    const wrapper = mount(WPToast, {
      props: defaultProps,
      global: {
        components: {
          Icon
        }
      }
    })

    const closeButton = wrapper.find('.wp-toast__close')

    closeButton.trigger('click')

    expect((wrapper.vm as any).isVisible).toBeFalsy()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('renders toast and closes after specified time', async () => {
    vi.useFakeTimers()

    const wrapper = mount(WPToast, {
      props: defaultProps,
      global: {
        components: {
          Icon
        }
      }
    })

    expect((wrapper.vm as any).isVisible).toBeTruthy()
    await vi.advanceTimersByTime(3000)
    expect((wrapper.vm as any).isVisible).toBeFalsy()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('pauses timeout on mouse over event', async () => {
    vi.useFakeTimers()

    const wrapper = mount(WPToast, {
      props: defaultProps,
      global: {
        components: {
          Icon
        }
      }
    })

    const toastDiv = wrapper.find('.wp-toast')

    toastDiv.trigger('mouseover')
    expect((wrapper.vm as any).isVisible).toBeTruthy()
    await vi.advanceTimersByTime(3000)
    expect((wrapper.vm as any).isVisible).toBeTruthy()

    await toastDiv.trigger('mouseleave')
    await vi.advanceTimersByTime(3000)
    expect((wrapper.vm as any).isVisible).toBeFalsy()
  })

  it('cleans up timer on component unmount', async () => {
    vi.useFakeTimers()

    const wrapper = mount(WPToast, {
      props: defaultProps,
      global: {
        components: {
          Icon
        }
      }
    })

    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

    expect((wrapper.vm as any).isVisible).toBeTruthy()

    wrapper.unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
