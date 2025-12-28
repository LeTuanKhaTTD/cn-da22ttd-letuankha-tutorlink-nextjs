/**
 * ============================================
 * POST TYPES
 * Các types liên quan đến bài đăng tìm gia sư
 * ============================================
 */

import type { Subject } from './tutor.types'
import type { User } from './user.types'

// Bài đăng tìm gia sư
export interface Post {
  id: string
  phu_huynh_id: string
  mon_hoc_id: string
  tieu_de: string
  lop: string // Lớp (VD: Lớp 10)
  luong: number // Mức lương (VNĐ/giờ)
  dia_chi: string
  mo_ta?: string
  yeu_cau?: string
  tan_suat?: string // Tần suất (VD: 3 buổi/tuần)
  trang_thai: 'mo' | 'dong' | 'het_han'
  tao_luc: string
  cap_nhat_luc?: string
  
  // Relations
  parent?: User
  subject?: Subject
  applications?: Application[]
}

// Đơn ứng tuyển
export interface Application {
  id: string
  gia_su_id: string
  bai_dang_id: string
  loi_nhan?: string // Lời giới thiệu
  trang_thai: 'cho' | 'chap_nhan' | 'tu_choi'
  tao_luc: string
  cap_nhat_luc?: string
  
  // Relations
  tutor?: any // Import từ tutor.types
  post?: Post
}

// Form tạo bài đăng
export interface CreatePostData {
  mon_hoc_id: string
  tieu_de: string
  lop: string
  luong: number
  dia_chi: string
  mo_ta?: string
  yeu_cau?: string
  tan_suat?: string
}

// Filter bài đăng
export interface PostFilter {
  subject?: string
  minBudget?: number
  maxBudget?: number
  location?: string
  status?: 'mo' | 'dong' | 'het_han'
}
