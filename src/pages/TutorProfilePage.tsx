import { useState } from 'react'
import type { FormEvent } from 'react'

type TeachingMode = 'Online' | 'Offline' | 'Kết hợp'

interface ProfileForm {
  name: string
  birthYear: string
  gender: string
  experience: string
  skills: string
  education: string
  subjects: string
  location: string
  rate: string
  mode: TeachingMode
  bio: string
}

const PROFILE_STEPS = [
  {
    key: 'personal',
    title: 'Thông tin cá nhân',
    description: 'Cập nhật họ tên, liên hệ và khu vực hoạt động.'
  },
  {
    key: 'experience',
    title: 'Kinh nghiệm & kỹ năng',
    description: 'Tóm tắt kinh nghiệm, kỹ năng và chứng chỉ nổi bật.'
  },
  {
    key: 'teaching',
    title: 'Thông tin giảng dạy',
    description: 'Nêu môn dạy, học phí và hình thức phù hợp.'
  }
]

const PROFILE_TIPS = [
  'Đính kèm chứng chỉ hoặc minh chứng thành tích để tăng độ tin cậy.',
  'Luôn cập nhật lịch học trống và mức học phí rõ ràng.',
  'Ngôn ngữ chuyên nghiệp nhưng thân thiện sẽ tạo thiện cảm.'
]

const PROFILE_STATUS = [
  { key: 'basic', label: 'Thông tin cơ bản' },
  { key: 'experience', label: 'Kinh nghiệm' },
  { key: 'teaching', label: 'Giảng dạy' }
]

function TutorProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    name: '',
    birthYear: '',
    gender: 'Nam',
    experience: '',
    skills: '',
    education: '',
    subjects: '',
    location: '',
    rate: '',
    mode: 'Online',
    bio: ''
  })
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('Cập nhật hồ sơ thành công!')
  }

  return (
    <div className="container form-page">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <span className="profile-badge">TutorLink Pro</span>
          <h1>Hồ sơ gia sư chuyên nghiệp</h1>
          <p>
            Hoàn thiện từng mục thông tin để tăng mức độ tin cậy và tạo ấn tượng tốt với phụ
            huynh ngay từ lần xem đầu tiên.
          </p>
          <ul className="profile-progress">
            {PROFILE_STEPS.map((step, index) => (
              <li key={step.key} className="progress-step">
                <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="profile-tip-card">
            <h2>Mẹo nhanh</h2>
            <ul className="tip-list">
              {PROFILE_TIPS.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </aside>
        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="profile-form-header">
            <div>
              <span className="profile-form-badge">Hoàn thiện hồ sơ</span>
              <h2>Tăng độ tin cậy với thông tin rõ ràng</h2>
              <p>
                Hồ sơ gọn gàng giúp phụ huynh đánh giá nhanh năng lực và quyết định liên hệ chỉ
                trong vài giây.
              </p>
            </div>
            <div className="profile-status">
              {PROFILE_STATUS.map((item) => (
                <span key={item.key} className="profile-status-chip">
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <section className="form-section">
            <div className="section-heading">
              <span className="section-tag">01</span>
              <div>
                <h2>Thông tin cá nhân</h2>
                <p>Giữ thông tin chính xác để phụ huynh dễ dàng liên hệ.</p>
              </div>
            </div>
            <div className="form-grid">
              <label>
                <span>Họ và tên *</span>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Minh Tuấn"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                />
              </label>
              <label>
                <span>Năm sinh *</span>
                <input
                  type="number"
                  required
                  placeholder="1998"
                  value={form.birthYear}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, birthYear: event.target.value }))
                  }
                />
              </label>
              <label>
                <span>Giới tính</span>
                <select
                  value={form.gender}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, gender: event.target.value }))
                  }
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </label>
              <label>
                <span>Khu vực dạy *</span>
                <input
                  type="text"
                  required
                  placeholder="Quận Bình Thạnh, TP.HCM"
                  value={form.location}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, location: event.target.value }))
                  }
                />
              </label>
            </div>
          </section>

          <section className="form-section">
            <div className="section-heading">
              <span className="section-tag">02</span>
              <div>
                <h2>Kinh nghiệm & kỹ năng</h2>
                <p>Tóm tắt điểm mạnh giúp hồ sơ nổi bật ngay từ đầu.</p>
              </div>
            </div>
            <div className="form-grid">
              <label>
                <span>Kinh nghiệm *</span>
                <input
                  type="text"
                  required
                  placeholder="5 năm luyện thi IELTS, từng dạy tại trung tâm X"
                  value={form.experience}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, experience: event.target.value }))
                  }
                />
              </label>
              <label className="full-width">
                <span>Khả năng, kỹ năng *</span>
                <textarea
                  rows={3}
                  required
                  placeholder="Kỹ năng sư phạm, giao tiếp, quản lý lớp học, công nghệ hỗ trợ học tập"
                  value={form.skills}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, skills: event.target.value }))
                  }
                />
              </label>
              <label className="full-width">
                <span>Học vấn / Chứng chỉ *</span>
                <textarea
                  rows={3}
                  required
                  placeholder="ĐH Sư phạm TP.HCM, chứng chỉ TESOL quốc tế"
                  value={form.education}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, education: event.target.value }))
                  }
                />
              </label>
            </div>
          </section>

          <section className="form-section">
            <div className="section-heading">
              <span className="section-tag">03</span>
              <div>
                <h2>Thông tin giảng dạy</h2>
                <p>Thông tin rõ ràng giúp phụ huynh so sánh nhanh và lựa chọn.</p>
              </div>
            </div>
            <div className="form-grid">
              <label className="full-width">
                <span>Môn dạy và cấp lớp *</span>
                <textarea
                  rows={3}
                  required
                  placeholder="Toán lớp 6-12, Luyện thi đại học, Ôn thi học sinh giỏi"
                  value={form.subjects}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, subjects: event.target.value }))
                  }
                />
              </label>
              <label>
                <span>Học phí *</span>
                <input
                  type="text"
                  required
                  placeholder="Từ 250.000đ/buổi"
                  value={form.rate}
                  onChange={(event) => setForm((prev) => ({ ...prev, rate: event.target.value }))}
                />
              </label>
              <label>
                <span>Hình thức dạy *</span>
                <select
                  value={form.mode}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, mode: event.target.value as TeachingMode }))
                  }
                >
                  <option value="Online">Trực tuyến</option>
                  <option value="Offline">Tại nhà</option>
                  <option value="Kết hợp">Kết hợp</option>
                </select>
              </label>
              <label className="full-width">
                <span>Giới thiệu bản thân *</span>
                <textarea
                  rows={5}
                  required
                  placeholder="Giới thiệu kinh nghiệm, phương pháp dạy và kỳ vọng của phụ huynh"
                  value={form.bio}
                  onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
                />
              </label>
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Lưu hồ sơ
            </button>
            <button type="button" className="btn btn-secondary">
              Xem trước
            </button>
          </div>
        </form>
      </div>
      {message && <p className="success-banner">{message}</p>}
    </div>
  )
}

export default TutorProfilePage
