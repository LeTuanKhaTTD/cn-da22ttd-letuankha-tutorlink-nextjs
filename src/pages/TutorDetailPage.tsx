import { Link, Navigate, useParams } from 'react-router-dom'
import { tutorReviews, tutors } from '../data/mockData'

function TutorDetailPage() {
  const { tutorId } = useParams()
  const tutor = tutors.find((item) => item.id === tutorId)

  if (!tutor) {
    return <Navigate to="/tutors" replace />
  }

  const reviews = tutorReviews.filter((review) => review.rating >= tutor.rating - 1)

  return (
    <div className="container detail-page">
      <header className="detail-hero">
        <div className="avatar-large" aria-hidden>
          {tutor.name
            .split(' ')
            .slice(-2)
            .map((part) => part[0])
            .join('')}
        </div>
        <div>
          <span className="badge rating">
            {tutor.rating.toFixed(1)} <small>({tutor.reviewsCount} đánh giá)</small>
          </span>
          <h1>{tutor.name}</h1>
          <p className="detail-subtitle">{tutor.title}</p>
          <ul className="detail-meta">
            <li>Môn dạy: {tutor.subjects.join(', ')}</li>
            <li>Cấp học: {tutor.levels.join(', ')}</li>
            <li>Học phí: {tutor.rate}</li>
            <li>Khu vực: {tutor.location}</li>
            <li>Hình thức: {tutor.mode}</li>
            <li>Kinh nghiệm: {tutor.experience}</li>
          </ul>
          <div className="detail-actions">
            <button type="button" className="btn btn-primary">
              Gửi lời mời dạy
            </button>
            <Link to="/chat" className="btn btn-secondary">
              Nhắn tin ngay
            </Link>
          </div>
        </div>
      </header>

      <section className="detail-grid">
        <div className="detail-card">
          <h2>Mô tả chi tiết</h2>
          <p>{tutor.bio}</p>
          <h3>Kỹ năng nổi bật</h3>
          <div className="skill-list">
            {tutor.skills.map((skill) => (
              <span key={skill} className="badge">
                {skill}
              </span>
            ))}
          </div>
          <h3>Trình độ học vấn</h3>
          <p>{tutor.education}</p>
        </div>
        <div className="detail-card">
          <h2>Lịch dạy trong tuần</h2>
          <div className="schedule-grid">
            {tutor.schedule.map((entry) => (
              <div key={entry.day} className="schedule-item">
                <h4>{entry.day}</h4>
                <ul>
                  {entry.slots.map((slot) => (
                    <li key={slot}>{slot}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-card">
        <h2>Đánh giá từ phụ huynh</h2>
        <div className="review-list">
          {reviews.map((review) => (
            <article key={review.id} className="review-item">
              <header>
                <h4>{review.author}</h4>
                <span className="badge rating">{review.rating.toFixed(1)}</span>
              </header>
              <p>{review.comment}</p>
              <small>{review.date}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TutorDetailPage
