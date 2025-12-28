/**
 * ============================================
 * USE PAGINATION HOOK
 * Handle pagination logic
 * ============================================
 */

import { useState } from 'react'
import { DEFAULT_PAGE_SIZE } from '@/config'

interface UsePaginationOptions {
  initialPage?: number
  initialPageSize?: number
}

interface UsePaginationReturn {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  nextPage: () => void
  prevPage: () => void
  resetPage: () => void
}

export function usePagination(
  options: UsePaginationOptions = {}
): UsePaginationReturn {
  const { initialPage = 1, initialPageSize = DEFAULT_PAGE_SIZE } = options

  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const nextPage = () => setPage(prev => prev + 1)
  const prevPage = () => setPage(prev => Math.max(1, prev - 1))
  const resetPage = () => setPage(initialPage)

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    resetPage,
  }
}
