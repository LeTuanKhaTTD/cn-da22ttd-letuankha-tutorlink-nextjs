import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AdminDashboard.css'

// Mock data - sẽ thay bằng API call
const mockAdminData = {
  totalUsers: 245,
  totalTutors: 87,
  totalParents: 156,
  pendingVerifications: 12,
  activePosts: 34,
  totalApplications: 156,
  totalEarnings: '45,600,000',
}

const mockPendingTutors = [
  {
    id: 1,
    name: 'Nguyễn Văn E',
    email: 'nguyenvane@tvu.edu.vn',
    studentId: '110122087',
    classCode: 'DH21IT03',
    faculty: 'Công nghệ thông tin',
    major: 'Kỹ thuật phần mềm',
    avatar: 'https://i.pravatar.cc/150?img=8',
    submittedAt: '2025-10-27',
  },
  {
    id: 2,
    name: 'Trần Thị F',
    email: 'tranthif@tvu.edu.vn',
    studentId: '110122088',
    classCode: 'DH21SP02',
    faculty: 'Sư phạm',
    major: 'Sư phạm Toán',
    avatar: 'https://i.pravatar.cc/150?img=9',
    submittedAt: '2025-10-26',
  },
]

const mockRecentActivities = [
  {
    id: 1,
    type: 'registration',
    message: 'Phụ huynh Lê Văn G đã đăng ký tài khoản',
    time: '5 phút trước',
  },
  {
    id: 2,
    type: 'post',
    message: 'Bài đăng "Tìm gia sư Hóa lớp 11" đã được tạo',
    time: '15 phút trước',
  },
  {
    id: 3,
    type: 'application',
    message: 'Gia sư Nguyễn H ứng tuyển vào bài đăng #234',
    time: '30 phút trước',
  },
  {
    id: 4,
    type: 'verification',
    message: 'Gia sư Trần I đã được xác thực MSSV',
    time: '1 giờ trước',
  },
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'users' | 'posts' | 'stats'>('pending')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const handleVerify = (tutorId: number) => {
    // TODO: API call to verify tutor
    console.log('Verify tutor:', tutorId)
    alert('Đã phê duyệt gia sư!')
  }

  const handleReject = (tutorId: number) => {
    // TODO: API call to reject tutor
    console.log('Reject tutor:', tutorId)
    const reason = prompt('Lý do từ chối:')
    if (reason) {
      alert(`Đã từ chối với lý do: ${reason}`)
    }
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
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>👨‍💼 Dashboard Quản Trị Viên</h1>
        <p className="welcome-text">Quản lý hệ thống TutorLink TVU</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{mockAdminData.totalUsers}</h3>
            <p>Tổng người dùng</p>
          </div>
        </div>
        <div className="stat-card tutors">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>{mockAdminData.totalTutors}</h3>
            <p>Gia sư</p>
          </div>
        </div>
        <div className="stat-card parents">
          <div className="stat-icon">👪</div>
          <div className="stat-content">
            <h3>{mockAdminData.totalParents}</h3>
            <p>Phụ huynh</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{mockAdminData.pendingVerifications}</h3>
            <p>Chờ duyệt</p>
          </div>
        </div>
        <div className="stat-card posts">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{mockAdminData.activePosts}</h3>
            <p>Bài đăng</p>
          </div>
        </div>
        <div className="stat-card applications">
          <div className="stat-icon">📨</div>
          <div className="stat-content">
            <h3>{mockAdminData.totalApplications}</h3>
            <p>Đơn ứng tuyển</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities-section">
        <h2>🔔 Hoạt động gần đây</h2>
        <div className="activities-list">
          {mockRecentActivities.map((activity) => (
            <div key={activity.id} className={`activity-item ${activity.type}`}>
              <div className="activity-icon">
                {activity.type === 'registration' && '✨'}
                {activity.type === 'post' && '📝'}
                {activity.type === 'application' && '📨'}
                {activity.type === 'verification' && '✅'}
              </div>
              <div className="activity-content">
                <p>{activity.message}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          ⏳ Chờ xác thực ({mockPendingTutors.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Người dùng
        </button>
        <button
          className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          📝 Bài đăng
        </button>
        <button
          className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊 Thống kê
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Pending Verifications Tab */}
        {activeTab === 'pending' && (
          <div className="pending-list">
            {mockPendingTutors.map((tutor) => (
              <div key={tutor.id} className="tutor-verification-card">
                <div className="verification-header">
                  <img src={tutor.avatar} alt={tutor.name} className="tutor-avatar" />
                  <div className="tutor-basic-info">
                    <h3>{tutor.name}</h3>
                    <p className="email">{tutor.email}</p>
                  </div>
                  <span className="pending-badge">⏳ Chờ duyệt</span>
                </div>

                <div className="verification-body">
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">🎓 MSSV:</span>
                      <strong>{tutor.studentId}</strong>
                    </div>
                    <div className="info-item">
                      <span className="label">📚 Mã lớp:</span>
                      <strong>{tutor.classCode}</strong>
                    </div>
                    <div className="info-item">
                      <span className="label">🏫 Khoa:</span>
                      <span>{tutor.faculty}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">📖 Ngành:</span>
                      <span>{tutor.major}</span>
                    </div>
                  </div>
                  <div className="submission-time">
                    📅 Đăng ký: {new Date(tutor.submittedAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                <div className="verification-actions">
                  <button
                    className="btn-verify"
                    onClick={() => handleVerify(tutor.id)}
                  >
                    ✅ Phê duyệt
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(tutor.id)}
                  >
                    ❌ Từ chối
                  </button>
                  <Link to={`/admin/tutors/${tutor.id}`} className="btn-view-detail">
                    👁️ Chi tiết
                  </Link>
                </div>
              </div>
            ))}

            {mockPendingTutors.length === 0 && (
              <div className="empty-state">
                <p>✅ Không có gia sư chờ xác thực</p>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="users-management">
            <div className="management-header">
              <h2>Quản lý người dùng</h2>
              <div className="filter-buttons">
                <button className="filter-btn active">Tất cả</button>
                <button className="filter-btn">Phụ huynh</button>
                <button className="filter-btn">Gia sư</button>
              </div>
            </div>
            <div className="empty-state">
              <p>👥 Danh sách người dùng sẽ hiển thị ở đây</p>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="posts-management">
            <div className="management-header">
              <h2>Quản lý bài đăng</h2>
              <div className="filter-buttons">
                <button className="filter-btn active">Tất cả</button>
                <button className="filter-btn">Đang tuyển</button>
                <button className="filter-btn">Đã đóng</button>
              </div>
            </div>
            <div className="empty-state">
              <p>📝 Danh sách bài đăng sẽ hiển thị ở đây</p>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="statistics-view">
            <h2>📊 Thống kê hệ thống</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Người dùng mới (7 ngày qua)</h3>
                <div className="chart-placeholder">
                  📈 Biểu đồ sẽ hiển thị ở đây
                </div>
              </div>
              <div className="chart-card">
                <h3>Bài đăng theo tháng</h3>
                <div className="chart-placeholder">
                  📊 Biểu đồ sẽ hiển thị ở đây
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
