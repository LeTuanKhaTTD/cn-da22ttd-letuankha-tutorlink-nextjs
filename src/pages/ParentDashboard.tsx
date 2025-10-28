import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ParentDashboard.css'

// Mock data - sẽ thay bằng API call
const mockParentData = {
  name: 'Nguyễn Văn A',
  totalPosts: 3,
  activePosts: 2,
  applications: 12,
  hiredTutors: 1,
}

const mockPosts = [
  {
    id: 1,
    title: 'Cần gia sư Toán lớp 10',
    subject: 'Toán',
    grade: 'Lớp 10',
    fee: '150,000 VNĐ/buổi',
    applicationsCount: 5,
    status: 'active',
    createdAt: '2025-10-20',
  },
  {
    id: 2,
    title: 'Tìm gia sư Tiếng Anh lớp 8',
    subject: 'Tiếng Anh',
    grade: 'Lớp 8',
    fee: '120,000 VNĐ/buổi',
    applicationsCount: 7,
    status: 'active',
    createdAt: '2025-10-18',
  },
]

const mockApplications = [
  {
    id: 1,
    tutorName: 'Trần Thị B',
    tutorAvatar: 'https://i.pravatar.cc/150?img=5',
    postTitle: 'Cần gia sư Toán lớp 10',
    subject: 'Toán',
    coverLetter: 'Em là sinh viên năm 3 khoa Sư phạm Toán, có 2 năm kinh nghiệm dạy kèm...',
    appliedAt: '2025-10-21',
    status: 'pending',
    tutorRating: 4.8,
  },
  {
    id: 2,
    tutorName: 'Lê Văn C',
    tutorAvatar: 'https://i.pravatar.cc/150?img=12',
    postTitle: 'Tìm gia sư Tiếng Anh lớp 8',
    subject: 'Tiếng Anh',
    coverLetter: 'Em tốt nghiệp chuyên Anh, IELTS 7.5, có kinh nghiệm dạy THCS...',
    appliedAt: '2025-10-19',
    status: 'pending',
    tutorRating: 4.9,
  },
]

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'applications' | 'hired'>('posts')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const handleAcceptApplication = (applicationId: number) => {
    // TODO: API call to accept application
    console.log('Accept application:', applicationId)
    alert('Đã chấp nhận đơn ứng tuyển!')
  }

  const handleRejectApplication = (applicationId: number) => {
    // TODO: API call to reject application
    console.log('Reject application:', applicationId)
    alert('Đã từ chối đơn ứng tuyển!')
  }

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    )
  }

  return (
    <div className="parent-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>👪 Dashboard Phụ Huynh</h1>
        <p className="welcome-text">Xin chào, {mockParentData.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{mockParentData.totalPosts}</h3>
            <p>Bài đăng</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{mockParentData.activePosts}</h3>
            <p>Đang tuyển</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📨</div>
          <div className="stat-content">
            <h3>{mockParentData.applications}</h3>
            <p>Đơn ứng tuyển</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>{mockParentData.hiredTutors}</h3>
            <p>Gia sư hiện tại</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/posts/create" className="action-btn primary">
          ➕ Đăng tin tìm gia sư
        </Link>
        <Link to="/tutors" className="action-btn secondary">
          🔍 Tìm kiếm gia sư
        </Link>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          📝 Bài đăng của tôi
        </button>
        <button
          className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          📨 Đơn ứng tuyển ({mockApplications.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'hired' ? 'active' : ''}`}
          onClick={() => setActiveTab('hired')}
        >
          🎓 Gia sư đã thuê
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* My Posts Tab */}
        {activeTab === 'posts' && (
          <div className="posts-list">
            {mockPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <span className={`status-badge ${post.status}`}>
                    {post.status === 'active' ? '🟢 Đang tuyển' : '🔴 Đã đóng'}
                  </span>
                </div>
                <div className="post-info">
                  <span>📚 {post.subject}</span>
                  <span>🎯 {post.grade}</span>
                  <span>💰 {post.fee}</span>
                </div>
                <div className="post-meta">
                  <span>📅 Đăng ngày: {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                  <span>📨 {post.applicationsCount} đơn ứng tuyển</span>
                </div>
                <div className="post-actions">
                  <Link to={`/posts/${post.id}`} className="btn-view">
                    👁️ Xem chi tiết
                  </Link>
                  <Link to={`/posts/${post.id}/edit`} className="btn-edit">
                    ✏️ Chỉnh sửa
                  </Link>
                </div>
              </div>
            ))}
            {mockPosts.length === 0 && (
              <div className="empty-state">
                <p>📭 Bạn chưa có bài đăng nào</p>
                <Link to="/posts/create" className="btn-create">
                  Tạo bài đăng đầu tiên
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="applications-list">
            {mockApplications.map((app) => (
              <div key={app.id} className="application-card">
                <div className="app-header">
                  <img src={app.tutorAvatar} alt={app.tutorName} className="tutor-avatar" />
                  <div className="tutor-info">
                    <h3>{app.tutorName}</h3>
                    <div className="rating">
                      ⭐ {app.tutorRating} <span>(23 đánh giá)</span>
                    </div>
                  </div>
                  <span className={`app-status ${app.status}`}>
                    {app.status === 'pending' && '⏳ Chờ xử lý'}
                    {app.status === 'accepted' && '✅ Đã chấp nhận'}
                    {app.status === 'rejected' && '❌ Đã từ chối'}
                  </span>
                </div>

                <div className="app-body">
                  <div className="app-post-info">
                    <strong>📝 Bài đăng:</strong> {app.postTitle}
                  </div>
                  <div className="app-cover-letter">
                    <strong>💬 Thư giới thiệu:</strong>
                    <p>{app.coverLetter}</p>
                  </div>
                  <div className="app-meta">
                    📅 Ứng tuyển: {new Date(app.appliedAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                {app.status === 'pending' && (
                  <div className="app-actions">
                    <button
                      className="btn-accept"
                      onClick={() => handleAcceptApplication(app.id)}
                    >
                      ✅ Chấp nhận
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleRejectApplication(app.id)}
                    >
                      ❌ Từ chối
                    </button>
                    <Link to={`/tutors/${app.id}`} className="btn-view-profile">
                      👁️ Xem hồ sơ
                    </Link>
                  </div>
                )}
              </div>
            ))}
            {mockApplications.length === 0 && (
              <div className="empty-state">
                <p>📭 Chưa có đơn ứng tuyển nào</p>
              </div>
            )}
          </div>
        )}

        {/* Hired Tutors Tab */}
        {activeTab === 'hired' && (
          <div className="hired-list">
            <div className="empty-state">
              <p>🎓 Danh sách gia sư đã thuê sẽ hiển thị ở đây</p>
              <p className="note">Chấp nhận đơn ứng tuyển để thêm gia sư vào danh sách</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ParentDashboard
