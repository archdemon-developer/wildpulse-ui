/**
 * @vitest-environment happy-dom
 */
import { WPNavLink } from '@/components'
import router from '@/router'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { RouterLink } from 'vue-router'

describe('WPNavLink tests', () => {
  const props = {
    to: '/forums',
    name: 'Forums'
  }

  const wrapper = mount(WPNavLink, {
    global: {
      plugins: [router]
    },
    props: props
  })

  it('renders navlink properly', () => {
    const routerLink = wrapper.findComponent(RouterLink)
    expect(routerLink.props().to.toString()).toBe(props.to)
    expect(routerLink.text()).toBe(props.name)
  })
})
