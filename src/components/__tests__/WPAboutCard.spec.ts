import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { WPAboutCard, WPNavLink } from '@/components'
import type { LinkAction } from '@/shared/ts/types'
import router from '@/router'

describe('WPAboutCard.vue', () => {
  it('renders header slot content', () => {
    const wrapper = mount(WPAboutCard, {
      props: {
        header: 'Test Header'
      }
    })
    expect(wrapper.find('.wp-about-card__header').text()).toBe('Test Header')
  })

  it('renders image when imgSrc is provided', () => {
    const wrapper = mount(WPAboutCard, {
      props: {
        imgSrc: 'test.jpg',
        imgAlt: 'Test Image'
      },
      global: {
        stubs: {
          WPImage: {
            template: '<img :src="src" :alt="alt" class="wp-about-card__img"/>',
            props: ['src', 'alt']
          }
        }
      }
    })
    const img = wrapper.find('img.wp-about-card__img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('test.jpg')
    expect(img.attributes('alt')).toBe('Test Image')
  })

  it('renders content when content is provided', () => {
    const wrapper = mount(WPAboutCard, {
      props: {
        content: 'Test Content'
      }
    })
    expect(wrapper.find('.wp-about-card__content').text()).toBe('Test Content')
  })

  it('renders actions when actions are provided', () => {
    const actions: LinkAction[] = [
      { id: 1, to: '/forums', name: 'Forums', variant: 'primary' },
      { id: 2, to: '/blogs', name: 'Blogs', variant: 'secondary' }
    ]
    const wrapper = mount(WPAboutCard, {
      props: {
        actions
      },
      global: {
        components: {
          WPNavLink
        },
        plugins: [router]
      }
    })
    const actionLinks = wrapper.findAllComponents(WPNavLink)
    expect(actionLinks).toHaveLength(actions.length)
    actionLinks.forEach((link, index) => {
      expect(link.props('to')).toBe(actions[index].to)
      expect(link.props('name')).toBe(actions[index].name)
      expect(link.props('variant')).toBe(actions[index].variant)
    })
  })

  it('renders all parts together', () => {
    const actions: LinkAction[] = [
      { id: 1, to: '/forums', name: 'Forums', variant: 'primary' },
      { id: 2, to: '/blogs', name: 'Blogs', variant: 'secondary' }
    ]
    const wrapper = mount(WPAboutCard, {
      props: {
        header: 'Test Header',
        imgSrc: 'test.jpg',
        imgAlt: 'Test Image',
        content: 'Test Content',
        actions
      },
      global: {
        components: {
          WPNavLink
        },
        plugins: [router],
        stubs: {
          WPImage: {
            template: '<img :src="src" :alt="alt" class="wp-about-card__img"/>',
            props: ['src', 'alt']
          }
        }
      }
    })
    expect(wrapper.find('.wp-about-card__header').text()).toBe('Test Header')
    const img = wrapper.find('img.wp-about-card__img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('test.jpg')
    expect(img.attributes('alt')).toBe('Test Image')
    expect(wrapper.find('.wp-about-card__content').text()).toBe('Test Content')
    const actionLinks = wrapper.findAllComponents(WPNavLink)
    expect(actionLinks).toHaveLength(actions.length)
    actionLinks.forEach((link, index) => {
      expect(link.props('to')).toBe(actions[index].to)
      expect(link.props('name')).toBe(actions[index].name)
      expect(link.props('variant')).toBe(actions[index].variant)
    })
  })
})
