import { reactive } from 'vue'

interface FormErrors {
  [key: string]: string
}

export function useForm<T extends object>(initialState: T) {
  const formData = reactive({ ...initialState })
  const errors = reactive<Partial<FormErrors>>({})

  const clearErrors = () => {
    Object.keys(errors).forEach((key) => (errors[key as keyof FormErrors] = ''))
  }

  const resetForm = () => {
    const formDataAsObject = formData as Record<keyof T, any>
    Object.keys(formDataAsObject).forEach((key) => {
      const value = formDataAsObject[key as keyof T]
      if (typeof value === 'string') {
        formDataAsObject[key as keyof T] = ''
      } else if (typeof value === 'boolean') {
        formDataAsObject[key as keyof T] = false
      }
      // Add more conditions if you have other types to handle
    })
    clearErrors()
  }

  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  return {
    formData,
    errors,
    resetForm,
    clearErrors,
    isValidEmail
  }
}
