import { useState } from 'react'
import PostCard from '../components/PostCard'
import TutorCard from '../components/TutorCard'
import { conversations, posts, tutors } from '../data/mockData'

// Legacy types for mockData compatibility
interface LegacyConversation {
  id: string
  with?: string
  lastMessage?: string
  timestamp?: string
}

function DashboardPage() {
  const [role, setRole] = useState<'parent' | 'tutor'>('parent')
  const parentHighlights = [
    'Theo dõi trạng thái tin đã đăng và lời mời trong một nơi.',
    'So sánh hồ sơ gia sư ứng tuyển để chọn người phù hợp.',
    'Trao đổi trực tiếp với gia sư và đặt lịch nhanh chóng.'
  ]
  const tutorHighlights = [
    'Kiểm tra tiến độ ứng tuyển và lịch dạy của bạn mỗi tuần.',
    'Cập nhật hồ sơ nổi bật để tăng tỷ lệ phụ huynh liên hệ.',
    'Phản hồi tin nhắn nhanh để giữ xếp hạng phản hồi tốt.'
  ]
  const highlightList = role === 'parent' ? parentHighlights : tutorHighlights

  return (
    <div className="container dashboard-page">
      <aside className="dashboard-sidebar">
        <h2>Bảng điều khiển</h2>
        <button
          type="button"
          className={`sidebar-link${role === 'parent' ? ' active' : ''}`}
          onClick={() => setRole('parent')}
        >
          Dành cho phụ huynh
        </button>
        <button
          type="button"
          className={`sidebar-link${role === 'tutor' ? ' active' : ''}`}
          onClick={() => setRole('tutor')}
        >
          Dành cho gia sư
        </button>
        <button type="button" className="sidebar-link">
          Tin nhắn
        </button>
        <button type="button" className="sidebar-link">
          Cài đặt tài khoản
        </button>
      </aside>
      <section className="dashboard-content">
        <div className="page-intro">
          <div>
            <span className="page-intro-badge">Bảng điều khiển</span>
            <h1>{role === 'parent' ? 'Quản lý tin và lời mời' : 'Theo dõi lịch giảng dạy'}</h1>
            <p>
              {role === 'parent'
                ? 'Tin đăng, lời mời và phản hồi của gia sư đều hiển thị tập trung để bạn xử lý nhanh.'
                : 'Theo dõi lịch dạy và chăm sóc phụ huynh ngay tại một bảng điều khiển hiện đại.'}
            </p>
          </div>
          <ul className="page-intro-list">
            {highlightList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {role === 'parent' ? (
          <div className="dashboard-section">
            <header>
              <h1>Quản lý tin đăng</h1>
              <button type="button" className="btn btn-primary">
                Tạo tin mới
              </button>
            </header>
            <div className="stack">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} ownerActions />
              ))}
            </div>
            <section className="card">
              <h2>Gia sư đã ứng tuyển</h2>
              <div className="grid grid-2">
                {tutors.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Chưa có gia sư nào.</p>
                ) : (
                  tutors.slice(0, 6).map((tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                  ))
                )}
              </div>
            </section>
          </div>
        ) : (
          <div className="dashboard-section">
            <header>
              <h1>Trạng thái ứng tuyển</h1>
              <button type="button" className="btn btn-secondary">
                Cập nhật hồ sơ
              </button>
            </header>
            <div className="card status-card">
              <h2>Tổng quan</h2>
              <ul>
                <li>Ứng tuyển đang chờ: 2</li>
                <li>Đã được chấp nhận: 5</li>
                <li>Lịch dạy trong tuần: 12 buổi</li>
              </ul>
            </div>
            <section className="card">
              <h2>Tin đã ứng tuyển</h2>
              <div className="stack">
                {posts.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Chưa có yêu cầu nào.</p>
                ) : (
                  posts.slice(0, 6).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        <section className="card conversations">
          <header>
            <h2>Tin nhắn gần đây</h2>
            <button type="button" className="btn btn-ghost">
              Xem tất cả
            </button>
          </header>
          <ul>
            {(conversations as unknown as LegacyConversation[]).map((conversation) => (
              <li key={conversation.id}>
                <div>
                  <strong>{conversation.with || 'Người dùng'}</strong>
                  <p>{conversation.lastMessage || ''}</p>
                </div>
                <span>{conversation.timestamp || ''}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  )
}

export default DashboardPage
