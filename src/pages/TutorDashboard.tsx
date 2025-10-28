import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TutorDashboard.css'

// Mock data - sẽ thay bằng API call
const mockTutorData = {
  name: 'Trần Thị B',
  studentId: '110122086',
  classCode: 'DH21IT02',
  verified: true,
  rating: 4.8,
  reviewsCount: 23,
  totalApplications: 8,
  acceptedApplications: 3,
  earnings: '2,400,000',
}

const mockAvailablePosts = [
  {
    id: 1,
    title: 'Cần gia sư Toán lớp 10',
    parentName: 'Nguyễn Văn A',
    subject: 'Toán',
    grade: 'Lớp 10',
    fee: '150,000 VNĐ/buổi',
    location: 'Quận 1, TP. Trà Vinh',
    schedule: 'Thứ 2, 4, 6 (19h-21h)',
    postedAt: '2025-10-20',
  },
  {
    id: 2,
    title: 'Tìm gia sư Tiếng Anh lớp 8',
    parentName: 'Lê Thị D',
    subject: 'Tiếng Anh',
    grade: 'Lớp 8',
    fee: '120,000 VNĐ/buổi',
    location: 'Quận Ninh Kiều, Cần Thơ',
    schedule: 'Thứ 3, 5, 7 (18h-20h)',
    postedAt: '2025-10-18',
  },
]

const mockMyApplications = [
  {
    id: 1,
    postTitle: 'Cần gia sư Toán lớp 10',
    subject: 'Toán',
    fee: '150,000 VNĐ/buổi',
    appliedAt: '2025-10-21',
    status: 'accepted',
  },
  {
    id: 2,
    postTitle: 'Tìm gia sư Vật lý lớp 11',
    subject: 'Vật lý',
    fee: '180,000 VNĐ/buổi',
    appliedAt: '2025-10-19',
    status: 'pending',
  },
  {
    id: 3,
    postTitle: 'Tìm gia sư Tiếng Anh lớp 12',
    subject: 'Tiếng Anh',
    fee: '200,000 VNĐ/buổi',
    appliedAt: '2025-10-15',
    status: 'rejected',
  },
]

const TutorDashboard = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'applications' | 'schedule'>('available')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const handleApply = (postId: number) => {
    // TODO: API call to apply
    console.log('Apply to post:', postId)
    alert('Đã gửi đơn ứng tuyển!')
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
    <div className="tutor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>🎓 Dashboard Gia Sư</h1>
        <p className="welcome-text">Xin chào, {mockTutorData.name}!</p>
        {mockTutorData.verified && (
          <div className="verified-badge">
            ✓ Đã xác thực - MSSV: {mockTutorData.studentId}
          </div>
        )}
      </div>

      {/* Profile Summary */}
      <div className="profile-summary">
        <div className="profile-card">
          <div className="profile-info">
            <h3>Hồ sơ của bạn</h3>
            <div className="info-row">
              <span>📚 Mã lớp:</span>
              <strong>{mockTutorData.classCode}</strong>
            </div>
            <div className="info-row">
              <span>⭐ Đánh giá:</span>
              <strong>{mockTutorData.rating}/5.0 ({mockTutorData.reviewsCount} đánh giá)</strong>
            </div>
            <div className="info-row">
              <span>💰 Thu nhập:</span>
              <strong>{mockTutorData.earnings} VNĐ</strong>
            </div>
          </div>
          <Link to="/profile/edit" className="btn-edit-profile">
            ✏️ Chỉnh sửa hồ sơ
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card applications">
          <div className="stat-icon">📨</div>
          <div className="stat-content">
            <h3>{mockTutorData.totalApplications}</h3>
            <p>Đơn đã gửi</p>
          </div>
        </div>
        <div className="stat-card accepted">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{mockTutorData.acceptedApplications}</h3>
            <p>Được chấp nhận</p>
          </div>
        </div>
        <div className="stat-card earnings">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>{mockTutorData.earnings}</h3>
            <p>Thu nhập (VNĐ)</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          🔍 Bài đăng mới
        </button>
        <button
          className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          📨 Đơn của tôi ({mockMyApplications.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          📅 Lịch dạy
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Available Posts Tab */}
        {activeTab === 'available' && (
          <div className="posts-list">
            {mockAvailablePosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <span className="new-badge">🆕 Mới</span>
                </div>
                <div className="post-info">
                  <div className="info-item">
                    <span className="label">👤 Phụ huynh:</span>
                    <span>{post.parentName}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">📚 Môn học:</span>
                    <span>{post.subject} - {post.grade}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">💰 Học phí:</span>
                    <strong className="fee">{post.fee}</strong>
                  </div>
                  <div className="info-item">
                    <span className="label">📍 Địa điểm:</span>
                    <span>{post.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">🕐 Lịch học:</span>
                    <span>{post.schedule}</span>
                  </div>
                </div>
                <div className="post-meta">
                  📅 Đăng: {new Date(post.postedAt).toLocaleDateString('vi-VN')}
                </div>
                <div className="post-actions">
                  <Link to={`/posts/${post.id}`} className="btn-view">
                    👁️ Chi tiết
                  </Link>
                  <button
                    className="btn-apply"
                    onClick={() => handleApply(post.id)}
                  >
                    📝 Ứng tuyển ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === 'applications' && (
          <div className="applications-list">
            {mockMyApplications.map((app) => (
              <div key={app.id} className="application-card">
                <div className="app-header">
                  <h3>{app.postTitle}</h3>
                  <span className={`status-badge ${app.status}`}>
                    {app.status === 'pending' && '⏳ Chờ phản hồi'}
                    {app.status === 'accepted' && '✅ Đã chấp nhận'}
                    {app.status === 'rejected' && '❌ Bị từ chối'}
                  </span>
                </div>
                <div className="app-body">
                  <div className="app-info">
                    <span>📚 {app.subject}</span>
                    <span>💰 {app.fee}</span>
                  </div>
                  <div className="app-meta">
                    📅 Ứng tuyển: {new Date(app.appliedAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <div className="app-actions">
                  <Link to={`/posts/${app.id}`} className="btn-view-detail">
                    👁️ Xem chi tiết
                  </Link>
                  {app.status === 'accepted' && (
                    <button className="btn-contact">
                      💬 Liên hệ phụ huynh
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="schedule-view">
            <div className="empty-state">
              <p>📅 Lịch dạy của bạn sẽ hiển thị ở đây</p>
              <p className="note">Sau khi được phụ huynh chấp nhận, bạn có thể quản lý lịch dạy</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TutorDashboard
