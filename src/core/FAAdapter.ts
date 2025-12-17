/**
 * FAAdapter - Bridge between Atomos UI and Formular.dev
 * 
 * This adapter synchronizes state bidirectionally:
 * - Atomos Context → Formular Engine (for validation)
 * - Formular Results → Atomos Context (for UI updates)
 * 
 * Updated to use FormularAgent for real formular.dev integration
 */

import { AtomosAgent, FormularAgent, SyncBridge } from '@/agents'
import { FAField } from '@/types/field.types'

export interface FAAdapterMethods {
  /** Validate a single field */
  validateField(fieldName: string): Promise<boolean>
  
  /** Validate all fields */
  validateAll(): Promise<boolean>
  
  /** Submit form with validation */
  submit(): Promise<FAField[] | null>
  
  /** Get validated data */
  getValidatedData(): Record<string, unknown>
  
  /** Reset form to initial values */
  reset(): void
  
  /** Handle field value change */
  handleChange(fieldName: string, value: unknown): void
  
  /** Handle field blur event */
  handleBlur(fieldName: string): Promise<void>
  
  /** Get field value */
  getFieldValue(fieldName: string): unknown
  
  /** Set field error */
  setFieldError(fieldName: string, error: string): void
  
  /** Clear field error */
  clearFieldError(fieldName: string): void
}

/**
 * Create FA Adapter instance
 * Now powered by FormularAgent + AtomosAgent + SyncBridge
 */
export class FAAdapter implements FAAdapterMethods {
  private fields: FAField[]
  private errors: Record<string, string>
  private touched: Record<string, boolean>
  private onFieldChange: (name: string, value: unknown) => void
  private onFieldBlur: (name: string) => void
  private onErrorChange: (name: string, error: string) => void
  
  // Agent architecture (will be fully implemented when formular.dev is linked)
  private formularAgent: FormularAgent | null = null
  private atomosAgent: AtomosAgent | null = null
  private syncBridge: SyncBridge | null = null

