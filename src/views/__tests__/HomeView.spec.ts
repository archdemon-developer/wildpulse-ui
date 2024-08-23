/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { HomeView } from '@/views'
import { createRouter, createWebHistory } from 'vue-router'
import { WPFooter } from '@/components'
import { WPHero, WPFeatureCard, WPSubscribe } from '@/layouts'

describe('wildpulse home page view tests', () => {
  it('renders WPHero component with correct props', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/start', name: 'start', redirect: '/start' },
        { path: '/forums', name: 'View', redirect: '/forums' }
      ]
    })
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        components: {
          WPHero,
          WPFeatureCard
        }
      }
    })

    const wpHero = wrapper.findComponent(WPHero)
    expect(wpHero.exists()).toBe(true)
    expect(wpHero.props('backgroundSource')).toBe('/src/assets/wp-connecting-wildlife-bg.mp4')
  })

  it('calls routeToLogin on action prop function call', async () => {
    const push = vi.fn()
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/start', name: 'start', redirect: '/start' },
        { path: '/forums', name: 'forums', redirect: '/forums' }
      ]
    })
    router.push = push

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        components: {
          WPHero,
          WPFeatureCard
        }
      }
    })

    const wpHero = wrapper.findComponent(WPHero)
    await wpHero.props('primaryAction')()
    expect(push).toHaveBeenCalledWith('/start')

    await wpHero.props('secondaryAction')()
    expect(push).toHaveBeenCalledWith('/forums')
  })

  it('renders WPSubscribe component with correct props', () => {
    const wrapper = mount(HomeView, {
      global: {
        components: {
          WPHero,
          WPFeatureCard,
          WPSubscribe
        }
      }
    })

    const wpSubscribe = wrapper.findComponent(WPSubscribe)
    expect(wpSubscribe.exists()).toBe(true)
    expect(wpSubscribe.props('header')).toBe('Subscribe')
    expect(wpSubscribe.props('description')).toBe(
      'Instead of signing up, try our newsletter first!'
    )
  })

  it('renders WPFooter component with correct props', () => {
    const wrapper = mount(HomeView, {
      global: {
        components: {
          WPHero,
          WPFeatureCard,
          WPSubscribe,
          WPFooter
        }
      },
      props: {
        footer: {
          year: 2024,
          footerText: 'Wildpulse',
          links: [
            { path: '/about', name: 'About Us' },
            { path: '/contact', name: 'Contact' },
            { path: '/privacy', name: 'Privacy Policy' },
            { path: '/terms', name: 'Terms of Service' }
          ]
        }
      }
    })

    const wpFooter = wrapper.findComponent(WPFooter)
    expect(wpFooter.exists()).toBe(true)
    expect(wpFooter.props('year')).toBe(2024)
    expect(wpFooter.props('footerText')).toBe('Wildpulse')
    expect(wpFooter.props('links')).toEqual([
      { path: '/about', name: 'About Us' },
      { path: '/contact', name: 'Contact' },
      { path: '/privacy', name: 'Privacy Policy' },
      { path: '/terms', name: 'Terms of Service' }
    ])
  })
})
