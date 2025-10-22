import { Link } from 'react-router-dom'
import type { Post } from '../types'

interface PostCardProps {
  post: Post
  ownerActions?: boolean
}

const summarize = (text: string, max = 140) => {
  if (!text) {
    return ''
  }

  return text.length <= max ? text : `${text.slice(0, max)}…`
}

function PostCard({ post, ownerActions }: PostCardProps) {
  const requirementHighlights = post.requirements.slice(0, 3)
  const remainingRequirements = post.requirements.length - requirementHighlights.length

  return (
    <article className="card post-card">
      <header className="post-card-header">
        <div>
          <h3>{post.subject}</h3>
          <p className="post-subtitle">
            {post.studentName} • {post.parentName}
          </p>
        </div>
        <span className="badge">{post.level}</span>
      </header>
      <div className="post-card-body">
        <p className="post-intro">{summarize(post.description)}</p>
        <div className="post-meta-grid">
          <div className="post-meta-card">
            <small>Khu vực</small>
            <span>{post.location}</span>
          </div>
          <div className="post-meta-card">
            <small>Học phí</small>
            <span>{post.budget}</span>
          </div>
          <div className="post-meta-card">
            <small>Số buổi</small>
            <span>{post.frequency}</span>
          </div>
        </div>
        <div className="post-tags">
          {requirementHighlights.map((item) => (
            <span key={item} className="post-chip">
              {item}
            </span>
          ))}
          {remainingRequirements > 0 && (
            <span className="post-chip chip-muted">+{remainingRequirements}</span>
          )}
        </div>
      </div>
      <footer className="post-card-footer">
        <span className="post-date">Đăng ngày: {post.createdAt}</span>
        <div className="post-actions">
          <Link to={`/posts/${post.id}`} className="btn btn-secondary">
            Chi tiết
          </Link>
          <button type="button" className="btn btn-primary">
            Ứng tuyển
          </button>
          {ownerActions && (
            <div className="owner-actions">
              <button type="button" className="btn btn-ghost">
                Chỉnh sửa
              </button>
              <button type="button" className="btn btn-danger">
                Xóa tin
              </button>
            </div>
          )}
        </div>
      </footer>
    </article>
  )
}

export default PostCard
