import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { StartView } from '@/views'
import { createTestingPinia } from '@pinia/testing'
import { useToastStore } from '@/stores/toast.store'

describe('WpStart.vue', () => {
  const factory = () => {
    return mount(StartView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
  }

  it('renders the sign-in form initially', () => {
    const wrapper = factory()
    expect(wrapper.findComponent({ name: 'WPSignInForm' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'WPSignUpForm' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'WPForgotPasswordForm' }).exists()).toBe(false)
  })

  it('toggles to the sign-up form', async () => {
    const wrapper = factory()
    await wrapper.findComponent({ name: 'WPSignInForm' }).vm.$emit('toggle-sign-up')

    expect(wrapper.findComponent({ name: 'WPSignInForm' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'WPSignUpForm' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'WPForgotPasswordForm' }).exists()).toBe(false)
  })

  it('toggles to the forgot password form', async () => {
    const wrapper = factory()
    await wrapper.findComponent({ name: 'WPSignInForm' }).vm.$emit('forgot-password')

    expect(wrapper.findComponent({ name: 'WPSignInForm' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'WPSignUpForm' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'WPForgotPasswordForm' }).exists()).toBe(true)
  })

  it('returns to sign-in form from sign-up form', async () => {
    const wrapper = factory()
    await wrapper.findComponent({ name: 'WPSignInForm' }).vm.$emit('toggle-sign-up')
    await wrapper.findComponent({ name: 'WPSignUpForm' }).vm.$emit('toggle-sign-in')

    expect(wrapper.findComponent({ name: 'WPSignInForm' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'WPSignUpForm' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'WPForgotPasswordForm' }).exists()).toBe(false)
  })

  it('returns to sign-in form from forgot password form', async () => {
    const wrapper = factory()
    await wrapper.findComponent({ name: 'WPSignInForm' }).vm.$emit('forgot-password')
    await wrapper.findComponent({ name: 'WPForgotPasswordForm' }).vm.$emit('back-to-login')

    expect(wrapper.findComponent({ name: 'WPSignInForm' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'WPSignUpForm' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'WPForgotPasswordForm' }).exists()).toBe(false)
  })

  it('handles sign-in submission and displays toast', async () => {
    const wrapper = factory()
    const toastStore = useToastStore()

    await wrapper.findComponent({ name: 'WPSignInForm' }).vm.$emit('sign-in-submit', {
      email: 'test@example.com',
      password: 'password'
    })

    expect(toastStore.addToast).toHaveBeenCalledWith({
      type: 'success',
      duration: 5000,
      message:
        'Sign-in form submitted with data: {"email":"test@example.com","password":"password"}',
      position: 'top-right',
      title: 'Sign in successful'
    })
  })

  it('handles sign-up submission and displays toast', async () => {
    const wrapper = factory()
    const toastStore = useToastStore()

    await wrapper.findComponent({ name: 'WPSignInForm' }).vm.$emit('toggle-sign-up')
    await wrapper.findComponent({ name: 'WPSignUpForm' }).vm.$emit('sign-up-submit', {
      email: 'new@example.com',
      password: 'newpassword'
    })

    expect(toastStore.addToast).toHaveBeenCalledWith({
      type: 'success',
      duration: 5000,
      message:
        'Sign-up form submitted with data: {"email":"new@example.com","password":"newpassword"}',
      position: 'top-right',
      title: 'Sign up successful'
    })
  })

  it('handles forgot password submission and displays toast', async () => {
    const wrapper = factory()
    const toastStore = useToastStore()

    await wrapper.findComponent({ name: 'WPSignInForm' }).vm.$emit('forgot-password')
    await wrapper
      .findComponent({ name: 'WPForgotPasswordForm' })
      .vm.$emit('forgot-password-submit', 'test@example.com')

    expect(toastStore.addToast).toHaveBeenCalledWith({
      type: 'success',
      duration: 5000,
      message: 'Reset link sent to your email: test@example.com',
      position: 'top-right',
      title: 'Reset link sent successfully'
    })
  })
})
