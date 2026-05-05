# formular-atomos Implementation Plan

## Project Architecture

```
formular-atomos/
├── src/
│   ├── agents/
│   │   ├── FormularAgent.ts          # Formular.dev integration
│   │   ├── AtomosAgent.ts            # Atomos.dev integration
│   │   └── SyncBridge.ts             # Bidirectional sync
│   ├── api/
│   │   ├── FormularAtomosForm.tsx    # Main form component
│   │   └── useFormularAtomosForm.ts  # React hook API
│   ├── types/
│   │   └── index.ts                  # Re-export Formular types
│   └── index.ts                      # Public API
├── demo/
│   ├── app.tsx                       # Demo application
│   ├── examples/
│   │   ├── SimpleForm.tsx
│   │   ├── MultiStepForm.tsx
│   │   └── DynamicForm.tsx
│   └── index.html
└── package.json
```

---

## Agent 1: FormularAgent

**Responsibility**: Manage all form logic using formular.dev

### Core Methods

```typescript
interface IFormularAgent {
  // Initialization
  initialize(descriptors: IFieldDescriptor[]): Promise<void>
  
  // Form Operations (delegate to Formular)
  getData<T>(): T
  validate(): Promise<boolean>
  submit(): Promise<any | null>
  reset(): void
  
  // Field Operations
  getField(name: string): IExtendedInput | undefined
  setFieldValue(name: string, value: any): void
  
  // State Queries
  isDirty(): boolean
  isValid(): boolean
  isBusy(): boolean
  
  // Event Subscription (for sync)
  onFieldChange(callback: (fieldName: string, value: any) => void): void
  onValidationChange(callback: (fieldName: string, isValid: boolean, errors: string[]) => void): void
  onStateChange(callback: (state: { isDirty: boolean, isValid: boolean, isBusy: boolean }) => void): void
  
  // Cleanup
  dispose(): void
}
```

### Implementation Details

```typescript
export class FormularAgent implements IFormularAgent {
  private serviceManager: IServiceManager
  private formularManager: IFormularManager
  private formInstance: IFormular<any>
  private formId: string
  
  // Event callbacks for sync
  private fieldChangeCallbacks: Array<(fieldName: string, value: any) => void> = []
  private validationChangeCallbacks: Array<(fieldName: string, isValid: boolean, errors: string[]) => void> = []
  private stateChangeCallbacks: Array<(state: any) => void> = []
  
  constructor() {
    // Initialize ServiceManager with full Formular setup
    this.serviceManager = ServiceManagerFactory.create({
      includeCoreManagers: true,
      includeFormularManager: true,
      includeInputEngine: true,
      includeBaseConfigurations: true
    })
    
    // Get FormularManager from DI container
    this.formularManager = this.serviceManager.lazy<IFormularManager>(SFormularManager)!()
    
    this.formId = `form-${Date.now()}`
  }
  
  async initialize(descriptors: IFieldDescriptor[]): Promise<void> {
    // Create form using Formular's createFromDescriptors
    this.formInstance = this.formularManager.createFromDescriptors(this.formId, descriptors)!
    
    // Set up validation triggers
    this.formInstance.setTriggerKeyWord(['onChange', 'onBlur'])
    
    // Subscribe to Formular events
    this.setupFormularEventListeners()
  }
  
  private setupFormularEventListeners(): void {
    // Listen to field changes from Formular
    this.formInstance.fields.forEach(field => {
      // When Formular field changes, notify sync bridge
      field.input.notificationManager.observers.subscribe((data: IEvents) => {
        if (data.eventType === 'onChange') {
          const value = field.input.valueManager.getValue(field)
          this.fieldChangeCallbacks.forEach(cb => cb(field.input.name, value))
        }
        
        if (data.eventType === 'onValidate') {
          const isValid = field.input.isValid
          const errors = field.input.errors.map(e => e.message)
          this.validationChangeCallbacks.forEach(cb => cb(field.input.name, isValid, errors))
        }
      })
    })
    
    // Listen to form state changes
    this.formInstance.hasChanges(() => {
      const state = this.formInstance.getFormFlags()
      this.stateChangeCallbacks.forEach(cb => cb(state))
    })
  }
  
  getData<T>(): T {
    return this.formularManager.getData<T>(this.formId)!
  }
  
  async validate(): Promise<boolean> {
    return await this.formularManager.validate(this.formId)
  }
  
  async submit(): Promise<any | null> {
    return await this.formInstance.submit()
  }
  
  reset(): void {
    // Reset all fields to original values
    this.formInstance.fields.forEach(field => {
      const originalField = this.formInstance.originFields.find(f => f.input.id === field.input.id)
      if (originalField) {
        field.input.valueManager.setValue(field, originalField.input.defaultValue)
      }
    })
    this.formInstance.checkChanges()
  }
  
  getField(name: string): IExtendedInput | undefined {
    return this.formInstance.getField(name)
  }
  
  setFieldValue(name: string, value: any): void {
    const field = this.getField(name)
    if (field) {
      field.input.valueManager.setValue(field, value)
      // Trigger validation
      field.input.validationManager.validate(field)
    }
  }
  
  isDirty(): boolean {
    return this.formInstance.isDirty
  }
  
  isValid(): boolean {
    return this.formInstance.isValid
  }
  
  isBusy(): boolean {
    return this.formInstance.isBusy
  }
  
  // Event subscription for sync
  onFieldChange(callback: (fieldName: string, value: any) => void): void {
    this.fieldChangeCallbacks.push(callback)
  }
  
  onValidationChange(callback: (fieldName: string, isValid: boolean, errors: string[]) => void): void {
    this.validationChangeCallbacks.push(callback)
  }
  
  onStateChange(callback: (state: any) => void): void {
    this.stateChangeCallbacks.push(callback)
  }
  
  dispose(): void {
    // Clean up Formular resources
    this.formularManager.clear(this.formInstance)
    this.serviceManager.dispose()
  }
}
```

