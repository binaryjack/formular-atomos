# Formular.dev + Atomos.dev Integration Architecture

## Overview

This document explains how **Formular.dev** (validation engine) and **Atomos.dev** (UI components) should be properly initialized and integrated together.

---

## 1️⃣ Formular.dev - Validation Engine

### What is Formular.dev?

**Formular.dev** is an enterprise-grade form validation engine with:
- **ServiceManager**: Advanced IoC (Dependency Injection) container
- **FormularManager**: Central form lifecycle management
- **ValidationManager**: Comprehensive validation with 18+ built-in validators
- **InputFactory**: Field creation with input engine
- **Country-Specific Validators**: Phone, postal codes, SSN for 12+ countries
- **Multi-Language Support**: Validation messages in 6+ languages

### Proper Initialization

#### Step 1: Create ServiceManager using Factory

```typescript
import { ServiceManagerFactory } from 'formular.dev.lib'

// Option A: Full setup (recommended for complete forms)
const serviceManager = ServiceManagerFactory.create({
  includeCoreManagers: true,        // Configuration, Validation, etc.
  includeFormularManager: true,     // Form management
  includeInputEngine: true,         // Field input handling
  includeBaseConfigurations: true   // Default field configs
})

// Option B: Use helper for common scenarios
import { SetupHelpers } from 'formular.dev.lib'

const serviceManager = SetupHelpers.forFormApplication()
// or
const serviceManager = SetupHelpers.forTesting()
// or
const serviceManager = SetupHelpers.forCustomImplementation()
```

#### Step 2: Get FormularManager from ServiceManager

```typescript
import { 
  SFormularManager, 
  IFormularManager 
} from 'formular.dev.lib'

const formularManager = serviceManager.lazy<IFormularManager>(
  SFormularManager
)?.()
```

#### Step 3: Create Forms with Validation

**Option A: From Field Descriptors**

```typescript
import { IFieldDescriptor } from 'formular.dev.lib'

const fieldDescriptors: IFieldDescriptor[] = [
  {
    id: 1,
    name: 'email',
    type: 'text',
    label: 'Email',
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: 'Invalid email format'
    }
  },
  {
    id: 2,
    name: 'phone',
    type: 'text',
    label: 'Phone',
    validation: {
      required: true,
      // Use country-specific validator
    }
  }
]

const form = formularManager.createFromDescriptors<UserData>(
  'registration-form',
  fieldDescriptors
)
```

**Option B: From Schema**

```typescript
import { 
  FieldSchemaBuilder,
  IEntityScheme 
} from 'formular.dev.lib'

const userSchema: IEntityScheme = {
  name: 'user-form',
  properties: [
    new FieldSchemaBuilder()
      .setName('username')
      .setTypeInput('text')
      .setValidationData(true, {
        required: true,
        minLength: 3,
        maxLength: 20
      })
      .build(),
    new FieldSchemaBuilder()
      .setName('email')
      .setTypeInput('email')
      .setValidationData(true, {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      })
      .build()
  ]
}

const form = formularManager.createFromSchema<UserData>(userSchema)
```

#### Step 4: Validate Forms

```typescript
// Validate entire form
const isValid = await formularManager.validate('registration-form')

// Get form data
const userData = formularManager.getData<UserData>('registration-form')
```

### Key Services in Formular.dev

```typescript
// Core Managers available from ServiceManager
import {
  SConfigurationManager,
  SFormularManager,
  SValidationManager,
  SValueManager,
  SInputFactory
} from 'formular.dev.lib'

// Get validation manager
const validationManager = serviceManager.lazy<IValidationManager>(
  SValidationManager
)?.()

// Get configuration manager
const configManager = serviceManager.lazy<IConfigurationManager>(
  SConfigurationManager
)?.()
```

---

## 2️⃣ Atomos.dev - UI Components

### What is Atomos.dev?

**Atomos.dev** is a UI component library with:
- **FormProvider**: Context-based form state management
- **Form Components**: FormInput, FormSelect, FormTextarea, FormCheckbox, etc.
- **Built-in Validation**: Simple validation (required, min/max, pattern)
- **Stepper**: Multi-step form support with adapters

### Proper Initialization

#### Step 1: Define Form Fields

```typescript
import { FormField } from '@atomos/ui'

const fields: FormField[] = [
  {
    name: 'email',
    value: '',
    label: 'Email Address',
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: 'Please enter a valid email'
    },
    isValid: false,
    touched: false  // Won't show error until user interacts
  },
  {
    name: 'password',
    value: '',
    label: 'Password',
    validation: {
      required: true,
      minLength: 8,
      error: ''
    },
    isValid: false,
    touched: false
  }
]
```

