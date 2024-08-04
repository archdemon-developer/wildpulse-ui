import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { StartView } from '@/views'
import { WPLoginForm, WPSignUpForm, WPForgotPasswordForm } from '@/components'
describe('StartView.vue', () => {
  it('renders WPLoginForm by default', () => {
    const wrapper = mount(StartView)
    expect(wrapper.findComponent(WPLoginForm).exists()).toBe(true)
    expect(wrapper.findComponent(WPSignUpForm).exists()).toBe(false)
    expect(wrapper.findComponent(WPForgotPasswordForm).exists()).toBe(false)
  })

  it('toggles to WPSignUpForm when sign-up event is emitted', async () => {
    const wrapper = mount(StartView)
    await wrapper.findComponent(WPLoginForm).vm.$emit('sign-up')
    expect(wrapper.findComponent(WPLoginForm).exists()).toBe(false)
    expect(wrapper.findComponent(WPSignUpForm).exists()).toBe(true)
    expect(wrapper.findComponent(WPForgotPasswordForm).exists()).toBe(false)
  })

  it('toggles to WPForgotPasswordForm when forgot-password event is emitted', async () => {
    const wrapper = mount(StartView)
    await wrapper.findComponent(WPLoginForm).vm.$emit('forgot-password')
    expect(wrapper.findComponent(WPLoginForm).exists()).toBe(false)
    expect(wrapper.findComponent(WPSignUpForm).exists()).toBe(false)
    expect(wrapper.findComponent(WPForgotPasswordForm).exists()).toBe(true)
  })

  it('toggles back to WPLoginForm from WPForgotPasswordForm when go-back event is emitted', async () => {
    const wrapper = mount(StartView)
    await wrapper.findComponent(WPLoginForm).vm.$emit('forgot-password')
    await wrapper.findComponent(WPForgotPasswordForm).vm.$emit('go-back')
    expect(wrapper.findComponent(WPLoginForm).exists()).toBe(true)
    expect(wrapper.findComponent(WPSignUpForm).exists()).toBe(false)
    expect(wrapper.findComponent(WPForgotPasswordForm).exists()).toBe(false)
  })

  it('toggles back to WPLoginForm from WPSignUpForm when login event is emitted', async () => {
    const wrapper = mount(StartView)
    await wrapper.findComponent(WPLoginForm).vm.$emit('sign-up')
    await wrapper.findComponent(WPSignUpForm).vm.$emit('login')
    expect(wrapper.findComponent(WPLoginForm).exists()).toBe(true)
    expect(wrapper.findComponent(WPSignUpForm).exists()).toBe(false)
    expect(wrapper.findComponent(WPForgotPasswordForm).exists()).toBe(false)
  })
})
