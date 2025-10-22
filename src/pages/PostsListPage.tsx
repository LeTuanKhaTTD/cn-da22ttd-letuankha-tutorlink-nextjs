import { useState } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import Pagination from '../components/Pagination'
import PostCard from '../components/PostCard'
import { posts } from '../data/mockData'

const SORT_OPTIONS = [
  { value: 'latest', label: 'Mới nhất' },
  { value: 'budget-desc', label: 'Học phí cao đến thấp' },
  { value: 'budget-asc', label: 'Học phí thấp đến cao' },
  { value: 'location', label: 'Theo khu vực' }
]

function PostsListPage() {
  const [sortBy, setSortBy] = useState('latest')
  const [currentPage, setCurrentPage] = useState(1)

  const stats = [
    { label: 'Tổng bài đăng', value: posts.length },
    { label: 'Đang tuyển', value: posts.length - 1 },
    { label: 'Mới hôm nay', value: 2 }
  ]

  return (
    <div className="listing-page container">
      <div className="page-intro">
        <div>
          <span className="page-intro-badge">Danh sách yêu cầu</span>
          <h1>Khám phá yêu cầu gia sư</h1>
          <p>
            Duyệt qua các yêu cầu tìm gia sư từ phụ huynh và học sinh. Sử dụng bộ lọc để tìm
            cơ hội phù hợp với bạn.
          </p>
          <div className="listing-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="listing-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="listing-layout">
        <FilterSidebar />
        <section className="listing-results">
          <header className="listing-header">
            <div>
              <h2>Kết quả tìm kiếm</h2>
              <p>Tìm thấy {posts.length} yêu cầu phù hợp</p>
            </div>
            <div className="sort-control">
              <label>
                <span>Sắp xếp theo</span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </header>
          <div className="stack">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} ownerActions />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={4} onChange={setCurrentPage} />
        </section>
      </div>
    </div>
  )
}

export default PostsListPage
