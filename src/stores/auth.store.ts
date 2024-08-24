import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<firebase.User | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const isLoggedIn = computed(() => !!user.value)

  const signup = async (email: string, password: string, username: string) => {
    loading.value = true
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
      user.value = userCredential.user
      await user.value?.updateProfile({ displayName: username })
      await firebase.auth().updateCurrentUser(user.value)
      error.value = null
    } catch (err: any) {
      error.value = err.message
      user.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
      user.value = userCredential.user
      error.value = null
    } catch (err: any) {
      error.value = err.message
      user.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await firebase.auth().signOut()
      user.value = null
      error.value = null
    } catch (err: any) {
      error.value = err.message
    }
  }

  const checkAuth = () => {
    firebase.auth().onAuthStateChanged((u) => {
      user.value = u
      error.value = null
    })
  }

  const isAuthenticated = () => {
    return isLoggedIn.value
  }

  return {
    user,
    error,
    loading,
    isLoggedIn,
    signup,
    login,
    logout,
    checkAuth,
    isAuthenticated
  }
})
