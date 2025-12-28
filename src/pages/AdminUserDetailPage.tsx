import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api/axios'
import './AdminUserDetailPage.css'

function AdminUserDetailPage() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadUserDetail()
  }, [userId])

  const loadUserDetail = async () => {
    try {
      setIsLoading(true)
      setError('')
      if (userId) {
        const response = await api.get(`/admin/users/${userId}`)
        setUserData(response.data.data)
      }
    } catch (err: any) {
      console.error('Error loading user detail:', err)
      const errorMsg = err.response?.data?.message || err.message || 'Không thể tải thông tin người dùng!'
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="admin-user-detail-loading">
        <div className="spinner"></div>
        <p>Đang tải thông tin người dùng...</p>
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div className="admin-user-detail-error">
        <h2>⚠️ Lỗi</h2>
        <p className="error-message">{error || 'Không tìm thấy thông tin người dùng!'}</p>
        <button onClick={() => navigate('/dashboard/admin')} className="btn btn-primary">
          ← Quay lại Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="admin-user-detail-page">
      <div className="admin-user-detail-container">
        {/* Header */}
        <div className="detail-header">
          <button className="btn-back" onClick={() => navigate('/dashboard/admin')}>
            ← Quay lại Dashboard
          </button>
          <h1>👤 Chi tiết người dùng</h1>
        </div>

        {/* Profile Overview Card */}
        <div className="profile-overview-card">
          <div className="profile-banner"></div>
          <div className="profile-main">
            <div className="avatar-section">
              <img 
                src={userData.avatar_url || userData.anh_dai_dien || 'https://i.pravatar.cc/150'} 
                alt={userData.ho_ten} 
                className="avatar-large"
              />
              <span className={`status-dot ${userData.trang_thai === 'hoat_dong' ? 'active' : 'inactive'}`}></span>
            </div>
            
            <div className="profile-info">
              <h2 className="user-name">{userData.ho_ten}</h2>
              <p className="user-email">📧 {userData.email}</p>
              
              <div className="badges-row">
                <span className={`role-badge badge-${userData.vai_tro}`}>
                  {userData.vai_tro === 'gia_su' ? '👨‍🏫 Gia sư' : 
                   userData.vai_tro === 'phu_huynh' ? '👨‍👩‍👧 Phụ huynh' : 
                   '👑 Admin'}
                </span>
                <span className={`status-badge ${userData.trang_thai === 'hoat_dong' ? 'active' : 'inactive'}`}>
                  {userData.trang_thai === 'hoat_dong' ? '✅ Hoạt động' : '🔒 Đã khóa'}
                </span>
                {userData.da_xac_thuc && (
                  <span className="verified-badge">✓ Đã xác thực MSSV</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Only for Tutors */}
        {userData.vai_tro === 'gia_su' && (
          <div className="stats-grid">
            <div className="stat-card stat-rating">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-value">{userData.danh_gia_trung_binh || 0}</div>
                <div className="stat-label">Đánh giá</div>
                <div className="stat-sub">{userData.so_danh_gia || 0} lượt</div>
              </div>
            </div>
            
            <div className="stat-card stat-price">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <div className="stat-value">{(userData.hoc_phi_gio || 0).toLocaleString('vi-VN')}đ</div>
                <div className="stat-label">Học phí/giờ</div>
                <div className="stat-sub">{userData.hinh_thuc || 'Chưa rõ'}</div>
              </div>
            </div>
            
            <div className="stat-card stat-mode">
              <div className="stat-icon">
                {userData.hinh_thuc === 'online' ? '💻' : 
                 userData.hinh_thuc === 'offline' ? '🏠' : '🔄'}
              </div>
              <div className="stat-content">
                <div className="stat-value">
                  {userData.hinh_thuc === 'online' ? 'Online' : 
                   userData.hinh_thuc === 'offline' ? 'Offline' : 
                   'Cả hai'}
                </div>
                <div className="stat-label">Hình thức</div>
              </div>
            </div>
          </div>
        )}

        {/* Student Info Card */}
        <div className="info-card">
          <div className="card-title">
            <span className="title-icon">🎓</span>
            <h3>Thông tin sinh viên</h3>
          </div>
          <div className="info-grid-2col">
            <div className="info-row">
              <span className="info-label">📝 MSSV</span>
              <span className="info-value highlight">{userData.ma_sinh_vien || 'Chưa cập nhật'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">📚 Lớp</span>
              <span className="info-value">{userData.ma_lop || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">🏫 Ngành</span>
              <span className="info-value">{userData.nganh_hoc || userData.nganh || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">📅 Khóa</span>
              <span className="info-value">{userData.khoa || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">✅ Xác thực</span>
              <span className={`verification-status ${userData.da_xac_thuc ? 'verified' : 'pending'}`}>
                {userData.da_xac_thuc ? '✓ Đã xác thực' : '⏳ Chưa xác thực'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">📱 Số điện thoại</span>
              <span className="info-value">{userData.so_dien_thoai || 'Chưa cập nhật'}</span>
            </div>
          </div>
        </div>

        {/* Tutor Details - Only for tutors */}
        {userData.vai_tro === 'gia_su' && (
          <>
            {/* About Section */}
            {userData.gioi_thieu && (
              <div className="info-card">
                <div className="card-title">
                  <span className="title-icon">📝</span>
                  <h3>Giới thiệu</h3>
                </div>
                <div className="text-content">
                  {userData.gioi_thieu || userData.mo_ta || 'Chưa có giới thiệu'}
                </div>
              </div>
            )}

            {/* Experience & Skills */}
            {userData.kinh_nghiem && (
              <div className="info-card">
                <div className="card-title">
                  <span className="title-icon">💼</span>
                  <h3>Kinh nghiệm giảng dạy</h3>
                </div>
                <div className="text-content">
                  {userData.kinh_nghiem || 'Chưa cập nhật'}
                </div>
              </div>
            )}

            {/* Subjects */}
            {userData.mon_hoc && userData.mon_hoc.length > 0 && (
              <div className="info-card">
                <div className="card-title">
                  <span className="title-icon">📖</span>
                  <h3>Môn dạy ({userData.mon_hoc.length})</h3>
                </div>
                <div className="subjects-grid">
                  {userData.mon_hoc.map((subject: string, index: number) => (
                    <div key={index} className="subject-chip">
                      <span className="subject-icon">📚</span>
                      {subject}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* System Info Card */}
        <div className="info-card system-info">
          <div className="card-title">
            <span className="title-icon">⚙️</span>
            <h3>Thông tin hệ thống</h3>
          </div>
          <div className="info-grid-2col">
            <div className="info-row">
              <span className="info-label">🆔 User ID</span>
              <span className="info-value code">{userData.id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">📅 Ngày tạo</span>
              <span className="info-value">{new Date(userData.tao_luc).toLocaleString('vi-VN')}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="detail-actions">
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/dashboard/admin')}
          >
            ← Quay lại
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => {
              if (confirm(`Bạn có chắc muốn ${userData.trang_thai === 'hoat_dong' ? 'khóa' : 'mở khóa'} tài khoản này?`)) {
                alert('Tính năng đang phát triển!')
              }
            }}
          >
            {userData.trang_thai === 'hoat_dong' ? '🔒 Khóa tài khoản' : '🔓 Mở khóa tài khoản'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminUserDetailPage
