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
      formDataAsObject[key as keyof T] = ''
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
