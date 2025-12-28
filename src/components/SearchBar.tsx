import { useState } from 'react'
import type { FormEvent } from 'react'
import { SUBJECT_OPTIONS, LEVEL_OPTIONS, BUDGET_OPTIONS } from '../constants/options'

export interface SearchFilters {
  subject: string
  level: string
  location: string
  budget: string
  schedule: string
}

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void
  compact?: boolean
}

function SearchBar({ onSearch, compact }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    subject: '',
    level: '',
    location: '',
    budget: '',
    schedule: ''
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch?.(filters)
  }

  return (
    <form className={`search-bar${compact ? ' search-bar-compact' : ''}`} onSubmit={handleSubmit}>
      <div className="search-bar-header">
        <h3>Tìm kiếm nhanh</h3>
        <p>Điền thông tin để tìm gia sư hoặc tin đăng phù hợp</p>
      </div>
      <div className="search-bar-row">
        <label>
          <span>Môn học *</span>
          <select
            value={filters.subject}
            onChange={(event) => setFilters((prev) => ({ ...prev, subject: event.target.value }))}
            required
          >
            <option value="">Chọn môn học</option>
            {SUBJECT_OPTIONS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Cấp học *</span>
          <select
            value={filters.level}
            onChange={(event) => setFilters((prev) => ({ ...prev, level: event.target.value }))}
            required
          >
            <option value="">Chọn cấp học</option>
            {LEVEL_OPTIONS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Khu vực</span>
          <input
            type="text"
            placeholder="Nhập địa điểm"
            value={filters.location}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, location: event.target.value }))
            }
          />
        </label>
      </div>
      <div className="search-bar-row">
        <label>
          <span>Học phí</span>
          <select
            value={filters.budget}
            onChange={(event) => setFilters((prev) => ({ ...prev, budget: event.target.value }))}
          >
            <option value="">Tất cả mức giá</option>
            {BUDGET_OPTIONS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Thời gian</span>
          <input
            type="text"
            placeholder="Tối thứ 2, 4, 6"
            value={filters.schedule}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, schedule: event.target.value }))
            }
          />
        </label>
        <button type="submit" className="btn btn-primary search-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Tìm kiếm
        </button>
      </div>
    </form>
  )
}

export default SearchBar
