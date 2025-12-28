import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'gia_su' | 'phu_huynh'
}

/**
 * Component bảo vệ route yêu cầu authentication
 * Nếu có requiredRole, kiểm tra user phải có đúng vai trò
 */
export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return

    // Chưa đăng nhập -> redirect đến login
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
      return
    }

    // Đã đăng nhập nhưng sai role -> redirect về home
    if (requiredRole && user?.vai_tro !== requiredRole) {
      alert(`Bạn không có quyền truy cập trang này! Trang này dành cho ${getRoleName(requiredRole)}.`)
      navigate('/', { replace: true })
      return
    }
  }, [isAuthenticated, user, isLoading, requiredRole, navigate])

  // Đang loading
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        gap: '1rem'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e2e8f0',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: '#64748b' }}>Đang kiểm tra quyền truy cập...</p>
      </div>
    )
  }

  // Chưa đăng nhập hoặc sai role -> không render gì
  if (!isAuthenticated || (requiredRole && user?.vai_tro !== requiredRole)) {
    return null
  }

  // OK -> render children
  return <>{children}</>
}

function getRoleName(role: string): string {
  switch (role) {
    case 'admin': return 'Quản trị viên'
    case 'gia_su': return 'Gia sư'
    case 'phu_huynh': return 'Phụ huynh'
    default: return role
  }
}
