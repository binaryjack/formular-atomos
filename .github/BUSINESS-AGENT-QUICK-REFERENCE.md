# Formular-Atomos Business Specialist - Quick Reference

## 🚀 Quick Start

This project has a **specialized Business Agent** that understands the domain of form validation libraries. It ensures all code aligns with the strategic vision of `@formular/atomos`.

---

## 🎯 When to Use This Agent

Invoke the Business Specialist when working on:

- ✅ Form component creation (FormularInput, FormularSelect, etc.)
- ✅ Field schema definitions (FormularAtomosField)
- ✅ Validation rule implementation
- ✅ Multi-language error messages
- ✅ Country-specific validation
- ✅ Accessibility requirements
- ✅ User stories and requirements
- ✅ API design decisions

---

## 📋 Naming Conventions (CRITICAL)

### **Components**
```typescript
// ✅ CORRECT
export const FormularInput = ({ id, ...props }: IFormularInputProps) => {}
```
- **Name:** PascalCase (FormularInput, FormularSelect)
- **File:** kebab-case (formular-input.tsx, formular-select.tsx)
- **Props:** I{Name}Props (IFormularInputProps)

### **Fields**
```typescript
// ✅ CORRECT
const fields = [
  { name: 'firstName', ... },
  { name: 'emailAddress', ... }
]

// ❌ WRONG
const fields = [
  { name: 'first_name', ... },    // snake_case
  { name: 'FirstName', ... },     // PascalCase
  { name: 'field1', ... }         // generic name
]
```
- **Always:** camelCase (firstName, phoneNumber, emailAddress)

### **Files**
- **Always:** kebab-case
  - formular-input.tsx
  - use-formular-atomos-adapter.ts
  - field-validator.helper.ts
  - formular-atomos-field.types.ts

---

## 🔍 Validation Strategy Decision Tree

```
Is the validation...

Simple constraint?
├─ required, minLength, maxLength, min, max, pattern
└─ ✅ Use Atomos validators

Email/URL format?
└─ ✅ Use Formular email/url validator

Phone number?
├─ Country-specific? → Use Formular with country param
└─ Generic? → Use Formular without country

Postal/ZIP code?
└─ ✅ Use Formular postal validator with country

SSN/National ID?
└─ ✅ Use Formular ssn validator with country

Custom business logic?
└─ ✅ Use Formular custom validator
```

### **Example:**
```typescript
// ✅ CORRECT - Layered validation
{
  name: 'email',
  validation: {
    required: true,              // Atomos (simple)
    maxLength: 100,              // Atomos (simple)
    formularValidators: [
      { type: 'email' }          // Formular (complex)
    ]
  }
}
```

---

## 🤝 Agent Collaboration

### **The Business Specialist delegates to:**

| Agent | When to Use | Required Rules |
|-------|-------------|----------------|
| **React/TypeScript Specialist** | Component implementation | `.copilot-rules.json` (react_specific, component_rules) |
| **State Management Specialist** | Adapter logic, form state | `.copilot-rules.json` (architecture.state_management) |
| **Accessibility Specialist** | WCAG compliance, ARIA | `.copilot-rules.json` (accessibility) |
| **Testing Specialist** | Unit/integration tests | Testing patterns |

### **Delegation Flow:**

```markdown
1. Business Specialist defines requirements
   ↓
2. Loads required rules (.copilot-rules.json, ATOMOS_INTEGRATION.md)
   ↓
3. Delegates to coding specialist with:
   - Field schema
   - Validation rules
   - Accessibility requirements
   - Acceptance criteria
   ↓
4. Verifies outcome:
   - < 200 lines
   - Type-safe
   - Accessible
   - Documentation updated
```

---

## ✅ Pre-Action Checklist

Before creating or modifying any code:

```markdown
- [ ] Read .github/copilot-starter-kit/.copilot-rules.json
- [ ] Read ATOMOS_INTEGRATION.md (relevant sections)
- [ ] Component name is PascalCase
- [ ] File name is kebab-case
- [ ] Field names are camelCase
- [ ] Component will be < 200 lines
- [ ] Props interface follows I{Name}Props
- [ ] Accessibility requirements documented
- [ ] Validation strategy defined
- [ ] TypeScript strict mode compliant
```

---

## 📚 Required Reading

### **Always read FIRST:**

1. **`.github/copilot-starter-kit/.copilot-rules.json`**
   - Sections: `component_rules`, `file_naming`, `react_specific`, `accessibility`

2. **`ATOMOS_INTEGRATION.md`**
   - Sections: API Reference, Best Practices, Complete Examples

3. **Relevant pattern files** (if they exist):
   - `.github/copilot-patterns/frontend/component-architecture.md`
   - `.github/copilot-patterns/frontend/accessibility-rules.md`

---

## 🎯 Core Business Rules (NEVER BREAK)

### **1. Type Safety**
```typescript
// ✅ CORRECT
export const FormularInput = ({ id, type }: IFormularInputProps) => {}

// ❌ WRONG
export const FormularInput = (props: any) => {}
```

### **2. Zero Configuration**
```typescript
// ✅ CORRECT - Minimal config
<FormularAtomosProvider formName="contact" fields={fields} onSubmit={submit}>
  <FormularInput id="email" />
</FormularAtomosProvider>
```

### **3. Automatic State Sync**
```typescript
// ✅ CORRECT - Adapter handles sync automatically
<FormularInput id="email" />

// ❌ WRONG - Manual sync defeats purpose
<FormInput onChange={(val) => { atomos.set(val); formular.validate(val) }} />
```

