import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
import TutorCard from '../components/TutorCard'
import { tutorsApi } from '../api/tutors.api'
import { postsApi } from '../api/posts.api'
import { adaptTutorData, adaptPostData } from '../utils/dataAdapter'

function HomePage() {
  const navigate = useNavigate()
  const [featuredTutors, setFeaturedTutors] = useState<any[]>([])
  const [latestPosts, setLatestPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Search form state
  const [searchForm, setSearchForm] = useState({
    subject: '',
    level: '',
    location: '',
    schedule: ''
  })

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchForm.subject) params.append('subject', searchForm.subject)
    if (searchForm.level) params.append('level', searchForm.level)
    if (searchForm.location) params.append('location', searchForm.location)
    if (searchForm.schedule) params.append('schedule', searchForm.schedule)
    
    navigate(`/tutors?${params.toString()}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const tutorsRes = await tutorsApi.getTutors({} as any)
        const adaptedTutors = (tutorsRes.data || []).slice(0, 3).map(adaptTutorData)
        setFeaturedTutors(adaptedTutors)

        const postsRes = await postsApi.getPosts({} as any)
        const adaptedPosts = (postsRes.data || []).slice(0, 3).map(adaptPostData)
        setLatestPosts(adaptedPosts)
      } catch (error) {
        console.error('Error fetching homepage data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const stats = [
    { value: '1.500+', label: 'Gia sư', icon: '📚' },
    { value: '4.8/5', label: 'Đánh giá', icon: '⭐' },
    { value: '200+', label: 'Kết nối', icon: '👥' },
    { value: '24/7', label: 'Hỗ trợ', icon: '💬' }
  ]

  const benefits = [
    { 
      icon: '⚡', 
      title: 'Kết nối nhanh chóng', 
      text: 'Tìm gia sư phù hợp chỉ trong vài phút với bộ lọc thông minh'
    },
    { 
      icon: '✓', 
      title: 'Xác thực danh tính', 
      text: 'Mọi gia sư đều được xác minh MSSV và thông tin học vấn'
    },
    { 
      icon: '💬', 
      title: 'Hỗ trợ tận tâm', 
      text: 'Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc'
    },
    { 
      icon: '📊', 
      title: 'Theo dõi tiến độ', 
      text: 'Quản lý lịch học và đánh giá tiến độ học tập dễ dàng'
    }
  ]

  return (
    <div className="home-page">
      {/* Hero Section - Matching Figma Design */}
      <section className="hero-figma">
        <div className="hero-container">
          {/* Left Content */}
          <div className="hero-left">
            <div className="hero-badge-figma">
              <span className="icon">🏆</span>
              <span>Nền tảng kết nối gia sư uy tín cho SV TVU</span>
            </div>
            
            <h1 className="hero-title-figma">
              Tìm gia sư <span className="highlight">chất lượng</span><br />
              chỉ trong vài bước
            </h1>
            
            <p className="hero-subtitle-figma">
              Phụ huynh đăng tin nhanh chóng, gia sư SV TVU tạo hồ sơ chuyên nghiệp. 
              Cùng xây dựng lộ trình học tập hiệu quả với hệ thống xác thực MSSV chính thức.
            </p>
            
            <div className="hero-cta-buttons">
              <Link to="/create-post" className="btn btn-primary btn-lg">
                ✍️ Đăng tin tìm gia sư
              </Link>
              <Link to="/tutor-profile" className="btn btn-secondary btn-lg">
                👤 Tìm gia sư
              </Link>
            </div>
            
            <div className="hero-stats-figma">
              {stats.map((stat, index) => (
                <div key={index} className="hero-stat-item">
                  <div className="hero-stat-icon">{stat.icon}</div>
                  <div className="hero-stat-content">
                    <div className="hero-stat-value">{stat.value}</div>
                    <div className="hero-stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Search Card */}
          <div className="hero-right">
            <div className="hero-search-card">
              <h3 className="search-card-title">
                <span className="icon">🔍</span>
                Tìm kiếm nhanh
              </h3>
              
              <form onSubmit={handleSearchSubmit}>
                <div className="search-form-group">
                  <label className="search-form-label">Môn học</label>
                  <select 
                    className="search-form-select"
                    value={searchForm.subject}
                    onChange={(e) => setSearchForm({...searchForm, subject: e.target.value})}
                  >
                    <option value="">-- Chọn môn --</option>
                    <option value="Toán">Toán</option>
                    <option value="Vật lý">Vật lý</option>
                    <option value="Hóa học">Hóa học</option>
                    <option value="Tiếng Anh">Tiếng Anh</option>
                    <option value="Văn">Ngữ Văn</option>
                  </select>
                </div>
                
                <div className="search-form-group">
                  <label className="search-form-label">Cấp độ</label>
                  <select 
                    className="search-form-select"
                    value={searchForm.level}
                    onChange={(e) => setSearchForm({...searchForm, level: e.target.value})}
                  >
                    <option value="">-- Chọn cấp --</option>
                    <option value="Tiểu học">Tiểu học</option>
                    <option value="THCS">THCS</option>
                    <option value="THPT">THPT</option>
                    <option value="Đại học">Đại học</option>
                  </select>
                </div>
                
                <div className="search-form-group">
                  <label className="search-form-label">Khu vực</label>
                  <input 
                    type="text"
                    className="search-form-input"
                    placeholder="VD: Quận 1, TP.HCM..."
                    value={searchForm.location}
                    onChange={(e) => setSearchForm({...searchForm, location: e.target.value})}
                  />
                </div>
                
                <div className="search-form-group">
                  <label className="search-form-label">Chọn thời gian</label>
                  <select 
                    className="search-form-select"
                    value={searchForm.schedule}
                    onChange={(e) => setSearchForm({...searchForm, schedule: e.target.value})}
                  >
                    <option value="">-- Chọn thời gian --</option>
                    <option value="Sáng">Buổi sáng</option>
                    <option value="Chiều">Buổi chiều</option>
                    <option value="Tối">Buổi tối</option>
                    <option value="Cuối tuần">Cuối tuần</option>
                  </select>
                </div>
                
                <button type="submit" className="search-submit-btn">
                  Tìm kiếm
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Matching Figma */}
      <section className="benefits-section-figma">
        <div className="section-header-figma">
          <h2 className="section-title-figma">Tại sao chọn TutorLink?</h2>
          <p className="section-subtitle-figma">
            Giải pháp toàn diện cho nhu cầu tìm kiếm và kết nối với gia sư
          </p>
        </div>
        
        <div className="benefits-grid-figma">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card-figma">
              <div className="benefit-icon-figma">{benefit.icon}</div>
              <h3 className="benefit-title-figma">{benefit.title}</h3>
              <p className="benefit-text-figma">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tutors Section */}
      <section className="featured-section-figma">
        <div className="section-header-with-link">
          <div className="section-header-left">
            <h2>Gia sư nổi bật</h2>
            <p>Những gia sư được đánh giá cao và ưu tiên lựa chọn</p>
          </div>
          <Link to="/tutors" className="view-all-link">
            Xem tất cả
          </Link>
        </div>
        
        {loading ? (
          <div className="empty-state">
            <div className="loading-spinner"></div>
            <p style={{ marginTop: 'var(--space-4)' }}>Đang tải...</p>
          </div>
        ) : featuredTutors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👨‍🏫</div>
            <h3 className="empty-state-title">Chưa có gia sư nào</h3>
            <p className="empty-state-description">Hãy quay lại sau để xem các gia sư mới nhất</p>
          </div>
        ) : (
          <div className="tutors-grid-figma">
            {featuredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </section>

      {/* Latest Posts Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tin tìm gia sư mới nhất</h2>
            <p className="section-subtitle">
              Các nhu cầu mới nhất từ phụ huynh
            </p>
          </div>
          
          {loading ? (
            <div className="empty-state">
              <div className="loading-spinner"></div>
              <p style={{ marginTop: 'var(--space-4)' }}>Đang tải...</p>
            </div>
          ) : latestPosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3 className="empty-state-title">Chưa có yêu cầu nào</h3>
              <p className="empty-state-description">Hãy quay lại sau để xem các yêu cầu mới nhất</p>
            </div>
          ) : (
            <div className="cards-grid">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/posts" className="btn btn-primary btn-lg">
              Xem tất cả tin tìm gia sư
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Sẵn sàng bắt đầu?</h2>
            <p>
              Tham gia cùng hàng nghìn phụ huynh và gia sư đang sử dụng TutorLink mỗi ngày.
            </p>
            <div className="cta-actions">
              <Link to="/auth" className="cta-btn cta-btn-white">
                <span>🚀</span>
                Đăng ký miễn phí
              </Link>
              <Link to="/tutors" className="cta-btn cta-btn-outline">
                <span>👀</span>
                Khám phá gia sư
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
