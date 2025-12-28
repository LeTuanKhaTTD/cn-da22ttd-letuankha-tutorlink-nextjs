/**
 * ============================================
 * CONSTANTS
 * Các hằng số dùng chung trong ứng dụng
 * ============================================
 */

// App info
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'TutorLink'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'
export const APP_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION || 'Hệ thống kết nối gia sư TVU'

// User roles
export const USER_ROLES = {
  PARENT: 'phu_huynh' as const,
  TUTOR: 'gia_su' as const,
  ADMIN: 'admin' as const,
}

// Post status
export const POST_STATUS = {
  OPEN: 'mo' as const,
  CLOSED: 'dong' as const,
  EXPIRED: 'het_han' as const,
}

// Application status
export const APPLICATION_STATUS = {
  PENDING: 'cho' as const,
  ACCEPTED: 'chap_nhan' as const,
  REJECTED: 'tu_choi' as const,
}

// Schedule status
export const SCHEDULE_STATUS = {
  SCHEDULED: 'hen' as const,
  COMPLETED: 'xong' as const,
  CANCELLED: 'huy' as const,
}

// Notification types
export const NOTIFICATION_TYPES = {
  APPLICATION: 'ung_tuyen' as const,
  MESSAGE: 'tin_nhan' as const,
  VERIFICATION: 'xac_minh' as const,
  SYSTEM: 'he_thong' as const,
}

// Tutor modes
export const TUTOR_MODES = {
  ONLINE: 'Online' as const,
  OFFLINE: 'Offline' as const,
  BOTH: 'Kết hợp' as const,
}

// Rating
export const MIN_RATING = 1
export const MAX_RATING = 5

// MSSV validation
export const MSSV_REGEX = /^[0-9]{9}$/
export const MSSV_LENGTH = 9

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// File upload
export const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']

// Toast duration
export const TOAST_DURATION = 3000

// API timeout
export const API_TIMEOUT = 30000

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
}

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_TUTOR: '/register-tutor',
  TUTORS: '/tutors',
  TUTOR_DETAIL: '/tutors/:tutorId',
  TUTOR_PROFILE: '/tutor-profile',
  POSTS: '/posts',
  POST_DETAIL: '/posts/:postId',
  CREATE_POST: '/create-post',
  CHAT: '/chat',
  DASHBOARD: '/dashboard',
  DASHBOARD_PARENT: '/dashboard/parent',
  DASHBOARD_TUTOR: '/dashboard/tutor',
  DASHBOARD_ADMIN: '/dashboard/admin',
  ADMIN: '/admin',
  NOT_FOUND: '*',
}

// Protected routes (require authentication)
export const PROTECTED_ROUTES = [
  ROUTES.TUTOR_PROFILE,
  ROUTES.CREATE_POST,
  ROUTES.CHAT,
  ROUTES.DASHBOARD,
  ROUTES.DASHBOARD_PARENT,
  ROUTES.DASHBOARD_TUTOR,
  ROUTES.DASHBOARD_ADMIN,
]

// Public routes (no authentication required)
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.REGISTER_TUTOR,
  ROUTES.TUTORS,
  ROUTES.TUTOR_DETAIL,
  ROUTES.POSTS,
  ROUTES.POST_DETAIL,
]

// TVU Faculties (Khoa)
export const TVU_FACULTIES = [
  'Công nghệ Thông tin',
  'Sư phạm',
  'Khoa học Tự nhiên',
  'Khoa học Xã hội và Nhân văn',
  'Kinh tế',
  'Nông nghiệp',
  'Kỹ thuật',
  'Y tế',
  'Ngoại ngữ',
  'Luật',
]

// Subjects (Môn học)
export const SUBJECTS = [
  { id: '1', name: 'Toán', category: 'Khoa học Tự nhiên' },
  { id: '2', name: 'Vật Lý', category: 'Khoa học Tự nhiên' },
  { id: '3', name: 'Hóa Học', category: 'Khoa học Tự nhiên' },
  { id: '4', name: 'Sinh Học', category: 'Khoa học Tự nhiên' },
  { id: '5', name: 'Tiếng Anh', category: 'Ngoại ngữ' },
  { id: '6', name: 'Văn', category: 'Xã hội' },
  { id: '7', name: 'Sử', category: 'Xã hội' },
  { id: '8', name: 'Địa', category: 'Xã hội' },
  { id: '9', name: 'Tin học', category: 'Công nghệ' },
  { id: '10', name: 'Tiếng Anh IELTS', category: 'Ngoại ngữ' },
  { id: '11', name: 'Tiếng Anh TOEIC', category: 'Ngoại ngữ' },
]

// Grade levels (Lớp)
export const GRADE_LEVELS = [
  'Lớp 1',
  'Lớp 2',
  'Lớp 3',
  'Lớp 4',
  'Lớp 5',
  'Lớp 6',
  'Lớp 7',
  'Lớp 8',
  'Lớp 9',
  'Lớp 10',
  'Lớp 11',
  'Lớp 12',
  'Sinh viên',
  'Người đi làm',
]

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'Trường này là bắt buộc',
  INVALID_EMAIL: 'Email không hợp lệ',
  INVALID_MSSV: 'MSSV phải có đúng 9 chữ số',
  PASSWORD_MIN_LENGTH: 'Mật khẩu phải có ít nhất 6 ký tự',
  PASSWORD_NOT_MATCH: 'Mật khẩu không khớp',
  PHONE_INVALID: 'Số điện thoại không hợp lệ',
  NETWORK_ERROR: 'Lỗi kết nối mạng',
  UNAUTHORIZED: 'Bạn cần đăng nhập để tiếp tục',
  FORBIDDEN: 'Bạn không có quyền truy cập',
  NOT_FOUND: 'Không tìm thấy trang',
  SERVER_ERROR: 'Lỗi hệ thống, vui lòng thử lại sau',
}

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  UPDATE_SUCCESS: 'Cập nhật thành công',
  DELETE_SUCCESS: 'Xóa thành công',
  CREATE_SUCCESS: 'Tạo mới thành công',
  APPLY_SUCCESS: 'Ứng tuyển thành công',
  SEND_MESSAGE_SUCCESS: 'Gửi tin nhắn thành công',
}
