import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import AdminPanelPage from './pages/AdminPanelPage'
import AuthPage from './pages/AuthPage'
import ChatPage from './pages/ChatPage'
import CreatePostPage from './pages/CreatePostPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ParentDashboard from './pages/ParentDashboard'
import PostDetailPage from './pages/PostDetailPage'
import PostsListPage from './pages/PostsListPage'
import TutorDashboard from './pages/TutorDashboard'
import TutorDetailPage from './pages/TutorDetailPage'
import TutorProfilePage from './pages/TutorProfilePage'
import TutorRegistrationPage from './pages/TutorRegistrationPage.tsx'
import TutorsListPage from './pages/TutorsListPage'
import MyApplicationsPage from './pages/MyApplicationsPage'
import ProfileEditPage from './pages/ProfileEditPage'
import AdminUserDetailPage from './pages/AdminUserDetailPage.tsx'

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>⚠️ Có lỗi xảy ra</h1>
          <pre style={{ textAlign: 'left', background: '#f5f5f5', padding: '10px' }}>
            {this.state.error?.toString()}
            {'\n'}
            {this.state.error?.stack}
          </pre>
          <button onClick={() => window.location.reload()}>Tải lại trang</button>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tutors" element={<TutorsListPage />} />
            <Route path="tutors/:tutorId" element={<TutorDetailPage />} />
            <Route path="posts" element={<PostsListPage />} />
            <Route path="posts/:postId" element={<PostDetailPage />} />
            <Route path="create-post" element={<CreatePostPage />} />
            <Route path="tutor-profile" element={<TutorProfilePage />} />
            <Route path="register-tutor" element={<TutorRegistrationPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            
            {/* Applications - Protected for tutors */}
            <Route 
              path="my-applications" 
              element={
                <ProtectedRoute requiredRole="gia_su">
                  <MyApplicationsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Dashboards cho từng loại người dùng - Protected */}
            <Route 
              path="dashboard/parent" 
              element={
                <ProtectedRoute requiredRole="phu_huynh">
                  <ParentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="dashboard/tutor" 
              element={
                <ProtectedRoute requiredRole="gia_su">
                  <TutorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="dashboard/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Profile Edit - Protected for tutors */}
            <Route 
              path="profile/edit" 
              element={
                <ProtectedRoute requiredRole="gia_su">
                  <ProfileEditPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin User Detail - Protected for admin */}
            <Route 
              path="admin/tutors/:userId" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUserDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="admin/users/:userId" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUserDetailPage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="chat" element={<ChatPage />} />
            <Route path="admin" element={<AdminPanelPage />} />
            <Route path="login" element={<AuthPage initialMode="login" />} />
            <Route path="register" element={<AuthPage initialMode="register" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
