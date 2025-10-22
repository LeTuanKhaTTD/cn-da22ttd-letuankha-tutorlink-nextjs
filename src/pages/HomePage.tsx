import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import TutorCard from '../components/TutorCard'
import { posts, tutors } from '../data/mockData'

function HomePage() {
  const featuredTutors = tutors.slice(0, 3)
  const latestPosts = posts.slice(0, 3)

  const stats = [
    { value: '1.500+', label: 'Gia sư chất lượng' },
    { value: '4.8/5', label: 'Đánh giá trung bình' },
    { value: '3.200+', label: 'Học viên hài lòng' },
    { value: '24/7', label: 'Hỗ trợ tận tâm' }
  ]

  const benefits = [
    { icon: '🎯', title: 'Kết nối nhanh chóng', text: 'Tìm gia sư phù hợp chỉ trong 24 giờ' },
    { icon: '✅', title: 'Xác thực danh tính', text: 'Gia sư được xác minh thông tin và chứng chỉ' },
    { icon: '💬', title: 'Hỗ trợ tận tâm', text: 'Đội ngũ tư vấn sẵn sàng giải đáp 24/7' }
  ]

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="badge badge-light hero-badge">
              🏆 Nền tảng kết nối gia sư uy tín #1 Việt Nam
            </span>
            <h1>Tìm gia sư phù hợp chỉ trong vài bước</h1>
            <p className="hero-description">
              Phụ huynh đăng tin nhanh chóng, gia sư tạo hồ sơ chuyên nghiệp, cùng xây dựng
              lộ trình học tập hiệu quả cho học sinh.
            </p>
            <div className="hero-actions">
              <Link to="/create-post" className="btn btn-primary btn-hero">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Đăng tin tìm gia sư
              </Link>
              <Link to="/tutor-profile" className="btn btn-secondary btn-hero">
                Tạo hồ sơ gia sư
              </Link>
            </div>
            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-search">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="section container benefits-section">
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="benefit-card">
              <span className="benefit-icon">{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <header className="section-header">
          <div>
            <h2>Gia sư được đánh giá cao</h2>
            <p>Lựa chọn được phụ huynh tin tưởng, xếp hạng cao trên nền tảng.</p>
          </div>
          <Link to="/tutors" className="btn btn-secondary">
            Xem tất cả
          </Link>
        </header>
        <div className="grid grid-3">
          {featuredTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <header className="section-header">
            <div>
              <h2>Tin tìm gia sư mới nhất</h2>
              <p>Các nhu cầu mới nhất từ phụ huynh trên toàn quốc.</p>
            </div>
            <Link to="/posts" className="btn btn-secondary">
              Xem tất cả
            </Link>
          </header>
          <div className="grid grid-2">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <header className="section-header">
          <div>
            <h2>Hướng dẫn nhanh cho người mới</h2>
            <p>3 bước đơn giản để bắt đầu cùng TutorLink.</p>
          </div>
        </header>
        <div className="grid grid-3 quick-start">
          <div className="card quick-start-card">
            <span className="step">1</span>
            <h3>Đăng ký tài khoản</h3>
            <p>Chọn loại tài khoản phụ huynh hoặc gia sư và xác thực thông tin.</p>
            <Link to="/register" className="quick-start-link">
              Bắt đầu ngay →
            </Link>
          </div>
          <div className="card quick-start-card">
            <span className="step">2</span>
            <h3>Đăng tin hoặc tạo hồ sơ</h3>
            <p>Phụ huynh mô tả nhu cầu rõ ràng, gia sư điền thông tin năng lực.</p>
            <Link to="/create-post" className="quick-start-link">
              Tìm hiểu thêm →
            </Link>
          </div>
          <div className="card quick-start-card">
            <span className="step">3</span>
            <h3>Kết nối & theo dõi</h3>
            <p>Sử dụng chatbox để trao đổi, quản lý lịch học trong bảng điều khiển.</p>
            <Link to="/dashboard" className="quick-start-link">
              Xem demo →
            </Link>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-container">
          <div className="cta-content">
            <h2>Sẵn sàng bắt đầu?</h2>
            <p>
              Tham gia cùng hàng nghìn phụ huynh và gia sư đang sử dụng TutorLink mỗi ngày.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Đăng ký miễn phí
              </Link>
              <Link to="/tutors" className="btn btn-ghost btn-lg">
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
