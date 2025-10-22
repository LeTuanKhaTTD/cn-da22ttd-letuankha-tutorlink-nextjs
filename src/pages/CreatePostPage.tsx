import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'

interface CreatePostForm {
  subject: string
  level: string
  location: string
  schedule: string
  budget: string
  requirements: string
  studentInfo: string
}

function CreatePostPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [form, setForm] = useState<CreatePostForm>({
    subject: '',
    level: '',
    location: '',
    schedule: '',
    budget: '',
    requirements: '',
    studentInfo: ''
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSuccess(true)
    setTimeout(() => navigate('/posts'), 1600)
  }

  const gotoStep = (value: number) => {
    setStep(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="form-grid">
          <label>
            <span>Môn học *</span>
            <input
              type="text"
              required
              value={form.subject}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, subject: event.target.value }))
              }
            />
          </label>
          <label>
            <span>Cấp học *</span>
            <input
              type="text"
              required
              value={form.level}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, level: event.target.value }))
              }
            />
          </label>
          <label>
            <span>Khu vực *</span>
            <input
              type="text"
              required
              value={form.location}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, location: event.target.value }))
              }
            />
          </label>
          <label>
            <span>Thông tin học sinh *</span>
            <textarea
              required
              rows={4}
              value={form.studentInfo}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, studentInfo: event.target.value }))
              }
            />
          </label>
        </div>
      )
    }

    if (step === 2) {
      return (
        <div className="form-grid">
          <label>
            <span>Lịch học mong muốn *</span>
            <input
              type="text"
              required
              value={form.schedule}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, schedule: event.target.value }))
              }
            />
          </label>
          <label>
            <span>Học phí dự kiến *</span>
            <input
              type="text"
              required
              value={form.budget}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, budget: event.target.value }))
              }
            />
          </label>
          <label className="full-width">
            <span>Yêu cầu chi tiết *</span>
            <textarea
              required
              rows={6}
              value={form.requirements}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, requirements: event.target.value }))
              }
            />
          </label>
        </div>
      )
    }

    return (
      <div className="preview-card">
        <h3>Xem trước tin đăng</h3>
        <ul>
          <li>
            <strong>Môn học:</strong> {form.subject}
          </li>
          <li>
            <strong>Cấp học:</strong> {form.level}
          </li>
          <li>
            <strong>Khu vực:</strong> {form.location}
          </li>
          <li>
            <strong>Lịch học:</strong> {form.schedule}
          </li>
          <li>
            <strong>Học phí:</strong> {form.budget}
          </li>
          <li>
            <strong>Thông tin học sinh:</strong> {form.studentInfo}
          </li>
          <li>
            <strong>Yêu cầu:</strong> {form.requirements}
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="container form-page">
      <div className="page-intro">
        <div>
          <span className="page-intro-badge">Tin tìm gia sư</span>
          <h1>Đăng tin tìm gia sư</h1>
          <p>Hoàn thành 3 bước để mô tả nhu cầu học tập rõ ràng và nhận phản hồi từ gia sư.</p>
        </div>
        <ul className="page-intro-list">
          <li>Trình bày mục tiêu học tập và lịch mong muốn để gia sư tư vấn chính xác.</li>
          <li>Ghi rõ mức học phí dự kiến và yêu cầu đặc biệt (nếu có).</li>
          <li>Kiểm tra lại thông tin trước khi đăng để tăng tỷ lệ nhận ứng tuyển phù hợp.</li>
        </ul>
      </div>
      <div className="form-steps">
        {[1, 2, 3].map((value) => (
          <button
            key={value}
            type="button"
            className={`step-chip${step === value ? ' active' : ''}`}
            onClick={() => gotoStep(value)}
          >
            Bước {value}
          </button>
        ))}
      </div>
      <form className="card form-card" onSubmit={handleSubmit}>
        {renderStep()}
        <div className="form-actions">
          {step > 1 && (
            <button type="button" className="btn btn-ghost" onClick={() => gotoStep(step - 1)}>
              Quay lại
            </button>
          )}
          {step < 3 ? (
            <button type="button" className="btn btn-primary" onClick={() => gotoStep(step + 1)}>
              Tiếp tục
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Đăng tin
            </button>
          )}
        </div>
      </form>
      {isSuccess && <p className="success-banner">Đăng tin thành công! Đang chuyển hướng...</p>}
    </div>
  )
}

export default CreatePostPage
