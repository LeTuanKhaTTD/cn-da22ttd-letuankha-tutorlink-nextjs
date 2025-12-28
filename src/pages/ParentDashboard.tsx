import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { postsApi, applicationsApi } from '../api/posts.api'
import './ParentDashboard.css'

interface ParentStats {
  totalPosts: number
  activePosts: number
  applications: number
  hiredTutors: number
}

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'applications' | 'hired'>('posts')
  const [isLoading, setIsLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [stats, setStats] = useState<ParentStats>({
    totalPosts: 0,
    activePosts: 0,
    applications: 0,
    hiredTutors: 0,
  })
  const [posts, setPosts] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    // Check authentication và role
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (user?.vai_tro !== 'phu_huynh') {
      alert('Bạn không có quyền truy cập trang này!')
      navigate('/')
      return
    }
    
    fetchData()
  }, [isAuthenticated, user, navigate])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch my posts
      const myPosts = await postsApi.getMyPosts()
      setPosts(myPosts || [])
      
      // Fetch all applications for my posts
      const allApplications: any[] = []
      for (const post of myPosts || []) {
        try {
          const postApps = await applicationsApi.getApplicationsByPost(post.id)
          allApplications.push(...(postApps || []))
        } catch (err) {
          console.error(`Error fetching applications for post ${post.id}:`, err)
        }
      }
      setApplications(allApplications)
      
      // Calculate stats
      const activePosts = (myPosts || []).filter((p: any) => p.trang_thai === 'mo').length
      const acceptedApps = allApplications.filter((a: any) => a.trang_thai === 'chap_nhan').length
      
      setStats({
        totalPosts: myPosts?.length || 0,
        activePosts,
        applications: allApplications.length,
        hiredTutors: acceptedApps
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptApplication = async (applicationId: string) => {
    if (!confirm('Xác nhận chấp nhận đơn ứng tuyển này?')) return
    
    try {
      await applicationsApi.updateApplicationStatus(applicationId, 'chap_nhan')
      alert('✅ Đã chấp nhận đơn ứng tuyển!')
      fetchData() // Refresh data
    } catch (error) {
      console.error('Error accepting application:', error)
      alert('❌ Lỗi khi chấp nhận đơn')
    }
  }

  const handleRejectApplication = async (applicationId: string) => {
    if (!confirm('Xác nhận từ chối đơn ứng tuyển này?')) return
    
    try {
      await applicationsApi.updateApplicationStatus(applicationId, 'tu_choi')
      alert('✅ Đã từ chối đơn ứng tuyển!')
      fetchData() // Refresh data
    } catch (error) {
      console.error('Error rejecting application:', error)
      alert('❌ Lỗi khi từ chối đơn')
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
    <div className="parent-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>👪 Dashboard Phụ Huynh</h1>
        <p className="welcome-text">Xin chào, {user?.ho_ten || 'Phụ huynh'}!</p>
        <p className="user-email">📧 {user?.email}</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{stats.totalPosts}</h3>
            <p>Bài đăng</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.activePosts}</h3>
            <p>Đang tuyển</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📨</div>
          <div className="stat-content">
            <h3>{stats.applications}</h3>
            <p>Đơn ứng tuyển</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>{stats.hiredTutors}</h3>
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
          📨 Đơn ứng tuyển ({applications.length})
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
            {posts.map((post) => (
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
            {posts.length === 0 && (
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
            {applications.map((app) => (
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
            {applications.length === 0 && (
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
