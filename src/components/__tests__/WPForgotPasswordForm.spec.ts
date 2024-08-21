import { describe, expect, it } from 'vitest'
import { WPForgotPasswordForm, WPTextInput, WPButton, WPActionLink } from '@/components'
import { mount } from '@vue/test-utils'

describe('WPForgotPasswordForm.vue', () => {
  it('renders the forgot password form correctly', () => {
    const wrapper = mount(WPForgotPasswordForm)

    expect(wrapper.find('h1').text()).toBe('Forgot Password')
    expect(wrapper.find('p').text()).toBe('Enter your email to receive a reset link.')
    expect(wrapper.findComponent(WPTextInput).exists()).toBe(true)
    expect(wrapper.findComponent(WPTextInput).props().type).toBe('email')
    expect(wrapper.findComponent(WPButton).text()).toBe('Get Reset Link')
    expect(wrapper.find('a').text()).toBe('Back to Login')
  })

  it('shows error when email is not entered and submit is pressed', async () => {
    const wrapper = mount(WPForgotPasswordForm)

    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.text()).toContain('Email is required.')
  })

  it('shows error for invalid email and does not emit event', async () => {
    const wrapper = mount(WPForgotPasswordForm)
    const emailInput = wrapper.findComponent(WPTextInput)

    await emailInput.setValue('invalid-email')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Please enter a valid email')
    expect(wrapper.emitted('forgot-password-submit')).toBeFalsy()
  })

  it('emits event with correct email when form is submitted', async () => {
    const wrapper = mount(WPForgotPasswordForm)
    const emailInput = wrapper.findComponent(WPTextInput)
    await emailInput.setValue('test@example.com')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('forgot-password-submit')).toBeTruthy()
    expect(wrapper.emitted('forgot-password-submit')![0]).toEqual(['test@example.com'])
  })

  it('emits back-to-login when the link is clicked', async () => {
    const wrapper = mount(WPForgotPasswordForm)
    await wrapper.findComponent(WPActionLink).trigger('click')
    expect(wrapper.emitted('back-to-login')).toBeTruthy()
  })
})
