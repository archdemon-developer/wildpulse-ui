/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import WPHero from '@/components/WPHero.vue'
import WPButton from '@/components/WPButton.vue'
import WPVideo from '@/components/WPVideo.vue'
import { describe, expect, it, vi } from 'vitest'

describe('WPHero.vue', () => {
  const propsData = {
    primaryAction: vi.fn(),
    secondaryAction: vi.fn(),
    backgroundSource: 'path/to/video.mp4',
    header: 'Test Header',
    description: 'Test Description',
    primaryButtonText: 'Start Now',
    secondaryButtonText: 'Learn More'
  }

  const wrapper = mount(WPHero, { propsData })

  it('renders background video, header and description correctly', () => {
    const wpVideo = wrapper.findComponent(WPVideo)
    expect(wpVideo.exists()).toBe(true)
    expect(wpVideo.props('autoplay')).toBe(true)
    expect(wpVideo.props('loop')).toBe(true)
    expect(wpVideo.props('muted')).toBe(true)
    expect(wpVideo.props('src')).toBe(propsData.backgroundSource)
    expect(wpVideo.props('type')).toBe('video/mp4')

    expect(wrapper.find('.wp-hero-header').text()).toBe('Test Header')
    expect(wrapper.find('.wp-hero-description').text()).toBe('Test Description')
  })

  it('emits action event when primary action button is clicked', async () => {
    await wrapper.findAllComponents(WPButton).at(0)!.trigger('click')
    expect(propsData.primaryAction).toHaveBeenCalled()
  })

  it('emits action event when secondary action button is clicked', async () => {
    await wrapper.findAllComponents(WPButton).at(1)!.trigger('click')
    expect(propsData.secondaryAction).toHaveBeenCalled()
  })
})
