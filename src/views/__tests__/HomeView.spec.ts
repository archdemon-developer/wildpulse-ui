import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { HomeView } from '@/views'
import { createRouter, createWebHistory } from 'vue-router'
import WPHero from '@/components/WPHero.vue' // Adjust the import according to your project structure

describe('WPHomeView tests', () => {
  it('renders WPHero component with correct props', () => {
    const wrapper = mount(HomeView, {
      global: {
        components: {
          WPHero
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
      routes: [{ path: '/login', name: 'login', redirect: '/' }]
    })
    router.push = push

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        components: {
          WPHero
        }
      }
    })

    const wpHero = wrapper.findComponent(WPHero)
    await wpHero.props('action')()
    expect(push).toHaveBeenCalledWith('/login')
  })
})