---

## Agent 2: AtomosAgent

**Responsibility**: Render UI using atomos.dev components

### Core Methods

```typescript
interface IAtomosAgent {
  // Initialization
  initialize(descriptors: IFieldDescriptor[]): void
  
  // UI State Management
  updateFieldValue(name: string, value: any): void
  updateFieldError(name: string, errors: string[]): void
  updateFieldTouched(name: string, touched: boolean): void
  
  // Get Atomos state
  getFormState(): FormState
  
  // Render
  renderFields(): JSX.Element[]
  
  // Event handlers (to notify FormularAgent)
  onFieldChange(callback: (fieldName: string, value: any) => void): void
  onFieldBlur(callback: (fieldName: string) => void): void
}
```

### Implementation Details

```typescript
export class AtomosAgent implements IAtomosAgent {
  private formState: FormState
  private formContext: FormContextValue
  
  // Event callbacks for sync
  private fieldChangeCallbacks: Array<(fieldName: string, value: any) => void> = []
  private fieldBlurCallbacks: Array<(fieldName: string) => void> = []
  
  initialize(descriptors: IFieldDescriptor[]): void {
    // Convert Formular IFieldDescriptor to Atomos FormField
    const atomosFields: FormField[] = descriptors.map(desc => ({
      name: desc.name,
      value: desc.value || desc.defaultValue || '',
      label: desc.label,
      type: this.mapFieldType(desc.type),
      validation: this.mapValidation(desc.validationOptions),
      options: desc.options?.map(opt => ({
        value: opt.value,
        label: opt.label
      })),
      isValid: desc.isValid,
      touched: false,
      error: ''
    }))
    
    // Initialize Atomos FormProvider state
    this.formState = {
      originalData: atomosFields.reduce((acc, field) => {
        acc[field.name] = field.value
        return acc
      }, {} as Record<string, any>),
      data: atomosFields.reduce((acc, field) => {
        acc[field.name] = field.value
        return acc
      }, {} as Record<string, any>),
      fields: atomosFields,
      isValid: true,
      isLoading: false
    }
  }
  
  private mapFieldType(formularType: string): 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' {
    // Map Formular input types to Atomos types
    const typeMap: Record<string, any> = {
      'email': 'email',
      'text': 'text',
      'password': 'password',
      'number': 'number',
      'select': 'select',
      'textarea': 'textarea',
      'checkbox': 'checkbox'
    }
    return typeMap[formularType] || 'text'
  }
  
  private mapValidation(formularValidation?: IValidationOptions): any {
    if (!formularValidation) return {}
    
    return {
      required: formularValidation.required?.value,
      minLength: formularValidation.minLength?.value,
      maxLength: formularValidation.maxLength?.value,
      min: formularValidation.min?.value,
      max: formularValidation.max?.value,
      pattern: formularValidation.pattern?.value
    }
  }
  
  updateFieldValue(name: string, value: any): void {
    const field = this.formState.fields.find(f => f.name === name)
    if (field) {
      field.value = value
      this.formState.data[name] = value
    }
  }
  
  updateFieldError(name: string, errors: string[]): void {
    const field = this.formState.fields.find(f => f.name === name)
    if (field) {
      field.error = errors[0] || ''
      field.isValid = errors.length === 0
    }
  }
  
  updateFieldTouched(name: string, touched: boolean): void {
    const field = this.formState.fields.find(f => f.name === name)
    if (field) {
      field.touched = touched
    }
  }
  
  getFormState(): FormState {
    return this.formState
  }
  
  handleChange = (fieldName: string, value: any) => {
    this.updateFieldValue(fieldName, value)
    // Notify FormularAgent
    this.fieldChangeCallbacks.forEach(cb => cb(fieldName, value))
  }
  
  handleBlur = (fieldName: string) => {
    this.updateFieldTouched(fieldName, true)
    // Notify FormularAgent
    this.fieldBlurCallbacks.forEach(cb => cb(fieldName))
  }
  
  renderFields(): JSX.Element[] {
    return this.formState.fields.map(field => {
      switch (field.type) {
        case 'select':
          return (
            <FormSelect
              key={field.name}
              id={field.name}
              label={field.label}
              value={field.value}
              onChange={(e) => this.handleChange(field.name, e.target.value)}
              onBlur={() => this.handleBlur(field.name)}
              error={field.touched ? field.error : ''}
            >
              {field.options?.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </FormSelect>
          )
        
        case 'textarea':
          return (
            <FormTextarea
              key={field.name}
              id={field.name}
              label={field.label}
              value={field.value}
              onChange={(e) => this.handleChange(field.name, e.target.value)}
              onBlur={() => this.handleBlur(field.name)}
              error={field.touched ? field.error : ''}
            />
          )
        
        case 'checkbox':
          return (
            <FormCheckbox
              key={field.name}
              id={field.name}
              label={field.label}
              checked={field.value}
              onChange={(e) => this.handleChange(field.name, e.target.checked)}
              onBlur={() => this.handleBlur(field.name)}
              error={field.touched ? field.error : ''}
            />
          )
        
        default:
          return (
            <FormInput
              key={field.name}
              id={field.name}
              type={field.type}
              label={field.label}
              value={field.value}
              onChange={(e) => this.handleChange(field.name, e.target.value)}
              onBlur={() => this.handleBlur(field.name)}
              error={field.touched ? field.error : ''}
            />
          )
      }
    })
  }
  
  onFieldChange(callback: (fieldName: string, value: any) => void): void {
    this.fieldChangeCallbacks.push(callback)
  }
  
  onFieldBlur(callback: (fieldName: string) => void): void {
    this.fieldBlurCallbacks.push(callback)
  }
}
```

