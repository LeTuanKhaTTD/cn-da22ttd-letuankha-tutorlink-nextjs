/**
 * ============================================
 * MOCK DATA - EMPTY VERSION
 * ============================================
 * Tất cả mock data đã được xóa.
 * Sẽ được thay thế bằng API calls thực tế.
 * File này giữ lại type definitions để tránh lỗi import.
 * ============================================
 */

export interface LegacyStudentProfile {
  id: string
  userId: string
  studentId: string
  classCode: string
  faculty: string
  major: string
  academicYear: string
  verified: boolean
  verifiedAt?: string
}

export interface LegacyTutor {
  id: string
  name: string
  title: string
  avatar: string
  subjects: string[] | string
  levels: string[] | string
  location: string
  rate: string
  rating: number
  reviewsCount: number
  experience: string
  mode: string
  bio: string
  skills: string[]
  schedule: Array<{ day: string; slots: string[] }>
  education: string
  studentProfile?: LegacyStudentProfile
}

export interface LegacyTutorReview {
  id: string
  tutorId?: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface LegacyPost {
  id: string
  subject: string
  level: string
  description: string
  location: string
  schedule?: string
  budget: string
  postedBy?: string
  postedDate?: string
  status?: string
  parentName?: string
  studentName?: string
  frequency?: string
  requirements?: string[]
  createdAt?: string
}

export interface LegacyConversation {
  id: string
  with: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  unread?: number
  messages: Array<{
    id: string
    sender: string
    body: string
    time: string
  }>
}

// Empty arrays - Data sẽ được load từ API
export const tutors: LegacyTutor[] = []
export const reviews: LegacyTutorReview[] = []
export const posts: LegacyPost[] = []
export const conversations: LegacyConversation[] = []
