import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthPageProps {
  initialMode?: 'login' | 'register'
}

const BENEFITS = [
  'So khớp gia sư theo mục tiêu học tập cụ thể của học sinh.',
  'Quản lý lịch học, học phí và tiến trình ngay trong một bảng điều khiển.',
  'Đội ngũ tư vấn hỗ trợ xuyên suốt giúp phụ huynh và gia sư kết nối hiệu quả.'
]

const HIGHLIGHTS = [
  { value: '1.500+', label: 'Gia sư hoạt động mỗi tháng' },
  { value: '4.8/5', label: 'Mức hài lòng trung bình từ phụ huynh' }
]

type FeedbackState = {
  type: 'error' | 'success'
  message: string
} | null

function AuthPage({ initialMode = 'login' }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [accountType, setAccountType] = useState<'parent' | 'tutor'>('parent')
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setMode(initialMode)
    setFeedback(null)
  }, [initialMode])

  useEffect(() => {
    setFeedback(null)
  }, [mode])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    // Nếu đăng ký gia sư, chuyển đến form đầy đủ
    if (mode === 'register' && accountType === 'tutor') {
      navigate('/register-tutor')
      return
    }
    
    if (mode === 'login') {
      setFeedback({
        type: 'error',
        message: 'Tài khoản hoặc mật khẩu không hợp lệ. Vui lòng thử lại.'
      })
    } else {
      setFeedback({
        type: 'success',
        message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực.'
      })
    }
  }

  return (
    <section className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          <aside className="auth-aside">
            <span className="auth-badge">TutorLink</span>
            <h1>{mode === 'login' ? 'Chào mừng trở lại' : 'Gia nhập cộng đồng TutorLink'}</h1>
            <p>
              Nền tảng chuyên nghiệp giúp phụ huynh kết nối gia sư chất lượng và hỗ trợ gia sư
              xây dựng thương hiệu cá nhân.
            </p>
            <ul className="auth-benefits">
              {BENEFITS.map((benefit, index) => (
                <li key={benefit} className="benefit-item">
                  <span className="benefit-index">{String(index + 1).padStart(2, '0')}</span>
                  <p>{benefit}</p>
                </li>
              ))}
            </ul>
            <div className="auth-stats">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label} className="auth-stat">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </aside>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-header">
              <h2>{mode === 'login' ? 'Đăng nhập tài khoản' : 'Tạo tài khoản mới'}</h2>
              <p>
                {mode === 'login'
                  ? 'Chào mừng bạn quay lại với TutorLink. Vui lòng nhập thông tin để tiếp tục.'
                  : 'Hoàn tất các thông tin bên dưới để bắt đầu kết nối với phụ huynh và học viên.'}
              </p>
            </div>

            <div className="auth-switcher">
              <button
                type="button"
                className={`switch-btn${accountType === 'parent' ? ' active' : ''}`}
                onClick={() => setAccountType('parent')}
              >
                👪 Phụ huynh
              </button>
              <button
                type="button"
                className={`switch-btn${accountType === 'tutor' ? ' active' : ''}`}
                onClick={() => setAccountType('tutor')}
              >
                🎓 Gia sư (Sinh viên TVU)
              </button>
            </div>

            {mode === 'register' && accountType === 'tutor' && (
              <div className="tutor-notice">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <div>
                  <strong>Đăng ký gia sư yêu cầu xác thực</strong>
                  <p>Bạn sẽ cần cung cấp MSSV, Mã lớp và Avatar để được phê duyệt</p>
                </div>
              </div>
            )}

            {mode === 'register' && accountType === 'parent' && (
              <label className="auth-field">
                <span>Họ và tên *</span>
                <input type="text" required placeholder="Ví dụ: Nguyễn Minh Tuấn" />
              </label>
            )}

            <label className="auth-field">
              <span>Email *</span>
              <input type="email" required placeholder="nhapemail@tutorlink.vn" />
            </label>
            <label className="auth-field">
              <span>Mật khẩu *</span>
              <input type="password" required placeholder="••••••••" />
            </label>
            {mode === 'register' && (
              <label className="auth-field">
                <span>Số điện thoại</span>
                <input type="tel" placeholder="0981 234 567" />
              </label>
            )}

            <button type="submit" className="btn btn-primary w-full">
              {mode === 'login' 
                ? 'Đăng nhập' 
                : accountType === 'tutor' 
                  ? 'Tiếp tục đăng ký Gia sư →' 
                  : 'Đăng ký Phụ huynh'}
            </button>

            {feedback && (
              <p className={`form-note ${feedback.type === 'error' ? 'text-error' : 'text-success'}`}>
                {feedback.message}
              </p>
            )}

            <p className="auth-terms">
              Tiếp tục đồng nghĩa với việc bạn chấp nhận <span className="link">Điều khoản sử dụng</span>{' '}
              và <span className="link">Chính sách bảo mật</span> của TutorLink.
            </p>

            <div className="auth-form-footer">
              <span>{mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}</span>
              <button
                type="button"
                className="link-button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              >
                {mode === 'login' ? 'Tạo tài khoản ngay' : 'Đăng nhập'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AuthPage
