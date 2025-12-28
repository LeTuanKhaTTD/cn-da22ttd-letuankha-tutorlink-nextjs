/**
 * ============================================
 * API CONFIGURATION
 * Cấu hình cho API calls
 * ============================================
 */

import { env } from './env'

export const API_CONFIG = {
  baseUrl: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register/parent',
    REGISTER_TUTOR: '/auth/register/tutor',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },

  // Users
  USERS: {
    ME: '/users/me',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    GET_BY_ID: (id: string) => `/users/${id}`,
  },

  // Tutors
  TUTORS: {
    LIST: '/tutors',
    GET_BY_ID: (id: string) => `/tutors/${id}`,
    CREATE: '/tutors',
    UPDATE: (id: string) => `/tutors/${id}`,
    DELETE: (id: string) => `/tutors/${id}`,
    SUBJECTS: (id: string) => `/tutors/${id}/subjects`,
    REVIEWS: (id: string) => `/tutors/${id}/reviews`,
  },

  // Student Profiles (MSSV)
  STUDENT_PROFILES: {
    GET: '/student-profiles/me',
    UPDATE: '/student-profiles',
    VERIFY: (id: string) => `/student-profiles/${id}/verify`,
    PENDING: '/student-profiles/pending',
  },

  // Posts
  POSTS: {
    LIST: '/posts',
    GET_BY_ID: (id: string) => `/posts/${id}`,
    CREATE: '/posts',
    UPDATE: (id: string) => `/posts/${id}`,
    DELETE: (id: string) => `/posts/${id}`,
    MY_POSTS: '/posts/my/posts',
  },

  // Applications
  APPLICATIONS: {
    LIST: '/applications',
    GET_BY_ID: (id: string) => `/applications/${id}`,
    CREATE: '/applications',
    UPDATE_STATUS: (id: string) => `/applications/${id}`,
    MY_APPLICATIONS: '/applications/my',
    BY_POST: (postId: string) => `/applications/post/${postId}`,
  },

  // Reviews
  REVIEWS: {
    CREATE: '/reviews',
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
    BY_TUTOR: (tutorId: string) => `/reviews/tutor/${tutorId}`,
  },

  // Conversations & Messages
  CONVERSATIONS: {
    LIST: '/conversations',
    GET_BY_ID: (id: string) => `/conversations/${id}`,
    CREATE: '/conversations',
    MESSAGES: (id: string) => `/conversations/${id}/messages`,
    SEND_MESSAGE: (id: string) => `/conversations/${id}/messages`,
    MARK_READ: (id: string) => `/conversations/${id}/mark-read`,
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    UNREAD_COUNT: '/notifications/unread-count',
    MARK_READ: (id: string) => `/notifications/${id}/mark-read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    DELETE: (id: string) => `/notifications/${id}`,
  },

  // Subjects
  SUBJECTS: {
    LIST: '/subjects',
    GET_BY_ID: (id: string) => `/subjects/${id}`,
    CREATE: '/subjects',
    UPDATE: (id: string) => `/subjects/${id}`,
    DELETE: (id: string) => `/subjects/${id}`,
  },

  // Schedules
  SCHEDULES: {
    LIST: '/schedules',
    GET_BY_ID: (id: string) => `/schedules/${id}`,
    CREATE: '/schedules',
    UPDATE: (id: string) => `/schedules/${id}`,
    DELETE: (id: string) => `/schedules/${id}`,
    MY_SCHEDULES: '/schedules/my-schedules',
  },

  // Admin
  ADMIN: {
    DASHBOARD_STATS: '/admin/stats',
    USERS: '/admin/users',
    PENDING_VERIFICATIONS: '/admin/pending-verifications',
    VERIFY_TUTOR: (id: string) => `/admin/verify-tutor/${id}`,
  },

  // Upload
  UPLOAD: {
    IMAGE: '/upload/image',
    FILE: '/upload/file',
  },
} as const

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

// Response status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const
