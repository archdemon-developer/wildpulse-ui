import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WPInput from '@/components/WPInput.vue'

describe('wp input tests', () => {
  it('renders an input element for type text', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'text',
        placeholder: 'Enter text'
      }
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('placeholder')).toBe('Enter text')
  })

  it('renders a textarea element for type textarea', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'textarea',
        placeholder: 'Enter text',
        rows: 5,
        cols: 40
      }
    })
    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('placeholder')).toBe('Enter text')
    expect(textarea.attributes('rows')).toBe('5')
    expect(textarea.attributes('cols')).toBe('40')
  })

  it('renders a checkbox input', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'checkbox',
        checked: true
      }
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('checkbox')
    expect(input.element.checked).toBe(true)
  })

  it('renders a radio input', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'radio',
        checked: false
      }
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('radio')
    expect(input.element.checked).toBe(false)
  })

  it('applies additional props to the input element', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'text',
        name: 'testName',
        id: 'testId',
        disabled: true,
        required: true,
        value: 'Test value'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('name')).toBe('testName')
    expect(input.attributes('id')).toBe('testId')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('required')).toBeDefined()
    expect(input.element.value).toBe('Test value')
  })

  it('applies custom class if provided', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'text',
        class: 'custom-class'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('custom-class')
  })

  it('applies default class if no custom class is provided', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'text'
      }
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('wp-input')
  })
})
