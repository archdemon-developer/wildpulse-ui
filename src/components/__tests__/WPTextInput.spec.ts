import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { WPTextInput } from '@/components'

describe('wildpulse text input tests', () => {
  it('renders label when passed', () => {
    const label = 'Test Label'
    const modelValue = 'dummy'
    const wrapper = mount(WPTextInput, {
      props: { label, modelValue }
    })
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe(label)
  })

  it('does not render label when not passed', () => {
    const wrapper = mount(WPTextInput)
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(WPTextInput)
    const input = wrapper.find('input')
    await input.setValue('test value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value'])
  })

  it('emits change on input change', async () => {
    const wrapper = mount(WPTextInput)
    const input = wrapper.find('input')
    await input.setValue('changed value')
    await input.trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['changed value'])
  })

  it('emits blur on input blur', async () => {
    const wrapper = mount(WPTextInput)
    const input = wrapper.find('input')
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('emits focus on input focus', async () => {
    const wrapper = mount(WPTextInput)
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('renders with default props', () => {
    const wrapper = mount(WPTextInput)
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('placeholder')).toBe('')
    expect(input.attributes('maxlength')).toBe('100')
    expect(input.attributes('minlength')).toBe('0')
    expect(input.attributes('readonly')).toBe(undefined)
    expect(input.attributes('disabled')).toBe(undefined)
    expect(input.attributes('autocomplete')).toBe('')
  })

  it('renders with custom props', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        type: 'email',
        placeholder: 'Enter your email',
        maxlength: 50,
        minlength: 5,
        readonly: true,
        disabled: true,
        autocomplete: 'on',
        modelValue: 'test@example.com',
        id: 'test-id'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('email')
    expect(input.attributes('placeholder')).toBe('Enter your email')
    expect(input.attributes('maxlength')).toBe('50')
    expect(input.attributes('minlength')).toBe('5')
    expect(input.attributes('readonly')).toBe('')
    expect(input.attributes('disabled')).toBe('')
    expect(input.attributes('autocomplete')).toBe('on')
    expect(input.element.value).toBe('test@example.com')
    expect(input.attributes('id')).toBe('test-id')
  })
})
