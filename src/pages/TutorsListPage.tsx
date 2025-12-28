import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar'
import Pagination from '../components/Pagination'
import TutorCard from '../components/TutorCard'
import { tutorsApi } from '../api/tutors.api'
import { adaptTutorData } from '../utils/dataAdapter'
import { TUTOR_SORT_OPTIONS } from '../constants/options'
import type { FilterState } from '../components/FilterSidebar'

function TutorsListPage() {
  const [searchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('rating')
  const [currentPage, setCurrentPage] = useState(1)
  const [tutors, setTutors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    subjects: searchParams.get('subject') ? [searchParams.get('subject')!] : [],
    levels: searchParams.get('level') ? [searchParams.get('level')!] : [],
    modes: [],
    priceRange: searchParams.get('budget') || '',
    location: searchParams.get('location') || ''
  })

  const ITEMS_PER_PAGE = 12

  useEffect(() => {
    fetchTutors()
  }, [filters, sortBy])

  const fetchTutors = async () => {
    try {
      setLoading(true)
      const response = await tutorsApi.getTutors({} as any)
      let adaptedTutors = (response.data || []).map(adaptTutorData)
      
      // Apply client-side filters
      
      // 1. Filter by subjects
      if (filters.subjects.length > 0) {
        adaptedTutors = adaptedTutors.filter((tutor: any) => {
          if (!tutor.subjects || tutor.subjects.length === 0) return false
          // Check if tutor has at least one matching subject
          return tutor.subjects.some((s: string) => 
            filters.subjects.some(filterSubject => 
              s.toLowerCase().includes(filterSubject.toLowerCase()) ||
              filterSubject.toLowerCase().includes(s.toLowerCase())
            )
          )
        })
      }
      
      // 2. Filter by levels
      if (filters.levels.length > 0) {
        adaptedTutors = adaptedTutors.filter((tutor: any) => {
          if (!tutor.levels) return false
          const tutorLevels = Array.isArray(tutor.levels) ? tutor.levels : [tutor.levels]
          // Check if tutor teaches at least one matching level
          return tutorLevels.some((level: string) => 
            filters.levels.includes(level)
          )
        })
      }
      
      // 3. Filter by modes (Online, Offline, Kết hợp)
      if (filters.modes.length > 0) {
        adaptedTutors = adaptedTutors.filter((tutor: any) => {
          if (!tutor.mode) return false
          // Normalize mode for comparison
          const tutorMode = tutor.mode.trim()
          return filters.modes.includes(tutorMode)
        })
      }
      
      // 4. Filter by price range
      if (filters.priceRange) {
        adaptedTutors = adaptedTutors.filter((tutor: any) => {
          if (!tutor.rate) return false
          // Extract numeric value from rate string (e.g., "100.000đ/buổi" -> 100000)
          const priceStr = tutor.rate.replace(/[^\d]/g, '')
          const price = parseInt(priceStr) || 0
          
          if (filters.priceRange === '< 200k') {
            return price < 200000
          } else if (filters.priceRange === '200k - 300k') {
            return price >= 200000 && price <= 300000
          } else if (filters.priceRange === '300k - 400k') {
            return price > 300000 && price <= 400000
          } else if (filters.priceRange === '> 400k') {
            return price > 400000
          }
          return true
        })
      }
      
      // 5. Filter by location
      if (filters.location) {
        adaptedTutors = adaptedTutors.filter((tutor: any) => {
          if (!tutor.location) return false
          return tutor.location.toLowerCase().includes(filters.location.toLowerCase())
        })
      }
      
      // Apply sorting
      if (sortBy === 'rating') {
        adaptedTutors.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
      } else if (sortBy === 'price-asc') {
        adaptedTutors.sort((a: any, b: any) => {
          const priceA = parseInt(a.rate.replace(/[^\d]/g, '')) || 0
          const priceB = parseInt(b.rate.replace(/[^\d]/g, '')) || 0
          return priceA - priceB
        })
      } else if (sortBy === 'price-desc') {
        adaptedTutors.sort((a: any, b: any) => {
          const priceA = parseInt(a.rate.replace(/[^\d]/g, '')) || 0
          const priceB = parseInt(b.rate.replace(/[^\d]/g, '')) || 0
          return priceB - priceA
        })
      } else if (sortBy === 'experience') {
        adaptedTutors.sort((a: any, b: any) => {
          // Sort by reviews count as proxy for experience
          return (b.reviewsCount || 0) - (a.reviewsCount || 0)
        })
      } else if (sortBy === 'location') {
        adaptedTutors.sort((a: any, b: any) => {
          return (a.location || '').localeCompare(b.location || '', 'vi')
        })
      }
      
      setTutors(adaptedTutors)
    } catch (error) {
      console.error('Error fetching tutors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterApply = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleFilterReset = () => {
    setFilters({
      subjects: [],
      levels: [],
      modes: [],
      priceRange: '',
      location: ''
    })
    setCurrentPage(1)
  }

  // Calculate paginated tutors
  const totalPages = Math.ceil(tutors.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedTutors = tutors.slice(startIndex, endIndex)

  const verifiedCount = tutors.filter((t: any) => t.studentProfile?.verified).length
  const topRatedCount = tutors.filter((t: any) => t.rating >= 4.5).length

  return (
    <div className="tutors-list-figma">
      {/* Header Section */}
      <header className="tutors-list-header">
        <div className="container">
          <div className="tutors-header-content">
            <h1 className="tutors-header-title">
              Tìm gia sư phù hợp với bạn
            </h1>
            <p className="tutors-header-description">
              Khám phá hơn {tutors.length}+ gia sư sinh viên TVU được xác thực, có kinh nghiệm 
              và đánh giá cao. Sử dụng bộ lọc thông minh để tìm người phù hợp nhất với nhu cầu học tập của bạn.
            </p>
            
            <div className="tutors-quick-stats">
              <div className="quick-stat-item">
                <span className="quick-stat-value">{tutors.length}+</span>
                <span className="quick-stat-label">Tổng gia sư</span>
              </div>
              <div className="quick-stat-item">
                <span className="quick-stat-value">{verifiedCount}</span>
                <span className="quick-stat-label">Đã xác thực</span>
              </div>
              <div className="quick-stat-item">
                <span className="quick-stat-value">{topRatedCount}</span>
                <span className="quick-stat-label">Đánh giá 4.5★+</span>
              </div>
              <div className="quick-stat-item">
                <span className="quick-stat-value">24/7</span>
                <span className="quick-stat-label">Hỗ trợ</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="tutors-main-layout">
        {/* Filter Sidebar */}
        <aside className="tutors-filter-sidebar">
          <FilterSidebar 
            onApply={handleFilterApply} 
            onReset={handleFilterReset}
            initialFilters={filters}
            autoApply={true}
          />
        </aside>

        {/* Results Area */}
        <section className="tutors-results-area">
          {/* Toolbar */}
          <div className="results-toolbar">
            <div className="results-info">
              <h2 className="results-title">Kết quả tìm kiếm</h2>
              <p className="results-count">
                {loading ? 'Đang tải...' : (
                  <>Tìm thấy <strong>{tutors.length}</strong> gia sư phù hợp</>
                )}
              </p>
            </div>
            <div className="sort-dropdown">
              <span className="sort-label">Sắp xếp theo:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                {TUTOR_SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tutors Grid */}
          {loading ? (
            <div className="results-loading">
              <div className="loading-spinner"></div>
              <p>Đang tải danh sách gia sư...</p>
            </div>
          ) : tutors.length === 0 ? (
            <div className="results-empty">
              <div className="results-empty-icon">🔍</div>
              <p>Không tìm thấy gia sư phù hợp với bộ lọc</p>
              <button 
                type="button" 
                className="btn-reset-filters"
                onClick={handleFilterReset}
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="tutors-grid-figma">
              {paginatedTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && tutors.length > 0 && totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onChange={(page) => {
                setCurrentPage(page)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }} 
            />
          )}
        </section>
      </div>
    </div>
  )
}

export default TutorsListPage
