import { describe, it, expect, beforeEach } from 'vitest'
import { useForm } from '@/composables/useForm'

describe('useForm', () => {
  let initialState: { name: string; email: string; subscribed: boolean; age: number }

  beforeEach(() => {
    initialState = {
      name: '',
      email: '',
      subscribed: false,
      age: 30
    }
  })

  it('initializes formData with the provided initial state', () => {
    const { formData } = useForm(initialState)
    expect(formData).toEqual(initialState)
  })

  it('initializes errors as an empty object', () => {
    const { errors } = useForm(initialState)
    expect(errors).toEqual({})
  })

  it('clearErrors clears all errors', () => {
    const { errors, clearErrors } = useForm(initialState)
    errors.name = 'Name is required'
    errors.email = 'Email is required'
    clearErrors()
    expect(errors.name).toBe('')
    expect(errors.email).toBe('')
  })

  it('resets non-string, non-boolean fields to null in resetForm', () => {
    const { formData, resetForm } = useForm(initialState)
    formData.name = 'John'
    formData.email = 'john@example.com'
    formData.subscribed = true
    formData.age = 25 // Setting a number value
    resetForm()
    expect(formData.name).toBe('') // Reset to empty string
    expect(formData.email).toBe('') // Reset to empty string
    expect(formData.subscribed).toBe(false) // Reset to false
    expect(formData.age).toBe(null) // Reset to null
  })

  it('resetForm resets formData to the initial state and clears errors', () => {
    const { formData, errors, resetForm } = useForm(initialState)
    formData.name = 'John'
    formData.email = 'john@example.com'
    formData.subscribed = true
    errors.name = 'Name is required'
    resetForm()
    expect(formData.name).toBe('')
    expect(formData.email).toBe('')
    expect(formData.subscribed).toBe(false)
    expect(errors.name).toBe('')
  })

  it('isValidEmail returns true for valid email addresses', () => {
    const { isValidEmail } = useForm(initialState)
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user123@domain.org')).toBe(true)
    expect(isValidEmail('user.name@sub.domain.co')).toBe(true)
  })

  it('isValidEmail returns false for invalid email addresses', () => {
    const { isValidEmail } = useForm(initialState)
    expect(isValidEmail('invalid-email')).toBe(false)
    expect(isValidEmail('user@.com')).toBe(false)
    expect(isValidEmail('user@domain..com')).toBe(false)
    expect(isValidEmail('user@domain.com.')).toBe(false)
    expect(isValidEmail('@domain.com')).toBe(false)
  })

  it('resetForm handles various data types in initialState', () => {
    const extendedInitialState = {
      name: 'John',
      email: '',
      subscribed: false
    }
    const { formData, resetForm } = useForm(extendedInitialState)
    formData.name = 'Jane'
    formData.email = 'email@email.com'
    formData.subscribed = false
    resetForm()
    expect(formData.name).toBe('')
    expect(formData.email).toBe('')
    expect(formData.subscribed).toBe(false)
  })
})
