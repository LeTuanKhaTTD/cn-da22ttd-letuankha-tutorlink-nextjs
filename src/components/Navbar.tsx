import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAuth } from '../contexts/AuthContext'

const navLinks = [
  { path: '/', label: 'Trang chủ', exact: true },
  { path: '/tutors', label: 'Tìm gia sư' },
  { path: '/posts', label: 'Yêu cầu' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    closeMenu()
    navigate('/')
  }

  const handleUserClick = () => {
    if (user) {
      // Navigate to role-specific dashboard
      switch (user.vai_tro) {
        case 'phu_huynh':
          navigate('/dashboard/parent')
          break
        case 'gia_su':
          navigate('/dashboard/tutor')
          break
        case 'admin':
          navigate('/dashboard/admin')
          break
        default:
          navigate('/dashboard')
      }
    }
  }

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
          {isAuthenticated && user ? (
            <>
              <button 
                className="nav-user-name" 
                onClick={handleUserClick}
                style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0.5rem 1rem' }}
                title="Đi đến dashboard"
              >
                👤 {user.ho_ten}
              </button>
              <button className="nav-btn nav-btn-ghost" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <NavLink to="/register-tutor" className="nav-btn nav-btn-accent" onClick={closeMenu}>
                🎓 Đăng ký Gia sư
              </NavLink>
              <NavLink to="/login" className="nav-btn nav-btn-ghost" onClick={closeMenu}>
                Đăng nhập
              </NavLink>
              <Link to="/register" className="nav-btn nav-btn-primary" onClick={closeMenu}>
                Đăng ký
              </Link>
            </>
          )}
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
            {isAuthenticated && user ? (
              <>
                <button 
                  className="mobile-user-info"
                  onClick={() => { handleUserClick(); closeMenu(); }}
                  style={{ cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: '1rem' }}
                >
                  <span>👤 {user.ho_ten}</span>
                </button>
                <button className="mobile-btn mobile-btn-ghost" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="mobile-btn mobile-btn-ghost" onClick={closeMenu}>
                  Đăng nhập
                </NavLink>
                <Link to="/register" className="mobile-btn mobile-btn-primary" onClick={closeMenu}>
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
