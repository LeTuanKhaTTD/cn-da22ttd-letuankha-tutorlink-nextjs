/**
 * ============================================
 * ADMIN API
 * API calls cho admin management
 * ============================================
 */

import { api } from './axios'

export const adminApi = {
  // Lấy thống kê dashboard
  getDashboardStats: async () => {
    const response = await api.get('/admin/stats')
    return response.data
  },

  // Lấy danh sách gia sư chờ xác thực
  getPendingTutors: async () => {
    const response = await api.get('/admin/pending-tutors')
    return response.data
  },

  // Xác thực MSSV gia sư
  verifyTutor: async (tutorId: string) => {
    const response = await api.post(`/admin/verify-tutor/${tutorId}`)
    return response.data
  },

  // Từ chối xác thực
  rejectTutor: async (tutorId: string, reason: string) => {
    const response = await api.post(`/admin/reject-tutor/${tutorId}`, { reason })
    return response.data
  },

  // Lấy danh sách người dùng
  getAllUsers: async (params?: { vai_tro?: string; trang_thai?: string; page?: number; limit?: number }) => {
    const response = await api.get('/admin/users', { params })
    return response.data
  },

  // Cập nhật trạng thái người dùng
  updateUserStatus: async (userId: string, trang_thai: string) => {
    const response = await api.patch(`/admin/users/${userId}/status`, { trang_thai })
    return response.data
  },

  // Lấy danh sách bài đăng (admin)
  getAllPosts: async (params?: { trang_thai?: string; page?: number; limit?: number }) => {
    const response = await api.get('/admin/posts', { params })
    return response.data
  },

  // Cập nhật trạng thái bài đăng
  updatePostStatus: async (postId: string, trang_thai: string) => {
    const response = await api.patch(`/admin/posts/${postId}/status`, { trang_thai })
    return response.data
  },

  // Lấy thông tin chi tiết gia sư
  getTutorDetail: async (tutorId: string) => {
    const response = await api.get(`/admin/tutors/${tutorId}`)
    return response.data
  }
}
