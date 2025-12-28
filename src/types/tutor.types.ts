/**
 * ============================================
 * TUTOR TYPES
 * Các types liên quan đến gia sư
 * ============================================
 */

import type { User } from './user.types'

// Hồ sơ sinh viên TVU (CHỈ DÀNH CHO GIA SƯ)
export interface StudentProfile {
  id: string
  nguoi_dung_id: string
  ma_so_sinh_vien: string // MSSV 9 số - BẮT BUỘC
  ma_lop: string // Mã lớp (VD: DH21IT02) - BẮT BUỘC
  khoa: string // Khoa (VD: Công nghệ Thông tin)
  nganh: string // Ngành học
  nam_hoc?: string // Năm học (VD: 2021-2025)
  da_xac_minh: boolean // Đã được admin xác minh chưa
  nguoi_xac_minh_id?: string // Admin ID đã xác minh
  xac_minh_luc?: string // Ngày xác minh
  ghi_chu?: string // Lý do từ chối (nếu có)
  tao_luc: string
}

// Hồ sơ gia sư
export interface Tutor {
  id: string
  nguoi_dung_id: string
  anh_dai_dien?: string // URL ảnh đại diện
  hoc_phi_gio: number // Học phí/giờ (VNĐ)
  kinh_nghiem?: string // Kinh nghiệm giảng dạy
  mo_ta?: string // Mô tả bản thân
  diem_danh_gia_tb: number // Điểm TB (0-5)
  so_luong_danh_gia: number // Số lượng đánh giá
  tong_gio_day: number // Tổng giờ đã dạy
  tao_luc: string
  cap_nhat_luc?: string
  
  // Relations (populated)
  user?: User
  studentProfile?: StudentProfile
  subjects?: Subject[]
  reviews?: TutorReview[]
}

// Subject (môn học)
export interface Subject {
  id: string
  ten_mon: string
  loai_mon?: string
}

// Đánh giá gia sư
export interface TutorReview {
  id: string
  gia_su_id: string
  phu_huynh_id: string
  diem: number // 1-5 sao
  binh_luan?: string
  tao_luc: string
  
  // Relations
  parent?: User
}

// Form đăng ký gia sư (4 bước)
export interface TutorRegistrationStep1 {
  email: string
  password: string
  confirmPassword: string
}

export interface TutorRegistrationStep2 {
  ma_so_sinh_vien: string // MSSV 9 số
  ma_lop: string // Mã lớp
  khoa: string // Khoa
  nganh: string // Ngành
  nam_hoc?: string // Năm học
}

export interface TutorRegistrationStep3 {
  anh_dai_dien: File | string // Upload ảnh
}

export interface TutorRegistrationStep4 {
  ho_ten: string
  so_dien_thoai: string
  mon_day: string[] // Danh sách ID môn học
  hoc_phi_gio: number
  kinh_nghiem?: string
  mo_ta?: string
}

export type TutorRegistrationData = TutorRegistrationStep1 &
  TutorRegistrationStep2 &
  TutorRegistrationStep3 &
  TutorRegistrationStep4

// Filter gia sư
export interface TutorFilter {
  subject?: string
  minRate?: number
  maxRate?: number
  rating?: number
  location?: string
  mode?: 'Online' | 'Offline' | 'Kết hợp'
  verified?: boolean // Chỉ hiển thị gia sư đã xác minh
}
