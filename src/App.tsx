import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import AdminPanelPage from './pages/AdminPanelPage'
import AuthPage from './pages/AuthPage'
import ChatPage from './pages/ChatPage'
import CreatePostPage from './pages/CreatePostPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PostDetailPage from './pages/PostDetailPage'
import PostsListPage from './pages/PostsListPage'
import TutorDetailPage from './pages/TutorDetailPage'
import TutorProfilePage from './pages/TutorProfilePage'
import TutorRegistrationPage from './pages/TutorRegistrationPage.tsx'
import TutorsListPage from './pages/TutorsListPage'

function App() {
  return (
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
          <Route path="chat" element={<ChatPage />} />
          <Route path="admin" element={<AdminPanelPage />} />
          <Route path="login" element={<AuthPage initialMode="login" />} />
          <Route path="register" element={<AuthPage initialMode="register" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
