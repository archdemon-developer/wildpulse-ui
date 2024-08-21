import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WPActionLink from '@/components/WPActionLink.vue'

describe('WPActionLink.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(WPActionLink, {
      props: { href: 'https://example.com' },
      slots: { default: 'Click Me' }
    })

    expect(wrapper.text()).toBe('Click Me')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(WPActionLink, {
      props: { href: 'https://example.com' }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(WPActionLink, {
      props: { href: 'https://example.com', disabled: true }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('applies disabled styling when disabled prop is true', () => {
    const wrapper = shallowMount(WPActionLink, {
      props: { href: 'https://example.com', disabled: true }
    })

    expect(wrapper.classes()).toContain('wp-action-link--disabled')
  })

  it('does not apply disabled styling when disabled prop is false', () => {
    const wrapper = shallowMount(WPActionLink, {
      props: { href: 'https://example.com', disabled: false }
    })

    expect(wrapper.classes()).not.toContain('wp-action-link--disabled')
  })
})
