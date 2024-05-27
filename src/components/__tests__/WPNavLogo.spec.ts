/**
 * @vitest-environment happy-dom
 */
import { WPNavLogo } from '@/components'
import router from '@/router'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

const PATH_TO_LOGO = '/src/assets/wplogo-nav.png'

describe('WPNavLogo Tests', () => {
  const wrapper = mount(WPNavLogo, {
    global: {
      plugins: [router]
    }
  })

  it('has logo image', () => {
    expect(wrapper.find('img').exists()).toBeTruthy()
  })

  it('has logo image pointing to right image', () => {
    expect(wrapper.find('img').attributes().src).toBe(PATH_TO_LOGO)
  })
})
