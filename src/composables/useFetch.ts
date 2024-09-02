import { useAuthStore } from '@/stores'
import { ref } from 'vue'
import { API_BASE_URL } from '@/shared/ts/variables' // Import the base URL from the config file

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type QueryParams = Record<string, string | number | boolean>
type PathVariables = Record<string, string | number>
type Headers = HeadersInit

interface RequestOptions {
  method: RequestMethods
  headers?: Headers
  body?: any
  queryParams?: QueryParams
  pathVariables?: PathVariables
}

export const useFetch = (path: string, options: RequestOptions) => {
  const data = ref<any>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const authStore = useAuthStore()

  const defaultHeaders: Headers = {
    'Content-Type': 'application/json'
  }

  const buildQueryString = (queryParams: QueryParams): string =>
    new URLSearchParams(queryParams as Record<string, string>).toString()
      ? `?${new URLSearchParams(queryParams as Record<string, string>).toString()}`
      : ''

  const buildUrlWithPathVariables = (url: string, pathVariables: PathVariables): string =>
    Object.keys(pathVariables).reduce(
      (acc, key) => acc.replace(`:${key}`, encodeURIComponent(String(pathVariables[key]))),
      url
    )

  const executeRequest = async () => {
    loading.value = true
    error.value = null
    data.value = null

    let requestUrl = `${API_BASE_URL}${path}` // Construct the full URL using the base URL and path
    const { method, headers, body, queryParams, pathVariables } = options

    if (queryParams) {
      requestUrl += buildQueryString(queryParams)
    }

    if (pathVariables) {
      requestUrl = buildUrlWithPathVariables(requestUrl, pathVariables)
    }

    try {
      // Retrieve the token from the auth store
      const token = await authStore.getToken()

      // If no token is available, throw an error and do not proceed with the request
      if (!token) {
        error.value = 'Authentication failed: No valid token found.'
        throw new Error('No valid token available')
      }

      const authHeaders = { Authorization: `Bearer ${token}` }

      const response = await fetch(requestUrl, {
        method,
        headers: {
          ...defaultHeaders,
          ...authHeaders,
          ...headers
        },
        ...(body ? { body: JSON.stringify(body) } : {})
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      data.value = responseData
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  executeRequest()

  return {
    data,
    error,
    loading
  }
}
