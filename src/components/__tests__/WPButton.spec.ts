/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import WPButton from '@/components/WPButton.vue'
import { describe, expect, it, vi } from 'vitest'

describe('wildpulse button tests', () => {
  it('emits click event when clicked', async () => {
    const wrapper = mount(WPButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('renders button with default props', () => {
    const wrapper = mount(WPButton, {
      props: {
        type: 'button',
        click: vi.fn()
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.props('type')).toBe('button')
    expect(wrapper.props('disabled')).toBe(false)
    expect(wrapper.props('loading')).toBe(false)
    expect(wrapper.props('variant')).toBe('primary')
    expect(wrapper.props('size')).toBe('md')
    expect(wrapper.props('icon')).toBe('')
    expect(wrapper.props('block')).toBe(false)
    expect(wrapper.props('ariaLabel')).toBe('')
  })

  it('applies variant class based on prop', async () => {
    const wrapper = mount(WPButton, {
      props: {
        type: 'button',
        variant: 'secondary',
        click: vi.fn()
      }
    })

    expect(wrapper.classes()).toContain('wp-button--secondary')
  })

  it('applies size class based on prop', async () => {
    const wrapper = mount(WPButton, {
      props: {
        type: 'button',
        size: 'lg',
        click: vi.fn()
      }
    })

    expect(wrapper.classes()).toContain('wp-button--lg')
  })

  it('applies block class when block prop is true', async () => {
    const wrapper = mount(WPButton, {
      props: {
        type: 'button',
        block: true,
        click: vi.fn()
      }
    })

    expect(wrapper.classes()).toContain('wp-button--block')
  })

  it('disables button when disabled prop is true', async () => {
    const wrapper = mount(WPButton, {
      props: {
        type: 'button',
        disabled: true,
        click: vi.fn()
      }
    })

    expect(wrapper.attributes().disabled).toBeDefined()
  })

  it('displays loading spinner when loading prop is true', async () => {
    const wrapper = mount(WPButton, {
      props: {
        type: 'button',
        loading: true,
        click: vi.fn()
      }
    })

    expect(wrapper.find('.wp-button__spinner').exists()).toBe(true)
  })
})
