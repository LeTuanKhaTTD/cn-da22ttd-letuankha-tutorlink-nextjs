import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { postsApi, applicationsApi } from '../api/posts.api'
import { adaptPostData } from '../utils/dataAdapter'
import { useAuth } from '../hooks/useAuth'
import './PostDetailPage.css'

function PostDetailPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applyMessage, setApplyMessage] = useState('')
  const [applying, setApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postId) return
      
      try {
        setLoading(true)
        const response = await postsApi.getPostById(postId)
        const postData = (response as any).data || response
        const adaptedPost = adaptPostData(postData)
        setPost(adaptedPost)
      } catch (error) {
        console.error('Error fetching post detail:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPostDetail()
  }, [postId])

  useEffect(() => {
    const checkApplication = async () => {
      if (!postId || !user || user.vai_tro !== 'gia_su') return
      
      try {
        const myApps = await applicationsApi.getMyApplications()
        const applied = (myApps as any).data?.some((app: any) => app.bai_dang_id === postId)
        setHasApplied(applied || false)
      } catch (error) {
        console.error('Error checking application:', error)
      }
    }
    
    checkApplication()
  }, [postId, user])

  const handleApplyClick = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để ứng tuyển')
      return
    }
    if (user.vai_tro !== 'gia_su') {
      alert('Chỉ gia sư mới có thể ứng tuyển')
      return
    }
    setShowApplyModal(true)
  }

  const handleSubmitApplication = async () => {
    if (!postId) return
    
    try {
      setApplying(true)
      await applicationsApi.createApplication(postId, applyMessage || undefined)
      setHasApplied(true)
      setShowApplyModal(false)
      setApplyMessage('')
      alert('✅ Ứng tuyển thành công! Phụ huynh sẽ xem xét và liên hệ với bạn.')
    } catch (error: any) {
      console.error('Error applying:', error)
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi ứng tuyển')
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <div className="post-detail-page">
        <div className="post-detail-loading">
          <div className="spinner"></div>
          <p>Đang tải thông tin yêu cầu...</p>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="post-detail-page">
        <div className="post-detail-error">
          <h2>⚠️ Không tìm thấy yêu cầu</h2>
          <p>Yêu cầu này không tồn tại hoặc đã bị xóa</p>
          <Link to="/posts" className="btn btn-primary">← Quay lại danh sách</Link>
        </div>
      </div>
    )
  }

  const subjectName = typeof post.subject === 'object' 
    ? (post.subject as any)?.ten_mon || String(post.subject)
    : post.subject || 'Chưa rõ môn học'

  const isOpen = post.status === 'mo' || post.status === 'open'
  
  const requirements = Array.isArray(post.requirements)
    ? post.requirements
    : typeof post.requirements === 'string'
    ? (post.requirements as string).split(',').map((r: string) => r.trim()).filter(Boolean)
    : [
      'Có kinh nghiệm giảng dạy tối thiểu 6 tháng',
      'Thành thạo kiến thức chương trình học',
      'Có phương pháp giảng dạy phù hợp với lứa tuổi',
      'Tận tâm và có trách nhiệm với học sinh'
    ]

  return (
    <div className="post-detail-page">
      <div className="post-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/posts">Danh sách yêu cầu</Link>
          <span>/</span>
          <span>{subjectName}</span>
        </nav>

        {/* Header Card */}
        <div className="post-header-card">
          <div className="post-header-top">
            <div className="badges-row">
              <span className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
                {isOpen ? '🟢 Đang tuyển' : '🔴 Đã đóng'}
              </span>
              <span className="level-badge">{post.level}</span>
            </div>
            <button className="btn-back" onClick={() => navigate('/posts')}>
              ← Quay lại
            </button>
          </div>

          <h1 className="post-title">
            📚 Tìm gia sư dạy {subjectName}
          </h1>

          <div className="post-stats-grid">
            <div className="stat-item">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <div className="stat-label">Học phí</div>
                <div className="stat-value">{post.budget || 'Thỏa thuận'}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <div className="stat-label">Số buổi</div>
                <div className="stat-value">{post.frequency || '2 buổi/tuần'}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📍</div>
              <div className="stat-content">
                <div className="stat-label">Khu vực</div>
                <div className="stat-value">{post.location}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🕒</div>
              <div className="stat-content">
                <div className="stat-label">Ngày đăng</div>
                <div className="stat-value">
                  {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
          </div>

          <div className="post-actions">
            <button 
              className={`btn ${hasApplied ? 'btn-success' : 'btn-primary'}`}
              onClick={handleApplyClick}
              disabled={hasApplied || !isOpen}
            >
              {hasApplied ? '✓ Đã ứng tuyển' : '📝 Ứng tuyển ngay'}
            </button>
            <Link to="/chat" className="btn btn-secondary">
              💬 Liên hệ phụ huynh
            </Link>
          </div>
        </div>

        {/* Description Card */}
        <div className="info-card">
          <div className="card-title">
            <span className="title-icon">📝</span>
            <h3>Mô tả chi tiết</h3>
          </div>
          <div className="description-text">
            {post.description || `Gia đình đang tìm kiếm một gia sư ${subjectName} 
            cho học sinh cấp ${post.level}. Mong muốn tìm được người thầy/cô nhiệt tình, 
            có phương pháp giảng dạy phù hợp và tận tâm với học sinh.`}
          </div>
        </div>

        {/* Requirements Card */}
        <div className="info-card">
          <div className="card-title">
            <span className="title-icon">✅</span>
            <h3>Yêu cầu đối với gia sư</h3>
          </div>
          <div className="requirements-list">
            {requirements.map((req: string, index: number) => (
              <div key={index} className="requirement-item">
                <span className="requirement-icon">✓</span>
                <span className="requirement-text">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Info Card */}
        <div className="info-card parent-card">
          <div className="card-title">
            <span className="title-icon">👤</span>
            <h3>Thông tin phụ huynh</h3>
          </div>
          
          <div className="parent-info-section">
            <div className="parent-avatar">
              {post.parentName 
                ? post.parentName.split(' ').slice(-2).map((n: string) => n[0]).join('').toUpperCase()
                : 'PH'}
            </div>
            <div className="parent-details">
              <h4 className="parent-name">{post.parentName || 'Phụ huynh'}</h4>
              <p className="parent-meta">
                Học sinh: {post.studentName || 'Chưa cập nhật'}
              </p>
            </div>
          </div>

          <div className="parent-stats-grid">
            <div className="parent-stat">
              <div className="parent-stat-value">{post.totalPosts || 1}</div>
              <div className="parent-stat-label">Yêu cầu đã đăng</div>
            </div>
            <div className="parent-stat">
              <div className="parent-stat-value">{post.completedContracts || 0}</div>
              <div className="parent-stat-label">Hợp đồng hoàn thành</div>
            </div>
            <div className="parent-stat">
              <div className="parent-stat-value">⭐ {post.parentRating || '5.0'}</div>
              <div className="parent-stat-label">Đánh giá</div>
            </div>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="info-card instructions-card">
          <div className="instructions-content">
            <div className="instructions-icon">💡</div>
            <div className="instructions-text">
              <h4>Hướng dẫn ứng tuyển</h4>
              <p>
                Sau khi ứng tuyển, phụ huynh sẽ nhận được thông báo và có thể xem hồ sơ của bạn. 
                Nếu phụ huynh quan tâm, họ sẽ liên hệ với bạn qua chat để trao đổi thêm chi tiết.
              </p>
            </div>
          </div>
        </div>

        {/* Apply Modal */}
        {showApplyModal && (
          <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>📝 Ứng tuyển vị trí gia sư</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowApplyModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="apply-post-info">
                  <h4>Dạy {subjectName} - {post.level}</h4>
                  <p>{post.budget || 'Thỏa thuận'} • {post.location}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="applyMessage">
                    Lời giới thiệu <span className="optional">(Không bắt buộc)</span>
                  </label>
                  <textarea
                    id="applyMessage"
                    rows={6}
                    placeholder="Giới thiệu ngắn gọn về bản thân, kinh nghiệm giảng dạy và phương pháp của bạn..."
                    value={applyMessage}
                    onChange={(e) => setApplyMessage(e.target.value)}
                  />
                  <small>Một lời giới thiệu tốt sẽ giúp bạn nổi bật hơn</small>
                </div>

                <div className="apply-tips">
                  <h5>💡 Mẹo ứng tuyển hiệu quả:</h5>
                  <ul>
                    <li>Nêu rõ kinh nghiệm giảng dạy môn {subjectName}</li>
                    <li>Đề cập phương pháp giảng dạy phù hợp với {post.level}</li>
                    <li>Cho biết lịch dạy linh hoạt của bạn</li>
                    <li>Thể hiện sự nhiệt tình và tận tâm</li>
                  </ul>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowApplyModal(false)}
                  disabled={applying}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitApplication}
                  disabled={applying}
                >
                  {applying ? '⏳ Đang gửi...' : '✓ Gửi ứng tuyển'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostDetailPage
