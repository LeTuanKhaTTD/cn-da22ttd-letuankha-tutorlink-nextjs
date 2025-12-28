import { useState, useEffect } from 'react'
import { SUBJECT_OPTIONS, LEVEL_OPTIONS, MODE_OPTIONS, PRICE_OPTIONS } from '../constants/options'

export interface FilterState {
  subjects: string[]
  levels: string[]
  modes: string[]
  priceRange: string
  location: string
}

interface FilterSidebarProps {
  onApply?: (filters: FilterState) => void
  onReset?: () => void
  initialFilters?: FilterState
  autoApply?: boolean
}

function FilterSidebar({ onApply, onReset, initialFilters, autoApply = false }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters || {
    subjects: [],
    levels: [],
    modes: [],
    priceRange: '',
    location: ''
  })

  // Sync with initialFilters when it changes (only on reset)
  useEffect(() => {
    if (initialFilters && 
        initialFilters.subjects.length === 0 && 
        initialFilters.levels.length === 0 && 
        initialFilters.modes.length === 0 && 
        initialFilters.priceRange === '' && 
        initialFilters.location === '') {
      setFilters(initialFilters)
    }
  }, [initialFilters])

  const toggleValue = (key: 'subjects' | 'levels' | 'modes', value: string) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value)
      const nextValues = exists
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value]
      const newFilters = { ...prev, [key]: nextValues }
      
      // Auto-apply if enabled
      if (autoApply) {
        setTimeout(() => onApply?.(newFilters), 0)
      }
      
      return newFilters
    })
  }

  const handleSelectChange = (key: 'priceRange' | 'location', value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value }
      
      // Auto-apply if enabled (with debounce for text input)
      if (autoApply) {
        if (key === 'location') {
          // Debounce for location input
          clearTimeout((window as any).locationDebounce)
          ;(window as any).locationDebounce = setTimeout(() => {
            onApply?.(newFilters)
          }, 500)
        } else {
          setTimeout(() => onApply?.(newFilters), 0)
        }
      }
      
      return newFilters
    })
  }

  // Calculate active filter count
  const activeFilterCount = 
    filters.subjects.length + 
    filters.levels.length + 
    filters.modes.length + 
    (filters.priceRange ? 1 : 0) + 
    (filters.location ? 1 : 0)

  const handleReset = () => {
    const emptyFilters = { subjects: [], levels: [], modes: [], priceRange: '', location: '' }
    setFilters(emptyFilters)
    onReset?.()
  }

  const resetSection = (key: 'subjects' | 'levels' | 'modes') => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: [] }
      if (autoApply) {
        setTimeout(() => onApply?.(newFilters), 0)
      }
      return newFilters
    })
  }

  return (
    <aside className="filter-sidebar-compact">
      {/* Header */}
      <div className="filter-sidebar-header">
        <h3 className="filter-sidebar-title">
          Bộ lọc
          {activeFilterCount > 0 && (
            <span className="filter-active-count">{activeFilterCount}</span>
          )}
        </h3>
        <button 
          type="button" 
          className="filter-clear-all" 
          onClick={handleReset}
          disabled={activeFilterCount === 0}
          style={{ opacity: activeFilterCount === 0 ? 0.5 : 1 }}
        >
          Xóa lọc
        </button>
      </div>

      <div className="filter-sidebar-body">

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
        <div className="filter-options-list">
          {SUBJECT_OPTIONS.map((subject) => (
            <label key={subject} className="filter-checkbox-item">
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
        <div className="filter-options-list">
          {LEVEL_OPTIONS.map((level) => (
            <label key={level} className="filter-checkbox-item">
              <input
                type="checkbox"
                checked={filters.levels.includes(level)}
                onChange={() => toggleValue('levels', level)}
                className="filter-checkbox-input"
              />
              <span className="filter-checkbox-label">{level}</span>
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
        <div className="filter-chips-list">
          {MODE_OPTIONS.map((mode) => (
            <label key={mode} className="filter-chip-item">
              <input
                type="checkbox"
                checked={filters.modes.includes(mode)}
                onChange={() => toggleValue('modes', mode)}
                className="filter-chip-input"
              />
              <span className="filter-chip-label">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Mức học phí */}
      <div className="filter-section">
        <h4 className="filter-section-title">💰 Mức học phí</h4>
        <select
          value={filters.priceRange}
          onChange={(event) => handleSelectChange('priceRange', event.target.value)}
          className="filter-select"
        >
          <option value="">Tất cả mức giá</option>
          {PRICE_OPTIONS.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      {/* Khu vực */}
      <div className="filter-section">
        <h4 className="filter-section-title">📍 Khu vực</h4>
        <input
          type="text"
          value={filters.location}
          onChange={(event) => handleSelectChange('location', event.target.value)}
          placeholder="VD: Quận 1, TP.HCM..."
          className="filter-input"
        />
      </div>
      </div>

      {/* Apply Button - only show if not auto-apply */}
      {!autoApply && (
        <button
          type="button"
          className="filter-apply-btn"
          onClick={() => onApply?.(filters)}
        >
          Áp dụng lọc
        </button>
      )}
    </aside>
  )
}

export default FilterSidebar
