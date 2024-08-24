import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth.store' // Adjust the import path as needed
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

vi.mock('firebase/compat/app', () => {
  const mockAuth = {
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn(),
    updateCurrentUser: vi.fn()
  }
  return {
    default: { auth: () => mockAuth }
  }
})

describe('Auth Store', () => {
  let authMock: firebase.auth.Auth

  beforeEach(() => {
    setActivePinia(createPinia())
    authMock = firebase.auth()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with correct default values', () => {
    const authStore = useAuthStore()
    expect(authStore.user).toBe(null)
    expect(authStore.error).toBe(null)
    expect(authStore.loading).toBe(false)
    expect(authStore.isLoggedIn).toBe(false)
  })

  it('signs up a user and sets the user data', async () => {
    const authStore = useAuthStore()
    const mockUser = { uid: 'test-uid', email: 'test@example.com', updateProfile: vi.fn() }
    const mockUserCredential = { user: mockUser }

    const authMock = firebase.auth()
    authMock.createUserWithEmailAndPassword = vi.fn().mockResolvedValue(mockUserCredential)

    await authStore.signup('test@example.com', 'password', 'Test User')

    expect(authStore.loading).toBe(false)
    expect(authStore.user).toEqual(mockUser)
    expect(authStore.error).toBe(null)
    expect(mockUser.updateProfile).toHaveBeenCalledWith({ displayName: 'Test User' })
    expect(authMock.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    )
  })

  it('sets error message if sign-up fails', async () => {
    const authStore = useAuthStore()

    const errorMessage = 'Sign up failed'

    authMock.createUserWithEmailAndPassword = vi.fn().mockRejectedValue(new Error(errorMessage))

    try {
      await authStore.signup('test@example.com', 'password', 'Test User')
    } catch (err) {
      expect(authStore.loading).toBe(false)
      expect(authStore.user).toBe(null)
      expect(authStore.error).toBe(errorMessage)
    }
  })

  it('logs in a user and sets the user data', async () => {
    const authStore = useAuthStore()
    const mockUser = { uid: 'test-uid', email: 'test@example.com' }
    const mockUserCredential = { user: mockUser }

    authMock.signInWithEmailAndPassword = vi.fn().mockResolvedValue(mockUserCredential)

    await authStore.login('test@example.com', 'password')

    expect(authStore.loading).toBe(false)
    expect(authStore.user).toEqual(mockUser)
    expect(authStore.error).toBe(null)
    expect(authMock.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password')
  })

  it('sets error message if login fails', async () => {
    const authStore = useAuthStore()
    const errorMessage = 'Login failed'
    authMock.signInWithEmailAndPassword = vi.fn().mockRejectedValue(new Error(errorMessage))

    try {
      await authStore.login('test@example.com', 'password')
    } catch (err) {
      expect(authStore.loading).toBe(false)
      expect(authStore.user).toBe(null)
      expect(authStore.error).toBe(errorMessage)
    }
  })

  it('logs out a user and clears user data', async () => {
    const authStore = useAuthStore()

    authMock.signOut = vi.fn().mockResolvedValue(null)

    await authStore.logout()

    expect(authStore.user).toBe(null)
    expect(authStore.error).toBe(null)
    expect(authMock.signOut).toHaveBeenCalled()
  })

  it('sets error message if logout fails', async () => {
    const authStore = useAuthStore()

    const errorMessage = 'Logout failed'

    authMock.signOut = vi.fn().mockRejectedValue(new Error(errorMessage))
    await authStore.logout()

    expect(authStore.error).toBe(errorMessage)
  })

  it('checks auth state and sets user data', () => {
    const authStore = useAuthStore()

    const mockUser = { uid: 'test-uid', email: 'test@example.com' }

    authMock.onAuthStateChanged = vi.fn().mockImplementation((callback) => callback(mockUser))

    authStore.checkAuth()

    expect(authStore.user).toEqual(mockUser)
    expect(authStore.error).toBe(null)
  })

  it('computed property isLoggedIn returns correct value', () => {
    const authStore = useAuthStore()

    expect(authStore.isLoggedIn).toBe(false)
    authStore.user = { uid: 'test-uid', email: 'test@example.com' } as any
    expect(authStore.isAuthenticated()).toBe(true)
  })
})
