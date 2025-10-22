import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="container not-found">
      <h1>404</h1>
      <p>Trang bạn tìm không tồn tại hoặc đã được di chuyển.</p>
      <Link to="/" className="btn btn-primary">
        Về trang chủ
      </Link>
    </div>
  )
}

export default NotFoundPage
