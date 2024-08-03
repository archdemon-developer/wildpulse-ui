// src/components/__tests/WPSignIn.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { WPLoginForm } from '@/components'
import { WPTextInput, WPButton, WPActionLink } from '@/components'

describe('wildpulse sign in form tests', () => {
  const wrapper = mount(WPLoginForm, {
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
    const header = wrapper.find('.wp-sign-in__header')
    expect(header.text()).toContain('Welcome Back!')
    expect(header.text()).toContain('Pick up your journey from where you left off.')
  })

  it('renders WPTextInput for username or email with correct props', () => {
    const wpTextInput = wrapper.findAllComponents(WPTextInput)[0]
    expect(wpTextInput.exists()).toBe(true)
    expect(wpTextInput.props('placeholder')).toBe('Enter username or email*')
  })

  it('renders WPTextInput for password with correct props', () => {
    const wpTextInput = wrapper.findAllComponents(WPTextInput)[1]
    expect(wpTextInput.exists()).toBe(true)
    expect(wpTextInput.props('placeholder')).toBe('Enter password*')
  })

  it('renders WPButton with correct text', () => {
    const wpButton = wrapper.findComponent(WPButton)
    expect(wpButton.exists()).toBe(true)
    expect(wpButton.text()).toBe('Login')
  })

  it('renders WPActionLink for forgot password with correct text and emits "forgot-password" event on click', async () => {
    const wpActionLink = wrapper.findAllComponents(WPActionLink)[0]
    expect(wpActionLink.exists()).toBe(true)
    expect(wpActionLink.text()).toBe('Forgot Password?')

    await wpActionLink.trigger('click')
    expect(wrapper.emitted('forgot-password')).toBeTruthy()
  })

  it('renders WPActionLink for sign up with correct text and emits "sign-up" event on click', async () => {
    const wpActionLink = wrapper.findAllComponents(WPActionLink)[1]
    expect(wpActionLink.exists()).toBe(true)
    expect(wpActionLink.text()).toBe('Sign Up')

    await wpActionLink.trigger('click')
    expect(wrapper.emitted('sign-up')).toBeTruthy()
  })

  it('handles form submission correctly', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log')

    // Set values for inputs
    await wrapper.findAllComponents(WPTextInput)[0].setValue('testuser@example.com')
    await wrapper.findAllComponents(WPTextInput)[1].setValue('password123')
    await wrapper.find('input[type="checkbox"]').setValue(true)
    await wrapper.find('form').trigger('submit.prevent')
    expect(consoleLogSpy).toHaveBeenCalledWith('Submitted:', {
      usernameOrEmail: 'testuser@example.com',
      password: 'password123',
      rememberMe: true
    })
  })
})
