/**
 * ============================================
 * AXIOS INSTANCE
 * Cấu hình axios instance với interceptors
 * ============================================
 */

import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG, STORAGE_KEYS } from '@/config'

// Create axios instance
export const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
})

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        // Attempt to refresh token
        const response = await axios.post(`${API_CONFIG.baseUrl}/auth/refresh-token`, {
          refreshToken,
        })

        const { token } = response.data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)

        // Retry original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
