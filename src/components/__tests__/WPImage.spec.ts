import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WPImage from '@/components/WPImage.vue'

describe('WPImage.vue', () => {
  it('renders with required props', () => {
    const wrapper = mount(WPImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image'
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('test.jpg')
    expect(img.attributes('alt')).toBe('Test Image')
    expect(img.attributes('class')).toBe('')
    expect(img.attributes('width')).toBeUndefined()
    expect(img.attributes('height')).toBeUndefined()
    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('title')).toBe('')
    expect(img.attributes('style')).toBe('')
  })

  it('renders with all props', () => {
    const wrapper = mount(WPImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        classes: 'test-class',
        width: '100',
        height: '200',
        loading: 'eager',
        title: 'Test Title',
        style: { border: '1px solid black' }
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('test.jpg')
    expect(img.attributes('alt')).toBe('Test Image')
    expect(img.attributes('class')).toBe('test-class')
    expect(img.attributes('width')).toBe('100')
    expect(img.attributes('height')).toBe('200')
    expect(img.attributes('loading')).toBe('eager')
    expect(img.attributes('title')).toBe('Test Title')
    expect(img.attributes('style')).toBe('border: 1px solid black;')
  })

  it('renders with numeric width and height', () => {
    const wrapper = mount(WPImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        width: 100,
        height: 200
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('width')).toBe('100')
    expect(img.attributes('height')).toBe('200')
  })

  it('renders with style as string', () => {
    const wrapper = mount(WPImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        style: 'border: 1px solid black;'
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('style')).toBe('border: 1px solid black;')
  })

  it('renders with style as object', () => {
    const wrapper = mount(WPImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        style: { border: '1px solid black', borderRadius: '10px' }
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('style')).toBe('border: 1px solid black; border-radius: 10px;')
  })

  it('renders without optional props', () => {
    const wrapper = mount(WPImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image'
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('class')).toBe('')
    expect(img.attributes('width')).toBeUndefined()
    expect(img.attributes('height')).toBeUndefined()
    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('title')).toBe('')
    expect(img.attributes('style')).toBe('')
  })

  it('applies classes correctly', () => {
    const wrapper = mount(WPImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        classes: 'class1 class2'
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('class')).toBe('class1 class2')
  })
})
