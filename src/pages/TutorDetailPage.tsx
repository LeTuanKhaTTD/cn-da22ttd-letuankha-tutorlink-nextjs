import { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { tutorsApi } from '../api/tutors.api'
import { adaptTutorData } from '../utils/dataAdapter'

function TutorDetailPage() {
  const { tutorId } = useParams()
  const [tutor, setTutor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  
  // Mock reviews - TODO: Implement reviews API
  const reviews = [
    {
      id: 1,
      author: 'Nguyễn Thị Mai',
      rating: 5,
      date: '2 tuần trước',
      comment: 'Gia sư rất nhiệt tình và giảng dạy dễ hiểu. Con tôi đã cải thiện điểm số đáng kể sau 2 tháng học.'
    },
    {
      id: 2,
      author: 'Trần Văn Hùng',
      rating: 5,
      date: '1 tháng trước',
      comment: 'Phương pháp giảng dạy khoa học, có bài tập về nhà phù hợp. Rất hài lòng!'
    },
    {
      id: 3,
      author: 'Lê Thị Lan',
      rating: 4.5,
      date: '1 tháng trước',
      comment: 'Giáo viên tận tâm, luôn theo dõi tiến độ học tập của học sinh.'
    }
  ]

  useEffect(() => {
    const fetchTutorDetail = async () => {
      if (!tutorId) return
      
      try {
        setLoading(true)
        const response = await tutorsApi.getTutorById(tutorId)
        const tutorData = (response as any).data || response
        const adaptedTutor = adaptTutorData(tutorData)
        setTutor(adaptedTutor)
      } catch (error) {
        console.error('Error fetching tutor detail:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTutorDetail()
  }, [tutorId])

  if (loading) {
    return (
      <div className="tutor-detail-figma">
        <div className="tutor-detail-container">
          <div className="results-loading">
            <div className="loading-spinner"></div>
            <p>Đang tải thông tin gia sư...</p>
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !tutor) {
    return <Navigate to="/tutors" replace />
  }

  const subjects = Array.isArray(tutor.subjects) ? tutor.subjects : [tutor.subjects]
  const levels = Array.isArray(tutor.levels) ? tutor.levels : [tutor.levels]

  // Helper to safely render subject names
  const getSubjectName = (subject: any): string => {
    if (!subject) return ''
    if (typeof subject === 'object') {
      return subject.ten_mon || subject.name || String(subject)
    }
    return String(subject)
  }

  const subjectNames = subjects.map(getSubjectName).filter(Boolean)

  return (
    <div className="tutor-detail-figma">
      <div className="tutor-detail-container">
        {/* Hero Section */}
        <section className="tutor-detail-hero">
          {tutor.avatar ? (
            <img 
              src={tutor.avatar} 
              alt={tutor.name} 
              className="tutor-avatar-large" 
            />
          ) : (
            <div className="tutor-avatar-placeholder">
              {tutor.name
                .split(' ')
                .slice(-2)
                .map((part: string) => part[0])
                .join('')
                .toUpperCase()}
            </div>
          )}
          
          <div className="tutor-hero-content">
            <div className="tutor-status-badges">
              {tutor.studentProfile?.verified && (
                <span className="tutor-verified-badge">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Đã xác thực
                </span>
              )}
              <span className="tutor-rating-badge">
                ⭐ {tutor.rating.toFixed(1)} ({tutor.reviewsCount} đánh giá)
              </span>
            </div>
            
            <h1 className="tutor-hero-name">{tutor.name}</h1>
            <p className="tutor-hero-title">{tutor.title || 'Gia sư sinh viên TVU'}</p>
            
            {tutor.studentProfile && (
              <div className="tutor-student-info">
                <span>MSSV: {tutor.studentProfile.studentId}</span>
                <span>•</span>
                <span>{tutor.studentProfile.classCode}</span>
                <span>•</span>
                <span>{tutor.studentProfile.major}</span>
              </div>
            )}
            
            <div className="tutor-quick-info">
              <div className="quick-info-item">
                <span className="quick-info-label">Môn dạy</span>
                <span className="quick-info-value">{subjectNames.join(', ')}</span>
              </div>
              <div className="quick-info-item">
                <span className="quick-info-label">Cấp học</span>
                <span className="quick-info-value">{levels.join(', ')}</span>
              </div>
              <div className="quick-info-item">
                <span className="quick-info-label">Học phí</span>
                <span className="quick-info-value">{tutor.rate}</span>
              </div>
              <div className="quick-info-item">
                <span className="quick-info-label">Khu vực</span>
                <span className="quick-info-value">{tutor.location}</span>
              </div>
              <div className="quick-info-item">
                <span className="quick-info-label">Hình thức</span>
                <span className="quick-info-value">{tutor.mode}</span>
              </div>
              {tutor.experience && (
                <div className="quick-info-item">
                  <span className="quick-info-label">Kinh nghiệm</span>
                  <span className="quick-info-value">{tutor.experience}</span>
                </div>
              )}
            </div>
            
            <div className="tutor-hero-actions">
              <button type="button" className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Gửi lời mời dạy
              </button>
              <Link to="/chat" className="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Nhắn tin ngay
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <div className="tutor-stats-grid">
          <div className="tutor-stat-card">
            <div className="stat-card-icon">📚</div>
            <div className="stat-card-value">
              {tutor.studentProfile?.completedClasses || '15+'}
            </div>
            <div className="stat-card-label">Lớp đã dạy</div>
          </div>
          <div className="tutor-stat-card">
            <div className="stat-card-icon">✅</div>
            <div className="stat-card-value">
              {tutor.studentProfile?.completionRate || '98%'}
            </div>
            <div className="stat-card-label">Hoàn thành</div>
          </div>
          <div className="tutor-stat-card">
            <div className="stat-card-icon">⚡</div>
            <div className="stat-card-value">
              {tutor.studentProfile?.responseTime || '< 2h'}
            </div>
            <div className="stat-card-label">Phản hồi</div>
          </div>
          <div className="tutor-stat-card">
            <div className="stat-card-icon">👥</div>
            <div className="stat-card-value">
              {tutor.studentProfile?.activeStudents || '8'}
            </div>
            <div className="stat-card-label">Học sinh</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="tutor-content-grid">
          {/* Main Content */}
          <div className="tutor-content-card">
            <h2 className="content-card-title">Giới thiệu</h2>
            
            <div className="content-card-section">
              <p className="tutor-bio">
                {tutor.bio || `Xin chào! Mình là ${tutor.name}, hiện đang là sinh viên ${tutor.studentProfile?.major || 'TVU'}. 
                Với niềm đam mê chia sẻ kiến thức, mình mong muốn giúp các em học sinh nắm vững kiến thức nền tảng 
                và phát triển tư duy học tập hiệu quả.`}
              </p>
            </div>
            
            <div className="content-card-section">
              <h3 className="section-subtitle">Kỹ năng nổi bật</h3>
              <div className="skills-grid">
                {tutor.skills && tutor.skills.length > 0 ? (
                  tutor.skills.map((skill: string) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))
                ) : (
                  <>
                    <span className="skill-tag">Giảng dạy dễ hiểu</span>
                    <span className="skill-tag">Tận tâm với học sinh</span>
                    <span className="skill-tag">Phương pháp hiện đại</span>
                    <span className="skill-tag">Theo dõi tiến độ</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="content-card-section">
              <h3 className="section-subtitle">Trình độ học vấn</h3>
              <p className="tutor-bio">
                {tutor.education || tutor.studentProfile?.major || 'Sinh viên TVU - Đại học Trà Vinh'}
              </p>
            </div>

            <div className="content-card-section">
              <h3 className="section-subtitle">Môn học có thể dạy</h3>
              <div className="subjects-grid">
                {subjectNames.map((subjectName: string, index: number) => (
                  <div key={`${subjectName}-${index}`} className="subject-item">
                    <div className="subject-icon">📖</div>
                    <div className="subject-name">{subjectName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="tutor-content-card">
            <h2 className="content-card-title">Lịch dạy</h2>
            
            {tutor.schedule && tutor.schedule.length > 0 ? (
              <div className="schedule-grid">
                {tutor.schedule.map((entry: { day: string; slots: string[] }) => (
                  <div key={entry.day} className="schedule-day">
                    <h4 className="schedule-day-name">{entry.day}</h4>
                    <div className="schedule-slots">
                      {entry.slots.map((slot: string) => (
                        <span key={slot} className="schedule-slot">{slot}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="tutor-bio">
                Lịch dạy linh hoạt, có thể thỏa thuận theo nhu cầu của phụ huynh và học sinh.
              </p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <section className="reviews-section">
          <div className="reviews-header">
            <h2 className="content-card-title">Đánh giá từ phụ huynh</h2>
            <div className="reviews-summary">
              <div className="reviews-rating-large">
                <div className="rating-number">{tutor.rating.toFixed(1)}</div>
                <div className="rating-stars">
                  {'⭐'.repeat(Math.floor(tutor.rating))}
                </div>
                <div className="rating-count">{tutor.reviewsCount} đánh giá</div>
              </div>
            </div>
          </div>
          
          {reviews.length > 0 ? (
            <div className="reviews-list">
              {reviews.map((review) => (
                <article key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-author">
                      <div className="review-avatar">
                        {review.author.split(' ').slice(-2).map(n => n[0]).join('')}
                      </div>
                      <div className="review-author-info">
                        <div className="review-author-name">{review.author}</div>
                        <div className="review-date">{review.date}</div>
                      </div>
                    </div>
                    <div className="review-rating">
                      {'⭐'.repeat(Math.floor(review.rating))}
                    </div>
                  </div>
                  <p className="review-text">{review.comment}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="reviews-empty">
              <div className="reviews-empty-icon">💬</div>
              <p>Chưa có đánh giá nào</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default TutorDetailPage
