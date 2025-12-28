/**
 * ============================================
 * USE FETCH HOOK
 * Generic data fetching hook with loading & error states
 * ============================================
 */

import { useState, useEffect, useCallback } from 'react'

interface UseFetchOptions<T> {
  initialData?: T
  autoFetch?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface UseFetchReturn<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useFetch<T = unknown>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions<T> = {}
): UseFetchReturn<T> {
  const { initialData = null, autoFetch = true, onSuccess, onError } = options

  const [data, setData] = useState<T | null>(initialData)
  const [isLoading, setIsLoading] = useState(autoFetch)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchFn()
      setData(result)
      onSuccess?.(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }, [fetchFn, onSuccess, onError])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [autoFetch, fetchData])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  }
}
