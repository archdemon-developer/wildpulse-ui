import { ref } from 'vue'

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

export const useFetch = (url: string, options: RequestOptions) => {
  const data = ref<any>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

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

    let requestUrl = url
    const { method, headers, body, queryParams, pathVariables } = options

    if (queryParams) {
      requestUrl += buildQueryString(queryParams)
    }

    if (pathVariables) {
      requestUrl = buildUrlWithPathVariables(requestUrl, pathVariables)
    }

    try {
      const response = await fetch(requestUrl, {
        method,
        headers: {
          ...defaultHeaders,
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
