/**
 * ============================================
 * USE FORM HOOK
 * Handle form state and validation
 * ============================================
 */

import { useState, useCallback } from 'react'

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined
}

interface UseFormOptions<T> {
  initialValues: T
  validationRules?: ValidationRules<T>
  onSubmit: (values: T) => void | Promise<void>
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }))

    // Validate on blur
    const validationFn = validationRules[name]
    if (validationFn) {
      const error = validationFn(values[name])
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [values, validationRules])

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    Object.keys(validationRules).forEach(key => {
      const name = key as keyof T
      const validationFn = validationRules[name]
      if (validationFn) {
        const error = validationFn(values[name])
        if (error) {
          newErrors[name] = error
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, validationRules])

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } finally {
      setIsSubmitting(false)
    }
  }, [validate, onSubmit, values])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    handleChange(name, value)
  }, [handleChange])

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    validate,
  }
}
