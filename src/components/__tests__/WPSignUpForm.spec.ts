// src/components/__tests/WPSignUp.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { WPSignUpForm } from '@/components'
import { WPTextInput, WPButton, WPActionLink } from '@/components'

describe('WPSignUp.vue', () => {
  const wrapper = mount(WPSignUpForm, {
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
    const header = wrapper.find('.wp-sign-up__header')
    expect(header.text()).toContain('Join Us!')
    expect(header.text()).toContain('Create a new account to get started.')
  })

  it('renders WPTextInput for username with correct props', () => {
    const wpTextInput = wrapper.findAllComponents(WPTextInput)[0]
    expect(wpTextInput.exists()).toBe(true)
    expect(wpTextInput.props('placeholder')).toBe('Enter your desired username*')
  })

  it('renders WPTextInput for email with correct props', () => {
    const wpTextInput = wrapper.findAllComponents(WPTextInput)[1]
    expect(wpTextInput.exists()).toBe(true)
    expect(wpTextInput.props('placeholder')).toBe('Enter your email*')
  })

  it('renders WPTextInput for first name with correct props', () => {
    const wpTextInput = wrapper.findAllComponents(WPTextInput)[2]
    expect(wpTextInput.exists()).toBe(true)
    expect(wpTextInput.props('placeholder')).toBe('Enter your first name')
  })

  it('renders WPTextInput for last name with correct props', () => {
    const wpTextInput = wrapper.findAllComponents(WPTextInput)[3]
    expect(wpTextInput.exists()).toBe(true)
    expect(wpTextInput.props('placeholder')).toBe('Enter your last name')
  })

  it('renders WPTextInput for password with correct props', () => {
    const wpTextInput = wrapper.findAllComponents(WPTextInput)[4]
    expect(wpTextInput.exists()).toBe(true)
    expect(wpTextInput.props('placeholder')).toBe('Enter password*')
  })

  it('renders WPTextInput for confirm password with correct props', () => {
    const wpTextInput = wrapper.findAllComponents(WPTextInput)[5]
    expect(wpTextInput.exists()).toBe(true)
    expect(wpTextInput.props('placeholder')).toBe('Confirm your password*')
  })

  it('renders WPButton with correct text', () => {
    const wpButton = wrapper.findComponent(WPButton)
    expect(wpButton.exists()).toBe(true)
    expect(wpButton.text()).toBe('Sign Up')
  })

  it('renders WPActionLink for login with correct text and emits "login" event on click', async () => {
    const wpActionLink = wrapper.findComponent(WPActionLink)
    expect(wpActionLink.exists()).toBe(true)
    expect(wpActionLink.text()).toBe('Login')

    await wpActionLink.trigger('click')
    expect(wrapper.emitted('login')).toBeTruthy()
  })

  it('handles form submission correctly', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log')

    // Set values for inputs
    await wrapper.findAllComponents(WPTextInput)[0].setValue('testuser')
    await wrapper.findAllComponents(WPTextInput)[1].setValue('testuser@example.com')
    await wrapper.findAllComponents(WPTextInput)[2].setValue('John')
    await wrapper.findAllComponents(WPTextInput)[3].setValue('Doe')
    await wrapper.findAllComponents(WPTextInput)[4].setValue('password123')
    await wrapper.findAllComponents(WPTextInput)[5].setValue('password123')

    // Trigger form submit
    await wrapper.find('form').trigger('submit.prevent')

    // Verify console.log output
    expect(consoleLogSpy).toHaveBeenCalledWith('Submitted:', {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      firstname: 'John',
      lastname: 'Doe',
      confirmPassword: 'password123'
    })
  })
})
