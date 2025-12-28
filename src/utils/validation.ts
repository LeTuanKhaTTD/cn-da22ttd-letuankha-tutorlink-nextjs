/**
 * ============================================
 * VALIDATION UTILITIES
 * Hàm validation cho forms
 * ============================================
 */

import { MSSV_REGEX, ERROR_MESSAGES } from '@/config'

/**
 * Validate email
 */
export function validateEmail(email: string): string | undefined {
  if (!email) return ERROR_MESSAGES.REQUIRED
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return ERROR_MESSAGES.INVALID_EMAIL
  return undefined
}

/**
 * Validate password
 */
export function validatePassword(password: string): string | undefined {
  if (!password) return ERROR_MESSAGES.REQUIRED
  if (password.length < 6) return ERROR_MESSAGES.PASSWORD_MIN_LENGTH
  return undefined
}

/**
 * Validate confirm password
 */
export function validateConfirmPassword(password: string, confirmPassword: string): string | undefined {
  if (!confirmPassword) return ERROR_MESSAGES.REQUIRED
  if (password !== confirmPassword) return ERROR_MESSAGES.PASSWORD_NOT_MATCH
  return undefined
}

/**
 * Validate required field
 */
export function validateRequired(value: any): string | undefined {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return ERROR_MESSAGES.REQUIRED
  }
  return undefined
}

/**
 * Validate MSSV (9 digits)
 */
export function validateMSSV(mssv: string): string | undefined {
  if (!mssv) return ERROR_MESSAGES.REQUIRED
  if (!MSSV_REGEX.test(mssv)) return ERROR_MESSAGES.INVALID_MSSV
  return undefined
}

/**
 * Validate phone number (Vietnamese format)
 */
export function validatePhone(phone: string): string | undefined {
  if (!phone) return ERROR_MESSAGES.REQUIRED
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/
  if (!phoneRegex.test(phone)) return ERROR_MESSAGES.PHONE_INVALID
  return undefined
}

/**
 * Validate min length
 */
export function validateMinLength(value: string, minLength: number): string | undefined {
  if (!value) return ERROR_MESSAGES.REQUIRED
  if (value.length < minLength) return `Tối thiểu ${minLength} ký tự`
  return undefined
}

/**
 * Validate max length
 */
export function validateMaxLength(value: string, maxLength: number): string | undefined {
  if (value && value.length > maxLength) return `Tối đa ${maxLength} ký tự`
  return undefined
}

/**
 * Validate number
 */
export function validateNumber(value: string | number): string | undefined {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return 'Phải là số'
  return undefined
}

/**
 * Validate min value
 */
export function validateMin(value: number, min: number): string | undefined {
  if (value < min) return `Giá trị tối thiểu là ${min}`
  return undefined
}

/**
 * Validate max value
 */
export function validateMax(value: number, max: number): string | undefined {
  if (value > max) return `Giá trị tối đa là ${max}`
  return undefined
}

/**
 * Validate URL
 */
export function validateURL(url: string): string | undefined {
  if (!url) return undefined // Optional field
  try {
    new URL(url)
    return undefined
  } catch {
    return 'URL không hợp lệ'
  }
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, maxSize: number): string | undefined {
  if (file.size > maxSize) {
    const maxMB = maxSize / (1024 * 1024)
    return `Kích thước file tối đa ${maxMB}MB`
  }
  return undefined
}

/**
 * Validate file type
 */
export function validateFileType(file: File, allowedTypes: string[]): string | undefined {
  if (!allowedTypes.includes(file.type)) {
    return 'Định dạng file không được hỗ trợ'
  }
  return undefined
}
