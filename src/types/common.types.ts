/**
 * ============================================
 * COMMON TYPES
 * Các types dùng chung trong ứng dụng
 * ============================================
 */

// Pagination
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// API Response
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export interface ApiError {
  message: string
  code?: string
  status?: number
  errors?: Record<string, string[]>
}

// Form state
export interface FormState<T> {
  data: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  isValid: boolean
}

// Modal state
export interface ModalState {
  isOpen: boolean
  title?: string
  content?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
}

// Toast notification
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

// File upload
export interface UploadedFile {
  url: string
  publicId: string
  filename: string
  size: number
  format: string
}

// Select option
export interface SelectOption {
  label: string
  value: string | number
}

// Dashboard stats
export interface DashboardStats {
  totalUsers?: number
  totalTutors?: number
  totalPosts?: number
  totalApplications?: number
  pendingVerifications?: number
  activeConversations?: number
}
