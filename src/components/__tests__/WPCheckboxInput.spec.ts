import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { WPCheckboxInput } from '@/components'

describe('WPCheckboxInput.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(WPCheckboxInput, {
      props: {
        modelValue: false,
        label: 'Accept Terms',
        id: 'terms-checkbox'
      }
    })

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Accept Terms')
    expect(wrapper.find('input').element.checked).toBe(false)
    expect(wrapper.find('input').element.disabled).toBe(false)
  })

  it('renders correctly with disabled prop', () => {
    const wrapper = mount(WPCheckboxInput, {
      props: {
        modelValue: false,
        label: 'Accept Terms',
        id: 'terms-checkbox',
        disabled: true
      }
    })

    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  it('emits update:modelValue and change events on change', async () => {
    const wrapper = mount(WPCheckboxInput, {
      props: {
        modelValue: false,
        label: 'Accept Terms',
        id: 'terms-checkbox'
      }
    })

    await wrapper.find('input').setValue(true) // Simulate checking the checkbox
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['change']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
    expect(wrapper.emitted()['change'][0]).toEqual([true])
  })

  it('emits update:modelValue with the correct value', async () => {
    const wrapper = mount(WPCheckboxInput, {
      props: {
        modelValue: false,
        label: 'Accept Terms',
        id: 'terms-checkbox'
      }
    })

    const input = wrapper.find('input')
    await input.setValue(true)
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
  })
})
