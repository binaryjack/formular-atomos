import { describe, expect, it } from 'vitest'
import { FAField } from '../../types/field.types'
import { FAAdapter } from '../FAAdapter'

describe('FAAdapter', () => {
  describe('Field Validation', () => {
    it('should validate required text field', () => {
      const fields: FAField[] = [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true
        }
      ]
      const adapter = new FAAdapter(fields)

      const result = adapter.validateField('username', '')
      expect(result).toBe('Username is required')
    })

    it('should validate minimum length', () => {
      const fields: FAField[] = [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true,
          validation: {
            formular: { minLength: 3 }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      const result = adapter.validateField('username', 'ab')
      expect(result).toBe('Username must be at least 3 characters')
    })

    it('should validate maximum length', () => {
      const fields: FAField[] = [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true,
          validation: {
            formular: { maxLength: 10 }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      const result = adapter.validateField('username', 'verylongusername')
      expect(result).toBe('Username must be at most 10 characters')
    })

    it('should validate email format', () => {
      const fields: FAField[] = [
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          required: true,
          validation: {
            formular: { email: true }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      expect(adapter.validateField('email', 'invalid')).toBe('Email must be a valid email address')
      expect(adapter.validateField('email', 'valid@example.com')).toBeNull()
    })

    it('should validate number range', () => {
      const fields: FAField[] = [
        {
          id: 'age',
          type: 'number',
          label: 'Age',
          required: true,
          validation: {
            formular: { min: 18, max: 120 }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      expect(adapter.validateField('age', '15')).toBe('Age must be at least 18')
      expect(adapter.validateField('age', '150')).toBe('Age must be at most 120')
      expect(adapter.validateField('age', '25')).toBeNull()
    })
  })

  describe('Password Strength Validation', () => {
    it('should validate medium password strength', () => {
      const fields: FAField[] = [
        {
          id: 'password',
          type: 'password',
          label: 'Password',
          required: true,
          strength: 'medium',
          validation: {
            formular: { minLength: 8 }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      expect(adapter.validateField('password', 'weak')).toBe('Password must be at least 8 characters')
      expect(adapter.validateField('password', 'StrongPass1')).toBeNull()
    })

    it('should validate strong password strength', () => {
      const fields: FAField[] = [
        {
          id: 'password',
          type: 'password',
          label: 'Password',
          required: true,
          strength: 'strong',
          validation: {
            formular: { minLength: 12 }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      expect(adapter.validateField('password', 'weakpass')).toBe('Password must be at least 12 characters')
      expect(adapter.validateField('password', 'VeryStrong123!@#')).toBeNull()
    })
  })

  describe('Phone Number Validation', () => {
    it('should validate US phone numbers', () => {
      const fields: FAField[] = [
        {
          id: 'phone',
          type: 'phone',
          label: 'Phone',
          required: true,
          country: 'US',
          validation: {
            formular: { phone: 'US' }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      expect(adapter.validateField('phone', '123')).toBe('Phone must be a valid US phone number')
      expect(adapter.validateField('phone', '555-123-4567')).toBeNull()
    })

    it('should validate UK phone numbers', () => {
      const fields: FAField[] = [
        {
          id: 'phone',
          type: 'phone',
          label: 'Phone',
          required: true,
          country: 'UK',
          validation: {
            formular: { phone: 'UK' }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      expect(adapter.validateField('phone', '123')).toBe('Phone must be a valid UK phone number')
      expect(adapter.validateField('phone', '+44 20 1234 5678')).toBeNull()
    })
  })

  describe('Postal Code Validation', () => {
    it('should validate US postal codes', () => {
      const fields: FAField[] = [
        {
          id: 'postal',
          type: 'postal',
          label: 'Postal Code',
          required: true,
          country: 'US',
          validation: {
            formular: { postalCode: 'US' }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      expect(adapter.validateField('postal', 'ABC')).toBe('Postal Code must be a valid US postal code')
      expect(adapter.validateField('postal', '12345')).toBeNull()
      expect(adapter.validateField('postal', '12345-6789')).toBeNull()
    })

    it('should validate Canadian postal codes', () => {
      const fields: FAField[] = [
        {
          id: 'postal',
          type: 'postal',
          label: 'Postal Code',
          required: true,
          country: 'CA',
          validation: {
            formular: { postalCode: 'CA' }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      expect(adapter.validateField('postal', '12345')).toBe('Postal Code must be a valid CA postal code')
      expect(adapter.validateField('postal', 'K1A 0B1')).toBeNull()
    })
  })

  describe('Form Validation', () => {
    it('should validate all fields at once', () => {
      const fields: FAField[] = [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true,
          validation: {
            formular: { minLength: 3 }
          }
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          required: true,
          validation: {
            formular: { email: true }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      const errors = adapter.validateAll({ username: 'ab', email: 'invalid' })
      expect(errors).toHaveProperty('username', 'Username must be at least 3 characters')
      expect(errors).toHaveProperty('email', 'Email must be a valid email address')
    })

    it('should return empty object when all validations pass', () => {
      const fields: FAField[] = [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true,
          validation: {
            formular: { minLength: 3 }
          }
        }
      ]
      const adapter = new FAAdapter(fields)

      const errors = adapter.validateAll({ username: 'validuser' })
      expect(errors).toEqual({})
    })
  })

  describe('Form Submission', () => {
    it('should call onSubmit when validation passes', () => {
      let submitted = false
      const onSubmit = () => {
        submitted = true
      }

      const fields: FAField[] = [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true
        }
      ]
      const adapter = new FAAdapter(fields, { onSubmit })

      const result = adapter.submit({ username: 'test' })
      expect(result).toBe(true)
      expect(submitted).toBe(true)
    })

    it('should not call onSubmit when validation fails', () => {
      let submitted = false
      const onSubmit = () => {
        submitted = true
      }

      const fields: FAField[] = [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true
        }
      ]
      const adapter = new FAAdapter(fields, { onSubmit })

      const result = adapter.submit({ username: '' })
      expect(result).toBe(false)
      expect(submitted).toBe(false)
    })
  })

  describe('Form Reset', () => {
    it('should provide reset functionality', () => {
      const fields: FAField[] = [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true
        }
      ]
      const adapter = new FAAdapter(fields)

      // Should not throw
      expect(() => adapter.reset()).not.toThrow()
    })
  })
})
