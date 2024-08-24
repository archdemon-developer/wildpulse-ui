import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { StartView } from '@/views'
import { createTestingPinia } from '@pinia/testing'
import { useToastStore, useAuthStore } from '@/stores'

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
      message: 'You have logged in successfully',
      position: 'top-right',
      title: 'Successful'
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
      message: 'Move to login page to login',
      position: 'top-right',
      title: 'Successful'
    })
  })

  it('handles sign-in submission error and displays error toast', async () => {
    const wrapper = factory()
    const toastStore = useToastStore()
    const authStore = useAuthStore()

    authStore.login = vi.fn(() => {
      throw new Error('Login failed')
    })

    await wrapper.findComponent({ name: 'WPSignInForm' }).vm.$emit('sign-in-submit', {
      email: 'test@example.com',
      password: 'wrongpassword'
    })

    expect(toastStore.addToast).toHaveBeenCalledWith({
      type: 'danger',
      duration: 5000,
      message: 'Error logging in: Email or Password is incorrect',
      position: 'top-right',
      title: 'Error'
    })
  })

  it('handles sign-up submission error and displays error toast', async () => {
    const wrapper = factory()
    const toastStore = useToastStore()
    const authStore = useAuthStore()

    authStore.signup = vi.fn(() => {
      throw new Error('Sign-up failed')
    })

    await wrapper.findComponent({ name: 'WPSignInForm' }).vm.$emit('toggle-sign-up')
    await wrapper.findComponent({ name: 'WPSignUpForm' }).vm.$emit('sign-up-submit', {
      email: 'new@example.com',
      password: 'newpassword'
    })

    expect(toastStore.addToast).toHaveBeenCalledWith({
      type: 'danger',
      duration: 5000,
      message: 'Error signing up',
      position: 'top-right',
      title: 'Error'
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
