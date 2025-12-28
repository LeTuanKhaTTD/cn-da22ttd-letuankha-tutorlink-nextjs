/**
 * Shared constants for dropdown options across the application
 */

export const SUBJECT_OPTIONS = ['Toán', 'Lý', 'Hóa', 'Tiếng Anh', 'Văn', 'Lập trình']
export const LEVEL_OPTIONS = ['Tiểu học', 'THCS', 'THPT', 'Đại học']
export const MODE_OPTIONS = ['Online', 'Offline', 'Kết hợp']
export const BUDGET_OPTIONS = ['< 200k', '200k - 300k', '300k - 500k', '> 500k']
export const PRICE_OPTIONS = ['< 200k', '200k - 300k', '300k - 400k', '> 400k']

// Mode labels for display
export const MODE_LABELS: Record<string, string> = {
  'Online': 'Trực tuyến',
  'Offline': 'Tại nhà',
  'Kết hợp': 'Kết hợp'
}

// Level mapping for backward compatibility
export const LEVEL_MAPPING: Record<string, string> = {
  'Tiểu học': 'Tiểu học',
  'Cấp 1': 'Tiểu học',
  'THCS': 'THCS',
  'Cấp 2': 'THCS',
  'THPT': 'THPT',
  'Cấp 3': 'THPT',
  'Đại học': 'Đại học'
}

// Sort options for listing pages
export const TUTOR_SORT_OPTIONS = [
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'price-asc', label: 'Học phí thấp đến cao' },
  { value: 'price-desc', label: 'Học phí cao đến thấp' },
  { value: 'experience', label: 'Kinh nghiệm nhiều' },
  { value: 'location', label: 'Theo khu vực' }
]

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: 'Mới nhất' },
  { value: 'budget-desc', label: 'Học phí cao đến thấp' },
  { value: 'budget-asc', label: 'Học phí thấp đến cao' },
  { value: 'location', label: 'Theo khu vực' }
]