---

## SyncBridge: Connecting Both Agents

**Responsibility**: Keep Formular and Atomos in sync

```typescript
export class SyncBridge {
  private formularAgent: FormularAgent
  private atomosAgent: AtomosAgent
  
  constructor(formularAgent: FormularAgent, atomosAgent: AtomosAgent) {
    this.formularAgent = formularAgent
    this.atomosAgent = atomosAgent
    this.setupBidirectionalSync()
  }
  
  private setupBidirectionalSync(): void {
    // Atomos → Formular (user input)
    this.atomosAgent.onFieldChange((fieldName, value) => {
      // Update Formular's field value
      this.formularAgent.setFieldValue(fieldName, value)
    })
    
    this.atomosAgent.onFieldBlur((fieldName) => {
      // Trigger Formular validation
      const field = this.formularAgent.getField(fieldName)
      if (field) {
        field.input.validationManager.validate(field)
      }
    })
    
    // Formular → Atomos (validation results)
    this.formularAgent.onValidationChange((fieldName, isValid, errors) => {
      // Update Atomos UI with validation state
      this.atomosAgent.updateFieldError(fieldName, errors)
    })
    
    // Formular → Atomos (state changes)
    this.formularAgent.onStateChange((state) => {
      // Could update loading states, etc.
      console.log('Form state changed:', state)
    })
  }
}
```

---

## Public API

### 1. React Component API

