import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { postsApi, applicationsApi } from '../api/posts.api'
import { tutorsApi } from '../api/tutors.api'
import './TutorDashboard.css'

interface TutorStats {
  rating: number
  reviewsCount: number
  totalApplications: number
  acceptedApplications: number
  earnings: string
}

const TutorDashboard = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'applications' | 'schedule'>('available')
  const [isLoading, setIsLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [stats, setStats] = useState<TutorStats>({
    rating: 0,
    reviewsCount: 0,
    totalApplications: 0,
    acceptedApplications: 0,
    earnings: '0'
  })
  const [availablePosts, setAvailablePosts] = useState<any[]>([])
  const [myApplications, setMyApplications] = useState<any[]>([])

  useEffect(() => {
    // Check authentication và role
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (user?.vai_tro !== 'gia_su') {
      alert('Bạn không có quyền truy cập trang này!')
      navigate('/')
      return
    }
    
    fetchData()
  }, [isAuthenticated, user, navigate])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch my profile stats
      if (user?.id) {
        try {
          const tutorProfile = await tutorsApi.getTutorById(user.id)
          setStats({
            rating: tutorProfile.diem_danh_gia_tb || 0,
            reviewsCount: tutorProfile.so_luong_danh_gia || 0,
            totalApplications: myApplications.length,
            acceptedApplications: 0,
            earnings: '0'
          })
        } catch (err) {
          console.error('Error fetching tutor profile:', err)
        }
      }
      
      // Fetch available posts (all open posts)
      const allPosts = await postsApi.getPosts({} as any)
      setAvailablePosts(allPosts.data || [])
      
      // Fetch my applications
      const apps = await applicationsApi.getMyApplications()
      setMyApplications(apps || [])
      
      // Update stats with applications data
      const accepted = (apps || []).filter((a: any) => a.trang_thai === 'chap_nhan').length
      setStats(prev => ({
        ...prev,
        totalApplications: apps?.length || 0,
        acceptedApplications: accepted
      }))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApply = async (postId: string) => {
    if (!confirm('Xác nhận ứng tuyển vào bài đăng này?')) return
    
    try {
      await applicationsApi.createApplication(postId)
      alert('✅ Đã gửi đơn ứng tuyển thành công!')
      fetchData() // Refresh data
    } catch (error: any) {
      console.error('Error applying:', error)
      alert('❌ ' + (error.response?.data?.message || 'Lỗi khi ứng tuyển'))
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
    <div className="tutor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>🎓 Dashboard Gia Sư</h1>
        <p className="welcome-text">Xin chào, {user?.ho_ten || 'Gia sư'}!</p>
        <p className="user-email">📧 {user?.email}</p>
        {(user as any)?.mssv && (
          <div className="verified-badge">
            ✓ Đã xác thực - MSSV: {(user as any).mssv}
          </div>
        )}
      </div>

      {/* Profile Summary */}
      <div className="profile-summary">
        <div className="profile-card">
          <div className="profile-info">
            <h3>Hồ sơ của bạn</h3>
            {(user as any)?.ma_lop && (
              <div className="info-row">
                <span>📚 Mã lớp:</span>
                <strong>{(user as any).ma_lop}</strong>
              </div>
            )}
            {(user as any)?.nganh && (
              <div className="info-row">
                <span>🎯 Ngành:</span>
                <strong>{(user as any).nganh}</strong>
              </div>
            )}
            {(user as any)?.hoc_phi && (
              <div className="info-row">
                <span>💰 Học phí:</span>
                <strong>{(user as any).hoc_phi} VNĐ/buổi</strong>
              </div>
            )}
            <div className="info-row info-row-highlight">
              <span>⭐ Đánh giá:</span>
              <strong>{stats.rating}/5.0 ({stats.reviewsCount} đánh giá)</strong>
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
            <h3>{stats.totalApplications}</h3>
            <p>Đơn đã gửi</p>
          </div>
          <Link to="/my-applications" className="stat-link">Xem tất cả →</Link>
        </div>
        <div className="stat-card accepted">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.acceptedApplications}</h3>
            <p>Được chấp nhận</p>
          </div>
        </div>
        <div className="stat-card earnings">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>{stats.earnings}</h3>
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
          📨 Đơn của tôi ({myApplications.length})
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
          <div className="posts-grid">
            {availablePosts.map((post) => (
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
            {myApplications.map((app) => (
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
