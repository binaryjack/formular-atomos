# @formular/atomos

> **Beautiful forms meet enterprise validation** — A React form library bridging [Atomos UI](https://github.com/atomos/ui) (accessible, gorgeous components) and [Formular.dev](https://formular.dev) (enterprise-grade validation).

[![npm version](https://img.shields.io/npm/v/@formular/atomos.svg)](https://www.npmjs.com/package/@formular/atomos)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **🎨 Beautiful UI** — Built on Atomos UI for stunning, accessible components
- **✅ Enterprise Validation** — Powered by Formular.dev for robust validation
- **🌍 Cultural Configuration** — Phone & postal code validation for 12 countries
- **📘 TypeScript First** — Full type safety with strict mode
- **♿ Accessibility** — WCAG 2.1 compliant via Atomos UI
- **🎯 Simple API** — Declarative field configuration
- **📦 Tree-shakeable** — Import only what you need
- **🧪 Well Tested** — Comprehensive Vitest suite

## 📦 Installation

```bash
npm install @formular/atomos @atomos/ui formular.dev
```

**Peer Dependencies:**
- React 18.0.0+
- @atomos/ui ^1.0.0
- formular.dev ^1.0.0

## 🚀 Quick Start

```tsx
import { FAProvider, FAInput, FAEmail, FAPassword, FACheckbox } from '@formular/atomos'

function RegistrationForm() {
  const fields = [
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      validation: { formular: { minLength: 3, maxLength: 20 } }
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      validation: { formular: { email: true } }
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      strength: 'medium',
      validation: { formular: { minLength: 8 } }
    },
    {
      id: 'terms',
      type: 'checkbox',
      label: 'I agree to the terms',
      required: true
    }
  ]

  const handleSubmit = (data) => {
    console.log('Form data:', data)
  }

  return (
    <FAProvider fields={fields} onSubmit={handleSubmit}>
      <FAInput id="username" placeholder="Choose a username" />
      <FAEmail id="email" placeholder="you@example.com" />
      <FAPassword id="password" strength="medium" />
      <FACheckbox id="terms" />
      <button type="submit">Register</button>
    </FAProvider>
  )
}
```

## 📚 Components

### Text Inputs
- **FAInput** — General text input
- **FANumber** — Number input with min/max/step
- **FAEmail** — Email with RFC 5322 validation
- **FAPassword** — Password with strength validation
- **FATextarea** — Multi-line text input

### Choice Inputs
- **FACheckbox** — Boolean checkbox
- **FAToggle** — Toggle/switch component
- **FARadioGroup** — Radio button group (custom implementation)
- **FASelect** — Dropdown selection

### Specialized Inputs
- **FAPhone** — Phone number with country-specific validation
- **FAPostalCode** — Postal code with country-specific validation
- **FAFileUpload** — File upload with size/type validation

## 🌍 Supported Countries

Phone and postal code validation for:
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

### Example: Multi-Country Form

```tsx
import { FAProvider, FAPhone, FAPostalCode } from '@formular/atomos'
import { useState } from 'react'

function ContactForm() {
  const [country, setCountry] = useState('US')

  const fields = [
    {
      id: 'phone',
      type: 'phone',
      label: 'Phone',
      required: true,
      country,
      validation: { formular: { phone: country } }
    },
    {
      id: 'postal',
      type: 'postal',
      label: 'Postal Code',
      required: true,
      country,
      validation: { formular: { postalCode: country } }
    }
  ]

  return (
    <FAProvider fields={fields} onSubmit={(data) => console.log(data)}>
      <select onChange={(e) => setCountry(e.target.value)}>
        <option value="US">United States</option>
        <option value="UK">United Kingdom</option>
        <option value="DE">Germany</option>
      </select>
      <FAPhone id="phone" country={country} />
      <FAPostalCode id="postal" country={country} />
      <button type="submit">Submit</button>
    </FAProvider>
  )
}
```

## 🎯 API Reference

### FAProvider Props

```tsx
interface FAProviderConfig {
  fields: FAField[]           // Field definitions
  onSubmit: (data: Record<string, any>) => void
  initialValues?: Record<string, any>
  onValidate?: (errors: Record<string, string>) => void
}
```

### Field Configuration

```tsx
interface FAField {
  id: string
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'checkbox' | 'toggle' | 'radio' | 'select' | 'phone' | 'postal' | 'file'
  label: string
  required?: boolean
  validation?: ValidationConfig
  
  // Type-specific
  country?: CountryCode          // For phone/postal
  strength?: 'medium' | 'strong' // For password
  options?: Array<{ value: string; label: string }> // For radio
  maxSize?: number               // For file
  accept?: string                // For file
}
```

## 🧪 Testing

```bash
npm test                 # Run tests
npm test -- --watch      # Watch mode
npm test -- --coverage   # With coverage
```

## 📖 Documentation

- [API Documentation](./docs/API.md) — Complete API reference
- [Migration Guide](./docs/MIGRATION.md) — Migrate from other libraries
- [Examples](./examples/README.md) — Working examples
- [Storybook](https://storybook.formular-atomos.dev) — Interactive component demos

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm test

# Build library
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📄 License

MIT © Formular Team

## 🙏 Credits

- **[Atomos UI](https://github.com/atomos/ui)** — Beautiful, accessible React components
- **[Formular.dev](https://formular.dev)** — Enterprise-grade form validation

## 🤝 Contributing

Contributions welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

## 📞 Support

- 🐛 [Issues](https://github.com/formular/atomos/issues)
- 💬 [Discussions](https://github.com/formular/atomos/discussions)
- 📧 Email: support@formular.dev

---

**Made with ❤️ by the Formular Team**
