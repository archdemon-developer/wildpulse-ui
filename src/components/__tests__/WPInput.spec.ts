import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WPInput from '@/components/WPInput.vue'

describe('wildpulse input tests', () => {
  it('renders text input correctly', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'text',
        placeholder: 'Enter text',
        value: 'Sample Text'
      }
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('placeholder')).toBe('Enter text')
    expect(input.element.value).toBe('Sample Text')
    expect(input.classes()).toContain('wp-input')
  })

  it('renders email input correctly', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'email',
        placeholder: 'Enter email'
      }
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('email')
    expect(input.attributes('placeholder')).toBe('Enter email')
    expect(input.classes()).toContain('wp-input')
  })

  it('renders checkbox with label correctly', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'checkbox',
        label: 'Accept terms'
      }
    })
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    const input = label.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('checkbox')
    expect(label.text()).toContain('Accept terms')
    expect(label.classes()).toContain('wp-label-inline')
  })

  it('renders radio button with label correctly', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'radio',
        label: 'Option 1'
      }
    })
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    const input = label.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('radio')
    expect(label.text()).toContain('Option 1')
    expect(label.classes()).toContain('wp-label-inline')
  })

  it('renders textarea correctly', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'textarea',
        placeholder: 'Enter details',
        rows: 4,
        cols: 50
      }
    })
    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('placeholder')).toBe('Enter details')
    expect(textarea.attributes('rows')).toBe('4')
    expect(textarea.attributes('cols')).toBe('50')
    expect(textarea.classes()).toContain('wp-input')
  })

  it('applies custom class correctly', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'text',
        class: 'custom-class'
      }
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.classes()).toContain('custom-class')
  })

  it('disables input correctly', () => {
    const wrapper = mount(WPInput, {
      props: {
        type: 'text',
        disabled: true
      }
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('disabled')).toBeDefined()
  })
})
