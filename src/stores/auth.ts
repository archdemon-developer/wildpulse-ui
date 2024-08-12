import { defineStore } from 'pinia'
import { ref } from 'vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<firebase.User | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)
  const isLoggedIn = ref<boolean>(false)

  const signup = async (email: string, password: string, username: string) => {
    isLoading.value = true
    try {
      const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password)
      user.value = userCredentials.user
      await user.value?.updateProfile({ displayName: username })
      await firebase.auth().updateCurrentUser(user.value)
      error.value = null
    } catch (err: any) {
      error.value = err.message
      user.value = null
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    isLoggedIn.value = false
    isLoading.value = true
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
      user.value = userCredential.user
      error.value = null
      isLoggedIn.value = true
    } catch (err: any) {
      error.value = err.message
      user.value = null
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await firebase.auth().signOut()
      user.value = null
      isLoggedIn.value = false
    } catch (err: any) {
      error.value = err.message
    }
  }

  const checkAuth = () => {
    firebase.auth().onAuthStateChanged((authUser) => {
      user.value = authUser
    })
  }

  const isAuthenticated = () => {
    return !!user.value
  }

  return {
    user,
    error,
    isLoading,
    isLoggedIn,
    signup,
    login,
    logout,
    checkAuth,
    isAuthenticated
  }
})
