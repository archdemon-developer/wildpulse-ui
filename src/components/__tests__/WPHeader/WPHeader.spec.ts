/**
 * @vitest-environment happy-dom
 */
import { WPHeader, WPNavigation } from '@/components'
import WPNavLogo from '@/components/WPHeader/WPNavLogo.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('wildpulse header', () => {
  const wrapper = shallowMount(WPHeader)

  it('has navigation', () => {
    expect(wrapper.findComponent(WPNavigation).exists()).toBeTruthy()
  })

  it('has logo div', () => {
    expect(wrapper.findComponent(WPNavLogo).exists()).toBeTruthy()
  })
})
