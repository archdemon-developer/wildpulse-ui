/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import WPNavigation from '@/components/WPNavigation.vue'
import WPNavLink from '@/components/WPNavLink.vue'
import { describe, expect, it } from 'vitest'
import router from '@/router'

describe('wildpulse navigation bar tests', () => {
  it('renders navigation links for each route', () => {
    const wrapper = mount(WPNavigation, {
      props: {
        routes: [
          { path: '/forums', name: 'Forums' },
          { path: '/blogs', name: 'Blogs' },
          { path: '/start', name: 'Start' }
        ]
      },
      global: {
        components: {
          WPNavLink
        },
        plugins: [router]
      }
    })

    const navLinks = wrapper.findAllComponents(WPNavLink)
    expect(navLinks).toHaveLength(3)

    expect(navLinks[0].props('to')).toBe('/forums')
    expect(navLinks[0].props('name')).toBe('Forums')

    expect(navLinks[1].props('to')).toBe('/blogs')
    expect(navLinks[1].props('name')).toBe('Blogs')

    expect(navLinks[2].props('to')).toBe('/start')
    expect(navLinks[2].props('name')).toBe('Start')
  })
})
