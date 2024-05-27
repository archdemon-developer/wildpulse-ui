import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { WPVideo } from '@/components'

describe('WPVideo Tests', () => {
  it('renders video with correct props', () => {
    const wrapper = mount(WPVideo, {
      props: {
        src: 'video.mp4',
        type: 'video/mp4',
        autoplay: true,
        muted: true,
        loop: true,
        class: 'custom-class'
      }
    })

    const video = wrapper.find('video')
    console.log(video.attributes())
    expect(video.exists()).toBe(true)
    expect(video.attributes('autoplay')).toBeDefined()
    expect(video.attributes('loop')).toBeDefined()
    expect(video.attributes('class')).toBe('custom-class')

    const source = video.find('source')
    expect(source.exists()).toBe(true)
    expect(source.attributes('src')).toBe('video.mp4')
    expect(source.attributes('type')).toBe('video/mp4')
  })

  it('applies default props correctly', () => {
    const wrapper = mount(WPVideo, {
      props: {
        src: 'video.mp4',
        type: 'video/mp4'
      }
    })

    const video = wrapper.find('video')
    expect(video.exists()).toBe(true)
    expect(video.attributes('autoplay')).toBeUndefined()
    expect(video.attributes('loop')).toBeUndefined()
    expect(video.attributes('class')).toBe('')

    const source = video.find('source')
    expect(source.exists()).toBe(true)
    expect(source.attributes('src')).toBe('video.mp4')
    expect(source.attributes('type')).toBe('video/mp4')
  })
})
