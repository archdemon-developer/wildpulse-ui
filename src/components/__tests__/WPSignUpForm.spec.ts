import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { WPActionLink, WPButton, WPSignUpForm, WPTextInput } from '@/components'

describe('WPSignUpForm.vue', () => {
  it('renders the sign up form with all the fields', () => {
    const wrapper = mount(WPSignUpForm)

    expect(wrapper.find('h1').text()).toBe('Join Us!')
    expect(wrapper.find('p').text()).toBe('Start your journey with us.')

    const textInputs = wrapper.findAllComponents(WPTextInput)
    const actionLinks = wrapper.findAllComponents(WPActionLink)

    expect(textInputs.length).toEqual(4)
    expect(actionLinks.length).toEqual(1)
    expect(textInputs.at(0)?.props().type).toBe('email')
    expect(textInputs.at(1)?.props().type).toBe('text')
    expect(textInputs.at(2)?.props().type).toBe('password')
    expect(textInputs.at(3)?.props().type).toBe('password')
    expect(wrapper.findComponent(WPButton).text()).toBe('Sign up')
    expect(actionLinks.at(0)?.text()).toBe('Log in')
  })

  it('shows error when email, username and password are empty and form is submitted', async () => {
    const wrapper = mount(WPSignUpForm)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Email is required.')
    expect(wrapper.text()).toContain('Password is required.')
    expect(wrapper.text()).toContain('Username is required.')
  })

  it('shows error for invalid email and does not emit event', async () => {
    const wrapper = mount(WPSignUpForm)
    const inputs = wrapper.findAllComponents(WPTextInput)

    await inputs.at(0)?.setValue('invalid-email')
    await inputs.at(1)?.setValue('username')
    await inputs.at(2)?.setValue('pass123')
    await inputs.at(3)?.setValue('pass123')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Please enter a valid email')
    expect(wrapper.emitted('sign-in-submit')).toBeFalsy()
  })

  it('shows error for mismatched password and confirmpassword does not emit event', async () => {
    const wrapper = mount(WPSignUpForm)
    const inputs = wrapper.findAllComponents(WPTextInput)

    await inputs.at(0)?.setValue('invalid-email@abc.com')
    await inputs.at(1)?.setValue('username')
    await inputs.at(2)?.setValue('pass123')
    await inputs.at(3)?.setValue('pass1234')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Passwords do not match.')
    expect(wrapper.emitted('sign-up-submit')).toBeFalsy()
  })

  it('shows error for mismatched password and confirmpassword does not emit event', async () => {
    const wrapper = mount(WPSignUpForm)
    const inputs = wrapper.findAllComponents(WPTextInput)

    await inputs.at(0)?.setValue('invalid-email@abc.com')
    await inputs.at(1)?.setValue('username')
    await inputs.at(2)?.setValue('pass123')
    await inputs.at(3)?.setValue('pass1234')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Passwords do not match.')
    expect(wrapper.emitted('sign-up-submit')).toBeFalsy()
  })

  it('emits toggle-sign-in event when "Log in" link is clicked', async () => {
    const wrapper = mount(WPSignUpForm)
    const actionLinks = wrapper.findAllComponents(WPActionLink)

    await actionLinks.at(0)?.trigger('click')

    expect(wrapper.emitted('toggle-sign-in')).toBeTruthy()
  })

  it('emits "sign-up-submit" with the correct input data when form is valid', async () => {
    const wrapper = mount(WPSignUpForm)

    await wrapper.findAllComponents(WPTextInput).at(0)?.setValue('test@example.com')
    await wrapper.findAllComponents(WPTextInput).at(1)?.setValue('username')
    await wrapper.findAllComponents(WPTextInput).at(2)?.setValue('password123')
    await wrapper.findAllComponents(WPTextInput).at(3)?.setValue('password123')

    await wrapper.vm.$nextTick()

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('sign-up-submit')).toBeTruthy()
    expect(wrapper.emitted('sign-up-submit')![0][0]).toEqual({
      email: 'test@example.com',
      username: 'username',
      password: 'password123',
      confirmPassword: 'password123'
    })
  })
})
