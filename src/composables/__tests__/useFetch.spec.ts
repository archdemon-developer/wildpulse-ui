import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest'
import { useFetch } from '@/composables'

global.fetch = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useFetch', () => {
  it('should handle successful GET request', async () => {
    const mockData = { id: 1, title: 'Test Todo', completed: false }
    ;(fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    } as Response)

    const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'GET'
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(data.value).toEqual(mockData)
  })

  it('should handle query parameters', async () => {
    const mockData = { id: 1, title: 'Test Todo', completed: false }
    ;(fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    } as Response)

    const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'GET',
      queryParams: { userId: 1 }
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos?userId=1', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(data.value).toEqual(mockData)
  })

  it('should handle path variables', async () => {
    const mockData = { id: 1, title: 'Test Todo', completed: false }
    ;(fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    } as Response)

    const { data, error, loading } = useFetch(
      'https://jsonplaceholder.typicode.com/users/:id/todos',
      {
        method: 'GET',
        pathVariables: { id: 1 }
      }
    )

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1/todos', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(data.value).toEqual(mockData)
  })

  it('should handle errors', async () => {
    ;(fetch as MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('Network error'))

    const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'GET'
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(loading.value).toBe(false)
    expect(data.value).toBe(null)
    expect(error.value).toBe('Network error')
  })

  it('should handle POST requests with body', async () => {
    const mockData = { id: 1, title: 'New Todo', completed: false }
    ;(fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    } as Response)

    const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: { title: 'New Todo', completed: false }
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New Todo', completed: false })
    })
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(data.value).toEqual(mockData)
  })

  it('should handle PUT requests with body', async () => {
    const mockData = { id: 1, title: 'Updated Todo', completed: true }
    ;(fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    } as Response)

    const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'PUT',
      body: { title: 'Updated Todo', completed: true }
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Updated Todo', completed: true })
    })
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(data.value).toEqual(mockData)
  })

  it('should handle PATCH requests with body', async () => {
    const mockData = { id: 1, title: 'Partially Updated Todo', completed: true }
    ;(fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    } as Response)

    const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'PATCH',
      body: { completed: true }
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true })
    })
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(data.value).toEqual(mockData)
  })

  it('should handle DELETE requests', async () => {
    const mockData = { message: 'Todo deleted' }
    ;(fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    } as Response)

    const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'DELETE'
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(data.value).toEqual(mockData)
  })

  it('handles HTTP errors correctly', async () => {
    ;(fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({})
    } as Response)

    const { data, error, loading } = useFetch('https://example.com/api/resource', {
      method: 'GET'
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(loading.value).toBe(false)
    expect(data.value).toBeNull()
    expect(error.value).toBe('HTTP error! status: 404')
  })

  it('builds URL without query string when no query parameters are passed', async () => {
    ;(fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ message: 'Success' })
    } as Response)

    const { data, loading } = useFetch('https://example.com/api/resource', {
      method: 'GET',
      queryParams: {}
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(loading.value).toBe(false)
    expect(data.value).toEqual({ message: 'Success' })

    // Verify that the correct URL was used
    expect(fetch).toHaveBeenCalledWith('https://example.com/api/resource', expect.any(Object))
  })
})
