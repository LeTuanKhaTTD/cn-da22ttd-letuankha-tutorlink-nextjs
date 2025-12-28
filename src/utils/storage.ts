/**
 * ============================================
 * STORAGE UTILITIES
 * LocalStorage wrapper với type safety
 * ============================================
 */

/**
 * Set item to localStorage
 */
export function setItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value)
    localStorage.setItem(key, serialized)
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
  }
}

/**
 * Get item from localStorage
 */
export function getItem<T>(key: string): T | null {
  try {
    const serialized = localStorage.getItem(key)
    if (serialized === null) return null
    return JSON.parse(serialized) as T
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return null
  }
}

/**
 * Remove item from localStorage
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
  }
}

/**
 * Clear all items from localStorage
 */
export function clear(): void {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

/**
 * Check if key exists in localStorage
 */
export function hasItem(key: string): boolean {
  return localStorage.getItem(key) !== null
}

/**
 * Get all keys from localStorage
 */
export function getAllKeys(): string[] {
  try {
    return Object.keys(localStorage)
  } catch (error) {
    console.error('Error getting localStorage keys:', error)
    return []
  }
}
