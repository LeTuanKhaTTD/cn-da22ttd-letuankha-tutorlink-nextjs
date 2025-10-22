import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>TutorLink</h3>
            <p>
              Nền tảng kết nối phụ huynh và gia sư chất lượng cao, giúp việc tìm kiếm và dạy
              học trở nên nhanh chóng, minh bạch và hiệu quả.
            </p>
            <div className="footer-contacts">
              <a href="mailto:contact@tutorlink.vn" className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@tutorlink.vn
              </a>
              <a href="tel:0901234567" className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0901 234 567
              </a>
            </div>
          </div>
          <div className="footer-links-group">
            <h4>Dành cho phụ huynh</h4>
            <ul>
              <li>
                <Link to="/tutors">Tìm gia sư</Link>
              </li>
              <li>
                <Link to="/create-post">Đăng yêu cầu</Link>
              </li>
              <li>
                <Link to="/pricing">Bảng giá dịch vụ</Link>
              </li>
              <li>
                <Link to="/guide">Hướng dẫn sử dụng</Link>
              </li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h4>Dành cho gia sư</h4>
            <ul>
              <li>
                <Link to="/posts">Tìm học viên</Link>
              </li>
              <li>
                <Link to="/profile">Tạo hồ sơ</Link>
              </li>
              <li>
                <Link to="/tips">Bí quyết dạy học</Link>
              </li>
              <li>
                <Link to="/community">Cộng đồng</Link>
              </li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h4>Chính sách</h4>
            <ul>
              <li>
                <Link to="/privacy">Bảo mật</Link>
              </li>
              <li>
                <Link to="/terms">Điều khoản</Link>
              </li>
              <li>
                <Link to="/support">Hỗ trợ</Link>
              </li>
              <li>
                <Link to="/about">Về chúng tôi</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <p>© {new Date().getFullYear()} TutorLink. Đã đăng ký bản quyền.</p>
          </div>
          <div className="social-links">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