```typescript
// src/api/FormularAtomosForm.tsx
export const FormularAtomosForm: React.FC<{
  descriptors: IFieldDescriptor[]
  onSubmit: (data: any) => void | Promise<void>
  onSuccess?: (message?: string) => void
  onError?: (error: string) => void
  submitLabel?: string
  showReset?: boolean
}> = ({ descriptors, onSubmit, onSuccess, onError, submitLabel, showReset }) => {
  const [formularAgent] = useState(() => new FormularAgent())
  const [atomosAgent] = useState(() => new AtomosAgent())
  const [syncBridge] = useState(() => new SyncBridge(formularAgent, atomosAgent))
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  
  useEffect(() => {
    // Initialize both agents
    formularAgent.initialize(descriptors).then(() => {
      atomosAgent.initialize(descriptors)
      forceUpdate()
    })
    
    // Cleanup
    return () => formularAgent.dispose()
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const isValid = await formularAgent.validate()
      if (isValid) {
        const data = formularAgent.getData()
        await onSubmit(data)
        onSuccess?.('Form submitted successfully')
      }
    } catch (error: any) {
      onError?.(error.message)
    }
  }
  
  const handleReset = () => {
    formularAgent.reset()
    forceUpdate()
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {atomosAgent.renderFields()}
      
      <div className="form-actions">
        <button type="submit">
          {submitLabel || 'Submit'}
        </button>
        
        {showReset && (
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
    </form>
  )
}
```

### 2. React Hook API

```typescript
// src/api/useFormularAtomosForm.ts
export const useFormularAtomosForm = (descriptors: IFieldDescriptor[]) => {
  const [formularAgent] = useState(() => new FormularAgent())
  const [atomosAgent] = useState(() => new AtomosAgent())
  const [syncBridge] = useState(() => new SyncBridge(formularAgent, atomosAgent))
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  
  useEffect(() => {
    formularAgent.initialize(descriptors).then(() => {
      atomosAgent.initialize(descriptors)
      forceUpdate()
    })
    
    return () => formularAgent.dispose()
  }, [])
  
  return {
    // Form operations
    submit: () => formularAgent.submit(),
    validate: () => formularAgent.validate(),
    reset: () => formularAgent.reset(),
    getData: () => formularAgent.getData(),
    
    // State queries
    isDirty: formularAgent.isDirty(),
    isValid: formularAgent.isValid(),
    isBusy: formularAgent.isBusy(),
    
    // Field operations
    setFieldValue: (name: string, value: any) => {
      formularAgent.setFieldValue(name, value)
      forceUpdate()
    },
    
    // Render
    renderFields: () => atomosAgent.renderFields()
  }
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Remove Storybook dependencies
- [ ] Install real formular.dev and atomos.dev packages
- [ ] Create agent base classes
- [ ] Set up TypeScript types (re-export from Formular)

### Phase 2: FormularAgent (Week 1-2)
- [ ] Implement ServiceManager initialization
- [ ] Implement FormularManager integration
- [ ] Implement form creation from descriptors
- [ ] Implement validation integration
- [ ] Implement event subscription system

### Phase 3: AtomosAgent (Week 2)
- [ ] Implement Atomos FormProvider wrapper
- [ ] Implement field rendering logic
- [ ] Implement field type mapping
- [ ] Implement validation state display

### Phase 4: SyncBridge (Week 2-3)
- [ ] Implement bidirectional event sync
- [ ] Implement value synchronization
- [ ] Implement validation synchronization
- [ ] Test sync edge cases

### Phase 5: Public API (Week 3)
- [ ] Create FormularAtomosForm component
- [ ] Create useFormularAtomosForm hook
- [ ] Create example forms
- [ ] Write API documentation

### Phase 6: Demo System (Week 3-4)
- [ ] Create custom demo application (replace Storybook)
- [ ] Create SimpleForm example
- [ ] Create MultiStepForm example
- [ ] Create DynamicForm example
- [ ] Create validation showcase

---

## Dependencies

### Install Real Libraries
```json
{
  "dependencies": {
    "formular.dev": "workspace:*",  // Link to local formular.dev package
    "@atomos/ui": "workspace:*",    // Link to local atomos.dev package
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

### Remove Storybook
```bash
pnpm remove @storybook/react @storybook/react-vite storybook
rm -rf .storybook
rm -rf src/stories
```

---

## Success Criteria

### For End Users
```typescript
// This is ALL they need to write
const fields: IFieldDescriptor[] = [
  {
    id: 1,
    name: 'email',
    type: 'email',
    label: 'Email',
    validationOptions: {
      required: { value: true },
      pattern: { value: emailPattern }
    }
  }
]

<FormularAtomosForm 
  descriptors={fields}
  onSubmit={(data) => api.post('/register', data)}
/>
```

### Technical Goals
- ✅ Use REAL formular.dev (no mocks)
- ✅ Use REAL atomos.dev (no rebuilding)
- ✅ Use Formular types (IFieldDescriptor, IFormDescriptor)
- ✅ Use Formular tooling (ServiceManager, FormularManager, ValidationManager)
- ✅ Bidirectional sync works perfectly
- ✅ Single source of truth: Formular form instance
- ✅ Clean, minimal API for end users

---

**Ready to start implementation?**
