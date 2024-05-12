/**
 * @vitest-environment happy-dom
 */
import { WPNavigation } from '@/components'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { RouterLink } from 'vue-router'

const NAV_LINKS = 3

describe('wildpulse navigation', () => {
  const wrapper = shallowMount(WPNavigation)

  it('has a routerlink component', () => {
    expect(wrapper.findComponent(RouterLink).exists()).toBe(true)
  })

  it('has 3 routerlinks', () => {
    expect(wrapper.findAllComponents(RouterLink)).toHaveLength(NAV_LINKS)
  })

  it('routes to the necessary pages', () => {
    expect(wrapper.findAllComponents(RouterLink)[0].attributes()['to']).toEqual('/forums')
    expect(wrapper.findAllComponents(RouterLink)[1].attributes()['to']).toEqual('/blogs')
    expect(wrapper.findAllComponents(RouterLink)[2].attributes()['to']).toEqual('/start')
  })
})
