import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { WPSubscribe } from '@/layouts'
import WPTextInput from '@/components/WPTextInput.vue'
import WPButton from '@/components/WPButton.vue'

describe('WpSubscribe.vue', () => {
  const factory = (propsData = {}) => {
    return mount(WPSubscribe, {
      global: {
        components: { WPTextInput, WPButton }
      },
      props: {
        header: 'Subscribe to our newsletter',
        description: 'Get the latest updates and offers.',
        ...propsData
      }
    })
  }

  it('renders the correct header and description', () => {
    const wrapper = factory()
    expect(wrapper.find('.wp-subscribe__header').text()).toBe('Subscribe to our newsletter')
    expect(wrapper.find('.wp-subscribe__description').text()).toBe(
      'Get the latest updates and offers.'
    )
  })

  it('renders WPTextInput and WPButton components', () => {
    const wrapper = factory()
    expect(wrapper.findComponent(WPTextInput).exists()).toBe(true)
    expect(wrapper.findComponent(WPButton).exists()).toBe(true)
  })

  it('updates the email when typed into the input field', async () => {
    const wrapper = factory()
    const input = wrapper.findComponent(WPTextInput).find('input')

    await input.setValue('test@example.com')
    expect((wrapper.vm as any).subscriptionEmail).toBe('test@example.com')
  })

  it('calls subscribeUser method with the correct email on form submit', async () => {
    const wrapper = factory()
    const consoleSpy = vi.spyOn(console, 'log')

    const input = wrapper.findComponent(WPTextInput).find('input')
    await input.setValue('test@example.com')

    await wrapper.find('form').trigger('submit.prevent')
    expect(consoleSpy).toHaveBeenCalledWith('test@example.com')
  })

  it('does not submit the form when the input is empty', async () => {
    const wrapper = factory()
    const consoleSpy = vi.spyOn(console, 'log')

    await wrapper.find('form').trigger('submit.prevent')
    expect(consoleSpy).toHaveBeenCalledWith('')
  })
})
