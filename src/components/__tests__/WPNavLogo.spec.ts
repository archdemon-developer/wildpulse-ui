/**
 * @vitest-environment happy-dom
 */
import { WPNavLogo } from '@/components'
import router from '@/router'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

const LOGO_FILE_NAME = 'wplogo-nav.png'

describe('WPNavLogo.vue', () => {
  const wrapper = mount(WPNavLogo, {
    global: {
      plugins: [router],
      stubs: {
        WPImage: {
          template: '<img :src="src" :alt="alt" />',
          props: ['src', 'alt']
        }
      }
    }
  })

  it('has logo image', () => {
    expect(wrapper.find('img').exists()).toBeTruthy()
  })

  it('has logo image pointing to right image', () => {
    const imgSrc = wrapper.find('img').attributes().src
    expect(imgSrc).toContain(LOGO_FILE_NAME)
  })
})
