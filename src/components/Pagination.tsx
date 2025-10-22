interface PaginationProps {
  currentPage: number
  totalPages: number
  onChange?: (page: number) => void
}

function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="pagination">
      <button
        type="button"
        className="btn btn-ghost"
        disabled={currentPage === 1}
        onClick={() => onChange?.(currentPage - 1)}
      >
        Trước
      </button>
      <div className="pagination-pages">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`page-btn${page === currentPage ? ' active' : ''}`}
            onClick={() => onChange?.(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-ghost"
        disabled={currentPage === totalPages}
        onClick={() => onChange?.(currentPage + 1)}
      >
        Tiếp
      </button>
    </div>
  )
}

export default Pagination
