import { Outlet } from 'react-router-dom'
import ChatBox from '../components/ChatBox'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ChatBox />
    </div>
  )
}

export default MainLayout
