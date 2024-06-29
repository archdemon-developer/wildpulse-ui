/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from 'vitest'
import { WPCard } from '@/components'
import { mount } from '@vue/test-utils'

describe('test wp card', () => {
  it('renders default slot content', () => {
    const wrapper = mount(WPCard, {
      slots: {
        default: '<p>Default Content</p>'
      }
    })
    expect(wrapper.html()).toContain('<p>Default Content</p>')
  })

  it('renders header slot content', () => {
    const wrapper = mount(WPCard, {
      slots: {
        header: '<h1>Header Content</h1>'
      }
    })
    expect(wrapper.html()).toContain('<h1>Header Content</h1>')
  })

  it('renders footer slot content', () => {
    const wrapper = mount(WPCard, {
      slots: {
        footer: '<footer>Footer Content</footer>'
      }
    })
    expect(wrapper.html()).toContain('<footer>Footer Content</footer>')
  })

  it('applies custom classes', () => {
    const wrapper = mount(WPCard, {
      props: {
        classes: 'custom-class'
      }
    })
    expect(wrapper.classes()).toContain('custom-class')
  })

  it('renders all parts together', () => {
    const wrapper = mount(WPCard, {
      slots: {
        header: '<h1>Header Content</h1>',
        default: '<p>Default Content</p>',
        footer: '<footer>Footer Content</footer>'
      }
    })
    expect(wrapper.html()).toContain('<h1>Header Content</h1>')
    expect(wrapper.html()).toContain('<p>Default Content</p>')
    expect(wrapper.html()).toContain('<footer>Footer Content</footer>')
  })
})
