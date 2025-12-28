import { Link } from 'react-router-dom'
import type { LegacyPost } from '../data/mockData'

interface PostCardProps {
  post: LegacyPost
  ownerActions?: boolean
}

const summarize = (text: string, max = 140) => {
  if (!text) {
    return ''
  }

  return text.length <= max ? text : `${text.slice(0, max)}…`
}

function PostCard({ post, ownerActions }: PostCardProps) {
  // Helper function to safely render any value
  const safeRender = (value: any, fallback = 'Chưa cập nhật') => {
    if (!value) return fallback
    if (typeof value === 'object') {
      // Handle object types from API
      return value.ten_mon || value.name || value.text || JSON.stringify(value)
    }
    return String(value)
  }

  // Ensure requirements is always an array
  const requirements = Array.isArray(post.requirements) 
    ? post.requirements 
    : typeof post.requirements === 'string'
    ? (post.requirements as string).split(',').map(r => r.trim()).filter(Boolean)
    : []
  
  const requirementHighlights = requirements.slice(0, 3)
  const remainingRequirements = requirements.length - requirementHighlights.length

  // Format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Mới đăng'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    } catch {
      return dateString
    }
  }

  return (
    <article className="card post-card">
      <header className="post-card-header">
        <div className="post-header-content">
          <h3>{safeRender(post.subject, 'Chưa có môn học')}</h3>
          {(post.studentName || post.parentName) && (
            <p className="post-subtitle">
              {[post.studentName, post.parentName].filter(Boolean).join(' • ')}
            </p>
          )}
        </div>
        <span className="badge">{safeRender(post.level, 'Chưa rõ')}</span>
      </header>
      <div className="post-card-body">
        {post.description && (
          <p className="post-intro">{summarize(String(post.description))}</p>
        )}
        <div className="post-meta-grid">
          <div className="post-meta-card">
            <small>📍 Khu vực</small>
            <span>{safeRender(post.location)}</span>
          </div>
          <div className="post-meta-card">
            <small>💰 Học phí</small>
            <span>{safeRender(post.budget, 'Thỏa thuận')}</span>
          </div>
          <div className="post-meta-card">
            <small>📅 Số buổi</small>
            <span>{safeRender(post.frequency, 'Linh hoạt')}</span>
          </div>
        </div>
        {(requirementHighlights.length > 0 || remainingRequirements > 0) && (
          <div className="post-tags">
            {requirementHighlights.map((item: any, index: number) => (
              <span key={`${index}`} className="post-chip">
                {safeRender(item, '')}
              </span>
            ))}
            {remainingRequirements > 0 && (
              <span className="post-chip chip-muted">+{remainingRequirements}</span>
            )}
          </div>
        )}
      </div>
      <footer className="post-card-footer">
        <span className="post-date">{formatDate(post.createdAt)}</span>
        <div className="post-actions">
          <Link to={`/posts/${post.id}`} className="btn btn-secondary">
            Chi tiết
          </Link>
          <button type="button" className="btn btn-primary">
            Ứng tuyển
          </button>
        </div>
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
      </footer>
    </article>
  )
}

export default PostCard
