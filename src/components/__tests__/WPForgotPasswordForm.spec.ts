// WPForgotPassword.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { WPForgotPasswordForm } from '@/components'
import { WPTextInput, WPButton, WPActionLink } from '@/components'

describe('wildpulse forgot password tests', () => {
  const wrapper = mount(WPForgotPasswordForm, {
    global: {
      components: {
        WPTextInput,
        WPButton,
        WPActionLink
      }
    }
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays header text', () => {
    const header = wrapper.find('.wp-forgot-password__header')
    expect(header.text()).toContain('Reset Your Password')
    expect(header.text()).toContain(
      'Enter your email address below to receive a password reset link.'
    )
  })

  it('renders WPTextInput with correct props', () => {
    const wpTextInput = wrapper.findComponent(WPTextInput)
    expect(wpTextInput.exists()).toBe(true)
    expect(wpTextInput.props('placeholder')).toBe('Enter your email*')
  })

  it('renders WPButton with correct text', () => {
    const wpButton = wrapper.findComponent(WPButton)
    expect(wpButton.exists()).toBe(true)
    expect(wpButton.text()).toBe('Get Reset Link')
  })

  it('renders WPActionLink with correct text and emits "go-back" event on click', async () => {
    const wpActionLink = wrapper.findComponent(WPActionLink)
    expect(wpActionLink.exists()).toBe(true)
    expect(wpActionLink.text()).toBe('Go Back')

    await wpActionLink.trigger('click')
    expect(wrapper.emitted('go-back')).toBeTruthy()
  })

  it('handles form submission correctly', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log')
    await wrapper.findComponent(WPTextInput).setValue('test@example.com')
    await wrapper.find('form').trigger('submit.prevent')
    expect(consoleLogSpy).toHaveBeenCalledWith('Password reset link sent to:', 'test@example.com')
  })
})
