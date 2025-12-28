/**
 * ============================================
 * MESSAGE & CHAT TYPES
 * Các types liên quan đến tin nhắn và chat
 * ============================================
 */

import type { User } from './user.types'

// Cuộc hội thoại
export interface Conversation {
  id: string
  gia_su_id: string
  phu_huynh_id: string
  tao_luc: string
  
  // Relations
  tutor?: any
  parent?: User
  messages?: Message[]
  unreadCount?: number
  lastMessage?: Message
}

// Tin nhắn
export interface Message {
  id: string
  cuoc_hoi_thoai_id: string
  nguoi_gui_id: string
  noi_dung: string
  da_doc: boolean
  gui_luc: string
  
  // Relations
  sender?: User
}

// Thông báo
export interface Notification {
  id: string
  nguoi_dung_id: string
  tieu_de: string
  noi_dung: string
  loai?: 'ung_tuyen' | 'tin_nhan' | 'xac_minh' | 'he_thong'
  da_doc: boolean
  tao_luc: string
}

// Send message data
export interface SendMessageData {
  cuoc_hoi_thoai_id: string
  noi_dung: string
}

// Create conversation data
export interface CreateConversationData {
  gia_su_id: string
  phu_huynh_id: string
}
