import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WPFooter from '@/components/WPFooter.vue'
import type { Route as FooterLink } from '@/shared/ts/types'

describe('WPFooter.vue', () => {
  it('renders correctly with given props', () => {
    const wrapper = mount(WPFooter, {
      props: {
        year: 2024,
        footerText: 'Wildpulse',
        links: [
          { path: '/about', name: 'About Us' },
          { path: '/contact', name: 'Contact' },
          { path: '/privacy', name: 'Privacy Policy' },
          { path: '/terms', name: 'Terms of Service' }
        ] as FooterLink[]
      }
    })

    const copyrightText = wrapper.find('p').text()
    expect(copyrightText).toBe('© 2024 Wildpulse. All Rights Reserved.')

    const linkElements = wrapper.findAll('a')
    expect(linkElements).toHaveLength(4)

    const expectedLinks = [
      { path: '/about', name: 'About Us' },
      { path: '/contact', name: 'Contact' },
      { path: '/privacy', name: 'Privacy Policy' },
      { path: '/terms', name: 'Terms of Service' }
    ]

    linkElements.forEach((linkElement, index) => {
      expect(linkElement.attributes('href')).toBe(expectedLinks[index].path)
      expect(linkElement.text()).toBe(expectedLinks[index].name)
    })
  })

  it('has correct CSS class applied', () => {
    const wrapper = mount(WPFooter, {
      props: {
        year: 2024,
        footerText: 'Wildpulse',
        links: [] as FooterLink[]
      }
    })

    expect(wrapper.classes()).toContain('wp-footer__content')
    expect(wrapper.find('nav').classes()).toContain('wp-footer__links')
  })
})
