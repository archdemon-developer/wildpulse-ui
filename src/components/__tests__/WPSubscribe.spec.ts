import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import WPSubscribe from '@/components/WPSubscribe.vue'
import WPButton from '@/components/WPButton.vue'
import WPInput from '@/components/WPInput.vue'

describe('wildpulse subscribe component tests', () => {
  const subscribeProps = {
    header: 'Subscribe',
    description: 'Get the latest updates and news.'
  }

  it('renders correctly with given props', () => {
    const wrapper = mount(WPSubscribe, {
      props: subscribeProps
    })

    const header = wrapper.find('.wp-subscribe__header')
    expect(header.exists()).toBe(true)
    expect(header.text()).toBe(subscribeProps.header)

    const description = wrapper.find('.wp-subscribe__description')
    expect(description.exists()).toBe(true)
    expect(description.text()).toBe(subscribeProps.description)
  })

  it('renders WPInput and WPButton components', () => {
    const wrapper = mount(WPSubscribe, {
      props: subscribeProps
    })

    const wpInput = wrapper.findComponent(WPInput)
    expect(wpInput.exists()).toBe(true)
    expect(wpInput.props('type')).toBe('email')
    expect(wpInput.attributes('placeholder')).toBe('Enter your email')

    const wpButton = wrapper.findComponent(WPButton)
    expect(wpButton.exists()).toBe(true)
    expect(wpButton.attributes('type')).toBe('submit')
    expect(wpButton.text()).toBe('Subscribe')
  })

  it('calls subscribeUser on form submit', async () => {
    const subscribeUser = vi.fn()
    const wrapper = mount(WPSubscribe, {
      props: subscribeProps,
      global: {
        mocks: {
          subscribeUser
        }
      }
    })

    const form = wrapper.find('.wp-subscribe-form')
    await form.trigger('submit.prevent')

    expect(subscribeUser).toHaveBeenCalled()
  })
})
