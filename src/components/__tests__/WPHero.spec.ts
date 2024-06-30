/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import WPHero from '@/components/WPHero.vue'
import WPButton from '@/components/WPButton.vue'
import WPVideo from '@/components/WPVideo.vue'
import { describe, expect, it, vi } from 'vitest'

describe('wildpulse hero section tests', () => {
  const propsData = {
    action: vi.fn(),
    backgroundSource: 'path/to/video.mp4'
  }

  const wrapper = mount(WPHero, { propsData })

  it('renders background video and content correctly', () => {
    const wpVideo = wrapper.findComponent(WPVideo)
    expect(wpVideo.exists()).toBe(true)
    expect(wpVideo.props('autoplay')).toBe(true)
    expect(wpVideo.props('loop')).toBe(true)
    expect(wpVideo.props('muted')).toBe(true)
    expect(wpVideo.props('src')).toBe(propsData.backgroundSource)
    expect(wpVideo.props('type')).toBe('video/mp4')

    expect(wrapper.find('.wp-hero-header').text()).toBe(
      'Unlimited Wildlife Connection: Join enthusiasts worldwide to share discoveries.'
    )
    expect(wrapper.find('.wp-hero-description').text()).toBe(
      'Engage in lively discussion and debate about your wildlife findings, embracing the true spirit of nature. Let the world discover the wonders of rare species through your contributions.'
    )
  })

  it('emits action event when button is clicked', async () => {
    await wrapper.findComponent(WPButton).trigger('click')
    expect(propsData.action).toHaveBeenCalled()
  })
})
