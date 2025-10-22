import { useState } from 'react'

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
}

const SUBJECT_OPTIONS = ['Toán', 'Lý', 'Hóa', 'Tiếng Anh', 'Lập trình']
const LEVEL_OPTIONS = ['Tiểu học', 'THCS', 'THPT', 'Đại học']
const MODE_OPTIONS = ['Online', 'Offline', 'Kết hợp']
const PRICE_OPTIONS = ['< 200k', '200k - 300k', '300k - 400k', '> 400k']

function FilterSidebar({ onApply, onReset }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    subjects: [],
    levels: [],
    modes: [],
    priceRange: '',
    location: ''
  })

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
    setFilters({ subjects: [], levels: [], modes: [], priceRange: '', location: '' })
    onReset?.()
  }

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Bộ lọc</h3>
        <button type="button" className="btn btn-ghost" onClick={handleReset}>
          Đặt lại
        </button>
      </div>
      <div className="filter-group">
        <h4>Môn học</h4>
        <div className="filter-options">
          {SUBJECT_OPTIONS.map((subject) => (
            <label key={subject} className="checkbox">
              <input
                type="checkbox"
                checked={filters.subjects.includes(subject)}
                onChange={() => toggleValue('subjects', subject)}
              />
              <span>{subject}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <h4>Cấp học</h4>
        <div className="filter-options">
          {LEVEL_OPTIONS.map((level) => (
            <label key={level} className="checkbox">
              <input
                type="checkbox"
                checked={filters.levels.includes(level)}
                onChange={() => toggleValue('levels', level)}
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <h4>Hình thức</h4>
        <div className="filter-options inline">
          {MODE_OPTIONS.map((mode) => (
            <label key={mode} className="chip">
              <input
                type="checkbox"
                checked={filters.modes.includes(mode)}
                onChange={() => toggleValue('modes', mode)}
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <h4>Mức học phí</h4>
        <select
          value={filters.priceRange}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, priceRange: event.target.value }))
          }
        >
          <option value="">Tất cả</option>
          {PRICE_OPTIONS.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <h4>Khu vực</h4>
        <input
          type="text"
          value={filters.location}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, location: event.target.value }))
          }
          placeholder="Ví dụ: Quận 1"
        />
      </div>
      <button
        type="button"
        className="btn btn-primary w-full"
        onClick={() => onApply?.(filters)}
      >
        Áp dụng lọc
      </button>
    </aside>
  )
}

export default FilterSidebar
