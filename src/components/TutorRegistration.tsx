import React, { useState } from 'react'
import './TutorRegistration.css'

interface RegistrationStep {
  step: number
  title: string
  description: string
}

const steps: RegistrationStep[] = [
  { step: 1, title: 'Thông tin tài khoản', description: 'Email và mật khẩu' },
  { step: 2, title: 'Thông tin sinh viên', description: 'MSSV, mã lớp' },
  { step: 3, title: 'Ảnh đại diện', description: 'Upload avatar' },
  { step: 4, title: 'Thông tin gia sư', description: 'Môn học, kinh nghiệm' }
]

interface FormData {
  // Bước 1 - Tài khoản
  email: string
  password: string
  confirmPassword: string
  
  // Bước 2 - Thông tin sinh viên
  fullName: string
  studentId: string  // MSSV
  classCode: string
  faculty: string
  major: string
  academicYear: string
  
  // Bước 3 - Ảnh đại diện
  avatar: File | null
  avatarPreview: string
  
  // Bước 4 - Thông tin gia sư
  subjects: string[]
  levels: string[]
  experience: string
  rate: string
  bio: string
  mode: 'Online' | 'Offline' | 'Kết hợp'
}

const TutorRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    studentId: '',
    classCode: '',
    faculty: '',
    major: '',
    academicYear: '',
    avatar: null,
    avatarPreview: '',
    subjects: [],
    levels: [],
    experience: '',
    rate: '',
    bio: '',
    mode: 'Kết hợp'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.email) newErrors.email = 'Vui lòng nhập email'
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = 'Email không hợp lệ'
      }
      if (!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu'
      if (formData.password.length < 6) {
        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu không khớp'
      }
    }

    if (step === 2) {
      if (!formData.fullName) newErrors.fullName = 'Vui lòng nhập họ tên'
      if (!formData.studentId) newErrors.studentId = 'Vui lòng nhập MSSV'
      if (!formData.studentId.match(/^\d{9}$/)) {
        newErrors.studentId = 'MSSV phải có 9 chữ số'
      }
      if (!formData.classCode) newErrors.classCode = 'Vui lòng nhập mã lớp'
      if (!formData.faculty) newErrors.faculty = 'Vui lòng chọn khoa'
      if (!formData.major) newErrors.major = 'Vui lòng nhập ngành học'
      if (!formData.academicYear) newErrors.academicYear = 'Vui lòng nhập năm học'
    }

    if (step === 3) {
      if (!formData.avatar && !formData.avatarPreview) {
        newErrors.avatar = 'Vui lòng upload ảnh đại diện'
      }
    }

    if (step === 4) {
      if (formData.subjects.length === 0) {
        newErrors.subjects = 'Vui lòng chọn ít nhất 1 môn học'
      }
      if (formData.levels.length === 0) {
        newErrors.levels = 'Vui lòng chọn ít nhất 1 cấp độ'
      }
      if (!formData.bio) newErrors.bio = 'Vui lòng nhập giới thiệu'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file)
      }))
      setErrors(prev => ({ ...prev, avatar: '' }))
    }
  }

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const handleLevelToggle = (level: string) => {
    setFormData(prev => ({
      ...prev,
      levels: prev.levels.includes(level)
        ? prev.levels.filter(l => l !== level)
        : [...prev.levels, level]
    }))
  }

  const handleSubmit = () => {
    if (validateStep(4)) {
      console.log('Form submitted:', formData)
      
      // Hiển thị thông báo chi tiết
      alert(`✅ Đăng ký thành công!

📋 Thông tin đã gửi:
- MSSV: ${formData.studentId}
- Mã lớp: ${formData.classCode}
- Khoa: ${formData.faculty}

⏳ Bước tiếp theo:
Admin sẽ xác thực MSSV của bạn trong vòng 24-48 giờ. Bạn sẽ nhận được email thông báo khi hồ sơ được phê duyệt.

📧 Kiểm tra email: ${formData.email}`)
      
      // TODO: Gửi dữ liệu lên server
      // Sau khi gửi thành công, chuyển hướng về trang chủ hoặc dashboard
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>Tạo tài khoản</h3>
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@tvu.edu.vn"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Mật khẩu <span className="required">*</span></label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Tối thiểu 6 ký tự"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label>Xác nhận mật khẩu <span className="required">*</span></label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Nhập lại mật khẩu"
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="step-content">
            <h3>Thông tin sinh viên TVU</h3>
            <div className="info-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <p>Admin sẽ xác thực MSSV của bạn trước khi phê duyệt hồ sơ gia sư</p>
            </div>
            <div className="form-group">
              <label>Họ và tên <span className="required">*</span></label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Nguyễn Văn A"
              />
              {errors.fullName && <span className="error">{errors.fullName}</span>}
            </div>
            <div className="form-group">
              <label>Mã số sinh viên (MSSV) <span className="required">*</span></label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="110122086"
                maxLength={9}
              />
              <span className="input-hint">9 chữ số, ví dụ: 110122086</span>
              {errors.studentId && <span className="error">{errors.studentId}</span>}
            </div>
            <div className="form-group">
              <label>Mã lớp <span className="required">*</span></label>
              <input
                type="text"
                value={formData.classCode}
                onChange={(e) => setFormData({ ...formData, classCode: e.target.value })}
                placeholder="DH21IT02"
              />
              <span className="input-hint">Ví dụ: DH21IT02, DH22EN01</span>
              {errors.classCode && <span className="error">{errors.classCode}</span>}
            </div>
            <div className="form-group">
              <label>Khoa <span className="required">*</span></label>
              <select
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
              >
                <option value="">Chọn khoa</option>
                <option value="Khoa Kỹ thuật và Công nghệ">Khoa Kỹ thuật và Công nghệ</option>
                <option value="Khoa Sư phạm">Khoa Sư phạm</option>
                <option value="Khoa Kinh tế">Khoa Kinh tế</option>
                <option value="Khoa Nông nghiệp - Thủy sản">Khoa Nông nghiệp - Thủy sản</option>
                <option value="Khoa Khoa học Tự nhiên">Khoa Khoa học Tự nhiên</option>
              </select>
              {errors.faculty && <span className="error">{errors.faculty}</span>}
            </div>
            <div className="form-group">
              <label>Ngành học <span className="required">*</span></label>
              <input
                type="text"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                placeholder="Công nghệ Thông tin"
              />
              {errors.major && <span className="error">{errors.major}</span>}
            </div>
            <div className="form-group">
              <label>Năm học <span className="required">*</span></label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                placeholder="2021-2025"
              />
              {errors.academicYear && <span className="error">{errors.academicYear}</span>}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="step-content">
            <h3>Ảnh đại diện</h3>
            <div className="avatar-upload-section">
              {formData.avatarPreview ? (
                <div className="avatar-preview">
                  <img src={formData.avatarPreview} alt="Avatar preview" />
                  <button 
                    type="button" 
                    className="btn-change-avatar"
                    onClick={() => document.getElementById('avatar-input')?.click()}
                  >
                    Đổi ảnh
                  </button>
                </div>
              ) : (
                <div className="avatar-upload-placeholder">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                  </svg>
                  <p>Chưa có ảnh đại diện</p>
                </div>
              )}
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              {!formData.avatarPreview && (
                <button 
                  type="button" 
                  className="btn-upload"
                  onClick={() => document.getElementById('avatar-input')?.click()}
                >
                  Chọn ảnh
                </button>
              )}
              {errors.avatar && <span className="error">{errors.avatar}</span>}
              <p className="upload-hint">
                Ảnh chân dung rõ mặt, dung lượng tối đa 2MB
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="step-content">
            <h3>Thông tin gia sư</h3>
            <div className="form-group">
              <label>Môn học <span className="required">*</span></label>
              <div className="checkbox-group">
                {['Toán', 'Lý', 'Hóa', 'Văn', 'Anh', 'Lập trình', 'Kế toán'].map(subject => (
                  <label key={subject} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.subjects.includes(subject)}
                      onChange={() => handleSubjectToggle(subject)}
                    />
                    {subject}
                  </label>
                ))}
              </div>
              {errors.subjects && <span className="error">{errors.subjects}</span>}
            </div>
            <div className="form-group">
              <label>Cấp độ <span className="required">*</span></label>
              <div className="checkbox-group">
                {['THCS', 'THPT', 'Đại học'].map(level => (
                  <label key={level} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.levels.includes(level)}
                      onChange={() => handleLevelToggle(level)}
                    />
                    {level}
                  </label>
                ))}
              </div>
              {errors.levels && <span className="error">{errors.levels}</span>}
            </div>
            <div className="form-group">
              <label>Kinh nghiệm</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="VD: 2 năm"
              />
            </div>
            <div className="form-group">
              <label>Học phí mong muốn</label>
              <input
                type="text"
                value={formData.rate}
                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                placeholder="VD: 150.000 VND/buổi"
              />
            </div>
            <div className="form-group">
              <label>Hình thức dạy</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value as FormData['mode'] })}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline (tại nhà)</option>
                <option value="Kết hợp">Kết hợp</option>
              </select>
            </div>
            <div className="form-group">
              <label>Giới thiệu bản thân <span className="required">*</span></label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Giới thiệu về kinh nghiệm, phương pháp giảng dạy..."
                rows={4}
              />
              {errors.bio && <span className="error">{errors.bio}</span>}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="tutor-registration">
      <div className="registration-container">
        <div className="registration-header">
          <h1>Đăng ký làm gia sư</h1>
          <p className="subtitle">⚠️ Chỉ dành cho sinh viên Trường Đại học Trà Vinh</p>
          <div className="requirement-notice">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Yêu cầu: Mã số sinh viên (MSSV) và Mã lớp để xác thực</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step) => (
            <div
              key={step.step}
              className={`progress-step ${currentStep >= step.step ? 'active' : ''} ${
                currentStep === step.step ? 'current' : ''
              }`}
            >
              <div className="step-number">{step.step}</div>
              <div className="step-info">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={(e) => e.preventDefault()}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" className="btn-back" onClick={handleBack}>
                Quay lại
              </button>
            )}
            {currentStep < 4 ? (
              <button type="button" className="btn-next" onClick={handleNext}>
                Tiếp theo
              </button>
            ) : (
              <button type="button" className="btn-submit" onClick={handleSubmit}>
                Hoàn thành đăng ký
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default TutorRegistration
