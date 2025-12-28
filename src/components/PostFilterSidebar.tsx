import { useState } from 'react'
import { SUBJECT_OPTIONS, LEVEL_OPTIONS, MODE_OPTIONS, BUDGET_OPTIONS } from '../constants/options'

export interface PostFilterState {
  subjects: string[]
  levels: string[]
  modes: string[]
  budgetRange: string
  location: string
  status: string
}

interface PostFilterSidebarProps {
  onApply?: (filters: PostFilterState) => void
  onReset?: () => void
  initialFilters?: PostFilterState
}

const STATUS_OPTIONS = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'open', label: 'Đang tuyển' },
  { value: 'filled', label: 'Đã có gia sư' },
  { value: 'closed', label: 'Đã đóng' }
]

const LOCATION_SUGGESTIONS = [
  'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5',
  'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10',
  'Quận 11', 'Quận 12', 'Thủ Đức', 'Bình Thạnh', 'Gò Vấp',
  'Phú Nhuận', 'Tân Bình', 'Tân Phú', 'Bình Tân'
]

function PostFilterSidebar({ onApply, onReset, initialFilters }: PostFilterSidebarProps) {
  const [filters, setFilters] = useState<PostFilterState>(initialFilters || {
    subjects: [],
    levels: [],
    modes: [],
    budgetRange: '',
    location: '',
    status: ''
  })

  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)

  const toggleValue = (key: 'subjects' | 'levels' | 'modes', value: string) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value)
      const nextValues = exists
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value]
      return { ...prev, [key]: nextValues }
    })
  }

  const handleReset = () => {
    const resetFilters = {
      subjects: [],
      levels: [],
      modes: [],
      budgetRange: '',
      location: '',
      status: ''
    }
    setFilters(resetFilters)
    onReset?.()
  }

  const resetSection = (key: 'subjects' | 'levels' | 'modes') => {
    setFilters(prev => ({ ...prev, [key]: [] }))
  }

  const handleApply = () => {
    onApply?.(filters)
  }

  const getActiveFiltersCount = () => {
    return (
      filters.subjects.length +
      filters.levels.length +
      filters.modes.length +
      (filters.budgetRange ? 1 : 0) +
      (filters.location ? 1 : 0) +
      (filters.status ? 1 : 0)
    )
  }

  const activeCount = getActiveFiltersCount()

  return (
    <aside className="post-filter-sidebar">
      {/* Header */}
      <div className="filter-sidebar-header">
        <div className="filter-header-content">
          <h3 className="filter-sidebar-title">
            🎯 Bộ lọc
            {activeCount > 0 && (
              <span className="filter-badge">{activeCount}</span>
            )}
          </h3>
          <button type="button" className="filter-clear-all" onClick={handleReset}>
            Xóa tất cả
          </button>
        </div>
      </div>

      <div className="filter-sidebar-body">
        {/* Trạng thái */}
        <div className="filter-section">
          <h4 className="filter-section-title">📋 Trạng thái</h4>
          <div className="filter-status-chips">
            {STATUS_OPTIONS.map((status) => (
              <label key={status.value} className="filter-status-chip">
                <input
                  type="radio"
                  name="status"
                  value={status.value}
                  checked={filters.status === status.value}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="filter-radio-input"
                />
                <span className="filter-status-label">{status.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Môn học */}
        <div className="filter-section">
          <div className="filter-section-header">
            <h4 className="filter-section-title">📚 Môn học</h4>
            {filters.subjects.length > 0 && (
              <button 
                type="button" 
                className="filter-section-reset"
                onClick={() => resetSection('subjects')}
              >
                Đặt lại
              </button>
            )}
          </div>
          <div className="filter-grid-list">
            {SUBJECT_OPTIONS.map((subject) => (
              <label key={subject} className="filter-checkbox-card">
                <input
                  type="checkbox"
                  checked={filters.subjects.includes(subject)}
                  onChange={() => toggleValue('subjects', subject)}
                  className="filter-checkbox-input"
                />
                <span className="filter-checkbox-label">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cấp học */}
        <div className="filter-section">
          <div className="filter-section-header">
            <h4 className="filter-section-title">🎓 Cấp học</h4>
            {filters.levels.length > 0 && (
              <button 
                type="button" 
                className="filter-section-reset"
                onClick={() => resetSection('levels')}
              >
                Đặt lại
              </button>
            )}
          </div>
          <div className="filter-chips-list">
            {LEVEL_OPTIONS.map((level) => (
              <label key={level} className="filter-chip-item">
                <input
                  type="checkbox"
                  checked={filters.levels.includes(level)}
                  onChange={() => toggleValue('levels', level)}
                  className="filter-chip-input"
                />
                <span className="filter-chip-label">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hình thức */}
        <div className="filter-section">
          <div className="filter-section-header">
            <h4 className="filter-section-title">💻 Hình thức</h4>
            {filters.modes.length > 0 && (
              <button 
                type="button" 
                className="filter-section-reset"
                onClick={() => resetSection('modes')}
              >
                Đặt lại
              </button>
            )}
          </div>
          <div className="filter-mode-buttons">
            {MODE_OPTIONS.map((mode) => (
              <label key={mode} className="filter-mode-button">
                <input
                  type="checkbox"
                  checked={filters.modes.includes(mode)}
                  onChange={() => toggleValue('modes', mode)}
                  className="filter-mode-input"
                />
                <span className="filter-mode-text">
                  {mode === 'Online' && '🌐'}
                  {mode === 'Offline' && '🏠'}
                  {mode === 'Kết hợp' && '🔄'}
                  {' '}{mode}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Học phí */}
        <div className="filter-section">
          <h4 className="filter-section-title">💰 Mức học phí</h4>
          <div className="filter-budget-options">
            {BUDGET_OPTIONS.map((budget) => (
              <label key={budget} className="filter-budget-item">
                <input
                  type="radio"
                  name="budget"
                  value={budget}
                  checked={filters.budgetRange === budget}
                  onChange={(e) => setFilters(prev => ({ ...prev, budgetRange: e.target.value }))}
                  className="filter-radio-input"
                />
                <span className="filter-budget-label">{budget}/buổi</span>
              </label>
            ))}
            {filters.budgetRange && (
              <button 
                type="button" 
                className="filter-budget-clear"
                onClick={() => setFilters(prev => ({ ...prev, budgetRange: '' }))}
              >
                ✕ Bỏ chọn
              </button>
            )}
          </div>
        </div>

        {/* Khu vực */}
        <div className="filter-section filter-section-last">
          <h4 className="filter-section-title">📍 Khu vực</h4>
          <div className="filter-location-wrapper">
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
              placeholder="Nhập khu vực (VD: Quận 1, Thủ Đức...)"
              className="filter-input filter-location-input"
            />
            {showLocationSuggestions && (
              <div className="filter-location-suggestions">
                {LOCATION_SUGGESTIONS.filter(loc => 
                  !filters.location || loc.toLowerCase().includes(filters.location.toLowerCase())
                ).slice(0, 8).map((location) => (
                  <button
                    key={location}
                    type="button"
                    className="filter-location-suggestion"
                    onMouseDown={() => setFilters(prev => ({ ...prev, location }))}
                  >
                    📍 {location}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="filter-sidebar-footer">
        <button
          type="button"
          className="filter-apply-btn"
          onClick={handleApply}
        >
          <span className="filter-apply-icon">✓</span>
          Áp dụng {activeCount > 0 && `(${activeCount})`}
        </button>
      </div>
    </aside>
  )
}

export default PostFilterSidebar
