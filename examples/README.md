# @formular/atomos Examples

This directory contains example implementations demonstrating the usage of @formular/atomos components.

## Available Examples

### 1. Basic Form Example (`BasicFormExample.tsx`)
A simple registration form demonstrating:
- Text input (username)
- Email input
- Password input with strength validation
- Checkbox (terms acceptance)

**Use Case**: Simple user registration forms, account creation

### 2. Multi-Country Form Example (`MultiCountryFormExample.tsx`)
An international contact form showcasing:
- Dynamic country selection
- Country-specific phone number validation (12 countries supported)
- Country-specific postal code validation
- Automatic format hints based on selected country

**Use Case**: International e-commerce checkout, global contact forms, shipping address collection

**Supported Countries**:
- 🇺🇸 United States
- 🇨🇦 Canada
- 🇬🇧 United Kingdom
- 🇩🇪 Germany
- 🇫🇷 France
- 🇨🇭 Switzerland
- 🇮🇹 Italy
- 🇪🇸 Spain
- 🇦🇹 Austria
- 🇳🇱 Netherlands
- 🇧🇪 Belgium
- 🇱🇺 Luxembourg

### 3. All Components Example (`AllComponentsExample.tsx`)
A comprehensive showcase featuring ALL 12 components:
1. **FAInput** - General text input
2. **FANumber** - Number input with min/max
3. **FAEmail** - Email with RFC 5322 validation
4. **FAPassword** - Password with strength validation
5. **FATextarea** - Multi-line text input
6. **FACheckbox** - Boolean checkbox
7. **FAToggle** - Toggle/switch
8. **FARadioGroup** - Radio button group
9. **FASelect** - Dropdown selection
10. **FAPhone** - Country-specific phone validation
11. **FAPostalCode** - Country-specific postal validation
12. **FAFileUpload** - File upload with size/type validation

**Use Case**: Comprehensive user profile forms, settings pages, admin dashboards

## Running Examples

### With Storybook (Recommended)
```bash
npm run storybook
```
Navigate to the Stories section to see interactive examples.

### In Your Own Project
Copy any example file to your project and import:

```tsx
import { BasicFormExample } from './examples/BasicFormExample'

function App() {
  return <BasicFormExample />
}
```

## Key Patterns Demonstrated

### 1. Field Configuration
```tsx
const fields: FAField[] = [
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    required: true,
    validation: {
      formular: { email: true }
    }
  }
]
```

### 2. Form Submission
```tsx
const handleSubmit = (data: Record<string, any>) => {
  console.log('Form data:', data)
  // Send to API, save to state, etc.
}
```

### 3. Cultural Configuration
```tsx
<FAPhone id="phone" country="DE" />
<FAPostalCode id="postal" country="FR" />
```

## Next Steps

1. Explore each example in Storybook
2. Modify examples to fit your use case
3. Read the [API Documentation](../docs/API.md)
4. Review [Migration Guide](../docs/MIGRATION.md) if coming from another library

## Need Help?

- Check the main [README.md](../README.md)
- Review component-specific stories in `/src/stories`
- See unit tests in `/src/__tests__` for edge cases
