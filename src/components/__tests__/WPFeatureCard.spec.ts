import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WPFeatureCard from '@/components/WPFeatureCard.vue'
import { WPButton } from '@/components'
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

vi.mock('@/components', () => ({
  WPButton: { template: '<button><slot /></button>' },
  WPImage: {
    template: '<img :src="src" :alt="alt" class="wp-feature-icon"/>',
    props: ['src', 'alt']
  },
  WPCard: { template: '<div><slot name="header" /><slot /></div>' }
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }]
})

describe('wildpulse feature card tests', () => {
  beforeEach(() => {
    router.push('/')
    router.isReady()
  })

  it('renders the component with props', () => {
    const wrapper = mount(WPFeatureCard, {
      global: {
        plugins: [router]
      },
      props: {
        header: 'Global Wildlife Network',
        imgSrc: 'icon-network.png',
        imgAlt: 'Global Network Icon',
        content: 'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.',
        actions: [{ id: 1, to: '/', name: 'Learn More', variant: 'primary' }]
      }
    })

    expect(wrapper.find('.wp-card-front img').attributes('src')).toBe('icon-network.png')
    expect(wrapper.find('.wp-card-front img').attributes('alt')).toBe('Global Network Icon')
    expect(wrapper.find('.wp-card-front h3').text()).toBe('Global Wildlife Network')
    expect(wrapper.find('.wp-card-back p').text()).toBe(
      'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.'
    )
    expect(wrapper.findAllComponents(WPButton).length).toBe(1)
    expect(wrapper.findComponent(WPButton).text()).toBe('Learn More')
  })

  it('navigates on button click', async () => {
    const wrapper = mount(WPFeatureCard, {
      global: {
        plugins: [router]
      },
      props: {
        header: 'Global Wildlife Network',
        imgSrc: 'icon-network.png',
        imgAlt: 'Global Network Icon',
        content: 'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.',
        actions: [{ id: 1, to: '/', name: 'Learn More', variant: 'primary' }]
      }
    })

    await wrapper.findComponent(WPButton).trigger('click')
    expect(router.currentRoute.value.path).toBe('/')
  })

  it('flips the card on hover', async () => {
    const wrapper = mount(WPFeatureCard, {
      global: {
        plugins: [router]
      },
      props: {
        header: 'Global Wildlife Network',
        imgSrc: 'icon-network.png',
        imgAlt: 'Global Network Icon',
        content: 'Connect with nature lovers worldwide. Share discoveries and exchange knowledge.',
        actions: [{ id: 1, to: '/', name: 'Learn More', variant: 'primary' }]
      }
    })

    await wrapper.trigger('mouseenter')
    await nextTick()
    expect(wrapper.find('.wp-card-front').classes()).toContain('flipped')
    expect(wrapper.find('.wp-card-back').classes()).toContain('flipped')

    await wrapper.trigger('mouseleave')
    await nextTick()
    expect(wrapper.find('.wp-card-front').classes()).not.toContain('flipped')
    expect(wrapper.find('.wp-card-back').classes()).not.toContain('flipped')
  })
})
