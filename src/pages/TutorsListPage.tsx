import { useState } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import Pagination from '../components/Pagination'
import TutorCard from '../components/TutorCard'
import { tutors } from '../data/mockData'

const SORT_OPTIONS = [
  { value: 'rating', label: 'Đánh giá cao' },
  { value: 'price', label: 'Học phí' },
  { value: 'experience', label: 'Kinh nghiệm' },
  { value: 'location', label: 'Khu vực' }
]

function TutorsListPage() {
  const [sortBy, setSortBy] = useState('rating')
  const [currentPage, setCurrentPage] = useState(1)

  const stats = [
    { label: 'Tổng gia sư', value: tutors.length },
    { label: 'Đang hoạt động', value: tutors.length - 2 },
    { label: 'Đánh giá 5 sao', value: tutors.filter((t) => t.rating === 5).length }
  ]

  return (
    <div className="listing-page container">
      <div className="page-intro">
        <div>
          <span className="page-intro-badge">Danh sách gia sư</span>
          <h1>Khám phá gia sư chất lượng</h1>
          <p>
            Tìm kiếm và so sánh hồ sơ gia sư phù hợp với nhu cầu của bạn. Sử dụng bộ lọc bên
            trái để thu hẹp kết quả.
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
              <p>Tìm thấy {tutors.length} gia sư phù hợp</p>
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
          <div className="grid grid-2">
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={3} onChange={setCurrentPage} />
        </section>
      </div>
    </div>
  )
}

export default TutorsListPage
