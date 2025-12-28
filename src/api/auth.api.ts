/**
 * ============================================
 * AUTH API
 * API calls cho authentication
 * ============================================
 */

import { api } from './axios'
import { API_ENDPOINTS } from '@/config'
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types'

export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return response.data
  },

  // Register parent
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data)
    return response.data
  },

  // Register tutor
  registerTutor: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER_TUTOR, data)
    return response.data
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT)
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken })
    return response.data
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
    return response.data
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password })
    return response.data
  },

  // Verify email
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token })
    return response.data
  },
}
