import { shallowMount } from '@vue/test-utils'
import WPNavigation from '@/components/WPNavigation.vue'
import WPNavLink from '@/components/WPNavLink.vue'
import { describe, expect, it } from 'vitest'

describe('WPNavigation', () => {
  it('renders navigation links for each route', () => {
    const wrapper = shallowMount(WPNavigation, {
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
        }
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
