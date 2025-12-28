/**
 * ============================================
 * CHAT API
 * API calls cho AI chat assistant
 * ============================================
 */

import { api } from './axios'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  success: boolean
  data: {
    message: string
    role: 'assistant'
    timestamp: string
  }
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface QuickSuggestion {
  id: number
  icon: string
  text: string
  category: string
}

export const chatApi = {
  // Gửi tin nhắn cho AI
  sendMessage: async (message: string, conversationHistory: ChatMessage[] = []): Promise<ChatResponse> => {
    const response = await api.post('/chat', {
      message,
      conversation_history: conversationHistory
    })
    return response.data
  },

  // Lấy gợi ý nhanh
  getQuickSuggestions: async (): Promise<{ success: boolean; data: QuickSuggestion[] }> => {
    const response = await api.get('/chat/suggestions')
    return response.data
  }
}
