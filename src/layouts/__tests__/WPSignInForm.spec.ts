/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { WPActionLink, WPTextInput, WPButton, WPCheckboxInput } from '@/components'
import { WPSignInForm } from '@/layouts'

describe('WPSignInForm.vue', () => {
  it('renders the Sign In form correctly', () => {
    const wrapper = mount(WPSignInForm, {
      components: {
        WPActionLink,
        WPSignInForm,
        WPTextInput,
        WPButton,
        WPCheckboxInput
      }
    })
    expect(wrapper.find('h1').text()).toBe('Welcome Back!')
    expect(wrapper.find('p').text()).toBe('Pick up your journey from where you left off!')

    const textInputs = wrapper.findAllComponents(WPTextInput)
    const actionLinks = wrapper.findAllComponents(WPActionLink)

    expect(textInputs.at(0)?.props().type).toBe('email')
    expect(textInputs.at(1)?.props().type).toBe('password')
    expect(wrapper.findComponent(WPButton).text()).toBe('Log in')
    expect(actionLinks.at(0)?.text()).toBe('Forgot Password?')
    expect(actionLinks.at(1)?.text()).toBe('Sign up')
  })

  it('shows error when email and password are empty and form is submitted', async () => {
    const wrapper = mount(WPSignInForm, {
      components: {
        WPActionLink,
        WPSignInForm,
        WPTextInput,
        WPButton,
        WPCheckboxInput
      }
    })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.text()).toContain('Email is required.')
    expect(wrapper.text()).toContain('Password is required.')
  })

  it('shows error for invalid email and does not emit event', async () => {
    const wrapper = mount(WPSignInForm, {
      components: {
        WPActionLink,
        WPSignInForm,
        WPTextInput,
        WPButton,
        WPCheckboxInput
      }
    })
    const emailInput = wrapper.findAllComponents(WPTextInput)

    await emailInput.at(0)?.setValue('invalid-email')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Please enter a valid email')
    expect(wrapper.emitted('sign-in-submit')).toBeFalsy()
  })

  it('shows error when password is empty and form is submitted', async () => {
    const wrapper = mount(WPSignInForm)
    const emailInput = wrapper.findAllComponents(WPTextInput)

    await emailInput.at(0)?.setValue('test@example.com')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Password is required.')
    expect(wrapper.emitted('sign-in-submit')).toBeFalsy()
  })

  it('emits forgot-password event when "Forgot Password?" link is clicked', async () => {
    const wrapper = mount(WPSignInForm, {
      components: {
        WPActionLink,
        WPSignInForm,
        WPTextInput,
        WPButton,
        WPCheckboxInput
      }
    })

    const actionLinks = wrapper.findAllComponents(WPActionLink)

    await actionLinks.at(0)?.trigger('click')

    expect(wrapper.emitted('forgot-password')).toBeTruthy()
  })

  it('emits toggle-sign-up event when "Sign up" link is clicked', async () => {
    const wrapper = mount(WPSignInForm, {
      components: {
        WPActionLink,
        WPSignInForm,
        WPTextInput,
        WPButton,
        WPCheckboxInput
      }
    })
    const actionLinks = wrapper.findAllComponents(WPActionLink)

    await actionLinks.at(1)?.trigger('click')

    expect(wrapper.emitted('toggle-sign-up')).toBeTruthy()
  })

  it('emits "sign-in-submit" with the correct input data when form is valid', async () => {
    const wrapper = mount(WPSignInForm)

    await wrapper.findAllComponents(WPTextInput).at(0)?.setValue('test@example.com')
    await wrapper.findAllComponents(WPTextInput).at(1)?.setValue('password123')
    await wrapper.findComponent(WPCheckboxInput).setValue(true)
    await wrapper.vm.$nextTick()

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('sign-in-submit')).toBeTruthy()
    expect(wrapper.emitted('sign-in-submit')![0][0]).toEqual({
      email: 'test@example.com',
      password: 'password123',
      shouldRememberMe: true
    })
  })
})
