/**
 * FAAdapter - Bridge between Atomos UI and Formular.dev
 * 
 * This adapter synchronizes state bidirectionally:
 * - Atomos Context → Formular Engine (for validation)
 * - Formular Results → Atomos Context (for UI updates)
 */

import { FAField } from '@/types/field.types'

export interface FAAdapterMethods {
  /** Validate a single field */
  validateField(fieldName: string): Promise<boolean>
  
  /** Validate all fields */
  validateAll(): Promise<boolean>
  
  /** Submit form with validation */
  submit(): Promise<any | null>
  
  /** Get validated data */
  getValidatedData(): any
  
  /** Reset form to initial values */
  reset(): void
  
  /** Handle field value change */
  handleChange(fieldName: string, value: any): void
  
  /** Handle field blur event */
  handleBlur(fieldName: string): Promise<void>
  
  /** Get field value */
  getFieldValue(fieldName: string): any
  
  /** Set field error */
  setFieldError(fieldName: string, error: string): void
  
  /** Clear field error */
  clearFieldError(fieldName: string): void
}

/**
 * Create FA Adapter instance
 */
export class FAAdapter implements FAAdapterMethods {
  private fields: FAField[]
  private errors: Record<string, string>
  private touched: Record<string, boolean>
  private onFieldChange: (name: string, value: any) => void
  private onFieldBlur: (name: string) => void
  private onErrorChange: (name: string, error: string) => void

  constructor(
    fields: FAField[],
    callbacks: {
      onFieldChange: (name: string, value: any) => void
      onFieldBlur: (name: string) => void
      onErrorChange: (name: string, error: string) => void
    }
  ) {
    this.fields = fields
    this.errors = {}
    this.touched = {}
    this.onFieldChange = callbacks.onFieldChange
    this.onFieldBlur = callbacks.onFieldBlur
    this.onErrorChange = callbacks.onErrorChange
  }

  async validateField(fieldName: string): Promise<boolean> {
    const field = this.fields.find((f) => f.name === fieldName)
    if (!field) return false

    // Get current value
    const value = field.value

    // Run validation
    const error = this.runValidation(field, value)
    
    if (error) {
      this.setFieldError(fieldName, error)
      return false
    } else {
      this.clearFieldError(fieldName)
      return true
    }
  }

  async validateAll(): Promise<boolean> {
    let isValid = true

    for (const field of this.fields) {
      const fieldValid = await this.validateField(field.name)
      if (!fieldValid) {
        isValid = false
      }
    }

    return isValid
  }

  async submit(): Promise<any | null> {
    const isValid = await this.validateAll()
    
    if (!isValid) {
      return null
    }

    return this.getValidatedData()
  }

  getValidatedData(): any {
    const data: any = {}
    
    for (const field of this.fields) {
      data[field.name] = field.value
    }

    return data
  }

  reset(): void {
    this.errors = {}
    this.touched = {}
  }

  handleChange(fieldName: string, value: any): void {
    this.onFieldChange(fieldName, value)
  }

  async handleBlur(fieldName: string): Promise<void> {
    this.touched[fieldName] = true
    this.onFieldBlur(fieldName)
    await this.validateField(fieldName)
  }

  getFieldValue(fieldName: string): any {
    const field = this.fields.find((f) => f.name === fieldName)
    return field?.value
  }

  setFieldError(fieldName: string, error: string): void {
    this.errors[fieldName] = error
    this.onErrorChange(fieldName, error)
  }

  clearFieldError(fieldName: string): void {
    delete this.errors[fieldName]
    this.onErrorChange(fieldName, '')
  }

  private runValidation(field: FAField, value: any): string | null {
    const validation = field.validation

    if (!validation) return null

    // Required validation
    if (validation.required) {
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return `${field.label} is required`
      }
    }

    // Skip other validations if empty and not required
    if (!value && !validation.required) {
      return null
    }

    // String validations
    if (typeof value === 'string') {
      if (validation.minLength && value.length < validation.minLength) {
        return `${field.label} must be at least ${validation.minLength} characters`
      }
      if (validation.maxLength && value.length > validation.maxLength) {
        return `${field.label} must be no more than ${validation.maxLength} characters`
      }
      if (validation.pattern && !validation.pattern.test(value)) {
        return validation.error || `${field.label} format is invalid`
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (validation.min !== undefined && value < validation.min) {
        return `${field.label} must be at least ${validation.min}`
      }
      if (validation.max !== undefined && value > validation.max) {
        return `${field.label} must be no more than ${validation.max}`
      }
    }

    // Formular validators would be integrated here
    // For now, returning null as placeholder
    return null
  }
}