#### Step 2: Use FormProvider

```typescript
import { FormProvider } from '@atomos/ui'

function MyForm() {
  const handleSubmit = (fields: FormField[], helpers) => {
    console.log('Form submitted:', fields)
    // helpers.setLoading(false)
    // helpers.setError('email', 'Email already exists')
    // helpers.reset()
  }

  return (
    <FormProvider
      initialFields={fields}
      onSubmit={handleSubmit}
      onSuccess={(msg) => console.log(msg)}
      onError={(err) => console.error(err)}
      submitLabel="Submit"
      showReset={false}
    >
      {/* Form components here */}
    </FormProvider>
  )
}
```

#### Step 3: Use Form Components

```typescript
import { 
  FormInput, 
  FormSelect, 
  FormTextarea, 
  FormCheckbox 
} from '@atomos/ui'

// Inside FormProvider
<FormInput 
  id="email" 
  type="email" 
  placeholder="your@email.com" 
  helpText="We'll never share your email"
/>

<FormInput 
  id="password" 
  type="password" 
  placeholder="••••••••" 
/>

<FormCheckbox 
  id="terms" 
  helpText="You must agree to continue" 
/>
```

#### Step 4: Access Form Context

```typescript
import { useFormContext } from '@atomos/ui'

function CustomComponent() {
  const {
    fields,
    errors,
    isValid,
    getFieldValue,
    setFieldValue,
    handleChange,
    handleBlur,
    validateAll,
    reset
  } = useFormContext()

  const email = getFieldValue('email')
  
  return <div>Email: {email}</div>
}
```

---

## 3️⃣ Integration: Formular + Atomos

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FAProvider                           │
│  (Bridge between Formular.dev & Atomos.dev)            │
│                                                          │
│  ┌────────────────────────────────────────────┐        │
│  │         Formular.dev Engine                │        │
│  │  ┌──────────────────────────────────┐      │        │
│  │  │  ServiceManager (DI Container)   │      │        │
│  │  │  ├─ FormularManager               │      │        │
│  │  │  ├─ ValidationManager             │      │        │
│  │  │  ├─ InputFactory                  │      │        │
│  │  │  └─ ConfigurationManager          │      │        │
│  │  └──────────────────────────────────┘      │        │
│  │           ↓                                │        │
│  │     FAAdapter                              │        │
│  │     (handles validation)                   │        │
│  └────────────────────────────────────────────┘        │
│                    ↓                                    │
│  ┌────────────────────────────────────────────┐        │
│  │    Atomos.dev UI Components                │        │
│  │  ┌──────────────────────────────────┐      │        │
│  │  │  FormProvider                     │      │        │
│  │  │  (Context state management)       │      │        │
│  │  │  ├─ FormInput                     │      │        │
│  │  │  ├─ FormSelect                    │      │        │
│  │  │  ├─ FormTextarea                  │      │        │
│  │  │  └─ FormCheckbox                  │      │        │
│  │  └──────────────────────────────────┘      │        │
│  └────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

### Proper Integration Pattern

#### Step 1: Initialize Formular.dev ServiceManager

```typescript
// src/core/FAProvider.tsx

import { ServiceManagerFactory, IFormularManager } from 'formular.dev.lib'

// Create service manager ONCE for the app
const serviceManager = ServiceManagerFactory.create({
  includeCoreManagers: true,
  includeFormularManager: true,
  includeInputEngine: true,
  includeBaseConfigurations: true
})

// Get FormularManager
const formularManager = serviceManager.lazy<IFormularManager>(
  SFormularManager
)?.()
```

#### Step 2: Create FAAdapter with Formular.dev

```typescript
// FAAdapter should use Formular.dev's ValidationManager

import { 
  IValidationManager, 
  SValidationManager 
} from 'formular.dev.lib'

class FAAdapter {
  private validationManager: IValidationManager

  constructor(serviceManager: IServiceManager) {
    this.validationManager = serviceManager.lazy<IValidationManager>(
      SValidationManager
    )?.()
  }

  validateField(field: FormField): ValidationResult {
    // Use Formular.dev's validation instead of manual logic
    return this.validationManager.validate(field)
  }
}
```

#### Step 3: FAProvider Bridges Both

