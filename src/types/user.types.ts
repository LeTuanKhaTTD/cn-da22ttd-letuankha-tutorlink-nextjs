/**
 * ============================================
 * USER & AUTHENTICATION TYPES
 * Các types liên quan đến người dùng và xác thực
 * ============================================
 */

export type UserRole = 'phu_huynh' | 'gia_su' | 'admin'

export interface User {
  id: string
  email: string
  ho_ten: string
  so_dien_thoai?: string
  vai_tro: UserRole
  hoat_dong: boolean
  tao_luc: string
  cap_nhat_luc?: string
}

export interface LoginCredentials {
  email: string
  mat_khau: string
}

export interface RegisterData {
  email: string
  mat_khau: string
  confirmPassword?: string
  ho_ten: string
  so_dien_thoai?: string
  vai_tro: UserRole
}

export interface AuthResponse {
  success: boolean
  message?: string
  data?: {
    user: User
    token: string
  }
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
