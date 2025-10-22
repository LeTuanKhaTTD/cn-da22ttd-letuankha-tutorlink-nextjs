import { useState } from 'react'
import { conversations } from '../data/mockData'

function ChatPage() {
  const [activeChatId, setActiveChatId] = useState(conversations[0]?.id ?? '')
  const activeConversation = conversations.find((item) => item.id === activeChatId)

  return (
    <div className="container chat-page">
      <aside className="chat-sidebar">
        <header>
          <h1>Hội thoại</h1>
        </header>
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={conversation.id === activeChatId ? 'active' : ''}
              onClick={() => setActiveChatId(conversation.id)}
            >
              <div>
                <strong>{conversation.with}</strong>
                <p>{conversation.lastMessage}</p>
              </div>
              <span>{conversation.timestamp}</span>
            </li>
          ))}
        </ul>
      </aside>
      <section className="chat-window">
        {activeConversation ? (
          <>
            <header>
              <div>
                <h2>{activeConversation.with}</h2>
                <p>{activeConversation.timestamp}</p>
              </div>
              <button type="button" className="btn btn-ghost">
                Thêm file
              </button>
            </header>
            <div className="chat-messages">
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'parent' ? 'sent' : 'received'}`}
                >
                  <span>{message.body}</span>
                  <small>{message.time}</small>
                </div>
              ))}
            </div>
            <form className="chat-input" onSubmit={(event) => event.preventDefault()}>
              <input type="text" placeholder="Nhập tin nhắn..." />
              <button type="submit" className="btn btn-primary">
                Gửi
              </button>
            </form>
          </>
        ) : (
          <div className="chat-empty">
            <p>Chọn một hội thoại để bắt đầu trò chuyện.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default ChatPage
