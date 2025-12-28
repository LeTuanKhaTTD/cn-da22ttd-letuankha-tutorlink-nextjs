/**
 * ============================================
 * TUTORS API
 * API calls cho tutors
 * ============================================
 */

import { api } from './axios'
import { API_ENDPOINTS } from '@/config'
import type { Tutor, TutorFilter, TutorReview, PaginatedResponse } from '@/types'

export const tutorsApi = {
  // Get tutors list
  getTutors: async (filters: TutorFilter): Promise<PaginatedResponse<Tutor>> => {
    const response = await api.get(API_ENDPOINTS.TUTORS.LIST, { params: filters })
    return response.data
  },

  // Get tutor by ID
  getTutorById: async (id: string): Promise<Tutor> => {
    const response = await api.get(API_ENDPOINTS.TUTORS.GET_BY_ID(id))
    return response.data
  },

  // Create tutor profile
  createTutor: async (data: Partial<Tutor>): Promise<Tutor> => {
    const response = await api.post(API_ENDPOINTS.TUTORS.CREATE, data)
    return response.data
  },

  // Update tutor profile
  updateTutor: async (id: string, data: Partial<Tutor>): Promise<Tutor> => {
    const response = await api.put(API_ENDPOINTS.TUTORS.UPDATE(id), data)
    return response.data
  },

  // Update own profile (for logged-in tutor)
  updateProfile: async (id: string, data: any): Promise<any> => {
    const response = await api.patch(`/tutors/profile/${id}`, data)
    return response.data
  },

  // Delete tutor profile
  deleteTutor: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.TUTORS.DELETE(id))
  },

  // Get tutor subjects
  getTutorSubjects: async (id: string): Promise<any[]> => {
    const response = await api.get(API_ENDPOINTS.TUTORS.SUBJECTS(id))
    return response.data
  },

  // Get tutor reviews
  getTutorReviews: async (id: string): Promise<TutorReview[]> => {
    const response = await api.get(API_ENDPOINTS.TUTORS.REVIEWS(id))
    return response.data
  },
}