### **4. One Concept Per File**
```
✅ formular-input.tsx → exports FormularInput only
❌ components.tsx → exports 5 components (WRONG)
```

### **5. Max 200 Lines**
- Extract at 150 lines
- Enforce at 200 lines
- No exceptions

### **6. Accessibility is Mandatory**
- WCAG 2.1 AA compliance
- All inputs have labels
- Keyboard navigation
- Screen reader support

---

## 📖 API Surface (What Users See)

### **Provider**
```typescript
<FormularAtomosProvider
  formName="registration"           // Required: unique ID
  fields={fields}                   // Required: field definitions
  locale="en"                       // Optional: 'en'|'fr'|'es'|'de'|'pt'|'it'
  onSubmit={handleSubmit}           // Required: submit handler
  onSuccess={(msg) => toast(msg)}   // Optional: success callback
  onError={(err) => toast(err)}     // Optional: error callback
  submitLabel="Create Account"      // Optional: button text
  showReset={false}                 // Optional: show reset button
>
  {/* Components */}
</FormularAtomosProvider>
```

### **Components**
```typescript
<FormularInput 
  id="email"              // Required: matches field name
  type="email"            // Optional: input type
  placeholder="..."       // Optional
  helpText="..."          // Optional
/>

<FormularSelect id="country">{options}</FormularSelect>
<FormularTextarea id="bio" rows={6} />
<FormularCheckbox id="terms" />
```

### **Hook (Advanced)**
```typescript
const adapter = useFormularAtomosAdapter()

await adapter.validateField('email')
await adapter.validateAll()
await adapter.submit()
adapter.reset()
```

---

## 🎬 Example: Adding a New Component

### **User Request:** "Add a phone input component"

### **Business Specialist Response:**

```markdown
Creating FormularPhoneInput with country-specific validation.

**Field Schema:**
```typescript
{
  name: 'phoneNumber',
  value: '',
  label: 'Phone Number',
  type: 'tel',
  validation: {
    required: true,
    formularValidators: [
      { type: 'phone', country: 'US' }
    ]
  }
}
```

**Delegating to React Specialist:**

Required reading:
- .github/copilot-starter-kit/.copilot-rules.json
- ATOMOS_INTEGRATION.md (API Reference, Components)

Requirements:
- File: formular-phone-input.tsx (kebab-case)
- Component: FormularPhoneInput (PascalCase)
- Props: IFormularPhoneInputProps
- Max lines: 200
- Features:
  - Country code selector
  - Auto-formatting (US: (555) 123-4567)
  - Integrates with adapter
- Accessibility:
  - Label with htmlFor
  - ARIA attributes
  - Keyboard navigation

Acceptance criteria:
- [ ] TypeScript strict mode
- [ ] < 200 lines
- [ ] WCAG AA compliant
- [ ] Example added to ATOMOS_INTEGRATION.md
```

---

## 🚨 Common Mistakes to Avoid

### **1. Wrong Field Naming**
```typescript
// ❌ WRONG
{ name: 'first_name' }    // snake_case
{ name: 'FirstName' }     // PascalCase

// ✅ CORRECT
{ name: 'firstName' }     // camelCase
```

### **2. Manual State Sync**
```typescript
// ❌ WRONG - Defeats purpose of library
<FormInput onChange={(val) => {
  atomosContext.setValue(val)
  formularEngine.validate(val)
}} />

// ✅ CORRECT - Adapter handles it
<FormularInput id="email" />
```

### **3. Mixing Validators Wrong**
```typescript
// ❌ WRONG - Using Formular for simple checks
formularValidators: [
  { type: 'custom', customValidator: (val) => val.length > 3 }
]

// ✅ CORRECT - Use Atomos for simple
validation: {
  minLength: 3  // Atomos handles this
}
```

### **4. Missing Accessibility**
```typescript
// ❌ WRONG - No label
<input id="email" />

// ✅ CORRECT - Proper label
<label htmlFor="email">Email</label>
<input id="email" />
```

---

## 📊 Supported Features

### **Countries (12+):**
US, CA, UK, FR, DE, ES, IT, PT, NL, BE, AU, NZ

### **Languages (6):**
English, French, Spanish, German, Portuguese, Italian

### **Validation Types:**
- email (RFC 5322)
- phone (country-specific)
- ssn (US, CA, FR, DE)
- postal (country-specific)
- custom (your business logic)

### **Form Patterns:**
- Single-page forms
- Multi-step wizards
- Dynamic/conditional fields
- Country-based switching

---

## 🆘 Getting Help

### **If validation isn't working:**
```markdown
Check:
- [ ] Field name matches between definition and component
- [ ] Required validators are specified
- [ ] Field is marked as required if needed
- [ ] Validation timing (onChange, onBlur, onSubmit)
```

### **If TypeScript errors:**
```markdown
Check:
- [ ] Import FormularAtomosField type
- [ ] Props interface follows I{Name}Props
- [ ] Strict mode enabled in tsconfig.json
```

### **If accessibility issues:**
```markdown
Check:
- [ ] All inputs have labels
- [ ] ARIA attributes present
- [ ] Keyboard navigation works
- [ ] Error messages announced to screen readers
```

---

## 📞 Contact

- **Documentation:** ATOMOS_INTEGRATION.md
- **Rules:** .github/copilot-starter-kit/.copilot-rules.json
- **Business Agent:** .github/copilot-instructions/formular-atomos-business-specialist.md

---

**Remember: The Business Specialist is your first point of contact for all form-related work. It will route you to the right coding specialist with the right context.**
