import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { applicationsApi } from '@/api/posts.api'
import './MyApplicationsPage.css'

interface Application {
  id: string
  bai_dang_id: string
  loi_nhan: string
  trang_thai: 'cho' | 'chap_nhan' | 'tu_choi'
  ghi_chu_phu_huynh?: string
  tao_luc: string
  tieu_de: string
  mo_ta?: string
  lop: string
  hoc_phi: number
  dia_chi: string
  mon_hoc: string
  ten_phu_huynh: string
  sdt_phu_huynh: string
}

function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'cho' | 'chap_nhan' | 'tu_choi'>('all')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await applicationsApi.getMyApplications()
      const data = (response as any).data || response
      setApplications(data)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      cho: { text: 'Chờ xét duyệt', class: 'status-pending' },
      chap_nhan: { text: 'Đã chấp nhận', class: 'status-accepted' },
      tu_choi: { text: 'Đã từ chối', class: 'status-rejected' }
    }
    return badges[status as keyof typeof badges] || badges.cho
  }

  const filteredApplications = applications.filter(app => 
    filter === 'all' ? true : app.trang_thai === filter
  )

  if (loading) {
    return (
      <div className="my-applications-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-applications-page">
      <div className="applications-container">
        <div className="applications-header">
          <h1>Đơn ứng tuyển của tôi</h1>
          <p>Quản lý tất cả các đơn ứng tuyển của bạn</p>
        </div>

        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả ({applications.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'cho' ? 'active' : ''}`}
            onClick={() => setFilter('cho')}
          >
            Chờ xét ({applications.filter(a => a.trang_thai === 'cho').length})
          </button>
          <button 
            className={`filter-tab ${filter === 'chap_nhan' ? 'active' : ''}`}
            onClick={() => setFilter('chap_nhan')}
          >
            Đã chấp nhận ({applications.filter(a => a.trang_thai === 'chap_nhan').length})
          </button>
          <button 
            className={`filter-tab ${filter === 'tu_choi' ? 'active' : ''}`}
            onClick={() => setFilter('tu_choi')}
          >
            Đã từ chối ({applications.filter(a => a.trang_thai === 'tu_choi').length})
          </button>
        </div>

        <div className="applications-list">
          {filteredApplications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>Chưa có đơn ứng tuyển</h3>
              <p>
                {filter === 'all' 
                  ? 'Bạn chưa ứng tuyển vào bài đăng nào. Hãy tìm kiếm và ứng tuyển ngay!'
                  : 'Không có đơn ứng tuyển nào trong trạng thái này.'}
              </p>
              {filter === 'all' && (
                <Link to="/posts" className="btn btn-primary">
                  Tìm kiếm yêu cầu
                </Link>
              )}
            </div>
          ) : (
            filteredApplications.map(app => {
              const statusBadge = getStatusBadge(app.trang_thai)
              
              return (
                <div key={app.id} className="application-card">
                  <div className="application-header">
                    <div className="application-title-section">
                      <Link 
                        to={`/posts/${app.bai_dang_id}`}
                        className="application-title"
                      >
                        {app.tieu_de || `Dạy ${app.mon_hoc} - ${app.lop}`}
                      </Link>
                      <span className={`status-badge ${statusBadge.class}`}>
                        {statusBadge.text}
                      </span>
                    </div>
                    <div className="application-date">
                      {new Date(app.tao_luc).toLocaleDateString('vi-VN')}
                    </div>
                  </div>

                  <div className="application-details">
                    <div className="detail-item">
                      <span className="detail-icon">📚</span>
                      <span className="detail-text">{app.mon_hoc}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🎓</span>
                      <span className="detail-text">{app.lop}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">💰</span>
                      <span className="detail-text">
                        {new Intl.NumberFormat('vi-VN').format(app.hoc_phi)} đ/giờ
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{app.dia_chi}</span>
                    </div>
                  </div>

                  {app.loi_nhan && (
                    <div className="application-message">
                      <strong>Lời giới thiệu của bạn:</strong>
                      <p>{app.loi_nhan}</p>
                    </div>
                  )}

                  {app.ghi_chu_phu_huynh && (
                    <div className="parent-note">
                      <strong>Ghi chú từ phụ huynh:</strong>
                      <p>{app.ghi_chu_phu_huynh}</p>
                    </div>
                  )}

                  <div className="application-footer">
                    <div className="parent-info">
                      <span className="parent-name">👤 {app.ten_phu_huynh}</span>
                      {app.trang_thai === 'chap_nhan' && (
                        <span className="parent-phone">📞 {app.sdt_phu_huynh}</span>
                      )}
                    </div>
                    <Link 
                      to={`/posts/${app.bai_dang_id}`}
                      className="btn btn-outline btn-sm"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default MyApplicationsPage
