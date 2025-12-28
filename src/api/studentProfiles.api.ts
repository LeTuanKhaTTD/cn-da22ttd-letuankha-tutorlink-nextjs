import { api } from './axios'
import { API_ENDPOINTS } from '@/config'

export const studentProfilesApi = {
  // Lấy hồ sơ sinh viên của chính mình
  getMyProfile: async () => {
    const response = await api.get(API_ENDPOINTS.STUDENT_PROFILES.GET)
    return response.data
  },

  // Cập nhật hồ sơ sinh viên
  updateProfile: async (data: any) => {
    const response = await api.put(API_ENDPOINTS.STUDENT_PROFILES.UPDATE, data)
    return response.data
  },

  // Gửi yêu cầu xác thực MSSV
  verify: async (id: string) => {
    const response = await api.post(API_ENDPOINTS.STUDENT_PROFILES.VERIFY(id))
    return response.data
  },

  // Lấy danh sách hồ sơ chờ xác thực (admin)
  getPending: async () => {
    const response = await api.get(API_ENDPOINTS.STUDENT_PROFILES.PENDING)
    return response.data
  },
}
