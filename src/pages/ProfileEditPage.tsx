import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { tutorsApi } from '../api/tutors.api'
import './ProfileEditPage.css'

interface ProfileData {
  ho_ten: string
  so_dien_thoai: string
  email: string
  avatar_url: string
  gioi_thieu: string
  kinh_nghiem: string
  thanh_tich: string
  hoc_phi_gio: number
  dia_diem_day: string
  mon_hoc: string[]
  avatar_file?: File | null
}

function ProfileEditPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<ProfileData>({
    ho_ten: '',
    so_dien_thoai: '',
    email: '',
    avatar_url: '',
    gioi_thieu: '',
    kinh_nghiem: '',
    thanh_tich: '',
    hoc_phi_gio: 0,
    dia_diem_day: '',
    mon_hoc: [],
    avatar_file: null
  })
  const [previewImage, setPreviewImage] = useState<string>('')

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setIsLoading(true)
      if (user?.id) {
        const response: any = await tutorsApi.getTutorById(user.id)
        const profileData = {
          ho_ten: response.ho_ten || '',
          so_dien_thoai: response.so_dien_thoai || '',
          email: response.email || '',
          avatar_url: response.avatar_url || response.anh_dai_dien || '',
          gioi_thieu: response.gioi_thieu || response.mo_ta || '',
          kinh_nghiem: response.kinh_nghiem || '',
          thanh_tich: response.thanh_tich || '',
          hoc_phi_gio: response.hoc_phi_gio || 0,
          dia_diem_day: response.dia_diem_day || '',
          mon_hoc: response.mon_hoc || [],
          avatar_file: null
        }
        setFormData(profileData)
        setPreviewImage(profileData.avatar_url)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      alert('Không thể tải thông tin hồ sơ!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hoc_phi_gio' ? parseInt(value) || 0 : value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh!')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước ảnh không được vượt quá 5MB!')
        return
      }

      setFormData(prev => ({ ...prev, avatar_file: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, avatar_file: null, avatar_url: '' }))
    setPreviewImage('')
    // Reset file input
    const fileInput = document.getElementById('avatar-upload') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user?.id) {
      alert('Không tìm thấy thông tin người dùng!')
      return
    }

    try {
      setIsSaving(true)
      
      // If user uploaded a new image file, we would upload it here
      // For now, we'll just use the avatar_url or keep the existing one
      const updateData = { ...formData }
      delete updateData.avatar_file
      
      // If there's a file selected, in a real app you'd upload it to a server
      // and get back a URL. For now we'll just use the preview as URL if there's a file
      if (formData.avatar_file) {
        // In production: upload file to server/cloud storage and get URL
        // updateData.avatar_url = await uploadImage(formData.avatar_file)
        alert('⚠️ Tính năng upload ảnh sẽ được hoàn thiện sau. Hiện tại vui lòng dùng URL ảnh.')
      }
      
      await tutorsApi.updateProfile(user.id, updateData)
      alert('✅ Cập nhật hồ sơ thành công!')
      navigate('/dashboard/tutor')
    } catch (error: any) {
      console.error('Error updating profile:', error)
      alert('❌ ' + (error.response?.data?.message || 'Lỗi khi cập nhật hồ sơ!'))
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="profile-edit-loading">
        <div className="spinner"></div>
        <p>Đang tải hồ sơ...</p>
      </div>
    )
  }

  return (
    <div className="profile-edit-page">
      <div className="profile-edit-container">
        {/* Header */}
        <div className="profile-edit-header">
          <button className="btn-back" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <div>
            <h1>✏️ Chỉnh sửa hồ sơ</h1>
            <p>Cập nhật thông tin của bạn để tăng cơ hội được chọn</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="profile-edit-form">
          {/* Thông tin cơ bản */}
          <div className="form-section">
            <h2>📋 Thông tin cơ bản</h2>
            
            <div className="form-group">
              <label>Họ và tên *</label>
              <input
                type="text"
                name="ho_ten"
                value={formData.ho_ten}
                onChange={handleChange}
                required
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Số điện thoại *</label>
                <input
                  type="tel"
                  name="so_dien_thoai"
                  value={formData.so_dien_thoai}
                  onChange={handleChange}
                  required
                  placeholder="0901234567"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  placeholder="email@st.tvu.edu.vn"
                />
              </div>
            </div>

            <div className="form-group">
              <label>📸 Ảnh đại diện</label>
              <div className="avatar-upload-section">
                <div className="avatar-preview-container">
                  {previewImage ? (
                    <div className="avatar-preview-wrapper">
                      <img src={previewImage} alt="Avatar preview" className="avatar-preview-img" />
                      <button
                        type="button"
                        className="btn-remove-image"
                        onClick={handleRemoveImage}
                        title="Xóa ảnh"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="avatar-placeholder">
                      <span className="placeholder-icon">👤</span>
                      <span className="placeholder-text">Chưa có ảnh</span>
                    </div>
                  )}
                </div>
                
                <div className="upload-controls">
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="avatar-upload" className="btn-upload">
                    📁 Chọn ảnh từ thiết bị
                  </label>
                  <small className="upload-hint">
                    JPG, PNG hoặc GIF. Tối đa 5MB.
                  </small>
                  
                  <div className="divider-text">hoặc</div>
                  
                  <input
                    type="url"
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                    className="url-input"
                  />
                  <small className="upload-hint">
                    Nhập URL ảnh từ internet
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="form-section">
            <h2>👋 Giới thiệu bản thân</h2>
            
            <div className="form-group">
              <label>Giới thiệu ngắn *</label>
              <textarea
                name="gioi_thieu"
                value={formData.gioi_thieu}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Ví dụ: Xin chào! Mình là sinh viên năm 3 ngành Công nghệ thông tin. Mình có 2 năm kinh nghiệm dạy học..."
              />
              <small>{formData.gioi_thieu.length}/500 ký tự</small>
            </div>

            <div className="form-group">
              <label>Kinh nghiệm giảng dạy</label>
              <textarea
                name="kinh_nghiem"
                value={formData.kinh_nghiem}
                onChange={handleChange}
                rows={4}
                placeholder="Ví dụ: Đã dạy 15 học sinh lớp 10-12, chuyên môn Toán và Lý..."
              />
            </div>

            <div className="form-group">
              <label>Thành tích nổi bật</label>
              <textarea
                name="thanh_tich"
                value={formData.thanh_tich}
                onChange={handleChange}
                rows={4}
                placeholder="Ví dụ: Giải Nhì Toán cấp tỉnh, Học sinh giỏi Lý 3 năm..."
              />
            </div>
          </div>

          {/* Thông tin dạy học */}
          <div className="form-section">
            <h2>📚 Thông tin dạy học</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Học phí (VNĐ/giờ) *</label>
                <input
                  type="number"
                  name="hoc_phi_gio"
                  value={formData.hoc_phi_gio}
                  onChange={handleChange}
                  required
                  min="50000"
                  max="500000"
                  step="10000"
                  placeholder="100000"
                />
                <small>Gợi ý: 50,000đ - 200,000đ</small>
              </div>

              <div className="form-group">
                <label>Địa điểm dạy *</label>
                <input
                  type="text"
                  name="dia_diem_day"
                  value={formData.dia_diem_day}
                  onChange={handleChange}
                  required
                  placeholder="Quận 1, TP.HCM hoặc Online"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              disabled={isSaving}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? '⏳ Đang lưu...' : '💾 Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileEditPage
