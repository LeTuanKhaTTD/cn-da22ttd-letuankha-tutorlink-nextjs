/**
 * ============================================
 * NOTIFICATION CONTEXT
 * Toast notification system
 * ============================================
 */

import { createContext, useContext, useState, useCallback } from 'react'
import type { Toast } from '@/types'
import { TOAST_DURATION } from '@/config'

interface NotificationContextType {
  toasts: Toast[]
  showToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const newToast: Toast = { id, message, type }

    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, TOAST_DURATION)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <NotificationContext.Provider value={{ toasts, showToast, removeToast, clearToasts }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
