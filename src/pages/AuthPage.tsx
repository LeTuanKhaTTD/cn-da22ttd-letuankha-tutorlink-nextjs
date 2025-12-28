import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/auth.api'
import { useAuth } from '../contexts/AuthContext'
import './AuthPage.css'

interface AuthPageProps {
  initialMode?: 'login' | 'register'
}

function AuthPage({ initialMode = 'login' }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [accountType, setAccountType] = useState<'parent' | 'tutor'>('parent')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      if (mode === 'login') {
        const response = await authApi.login({
          email,
          mat_khau: password
        })

        if (response.success && response.data) {
          authLogin(response.data.token, response.data.user)
          setSuccess('✅ Đăng nhập thành công!')
          
          setTimeout(() => {
            const role = response.data?.user.vai_tro
            if (role === 'admin') navigate('/dashboard/admin')
            else if (role === 'gia_su') navigate('/dashboard/tutor')
            else navigate('/dashboard/parent')
          }, 1000)
        } else {
          setError('Phản hồi từ server không hợp lệ')
        }
      } else {
        if (accountType === 'tutor') {
          navigate('/register-tutor')
          return
        }

        const ho_ten = formData.get('ho_ten') as string
        const so_dien_thoai = formData.get('so_dien_thoai') as string

        const response = await authApi.register({
          email,
          mat_khau: password,
          ho_ten,
          so_dien_thoai,
          vai_tro: 'phu_huynh'
        })

        if (response.success) {
          setSuccess('✅ Đăng ký thành công! Vui lòng đăng nhập.')
          setTimeout(() => setMode('login'), 2000)
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err)
      setError(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page-wrapper">
      {/* Background Decorations */}
      <div className="auth-bg-decoration decoration-1"></div>
      <div className="auth-bg-decoration decoration-2"></div>
      <div className="auth-bg-decoration decoration-3"></div>

      <div className="auth-content">
        {/* Logo & Title */}
        <div className="auth-header">
          <div className="auth-logo-section">
            <div className="logo-circle">
              <span className="logo-emoji">🎓</span>
            </div>
            <h1 className="auth-title">TutorLink</h1>
            <p className="auth-subtitle">Nền tảng kết nối gia sư chất lượng</p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="auth-card">
          {/* Mode Toggle */}
          <div className="auth-mode-toggle">
            <button
              type="button"
              className={`mode-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => setMode('login')}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              className={`mode-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => setMode('register')}
            >
              Đăng ký
            </button>
            <div className={`mode-slider ${mode === 'register' ? 'right' : ''}`}></div>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="auth-message error-message">
              <span className="message-icon">⚠️</span>
              <span className="message-text">{error}</span>
            </div>
          )}
          {success && (
            <div className="auth-message success-message">
              <span className="message-icon">✓</span>
              <span className="message-text">{success}</span>
            </div>
          )}

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <>
                {/* Account Type Selection */}
                <div className="form-field">
                  <label className="field-label">Bạn là</label>
                  <div className="account-type-selector">
                    <button
                      type="button"
                      className={`type-btn ${accountType === 'parent' ? 'active' : ''}`}
                      onClick={() => setAccountType('parent')}
                    >
                      <span className="type-icon">👨‍👩‍👧</span>
                      <span className="type-text">Phụ huynh</span>
                    </button>
                    <button
                      type="button"
                      className={`type-btn ${accountType === 'tutor' ? 'active' : ''}`}
                      onClick={() => setAccountType('tutor')}
                    >
                      <span className="type-icon">👨‍🏫</span>
                      <span className="type-text">Gia sư</span>
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div className="form-field">
                  <label className="field-label" htmlFor="ho_ten">
                    Họ và tên
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      id="ho_ten"
                      name="ho_ten"
                      className="form-input"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div className="form-field">
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            {/* Phone (only for parent registration) */}
            {mode === 'register' && accountType === 'parent' && (
              <div className="form-field">
                <label className="field-label" htmlFor="so_dien_thoai">
                  Số điện thoại
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">📱</span>
                  <input
                    type="tel"
                    id="so_dien_thoai"
                    name="so_dien_thoai"
                    className="form-input"
                    placeholder="0909 123 456"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="form-field">
              <label className="field-label" htmlFor="password">
                Mật khẩu
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember Me (Login only) */}
            {mode === 'login' && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" id="remember" />
                  <span className="checkbox-text">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="forgot-link">Quên mật khẩu?</a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký ngay'}</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span className="divider-line"></span>
            <span className="divider-text">hoặc tiếp tục với</span>
            <span className="divider-line"></span>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button type="button" className="social-btn google-btn">
              <svg className="social-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </button>
            <button type="button" className="social-btn facebook-btn">
              <svg className="social-icon" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          {/* Footer Link */}
          <div className="auth-footer">
            {mode === 'login' ? (
              <p>
                Chưa có tài khoản?{' '}
                <button
                  type="button"
                  className="switch-link"
                  onClick={() => setMode('register')}
                >
                  Đăng ký ngay
                </button>
              </p>
            ) : (
              <p>
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  className="switch-link"
                  onClick={() => setMode('login')}
                >
                  Đăng nhập
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
