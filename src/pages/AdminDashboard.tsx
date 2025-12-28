import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { adminApi } from '../api/admin.api'
import './AdminDashboard.css'

interface AdminStats {
  totalUsers: number
  totalTutors: number
  totalParents: number
  pendingVerifications: number
  activePosts: number
  totalApplications: number
  totalEarnings: string
}

interface PendingTutor {
  id: string
  name: string
  email: string
  studentId: string
  classCode: string
  faculty: string
  major: string
  avatar: string
  submittedAt: string
  title?: string
  hourlyRate?: number
}

interface User {
  id: string
  email: string
  vai_tro: string
  ho_ten: string
  so_dien_thoai: string
  avatar_url: string
  trang_thai: string
  tao_luc: string
}

interface Post {
  id: string
  tieu_de: string
  mo_ta: string
  mon_hoc: string
  lop: string
  hoc_phi: number
  dia_chi: string
  trang_thai: string
  tao_luc: string
  phu_huynh_ten: string
  phu_huynh_email: string
  phu_huynh_sdt: string
  so_ung_tuyen: number
}

interface Activity {
  id: number
  type: string
  message: string
  time: string
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'users' | 'posts' | 'stats'>('pending')
  const [isLoading, setIsLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTutors: 0,
    totalParents: 0,
    pendingVerifications: 0,
    activePosts: 0,
    totalApplications: 0,
    totalEarnings: '0',
  })
  const [pendingTutors, setPendingTutors] = useState<PendingTutor[]>([])
  const [activities] = useState<Activity[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [userFilter, setUserFilter] = useState<'all' | 'phu_huynh' | 'gia_su'>('all')
  const [postFilter, setPostFilter] = useState<'all' | 'mo' | 'dong'>('all')

  useEffect(() => {
    // Check authentication và role
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (user?.vai_tro !== 'admin') {
      alert('Bạn không có quyền truy cập trang này!')
      navigate('/')
      return
    }
    
    fetchData()
  }, [isAuthenticated, user, navigate])
  
  const fetchData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch stats
      const statsResponse = await adminApi.getDashboardStats()
      if (statsResponse.success) {
        setStats(statsResponse.data)
      }
      
      // Fetch pending tutors
      const tutorsResponse = await adminApi.getPendingTutors()
      if (tutorsResponse.success) {
        setPendingTutors(tutorsResponse.data)
      // Fetch users
      const usersResponse = await adminApi.getAllUsers()
      if (usersResponse.success) {
        setUsers(usersResponse.data.users)
      }
      
      // Fetch posts
      const postsResponse = await adminApi.getAllPosts()
      if (postsResponse.success) {
        setPosts(postsResponse.data.posts)
      }
      
      }
      
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
      alert('Lỗi khi tải dữ liệu!')
    }
  }

  const handleVerify = async (tutorId: string) => {
    if (!confirm('Xác nhận phê duyệt gia sư này?')) return
    
    try {
      const response = await adminApi.verifyTutor(tutorId)
      if (response.success) {
        alert('✅ ' + response.message)
        fetchData() // Refresh data
      }
    } catch (error: any) {
      console.error('Error verifying tutor:', error)
      alert('❌ ' + (error.response?.data?.message || 'Lỗi khi xác thực'))
    }
  }

  const handleReject = async (tutorId: string) => {
    const reason = prompt('Lý do từ chối:')
    if (!reason) return
    
    try {
      const response = await adminApi.rejectTutor(tutorId, reason)
      if (response.success) {
        alert('✅ ' + response.message)
        fetchData() // Refresh data
      }
    } catch (error: any) {
      console.error('Error rejecting tutor:', error)
      alert('❌ ' + (error.response?.data?.message || 'Lỗi khi từ chối'))
    }
  }

  const handleUpdatePostStatus = async (postId: string, trang_thai: string) => {
    if (!confirm(`Xác nhận ${trang_thai === 'mo' ? 'mở lại' : trang_thai === 'dong' ? 'đóng' : 'ẩn'} bài đăng này?`)) return
    
    try {
      const response = await adminApi.updatePostStatus(postId, trang_thai)
      if (response.success) {
        alert('✅ ' + response.message)
        fetchData() // Refresh data
      }
    } catch (error: any) {
      console.error('Error updating post:', error)
      alert('❌ ' + (error.response?.data?.message || 'Lỗi khi cập nhật'))
    }
  }

  const handleViewTutorDetail = (tutorId: string) => {
    console.log('🔍 Navigating to user detail:', tutorId)
    navigate(`/admin/users/${tutorId}`)
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
        <p className="welcome-text">Xin chào, {user?.ho_ten || 'Admin'}!</p>
        <p className="user-email">📧 {user?.email}</p>
        <p className="welcome-text" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Quản lý hệ thống TutorLink TVU</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Tổng người dùng</p>
          </div>
        </div>
        <div className="stat-card tutors">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>{stats.totalTutors}</h3>
            <p>Gia sư</p>
          </div>
        </div>
        <div className="stat-card parents">
          <div className="stat-icon">👪</div>
          <div className="stat-content">
            <h3>{stats.totalParents}</h3>
            <p>Phụ huynh</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pendingVerifications}</h3>
            <p>Chờ duyệt</p>
          </div>
        </div>
        <div className="stat-card posts">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{stats.activePosts}</h3>
            <p>Bài đăng</p>
          </div>
        </div>
        <div className="stat-card applications">
          <div className="stat-icon">📨</div>
          <div className="stat-content">
            <h3>{stats.totalApplications}</h3>
            <p>Đơn ứng tuyển</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities-section">
        <h2>🔔 Hoạt động gần đây</h2>
        <ul className="activities-list">
          {activities.map((activity) => (
            <li key={activity.id} className={`activity-item ${activity.type}`}>
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
            </li>
          ))}
        </ul>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          ⏳ Chờ xác thực ({pendingTutors.length})
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
            {pendingTutors.map((tutor) => (
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
                  <button 
                    className="btn-view-detail"
                    onClick={() => handleViewTutorDetail(tutor.id)}
                  >
                    👁️ Chi tiết
                  </button>
                </div>
              </div>
            ))}

            {pendingTutors.length === 0 && (
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
                <button 
                  className={`filter-btn ${userFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setUserFilter('all')}
                >
                  Tất cả
                </button>
                <button 
                  className={`filter-btn ${userFilter === 'phu_huynh' ? 'active' : ''}`}
                  onClick={() => setUserFilter('phu_huynh')}
                >
                  Phụ huynh
                </button>
                <button 
                  className={`filter-btn ${userFilter === 'gia_su' ? 'active' : ''}`}
                  onClick={() => setUserFilter('gia_su')}
                >
                  Gia sư
                </button>
              </div>
            </div>
            
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(u => userFilter === 'all' || u.vai_tro === userFilter)
                    .map((user) => (
                    <tr key={user.id}>
                      <td>
                        <img 
                          src={user.avatar_url || 'https://i.pravatar.cc/150?img=1'} 
                          alt={user.ho_ten}
                          className="user-avatar-small"
                        />
                      </td>
                      <td><strong>{user.ho_ten}</strong></td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.vai_tro}`}>
                          {user.vai_tro === 'admin' && '👨‍💼 Admin'}
                          {user.vai_tro === 'gia_su' && '🎓 Gia sư'}
                          {user.vai_tro === 'phu_huynh' && '👪 Phụ huynh'}
                        </span>
                      </td>
                      <td>{user.so_dien_thoai}</td>
                      <td>
                        <span className={`status-badge ${user.trang_thai}`}>
                          {user.trang_thai === 'hoat_dong' && '✅ Hoạt động'}
                          {user.trang_thai === 'tam_ngung' && '⏸️ Tạm ngưng'}
                          {user.trang_thai === 'khoa' && '🔒 Khóa'}
                        </span>
                      </td>
                      <td>{new Date(user.tao_luc).toLocaleDateString('vi-VN')}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-small btn-view" 
                            title="Xem chi tiết"
                            onClick={() => user.vai_tro === 'gia_su' && handleViewTutorDetail(user.id)}
                          >
                            👁️
                          </button>
                          {user.vai_tro !== 'admin' && (
                            <button 
                              className="btn-small btn-lock" 
                              title={user.trang_thai === 'hoat_dong' ? 'Khóa' : 'Mở khóa'}
                            >
                              {user.trang_thai === 'hoat_dong' ? '🔒' : '🔓'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {users.filter(u => userFilter === 'all' || u.vai_tro === userFilter).length === 0 && (
                <div className="empty-state">
                  <p>👥 Không có người dùng nào</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="posts-management">
            <div className="management-header">
              <h2>Quản lý bài đăng</h2>
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${postFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setPostFilter('all')}
                >
                  Tất cả
                </button>
                <button 
                  className={`filter-btn ${postFilter === 'mo' ? 'active' : ''}`}
                  onClick={() => setPostFilter('mo')}
                >
                  Đang tuyển
                </button>
                <button 
                  className={`filter-btn ${postFilter === 'dong' ? 'active' : ''}`}
                  onClick={() => setPostFilter('dong')}
                >
                  Đã đóng
                </button>
              </div>
            </div>
            
            <div className="posts-table">
              <table>
                <thead>
                  <tr>
                    <th>Tiêu đề</th>
                    <th>Môn học</th>
                    <th>Lớp</th>
                    <th>Học phí</th>
                    <th>Phụ huynh</th>
                    <th>Ứng tuyển</th>
                    <th>Trạng thái</th>
                    <th>Ngày đăng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {posts
                    .filter(p => postFilter === 'all' || p.trang_thai === postFilter)
                    .map((post) => (
                    <tr key={post.id}>
                      <td><strong>{post.tieu_de}</strong></td>
                      <td>{post.mon_hoc}</td>
                      <td>{post.lop}</td>
                      <td>{post.hoc_phi?.toLocaleString('vi-VN')}đ/h</td>
                      <td>
                        <div>
                          <div><strong>{post.phu_huynh_ten}</strong></div>
                          <small>{post.phu_huynh_sdt}</small>
                        </div>
                      </td>
                      <td>
                        <span className="badge-count">{post.so_ung_tuyen || 0}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${post.trang_thai}`}>
                          {post.trang_thai === 'mo' && '✅ Đang tuyển'}
                          {post.trang_thai === 'dong' && '🔒 Đã đóng'}
                          {post.trang_thai === 'an' && '👁️ Ẩn'}
                        </span>
                      </td>
                      <td>{new Date(post.tao_luc).toLocaleDateString('vi-VN')}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-small btn-view" 
                            title="Xem chi tiết"
                            onClick={() => navigate(`/posts/${post.id}`)}
                          >
                            👁️
                          </button>
                          {post.trang_thai === 'mo' ? (
                            <button 
                              className="btn-small btn-close" 
                              title="Đóng bài"
                              onClick={() => handleUpdatePostStatus(post.id, 'dong')}
                            >
                              🔒
                            </button>
                          ) : (
                            <button 
                              className="btn-small btn-open" 
                              title="Mở lại"
                              onClick={() => handleUpdatePostStatus(post.id, 'mo')}
                            >
                              🔓
                            </button>
                          )}
                          <button 
                            className="btn-small btn-hide" 
                            title="Ẩn bài"
                            onClick={() => handleUpdatePostStatus(post.id, 'an')}
                          >
                            👁️‍🗨️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {posts.filter(p => postFilter === 'all' || p.trang_thai === postFilter).length === 0 && (
                <div className="empty-state">
                  <p>📝 Không có bài đăng nào</p>
                </div>
              )}
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
