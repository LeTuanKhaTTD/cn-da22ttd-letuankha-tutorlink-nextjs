/**
 * ============================================
 * AUTH CONTEXT
 * Quản lý state authentication toàn cục
 * ============================================
 */

import { createContext, useContext, useEffect, useState } from 'react'
import type { User, AuthState } from '@/types'
import { STORAGE_KEYS } from '@/config'

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
    error: null,
  })

  // Load auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User
        
        // Kiểm tra xem user object có đầy đủ thông tin không
        if (user && user.id && user.email && user.ho_ten) {
          setState({
            isAuthenticated: true,
            user,
            token,
            isLoading: false,
            error: null,
          })
        } else {
          // User data không hợp lệ, clear localStorage
          console.warn('Invalid user data in localStorage, clearing...')
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER)
          setState({ isAuthenticated: false, user: null, token: null, isLoading: false, error: null })
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error)
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        setState({ isAuthenticated: false, user: null, token: null, isLoading: false, error: null })
      }
    } else {
      setState({ isAuthenticated: false, user: null, token: null, isLoading: false, error: null })
    }
  }, [])

  const login = (token: string, user: User) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    setState({
      isAuthenticated: true,
      user,
      token,
      isLoading: false,
      error: null,
    })
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    setState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
      error: null,
    })
  }

  const updateUser = (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    setState(prev => ({ ...prev, user }))
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
