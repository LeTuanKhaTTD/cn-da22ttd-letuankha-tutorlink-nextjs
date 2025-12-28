/**
 * ============================================
 * TYPES INDEX
 * Re-export tất cả types từ các modules
 * ============================================
 */

// User & Auth
export * from './user.types'

// Tutor
export * from './tutor.types'

// Post & Application
export * from './post.types'

// Message & Chat
export * from './message.types'

// Common
export * from './common.types'

// Legacy support - Các types cũ để backward compatibility
// TODO: Migrate components sang types mới
export interface LegacyTutor {
  id: string
  name: string
  title: string
  avatar: string
  subjects: string[]
  levels: string[]
  location: string
  rate: string
  rating: number
  reviewsCount: number
  experience: string
  mode: 'Online' | 'Offline' | 'Kết hợp'
  bio: string
  skills: string[]
  schedule: Array<{ day: string; slots: string[] }>
  education: string
  studentProfile: {
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
}

export interface LegacyPost {
  id: string
  parentName: string
  studentName: string
  subject: string
  level: string
  location: string
  budget: string
  frequency: string
  description: string
  requirements: string[]
  createdAt: string
}

export interface LegacyConversation {
  id: string
  with: string
  lastMessage: string
  timestamp: string
  unread: number
  messages: Array<{
    id: string
    sender: 'parent' | 'tutor'
    body: string
    time: string
  }>
}

