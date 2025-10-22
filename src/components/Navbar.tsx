import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'

const navLinks = [
  { path: '/', label: 'Trang chủ', exact: true },
  { path: '/tutors', label: 'Tìm gia sư' },
  { path: '/posts', label: 'Yêu cầu' },
  { path: '/dashboard', label: 'Bảng tin' }
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <img src={logo} alt="TutorLink" className="nav-logo" />
          <span className="nav-brand-text">TutorLink</span>
        </Link>

        <nav className="nav-menu" aria-label="Điều hướng chính">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.exact}
              className={({ isActive }) => `nav-item${isActive ? ' nav-item-active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <NavLink to="/register-tutor" className="nav-btn nav-btn-accent" onClick={closeMenu}>
            🎓 Đăng ký Gia sư
          </NavLink>
          <NavLink to="/login" className="nav-btn nav-btn-ghost" onClick={closeMenu}>
            Đăng nhập
          </NavLink>
          <Link to="/register" className="nav-btn nav-btn-primary" onClick={closeMenu}>
            Đăng ký
          </Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={isMenuOpen}
        >
          <span className={isMenuOpen ? 'active' : ''} />
          <span className={isMenuOpen ? 'active' : ''} />
          <span className={isMenuOpen ? 'active' : ''} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.exact}
                className={({ isActive }) =>
                  `mobile-nav-item${isActive ? ' mobile-nav-item-active' : ''}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-actions">
            <NavLink to="/login" className="mobile-btn mobile-btn-ghost" onClick={closeMenu}>
              Đăng nhập
            </NavLink>
            <Link to="/register" className="mobile-btn mobile-btn-primary" onClick={closeMenu}>
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