```typescript
// src/core/FAProvider.tsx

import { FormProvider } from '@atomos/ui'
import { FAAdapter } from './FAAdapter'

export function FAProvider({ 
  fields, 
  onSubmit, 
  children 
}: FAProviderProps) {
  // Create adapter with Formular.dev engine
  const adapter = new FAAdapter(serviceManager, fields)

  // Custom handlers using Formular.dev validation
  const handleChange = (name: string, value: any) => {
    const result = adapter.validateField(name, value)
    // Update Atomos FormProvider
  }

  const handleBlur = (name: string) => {
    const result = adapter.validateOnBlur(name)
    // Update Atomos FormProvider
  }

  return (
    <FormProvider
      initialFields={fields}
      onSubmit={onSubmit}
      handleChange={handleChange}  // Custom handler
      handleBlur={handleBlur}        // Custom handler
    >
      {children}
    </FormProvider>
  )
}
```

#### Step 4: Use in Application

```typescript
import { FAProvider } from './core/FAProvider'
import { FormInput, FormCheckbox } from '@atomos/ui'

function App() {
  const fields = [
    // Define fields with Formular.dev validators
    {
      name: 'email',
      value: '',
      label: 'Email',
      validation: {
        required: true,
        validator: 'email'  // Use Formular.dev's email validator
      },
      isValid: false
    }
  ]

  return (
    <FAProvider fields={fields} onSubmit={handleSubmit}>
      <FormInput id="email" />
      <FormCheckbox id="terms" />
    </FAProvider>
  )
}
```

---

## 4️⃣ Key Differences

### Formular.dev (Engine)

✅ **Enterprise validation** with DI container  
✅ **Country-specific** validators (12+ countries)  
✅ **Multi-language** error messages (6+ languages)  
✅ **Async validation** support  
✅ **Complex field dependencies**  
✅ **Validation caching** for performance  
❌ **No UI components** - just the engine  

### Atomos.dev (UI)

✅ **Ready-to-use UI components**  
✅ **Simple validation** (required, min/max, pattern)  
✅ **Context-based state management**  
✅ **Form submit/reset helpers**  
❌ **Basic validation only** (no country-specific, no DI)  
❌ **No multi-language** support  

### FAProvider (Bridge)

✅ **Combines Formular.dev validation** with **Atomos.dev UI**  
✅ **Uses Formular.dev's ValidationManager** instead of manual code  
✅ **Provides Atomos FormProvider** with enhanced validation  
✅ **Single API** for consumers  

---

## 5️⃣ What Needs to be Fixed

### Current Problem

❌ **FAAdapter has 248 lines of MANUAL validation logic**  
❌ **Formular.dev is just empty mocks** (validate returns null)  
❌ **No DI container integration**  
❌ **No validator factory**  
❌ **No multi-language support**  

### Solution Path

**Option 1: Build Full Formular.dev** (Enterprise)
- Implement DI container properly
- Build validator factory with country-specific validators
- Add multi-language error messages
- Add async validation
- FAAdapter delegates to Formular.dev engine

**Option 2: Use Existing Library** (Faster)
- Integrate **Zod** (TypeScript-first schema validation)
- Or **Yup**, **Joi**, **Vest**
- FAAdapter wraps chosen library
- Maintain same API for Atomos.dev components

---

## 6️⃣ Recommended Next Steps

1. **Decision**: Build Formular.dev OR use existing library (Zod recommended)

2. **If Zod**: 
   ```typescript
   import { z } from 'zod'
   
   const emailSchema = z.string().email()
   const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/)
   
   // FAAdapter wraps Zod
   class FAAdapter {
     validateField(field: FormField) {
       return emailSchema.safeParse(field.value)
     }
   }
   ```

3. **If Build Formular.dev**:
   - Implement ServiceManager DI properly
   - Build ValidationManager with strategies
   - Create validator factory
   - Add country-specific validators
   - FAAdapter delegates instead of implementing

4. **Update FAProvider**:
   - Remove manual validation from FAAdapter
   - Use Formular.dev (or Zod) for validation
   - Keep Atomos.dev UI components
   - Provide clean API

---

## Summary

- **Formular.dev** = Validation ENGINE (DI, validators, multi-language)
- **Atomos.dev** = UI COMPONENTS (FormProvider, FormInput, etc.)
- **FAProvider** = BRIDGE (combines both)
- **Current Issue** = Formular.dev not implemented, manual validation in FAAdapter
- **Solution** = Either build Formular.dev OR use Zod/Yup/Joi
