# Migration Guide

Guide for migrating to @formular/atomos from other form libraries.

## Table of Contents

1. [From React Hook Form](#from-react-hook-form)
2. [From Formik](#from-formik)
3. [From Plain Atomos UI](#from-plain-atomos-ui)
4. [From Formular.dev](#from-formulardev)

---

## From React Hook Form

### Before (React Hook Form)

```tsx
import { useForm } from 'react-hook-form'

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('username', { 
          required: 'Username is required',
          minLength: { value: 3, message: 'Min 3 chars' }
        })} 
      />
      {errors.username && <span>{errors.username.message}</span>}
      
      <input 
        type="email"
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email'
          }
        })} 
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  )
}
```

### After (@formular/atomos)

```tsx
import { FAProvider, FAInput, FAEmail } from '@formular/atomos'

function MyForm() {
  const fields = [
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

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <FAProvider fields={fields} onSubmit={onSubmit}>
      <FAInput id="username" placeholder="Enter username" />
      <FAEmail id="email" placeholder="you@example.com" />
      <button type="submit">Submit</button>
    </FAProvider>
  )
}
```

### Key Differences

| React Hook Form | @formular/atomos |
|-----------------|------------------|
| Imperative `register()` | Declarative `fields` config |
| Manual error display | Built-in error messages |
| Custom validation functions | Formular.dev validators |
| Uncontrolled inputs | Context-managed state |

### Migration Steps

1. **Replace form setup:**
   - Remove `useForm()` hook
   - Create `fields` array
   - Wrap form in `<FAProvider>`

2. **Replace inputs:**
   - `<input {...register('name')} />` → `<FAInput id="name" />`
   - `<input type="email" {...register('email')} />` → `<FAEmail id="email" />`

3. **Replace validation:**
   - Remove `register()` rules
   - Add `validation.formular` to field config

4. **Remove error display:**
   - Delete manual `{errors.field && ...}` checks
   - Errors shown automatically by FA components

---

## From Formik

### Before (Formik)

```tsx
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Min 3 chars')
    .max(20, 'Max 20 chars')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
})

function MyForm() {
  return (
    <Formik
      initialValues={{ username: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Field name="username" placeholder="Username" />
        <ErrorMessage name="username" component="div" />
        
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />
        
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}
```

### After (@formular/atomos)

```tsx
import { FAProvider, FAInput, FAEmail } from '@formular/atomos'

function MyForm() {
  const fields = [
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      validation: {
        formular: { minLength: 3, maxLength: 20 }
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

  return (
    <FAProvider 
      fields={fields}
      initialValues={{ username: '', email: '' }}
      onSubmit={(values) => console.log(values)}
    >
      <FAInput id="username" placeholder="Username" />
      <FAEmail id="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </FAProvider>
  )
}
```

### Key Differences

| Formik | @formular/atomos |
|--------|------------------|
| Yup schemas | Formular validators |
| `<Field>` component | Specific FA components |
| Manual `<ErrorMessage>` | Built-in errors |
| `validationSchema` prop | `validation` in fields |

### Migration Steps

1. **Replace Formik wrapper:**
   - `<Formik>` → `<FAProvider>`
   - Move `initialValues` to FAProvider prop

2. **Convert Yup schema to field validation:**
   ```tsx
   // Yup
   username: Yup.string().min(3).max(20).required()
   
   // @formular/atomos
   {
     id: 'username',
     required: true,
     validation: { formular: { minLength: 3, maxLength: 20 } }
   }
   ```

3. **Replace Field components:**
   - `<Field name="x" />` → `<FAInput id="x" />`
   - Remove `<ErrorMessage>` (handled automatically)

4. **Update submit handler:**
   - Formik passes FormikBag, FA just passes data object

---

## From Plain Atomos UI

### Before (Atomos UI)

```tsx
import { FormInput, FormProvider } from '@atomos/ui'
import { useState } from 'react'

function MyForm() {
  const [values, setValues] = useState({ username: '', email: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (id, value) => {
    setValues({ ...values, [id]: value })
    
    // Manual validation
    if (id === 'username' && value.length < 3) {
      setErrors({ ...errors, username: 'Min 3 chars' })
    } else {
      const { [id]: _, ...rest } = errors
      setErrors(rest)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(errors).length === 0) {
      console.log(values)
    }
  }

  return (
    <FormProvider value={values}>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="username"
          value={values.username}
          onChange={(e) => handleChange('username', e.target.value)}
          error={errors.username}
        />
        <FormInput
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}
```

### After (@formular/atomos)

```tsx
import { FAProvider, FAInput, FAEmail } from '@formular/atomos'

function MyForm() {
  const fields = [
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

  return (
    <FAProvider fields={fields} onSubmit={(data) => console.log(data)}>
      <FAInput id="username" />
      <FAEmail id="email" />
      <button type="submit">Submit</button>
    </FAProvider>
  )
}
```

### Key Differences

| Plain Atomos | @formular/atomos |
|--------------|------------------|
| Manual state management | Managed by FAProvider |
| Manual validation logic | Formular.dev validators |
| Manual error state | Automatic error handling |
| Verbose onChange handlers | Declarative field config |

### Migration Benefits

- ✅ **60% less boilerplate** — No manual state/error management
- ✅ **Enterprise validation** — Formular.dev integration
- ✅ **Type safety** — Full TypeScript support
- ✅ **Cultural config** — Phone/postal for 12 countries

---

## From Formular.dev

If you're using raw Formular.dev without a UI library:

### Before (Formular.dev only)

```tsx
import { createForm, validators } from 'formular.dev'

const form = createForm({
  fields: {
    username: {
      validators: [
        validators.required(),
        validators.minLength(3),
        validators.maxLength(20)
      ]
    },
    email: {
      validators: [
        validators.required(),
        validators.email()
      ]
    }
  }
})

function MyForm() {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (form.validate()) {
        console.log(form.values)
      }
    }}>
      <input
        id="username"
        value={form.values.username}
        onChange={(e) => form.setFieldValue('username', e.target.value)}
      />
      {form.errors.username && <div>{form.errors.username}</div>}
      
      <input
        type="email"
        id="email"
        value={form.values.email}
        onChange={(e) => form.setFieldValue('email', e.target.value)}
      />
      {form.errors.email && <div>{form.errors.email}</div>}
      
      <button type="submit">Submit</button>
    </form>
  )
}
```

### After (@formular/atomos)

```tsx
import { FAProvider, FAInput, FAEmail } from '@formular/atomos'

function MyForm() {
  const fields = [
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      validation: {
        formular: { minLength: 3, maxLength: 20 }
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

  return (
    <FAProvider fields={fields} onSubmit={(data) => console.log(data)}>
      <FAInput id="username" />
      <FAEmail id="email" />
      <button type="submit">Submit</button>
    </FAProvider>
  )
}
```

### Migration Benefits

- ✅ **Beautiful UI** — Atomos UI components included
- ✅ **Accessibility** — WCAG 2.1 compliant
- ✅ **Less wiring** — Formular validation auto-integrated
- ✅ **Better DX** — TypeScript, Storybook, tests included

---

## Common Migration Patterns

### Pattern 1: Required Fields

**Before (any library):**
```tsx
required: true
// or
validators: [validators.required()]
```

**After:**
```tsx
{
  id: 'field',
  type: 'text',
  label: 'Field',
  required: true
}
```

### Pattern 2: String Length

**Before:**
```tsx
minLength: { value: 3, message: 'Min 3' }
maxLength: { value: 20, message: 'Max 20' }
```

**After:**
```tsx
validation: {
  formular: { minLength: 3, maxLength: 20 }
}
```

### Pattern 3: Email Validation

**Before:**
```tsx
pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
```

**After:**
```tsx
{
  id: 'email',
  type: 'email',
  label: 'Email',
  validation: {
    formular: { email: true }
  }
}
```

### Pattern 4: Number Range

**Before:**
```tsx
min: { value: 18, message: 'Min 18' }
max: { value: 120, message: 'Max 120' }
```

**After:**
```tsx
{
  id: 'age',
  type: 'number',
  label: 'Age',
  validation: {
    formular: { min: 18, max: 120 }
  }
}
```

---

## Need Help?

- Check our [API Documentation](./API.md)
- See [Examples](../examples/README.md)
- Ask in [Discussions](https://github.com/formular/atomos/discussions)
- Email: support@formular.dev
