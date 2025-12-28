/**
 * ============================================
 * AUTH SERVICE
 * Business logic cho authentication
 * ============================================
 */

import { authApi } from '@/api'
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types'

export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.login(credentials)
      return response
    } catch (error: any) {
      const message = error.response?.data?.message || 'Đăng nhập thất bại'
      throw new Error(message)
    }
  },

  // Register parent
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await authApi.register(data)
      return response
    } catch (error: any) {
      const message = error.response?.data?.message || 'Đăng ký thất bại'
      throw new Error(message)
    }
  },

  // Register tutor
  async registerTutor(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await authApi.registerTutor(data)
      return response
    } catch (error: any) {
      const message = error.response?.data?.message || 'Đăng ký gia sư thất bại'
      throw new Error(message)
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
      // Continue with local logout even if API call fails
    }
  },

  // Forgot password
  async forgotPassword(email: string): Promise<string> {
    try {
      const response = await authApi.forgotPassword(email)
      return response.message
    } catch (error: any) {
      const message = error.response?.data?.message || 'Gửi email thất bại'
      throw new Error(message)
    }
  },

  // Reset password
  async resetPassword(token: string, password: string): Promise<string> {
    try {
      const response = await authApi.resetPassword(token, password)
      return response.message
    } catch (error: any) {
      const message = error.response?.data?.message || 'Đặt lại mật khẩu thất bại'
      throw new Error(message)
    }
  },
}
