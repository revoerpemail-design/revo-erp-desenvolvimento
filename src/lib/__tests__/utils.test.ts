import { describe, it, expect } from 'vitest'
import { cn, formatCurrency } from '../utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
      expect(cn('px-4', 'px-2')).toBe('px-2')
    })
  })

  describe('formatCurrency', () => {
    it('should format currency in Brazilian Real', () => {
      expect(formatCurrency(1234.56)).toBe('R$ 1.234,56')
      expect(formatCurrency(0)).toBe('R$ 0,00')
      expect(formatCurrency(999.99)).toBe('R$ 999,99')
    })
  })
})
