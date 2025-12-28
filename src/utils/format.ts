/**
 * ============================================
 * FORMAT UTILITIES
 * Hàm format dữ liệu
 * ============================================
 */

/**
 * Format date to Vietnamese format
 */
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date

  if (format === 'short') {
    return d.toLocaleDateString('vi-VN')
  }

  return d.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format date time to Vietnamese format
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('vi-VN')
}

/**
 * Format currency to VND
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

/**
 * Format phone number (0123456789 => 0123 456 789)
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/)
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`
  }
  return phone
}

/**
 * Format MSSV (123456789 => 123.456.789)
 */
export function formatMSSV(mssv: string): string {
  const cleaned = mssv.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/)
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}`
  }
  return mssv
}

/**
 * Format relative time (e.g., "2 giờ trước")
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return 'Vừa xong'
  if (minutes < 60) return `${minutes} phút trước`
  if (hours < 24) return `${hours} giờ trước`
  if (days < 30) return `${days} ngày trước`
  if (months < 12) return `${months} tháng trước`
  return `${years} năm trước`
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * Format file size (bytes to KB, MB, GB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
