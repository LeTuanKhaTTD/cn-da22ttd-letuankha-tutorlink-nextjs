/**
 * ============================================
 * TUTOR SERVICE
 * Business logic cho tutors
 * ============================================
 */

import { tutorsApi } from '@/api'
import type { Tutor, TutorFilter, PaginatedResponse } from '@/types'

export const tutorService = {
  // Get tutors with filters
  async getTutors(filters: TutorFilter): Promise<PaginatedResponse<Tutor>> {
    try {
      return await tutorsApi.getTutors(filters)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không thể tải danh sách gia sư'
      throw new Error(message)
    }
  },

  // Get tutor by ID
  async getTutorById(id: string): Promise<Tutor> {
    try {
      return await tutorsApi.getTutorById(id)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không tìm thấy gia sư'
      throw new Error(message)
    }
  },

  // Create tutor profile
  async createTutorProfile(data: Partial<Tutor>): Promise<Tutor> {
    try {
      return await tutorsApi.createTutor(data)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Tạo hồ sơ gia sư thất bại'
      throw new Error(message)
    }
  },

  // Update tutor profile
  async updateTutorProfile(id: string, data: Partial<Tutor>): Promise<Tutor> {
    try {
      return await tutorsApi.updateTutor(id, data)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Cập nhật hồ sơ thất bại'
      throw new Error(message)
    }
  },

  // Delete tutor profile
  async deleteTutorProfile(id: string): Promise<void> {
    try {
      await tutorsApi.deleteTutor(id)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Xóa hồ sơ thất bại'
      throw new Error(message)
    }
  },
}
