import { useState } from 'react'
import { conversations } from '../data/mockData'

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const activeConversation = conversations[0]

  return (
    <div className={`chatbox${isOpen ? ' open' : ''}${isExpanded ? ' expanded' : ''}`}>
      <button
        type="button"
        className="chatbox-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? 'Đóng chat' : 'Chat ngay'}
      </button>
      {isOpen && activeConversation && (
        <div className="chatbox-panel">
          <header>
            <div>
              <strong>{activeConversation.with}</strong>
              <p>{activeConversation.lastMessage}</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? 'Thu gọn' : 'Mở rộng'}
            </button>
          </header>
          <div className="chatbox-messages">
            {activeConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.sender === 'parent' ? 'sent' : 'received'}`}
              >
                <span>{message.body}</span>
                <small>{message.time}</small>
              </div>
            ))}
          </div>
          <form className="chatbox-input" onSubmit={(event) => event.preventDefault()}>
            <input type="text" placeholder="Nhập tin nhắn" />
            <button type="submit" className="btn btn-primary">
              Gửi
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ChatBox
