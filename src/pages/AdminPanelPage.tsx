function AdminPanelPage() {
  return (
    <div className="container admin-page">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <button type="button" className="sidebar-link active">
          Tổng quan
        </button>
        <button type="button" className="sidebar-link">
          Quản lý người dùng
        </button>
        <button type="button" className="sidebar-link">
          Duyệt tin đăng
        </button>
        <button type="button" className="sidebar-link">
          Thống kê
        </button>
      </aside>
      <section className="admin-content">
        <header className="admin-header">
          <h1>Thống kê hoạt động</h1>
          <div className="admin-stats">
            <div className="card stat-card">
              <h3>Gia sư</h3>
              <p className="stat-value">1,245</p>
              <small>+8% so với tháng trước</small>
            </div>
            <div className="card stat-card">
              <h3>Phụ huynh</h3>
              <p className="stat-value">3,410</p>
              <small>+5% so với tháng trước</small>
            </div>
            <div className="card stat-card">
              <h3>Tin đăng</h3>
              <p className="stat-value">872</p>
              <small>+2% so với tháng trước</small>
            </div>
          </div>
        </header>
        <section className="card table-card">
          <h2>Tin đăng chờ duyệt</h2>
          <table>
            <thead>
              <tr>
                <th>Phụ huynh</th>
                <th>Môn học</th>
                <th>Ngày đăng</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Phạm Thanh Tâm</td>
                <td>Toán lớp 9</td>
                <td>10/10/2024</td>
                <td><span className="badge warning">Chờ duyệt</span></td>
                <td>
                  <button type="button" className="btn btn-secondary btn-sm">
                    Duyệt
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm">
                    Từ chối
                  </button>
                </td>
              </tr>
              <tr>
                <td>Nguyễn Hồng Nhung</td>
                <td>Tiếng Anh</td>
                <td>05/10/2024</td>
                <td><span className="badge warning">Chờ duyệt</span></td>
                <td>
                  <button type="button" className="btn btn-secondary btn-sm">
                    Duyệt
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm">
                    Từ chối
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="card chart-card">
          <h2>Tăng trưởng người dùng</h2>
          <div className="chart-placeholder">
            <div className="bar" style={{ height: '68%' }} />
            <div className="bar" style={{ height: '72%' }} />
            <div className="bar" style={{ height: '80%' }} />
            <div className="bar" style={{ height: '76%' }} />
            <div className="bar" style={{ height: '83%' }} />
          </div>
        </section>
      </section>
    </div>
  )
}

export default AdminPanelPage
