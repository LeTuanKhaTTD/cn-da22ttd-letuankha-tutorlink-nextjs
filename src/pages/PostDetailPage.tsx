import { Link, Navigate, useParams } from 'react-router-dom'
import { posts } from '../data/mockData'

function PostDetailPage() {
  const { postId } = useParams()
  const post = posts.find((item) => item.id === postId)

  if (!post) {
    return <Navigate to="/posts" replace />
  }

  return (
    <div className="container detail-page">
      <header className="detail-hero">
        <div className="detail-meta">
          <span className="badge">{post.level}</span>
          <h1>{post.subject}</h1>
          <p className="detail-subtitle">
            Phụ huynh: {post.parentName} • Học sinh: {post.studentName}
          </p>
          <ul className="detail-meta">
            <li>Khu vực: {post.location}</li>
            <li>Học phí: {post.budget}</li>
            <li>Số buổi: {post.frequency}</li>
            <li>Đăng ngày: {post.createdAt}</li>
          </ul>
          <div className="detail-actions">
            <button type="button" className="btn btn-primary">
              Ứng tuyển ngay
            </button>
            <Link to="/chat" className="btn btn-secondary">
              Liên hệ phụ huynh
            </Link>
          </div>
        </div>
      </header>

      <section className="detail-card">
        <h2>Mô tả nhu cầu</h2>
        <p>{post.description}</p>
        <h3>Yêu cầu cụ thể</h3>
        <ul className="post-requirements">
          {post.requirements.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <section className="detail-card">
        <h2>Hướng dẫn hợp tác</h2>
        <p>
          Sau khi ứng tuyển, phụ huynh sẽ được thông báo thông qua chat. Vui lòng chuẩn bị
          hồ sơ, bằng cấp và lịch dạy tuần tới để tiện cho quá trình kết nối.
        </p>
      </section>
    </div>
  )
}

export default PostDetailPage