  constructor(
    fields: FAField[],
    callbacks: {
      onFieldChange: (name: string, value: unknown) => void
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
    
    // TODO: Initialize agents when formular.dev is properly linked
    // this.initializeAgents()
  }
  
  /**
   * Initialize the agent architecture
   * This will be called when formular.dev is available
   */
  private async _initializeAgents(): Promise<void> {
    try {
      // Convert FAField[] to IFieldDescriptor[] for FormularAgent
      // const fieldDescriptors = this.convertToFieldDescriptors(this.fields)
      
      // Initialize FormularAgent
      // this.formularAgent = new FormularAgent(
      //   { fields: fieldDescriptors },
      //   {
      //     onFieldChange: this.handleFormularFieldChange.bind(this),
      //     onFieldValidation: this.handleFormularFieldValidation.bind(this),
      //   }
      // )
      // await this.formularAgent.initialize()
      
      // Initialize AtomosAgent
      // this.atomosAgent = new AtomosAgent(
      //   {},
      //   {
      //     onFieldChange: this.handleAtomosFieldChange.bind(this),
      //     onFieldBlur: this.handleAtomosFieldBlur.bind(this),
      //   }
      // )
      // this.atomosAgent.initialize(this.fields.map(f => ({ name: f.name, value: f.value })))
      
      // Initialize SyncBridge
      // this.syncBridge = new SyncBridge(this.formularAgent, this.atomosAgent, { debug: true })
      // this.syncBridge.initialize()
    } catch (error) {
      console.error('Failed to initialize agents:', error)
    }
  }
  
  /**
   * Handle field change from FormularAgent
   */
  private _handleFormularFieldChange(name: string, value: unknown): void {
    this.onFieldChange(name, value);
  }
  
  /**
   * Handle field validation from FormularAgent
   */
  private _handleFormularFieldValidation(name: string, isValid: boolean, errors: string[]): void {
    if (!isValid && errors.length > 0) {
      this.setFieldError(name, errors[0])
    } else {
      this.clearFieldError(name)
    }
  }
  
  /**
   * Handle field change from AtomosAgent
   */
  private _handleAtomosFieldChange(name: string, value: unknown): void {
    // AtomosAgent → FAAdapter
    this.onFieldChange(name, value);
  }
  
  /**
   * Handle field blur from AtomosAgent
   */
  private _handleAtomosFieldBlur(name: string): void {
    this.onFieldBlur(name)
  }

  async validateField(fieldName: string): Promise<boolean> {
    // TODO: Use FormularAgent when available
    // if (this.formularAgent) {
    //   const field = this.formularAgent.getField(fieldName)
    //   // Trigger validation through FormularAgent
    //   return await this.formularAgent.validate()
    // }
    
    // Fallback to basic validation for now
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
    // TODO: Use FormularAgent when available
    // if (this.formularAgent) {
    //   return await this.formularAgent.validate()
    // }
    
    // Fallback to basic validation
    let isValid = true

    for (const field of this.fields) {
      const fieldValid = await this.validateField(field.name)
      if (!fieldValid) {
        isValid = false
      }
    }

    return isValid
  }

  async submit(): Promise<FAField[] | null> {
    console.log('[FAAdapter.submit] Starting submission...')
    console.log('[FAAdapter.submit] Current fields:', this.fields)
    console.log('[FAAdapter.submit] Current errors:', this.errors)
    
    // Fallback to basic validation
    const isValid = await this.validateAll()
    
    console.log('[FAAdapter.submit] Validation result:', isValid)
    
    if (!isValid) {
      console.log('[FAAdapter.submit] Validation failed, returning null')
      return null
    }

    console.log('[FAAdapter.submit] Returning validated fields:', this.fields)
    return this.fields
  }

  getValidatedData(): Record<string, unknown> {
    // TODO: Use FormularAgent when available
    // if (this.formularAgent) {
    //   return this.formularAgent.getData()
    // }
    
    // Fallback
    const data: Record<string, unknown> = {}
    
    for (const field of this.fields) {
      data[field.name] = field.value
    }

    return data
  }

  reset(): void {
    // TODO: Use FormularAgent when available
    // if (this.formularAgent) {
    //   this.formularAgent.reset()
    // }
    
    // Fallback
    this.errors = {}
    this.touched = {}
  }

  handleChange(fieldName: string, value: unknown): void {
    // TODO: Use FormularAgent when available
    // if (this.formularAgent) {
    //   this.formularAgent.setFieldValue(fieldName, value)
    //   return
    // }
    
    // Update field value
    const field = this.fields.find(f => f.name === fieldName)
    if (field) {
      field.value = value
    }
    
    // Fallback
    this.onFieldChange(fieldName, value)
    
    // If field was touched, re-validate on change to clear errors immediately
    if (this.touched[fieldName]) {
      this.validateField(fieldName)
    }
  }

  async handleBlur(fieldName: string): Promise<void> {
    this.touched[fieldName] = true
    this.onFieldBlur(fieldName)
    const isValid = await this.validateField(fieldName)
    
    // Error is already set or cleared in validateField
    // Just ensure state is consistent
    if (isValid && this.errors[fieldName]) {
      this.clearFieldError(fieldName)
    }
  }

  getFieldValue(fieldName: string): unknown {
    // TODO: Use FormularAgent when available
    // if (this.formularAgent) {
    //   return this.formularAgent.getField(fieldName)
    // }
    
    // Fallback
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
  
  /**
   * Cleanup resources
   */
  dispose(): void {
    this.formularAgent?.dispose()
    this.atomosAgent?.dispose()
    this.syncBridge?.dispose()
  }

  private runValidation(field: FAField, value: unknown): string | null {
    const validation = field.validation

    if (!validation) return null

    // Helper to extract value and message from validation rule
    const getRule = <T>(rule: T | { value: T; message: string } | undefined): { value: T | undefined; message?: string } => {
      if (!rule) return { value: undefined }
      if (typeof rule === 'object' && rule !== null && 'value' in rule) {
        return { value: rule.value as T, message: rule.message as string }
      }
      return { value: rule as T }
    }

    // Required validation
    const requiredRule = getRule(validation.required)
    if (requiredRule.value) {
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return requiredRule.message || `${field.label} is required`
      }
    }

    // Skip other validations if empty and not required
    if (!value && !requiredRule.value) {
      return null
    }

    // Email validation
    if (validation.email) {
      const emailRule = getRule(validation.email)
      if (emailRule.value && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return emailRule.message || `${field.label} must be a valid email address`
        }
      }
    }

    // String validations
    if (typeof value === 'string') {
      const minLengthRule = getRule(validation.minLength)
      if (minLengthRule.value && value.length < minLengthRule.value) {
        return minLengthRule.message || `${field.label} must be at least ${minLengthRule.value} characters`
      }

      const maxLengthRule = getRule(validation.maxLength)
      if (maxLengthRule.value && value.length > maxLengthRule.value) {
        return maxLengthRule.message || `${field.label} must be no more than ${maxLengthRule.value} characters`
      }

      if (validation.pattern) {
        let patternValue: string | RegExp | undefined
        let patternMessage: string | undefined
        
        if (validation.pattern instanceof RegExp) {
          patternValue = validation.pattern
        } else if (typeof validation.pattern === 'object' && 'value' in validation.pattern) {
          patternValue = validation.pattern.value
          patternMessage = validation.pattern.message
        } else {
          return null
        }

        let regex: RegExp
        if (typeof patternValue === 'string') {
          regex = new RegExp(patternValue)
        } else if (patternValue instanceof RegExp) {
          regex = patternValue
        } else {
          return null
        }
        
        if (!regex.test(value)) {
          return patternMessage || validation.error || `${field.label} format is invalid`
        }
      }
    }

    // Number validations
    if (typeof value === 'number') {
      const minRule = getRule(validation.min)
      if (minRule.value !== undefined && value < minRule.value) {
        return minRule.message || `${field.label} must be at least ${minRule.value}`
      }

      const maxRule = getRule(validation.max)
      if (maxRule.value !== undefined && value > maxRule.value) {
        return maxRule.message || `${field.label} must be no more than ${maxRule.value}`
      }
    }

    // Formular validators would be integrated here
    // For now, returning null as placeholder
    return null
  }
}
