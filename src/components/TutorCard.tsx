import { Link } from 'react-router-dom'
import type { LegacyTutor } from '../data/mockData'

interface TutorCardProps {
  tutor: LegacyTutor
}

const MODE_LABEL: Record<LegacyTutor['mode'], string> = {
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

function TutorCard({ tutor }: TutorCardProps) {
  // Parse subjects properly
  const subjects = Array.isArray(tutor.subjects) 
    ? tutor.subjects 
    : typeof tutor.subjects === 'string'
    ? tutor.subjects.split(',').map((s: string) => s.trim())
    : []

  // Parse levels properly  
  const levels = Array.isArray(tutor.levels)
    ? tutor.levels
    : typeof tutor.levels === 'string'
    ? tutor.levels.split(',').map((l: string) => l.trim())
    : []

  return (
    <article className="card tutor-card">
      {/* Avatar with initials at top */}
      <div className="tutor-card-header-compact">
        <div className="tutor-avatar-wrapper">
          {tutor.avatar ? (
            <img 
              src={tutor.avatar} 
              alt={tutor.name}
              className="tutor-avatar"
            />
          ) : (
            <div className="tutor-avatar avatar-placeholder" aria-hidden>
              {tutor.name
                .split(' ')
                .slice(-2)
                .map((part) => part[0])
                .join('')
                .toUpperCase()}
            </div>
          )}
          {tutor.studentProfile?.verified && (
            <span 
              className="tutor-verified-badge" 
              title="Sinh viên TVU đã xác thực"
              aria-label="Sinh viên TVU đã xác thực"
            >
              ✓
            </span>
          )}
        </div>
        
        {/* Name and rating */}
        <h3 className="tutor-name">{tutor.name}</h3>
        <div className="tutor-rating">
          <span className="star-icon">⭐</span>
          <span>{tutor.rating > 0 ? tutor.rating.toFixed(1) : '5.0'}</span>
          <span className="review-count">({tutor.reviewsCount || 0})</span>
        </div>
      </div>

      {/* Compact info list with bullets */}
      <div className="tutor-card-body-compact">
        <div className="tutor-info-item">
          <span className="bullet">●</span>
          <span className="label">Môn học:</span>
          <span className="value">{formatList(subjects, 2)}</span>
        </div>
        <div className="tutor-info-item">
          <span className="bullet">●</span>
          <span className="label">Lớp:</span>
          <span className="value">{formatList(levels, 2)}</span>
        </div>
        <div className="tutor-info-item">
          <span className="bullet">●</span>
          <span className="label">Học phí:</span>
          <span className="value">{tutor.rate}</span>
        </div>
        <div className="tutor-info-item">
          <span className="bullet">●</span>
          <span className="label">Địa điểm:</span>
          <span className="value">{tutor.location}</span>
        </div>
        <div className="tutor-info-item">
          <span className="bullet">●</span>
          <span className="label">Hình thức:</span>
          <span className="value">{MODE_LABEL[tutor.mode]}</span>
        </div>
      </div>

      {/* Single button */}
      <div className="tutor-card-footer-compact">
        <Link to={`/tutors/${tutor.id}`} className="btn btn-primary btn-block">
          Xem chi tiết
        </Link>
      </div>
    </article>
  )
}

export default TutorCard
