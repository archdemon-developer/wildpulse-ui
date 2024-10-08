/**
 * @vitest-environment happy-dom
 */
import { WPHeader, WPNavigation } from '@/layouts'
import { WPNavLogo } from '@/components'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('WPHeader.vue', () => {
  const wrapper = shallowMount(WPHeader)

  it('has navigation', () => {
    expect(wrapper.findComponent(WPNavigation).exists()).toBeTruthy()
  })

  it('has logo div', () => {
    expect(wrapper.findComponent(WPNavLogo).exists()).toBeTruthy()
  })
})
