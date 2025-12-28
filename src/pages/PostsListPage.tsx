import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PostFilterSidebar from '../components/PostFilterSidebar'
import type { PostFilterState } from '../components/PostFilterSidebar'
import Pagination from '../components/Pagination'
import PostCard from '../components/PostCard'
import { postsApi } from '../api/posts.api'
import { adaptPostData } from '../utils/dataAdapter'
import { POST_SORT_OPTIONS } from '../constants/options'
import '../styles/post-filter-sidebar.css'

function PostsListPage() {
  const [searchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<PostFilterState>({
    subjects: searchParams.get('subject') ? [searchParams.get('subject')!] : [],
    levels: searchParams.get('level') ? [searchParams.get('level')!] : [],
    modes: [],
    budgetRange: searchParams.get('maxFee') || '',
    location: searchParams.get('location') || '',
    status: ''
  })

  useEffect(() => {
    fetchPosts()
  }, [filters, sortBy])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await postsApi.getPosts({} as any)
      let allPosts = (response.data || []).map(adaptPostData)
      
      // Apply filters
      if (filters.subjects.length > 0) {
        allPosts = allPosts.filter((p: any) => 
          filters.subjects.some(s => p.subject?.includes(s))
        )
      }
      if (filters.levels.length > 0) {
        allPosts = allPosts.filter((p: any) => 
          filters.levels.some(l => p.level?.includes(l))
        )
      }
      if (filters.location) {
        allPosts = allPosts.filter((p: any) => 
          p.location?.toLowerCase().includes(filters.location.toLowerCase())
        )
      }
      if (filters.status) {
        allPosts = allPosts.filter((p: any) => p.status === filters.status)
      }
      if (filters.budgetRange) {
        const [min, max] = filters.budgetRange.includes('<') 
          ? [0, 200]
          : filters.budgetRange.includes('>')
          ? [500, Infinity]
          : filters.budgetRange.split(' - ').map(s => parseInt(s.replace(/k/g, '')))
        allPosts = allPosts.filter((p: any) => {
          const budget = parseFloat(p.budget || '0')
          return budget >= min && budget <= max
        })
      }
      
      // Apply sorting
      if (sortBy === 'latest') {
        allPosts.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      } else if (sortBy === 'salary-desc') {
        allPosts.sort((a: any, b: any) => 
          parseFloat(b.budget || '0') - parseFloat(a.budget || '0')
        )
      }
      
      setPosts(allPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterApply = (newFilters: PostFilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleFilterReset = () => {
    setFilters({
      subjects: [],
      levels: [],
      modes: [],
      budgetRange: '',
      location: '',
      status: ''
    })
    setCurrentPage(1)
  }

  const openPostsCount = posts.filter((p: any) => 
    p.status === 'mo' || p.status === 'open'
  ).length

  return (
    <div className="posts-list-figma">
      {/* Header Section */}
      <header className="posts-list-header">
        <div className="container">
          <div className="posts-header-content">
            <h1 className="posts-header-title">
              Khám phá các yêu cầu gia sư
            </h1>
            <p className="posts-header-description">
              Duyệt qua {posts.length}+ yêu cầu tìm gia sư từ phụ huynh và học sinh trên toàn quốc. 
              Tìm kiếm cơ hội giảng dạy phù hợp với kỹ năng và lịch trình của bạn.
            </p>
            
            <div className="posts-quick-stats">
              <div className="posts-stat-item">
                <span className="posts-stat-value">{posts.length}+</span>
                <span className="posts-stat-label">Tổng yêu cầu</span>
              </div>
              <div className="posts-stat-item">
                <span className="posts-stat-value">{openPostsCount}</span>
                <span className="posts-stat-label">Đang tuyển</span>
              </div>
              <div className="posts-stat-item">
                <span className="posts-stat-value">24h</span>
                <span className="posts-stat-label">Cập nhật mới</span>
              </div>
              <div className="posts-stat-item">
                <span className="posts-stat-value">100%</span>
                <span className="posts-stat-label">Xác thực</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="posts-main-layout">
        {/* Filter Sidebar */}
        <PostFilterSidebar 
          onApply={handleFilterApply} 
          onReset={handleFilterReset}
          initialFilters={filters}
        />

        {/* Results Area */}
        <section className="posts-results-area">
          {/* Toolbar */}
          <div className="posts-results-toolbar">
            <div className="posts-results-info">
              <h2 className="posts-results-title">Kết quả tìm kiếm</h2>
              <p className="posts-results-count">
                {loading ? 'Đang tải...' : (
                  <>Tìm thấy <strong>{posts.length}</strong> yêu cầu phù hợp</>
                )}
              </p>
            </div>
            <div className="sort-dropdown">
              <span className="sort-label">Sắp xếp theo:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                {POST_SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="posts-loading">
              <div className="loading-spinner"></div>
              <p>Đang tải danh sách yêu cầu...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="posts-empty">
              <div className="posts-empty-icon">📋</div>
              <p>Không tìm thấy yêu cầu phù hợp với bộ lọc</p>
            </div>
          ) : (
            <div className="posts-list-stack">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} ownerActions={false} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && posts.length > 0 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={Math.ceil(posts.length / 10)} 
              onChange={setCurrentPage} 
            />
          )}
        </section>
      </div>
    </div>
  )
}

export default PostsListPage
