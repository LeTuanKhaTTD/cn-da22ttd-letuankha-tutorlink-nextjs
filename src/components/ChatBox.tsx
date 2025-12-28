import { useState, useEffect, useRef } from 'react'
import { chatApi } from '../api/chat.api'
import './ChatBox.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface QuickSuggestion {
  id: number
  icon: string
  text: string
  category: string
}

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<QuickSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load suggestions
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadSuggestions()
    }
  }, [isOpen])

  const loadSuggestions = async () => {
    try {
      const response = await chatApi.getQuickSuggestions()
      if (response.success) {
        setSuggestions(response.data)
      }
    } catch (error) {
      console.error('Error loading suggestions:', error)
    }
  }

  const handleSuggestionClick = (suggestionText: string) => {
    setInputMessage(suggestionText)
    setShowSuggestions(false)
    handleSendMessage(suggestionText)
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim()
    
    if (!textToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      // Prepare conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      // Send to API
      const response = await chatApi.sendMessage(textToSend, conversationHistory)

      if (response.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.data.message,
          timestamp: new Date(response.data.timestamp)
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error: any) {
      console.error('Chat error:', error)
      
      // Error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage()
  }

  const handleClearChat = () => {
    if (confirm('Xóa toàn bộ lịch sử chat?')) {
      setMessages([])
      setShowSuggestions(true)
    }
  }

  return (
    <div className={`chatbox ${isOpen ? 'open' : ''} ${isExpanded ? 'expanded' : ''}`}>
      {/* Toggle Button */}
      <button
        type="button"
        className="chatbox-toggle"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
      >
        {isOpen ? (
          <>
            <span className="icon">✕</span>
            <span className="text">Đóng</span>
          </>
        ) : (
          <>
            <span className="icon">💬</span>
            <span className="text">Chat AI</span>
          </>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="chatbox-panel">
          {/* Header */}
          <div className="chatbox-header">
            <div className="header-info">
              <div className="avatar">
                <span>🤖</span>
              </div>
              <div className="info">
                <h3>TutorLink AI</h3>
                <p className="status">
                  <span className="status-dot"></span>
                  Sẵn sàng hỗ trợ
                </p>
              </div>
            </div>
            <div className="header-actions">
              {messages.length > 0 && (
                <button
                  type="button"
                  className="btn-icon"
                  onClick={handleClearChat}
                  title="Xóa lịch sử"
                >
                  🗑️
                </button>
              )}
              <button
                type="button"
                className="btn-icon"
                onClick={() => setIsExpanded(prev => !prev)}
                title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
              >
                {isExpanded ? '⬇️' : '⬆️'}
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbox-messages">
            {messages.length === 0 && showSuggestions && (
              <div className="welcome-section">
                <div className="welcome-message">
                  <h4>👋 Xin chào!</h4>
                  <p>Tôi là trợ lý AI của TutorLink TVU. Tôi có thể giúp bạn:</p>
                  <ul>
                    <li>🎓 Tư vấn tìm gia sư phù hợp</li>
                    <li>📚 Hướng dẫn đăng ký làm gia sư</li>
                    <li>💰 Thông tin học phí và lịch học</li>
                    <li>✨ Gợi ý phương pháp học hiệu quả</li>
                  </ul>
                </div>
                
                <div className="quick-suggestions">
                  <p className="suggestions-title">💡 Câu hỏi gợi ý:</p>
                  <div className="suggestions-grid">
                    {suggestions.map(suggestion => (
                      <button
                        key={suggestion.id}
                        type="button"
                        className="suggestion-btn"
                        onClick={() => handleSuggestionClick(suggestion.text)}
                      >
                        <span className="suggestion-icon">{suggestion.icon}</span>
                        <span className="suggestion-text">{suggestion.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.role}`}
              >
                {message.role === 'assistant' && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
                    {message.content}
                  </div>
                  <div className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message assistant">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="message-bubble typing">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chatbox-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn-send"
              disabled={!inputMessage.trim() || isLoading}
            >
              <span className="send-icon">➤</span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ChatBox
