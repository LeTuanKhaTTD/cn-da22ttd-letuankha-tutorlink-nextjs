import { Link } from 'react-router-dom'
import type { Tutor } from '../types'

interface TutorCardProps {
  tutor: Tutor
}

const MODE_LABEL: Record<Tutor['mode'], string> = {
  Online: 'Trực tuyến',
  Offline: 'Tại nhà',
  'Kết hợp': 'Kết hợp'
}

const formatList = (values: string[], maxVisible = 2) => {
  if (values.length <= maxVisible) {
    return values.join(', ')
  }

  const visible = values.slice(0, maxVisible).join(', ')
  return `${visible} +${values.length - maxVisible}`
}

const summarize = (text: string, max = 120) => {
  if (!text) {
    return ''
  }

  return text.length <= max ? text : `${text.slice(0, max)}…`
}

function TutorCard({ tutor }: TutorCardProps) {
  const highlightedSkills = tutor.skills.slice(0, 3)
  const remainingSkills = tutor.skills.length - highlightedSkills.length

  return (
    <article className="card tutor-card">
      <div className="tutor-card-header">
        {tutor.avatar ? (
          <img 
            src={tutor.avatar} 
            alt={tutor.name}
            className="tutor-avatar"
          />
        ) : (
          <div className="avatar-placeholder" aria-hidden>
            {tutor.name
              .split(' ')
              .slice(-2)
              .map((part) => part[0])
              .join('')}
          </div>
        )}
        <div>
          <h3>
            {tutor.name}
            {tutor.studentProfile.verified && (
              <svg 
                className="verified-badge" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                aria-label="Sinh viên TVU đã xác thực"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            )}
          </h3>
          <p className="tutor-title">{tutor.title}</p>
          <p className="tutor-student-info">
            MSSV: {tutor.studentProfile.studentId} • {tutor.studentProfile.classCode}
          </p>
        </div>
        <span className="badge rating">
          {tutor.rating.toFixed(1)} <small>({tutor.reviewsCount})</small>
        </span>
      </div>
      <div className="tutor-card-body">
        <p className="tutor-intro">{summarize(tutor.bio || tutor.experience)}</p>
        <div className="tutor-meta-grid">
          <div className="tutor-meta-card">
            <span className="meta-label">Môn dạy</span>
            <span className="meta-value">{formatList(tutor.subjects)}</span>
          </div>
          <div className="tutor-meta-card">
            <span className="meta-label">Cấp học</span>
            <span className="meta-value">{formatList(tutor.levels)}</span>
          </div>
          <div className="tutor-meta-card">
            <span className="meta-label">Địa điểm</span>
            <span className="meta-value">{tutor.location}</span>
          </div>
          <div className="tutor-meta-card">
            <span className="meta-label">Học phí</span>
            <span className="meta-value">{tutor.rate}</span>
          </div>
          <div className="tutor-meta-card">
            <span className="meta-label">Hình thức</span>
            <span className="meta-value">{MODE_LABEL[tutor.mode]}</span>
          </div>
        </div>
        <div className="tutor-tags">
          {highlightedSkills.map((skill) => (
            <span key={skill} className="badge">
              {skill}
            </span>
          ))}
          {remainingSkills > 0 && <span className="badge badge-light">+{remainingSkills}</span>}
        </div>
      </div>
      <div className="tutor-card-footer">
        <Link to={`/tutors/${tutor.id}`} className="btn btn-secondary">
          Xem chi tiết
        </Link>
        <button type="button" className="btn btn-ghost">
          Gửi lời mời
        </button>
      </div>
    </article>
  )
}

export default TutorCard
