/**
 * ============================================
 * ROUTES CONFIGURATION
 * Cấu hình routes cho ứng dụng
 * ============================================
 */

import { USER_ROLES } from './constants'

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_TUTOR: '/register-tutor',
  
  // Tutors
  TUTORS: '/tutors',
  TUTOR_DETAIL: '/tutors/:tutorId',
  TUTOR_PROFILE: '/tutor-profile',
  
  // Posts
  POSTS: '/posts',
  POST_DETAIL: '/posts/:postId',
  CREATE_POST: '/create-post',
  
  // Chat
  CHAT: '/chat',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_PARENT: '/dashboard/parent',
  DASHBOARD_TUTOR: '/dashboard/tutor',
  DASHBOARD_ADMIN: '/dashboard/admin',
  
  // Admin
  ADMIN: '/admin',
  
  // Other
  NOT_FOUND: '*',
} as const

// Route groups
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

export const PROTECTED_ROUTES = [
  ROUTES.TUTOR_PROFILE,
  ROUTES.CREATE_POST,
  ROUTES.CHAT,
  ROUTES.DASHBOARD,
  ROUTES.DASHBOARD_PARENT,
  ROUTES.DASHBOARD_TUTOR,
  ROUTES.DASHBOARD_ADMIN,
  ROUTES.ADMIN,
]

// Route permissions
export const ROUTE_PERMISSIONS = {
  [ROUTES.TUTOR_PROFILE]: [USER_ROLES.TUTOR],
  [ROUTES.CREATE_POST]: [USER_ROLES.PARENT],
  [ROUTES.DASHBOARD_PARENT]: [USER_ROLES.PARENT],
  [ROUTES.DASHBOARD_TUTOR]: [USER_ROLES.TUTOR],
  [ROUTES.DASHBOARD_ADMIN]: [USER_ROLES.ADMIN],
  [ROUTES.ADMIN]: [USER_ROLES.ADMIN],
  [ROUTES.CHAT]: [USER_ROLES.PARENT, USER_ROLES.TUTOR],
  [ROUTES.DASHBOARD]: [USER_ROLES.PARENT, USER_ROLES.TUTOR, USER_ROLES.ADMIN],
}

// Helper functions
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(route => {
    if (route === path) return true
    // Handle dynamic routes (e.g., /tutors/:id)
    const regex = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`)
    return regex.test(path)
  })
}

export function isProtectedRoute(path: string): boolean {
  return PROTECTED_ROUTES.some(route => {
    if (route === path) return true
    const regex = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`)
    return regex.test(path)
  })
}

export function hasPermission(path: string, userRole?: string): boolean {
  if (!userRole) return false

  const permissions = ROUTE_PERMISSIONS[path as keyof typeof ROUTE_PERMISSIONS]
  if (!permissions) return true // No specific permissions required

  return permissions.some(p => p === userRole)
}

// Build dynamic route
export function buildRoute(route: string, params: Record<string, string>): string {
  let result = route
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, value)
  })
  return result
}

// Examples:
// buildRoute(ROUTES.TUTOR_DETAIL, { tutorId: '123' }) => '/tutors/123'
// buildRoute(ROUTES.POST_DETAIL, { postId: '456' }) => '/posts/456'
