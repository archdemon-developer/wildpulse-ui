import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { WPTextInput } from '@/components'

describe('WPTextInput.vue', () => {
  it('renders an input with correct default props', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    expect(input.element.type).toBe('text')
    expect(input.element.value).toBe('')
    expect(input.attributes('placeholder')).toBe('')
    expect(input.attributes('maxlength')).toBe('100')
    expect(input.attributes('minlength')).toBe('0')
    expect(input.attributes('readonly')).toBeUndefined()
    expect(input.attributes('disabled')).toBeUndefined()
    expect(input.attributes('autocomplete')).toBe('')
  })

  it('renders label when label prop is provided', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: '',
        label: 'Test Label',
        id: 'test-id'
      }
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Test Label')
    expect(label.attributes('for')).toBe('test-id')
  })

  it('emits "update:modelValue" event when input value changes', async () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('new value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('emits "update:modelValue" event with empty input on empty', async () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('toggles password visibility on click of the password toggle icon', async () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: '',
        label: 'Test Label',
        type: 'password',
        id: 'test-id'
      }
    })

    const input = wrapper.find('input')
    const toggleButton = wrapper.find('.wp-text-input__toggle')
    await toggleButton.trigger('click')

    expect(input.attributes('type')).toBe('text')
    await toggleButton.trigger('click')
    expect(input.attributes('type')).toBe('password')
  })

  it('renders error message when error prop is provided', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: '',
        error: 'Test Error'
      }
    })

    const error = wrapper.find('.wp-text-input__error')
    expect(error.exists()).toBe(true)
    expect(error.text()).toBe('Test Error')
  })

  it('renders hint message when hint prop is provided and no error exists', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: '',
        hint: 'Test Hint'
      }
    })

    const hint = wrapper.find('.wp-text-input__hint')
    expect(hint.exists()).toBe(true)
    expect(hint.text()).toBe('Test Hint')

    const error = wrapper.find('.wp-text-input__error')
    expect(error.exists()).toBe(false)
  })

  it('does not render hint message when error prop is provided', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: '',
        hint: 'Test Hint',
        error: 'Test Error'
      }
    })

    const hint = wrapper.find('.wp-text-input__hint')
    expect(hint.exists()).toBe(false)

    const error = wrapper.find('.wp-text-input__error')
    expect(error.exists()).toBe(true)
    expect(error.text()).toBe('Test Error')
  })

  it('applies input-error class when error prop is provided', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: '',
        error: 'Test Error'
      }
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('input-error')
  })

  it('does not apply input-error class when error prop is not provided', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    expect(input.classes()).not.toContain('input-error')
  })

  it('emits "change" event when input value changes', async () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('new value')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['new value'])
  })

  it('emits "blur" event when input loses focus', async () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('emits "focus" event when input gains focus', async () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.trigger('focus')

    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('renders input as password type when type prop is "password"', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: '',
        type: 'password'
      }
    })

    const input = wrapper.find('input')
    expect(input.element.type).toBe('password')
  })

  it('renders input as text type when type prop is not "password"', () => {
    const wrapper = mount(WPTextInput, {
      props: {
        modelValue: '',
        type: 'text'
      }
    })

    const input = wrapper.find('input')
    expect(input.element.type).toBe('text')
  })
})
