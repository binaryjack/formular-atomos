# Contributing to @formular/atomos

Thank you for your interest in contributing! This guide will help you get started.

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Code Standards](#code-standards)
5. [Testing](#testing)
6. [Submitting Changes](#submitting-changes)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- ✅ Be respectful and constructive
- ✅ Welcome newcomers and help them learn
- ✅ Focus on what's best for the community
- ❌ Don't harass, discriminate, or be disrespectful

---

## Getting Started

### Prerequisites

- Node.js 18.0.0+
- npm 9.0.0+
- Git

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/formular-atomos.git
   cd formular-atomos
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Development Workflow

### Running Storybook

```bash
npm run storybook
```
Opens at http://localhost:6006

### Running Tests

```bash
npm test              # Run once
npm test -- --watch   # Watch mode
npm test -- --coverage # With coverage
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

### Building

```bash
npm run build
```

---

## Code Standards

### TypeScript

- ✅ **Strict mode enabled** — No `any`, use proper types
- ✅ **Explicit return types** — For public functions
- ✅ **JSDoc comments** — For all exported items

```tsx
/**
 * Validates a field value
 * @param id - Field identifier
 * @param value - Field value
 * @returns Error message or null
 */
export function validateField(id: string, value: any): string | null {
  // implementation
}
```

### React Components

- ✅ **Functional components** — With hooks
- ✅ **ForwardRef** — For form inputs
- ✅ **DisplayName** — Always set
- ✅ **Props interface** — Export all prop types

```tsx
import React, { forwardRef } from 'react'

export interface FAInputProps {
  id: string
  placeholder?: string
}

export const FAInput = forwardRef<HTMLInputElement, FAInputProps>(
  ({ id, placeholder }, ref) => {
    return <input ref={ref} id={id} placeholder={placeholder} />
  }
)

FAInput.displayName = 'FAInput'
```

### File Structure

```
src/
├── components/        # React components
│   ├── FAInput.tsx
│   └── __tests__/
│       └── FAInput.test.tsx
├── core/              # Core logic
│   ├── FAAdapter.ts
│   ├── FAProvider.tsx
│   └── __tests__/
├── types/             # Type definitions
│   ├── field.types.ts
│   └── component.types.ts
└── stories/           # Storybook stories
    └── FAInput.stories.tsx
```

### Naming Conventions

- **Components**: PascalCase — `FAInput`, `FAProvider`
- **Files**: Match component — `FAInput.tsx`
- **Types**: PascalCase with suffix — `FAInputProps`, `FAField`
- **Hooks**: camelCase with `use` prefix — `useFAAdapter`
- **Constants**: UPPER_SNAKE_CASE — `COUNTRIES`

---

## Testing

### Unit Tests

Every component and core logic must have tests.

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FAInput } from '../FAInput'

describe('FAInput', () => {
  it('should render with placeholder', () => {
    render(<FAInput id="test" placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeDefined()
  })
})
```

### Coverage Requirements

- **Minimum**: 80% overall
- **Components**: 90%+
- **Core logic**: 95%+

### Running Coverage

```bash
npm test -- --coverage
```

---

## Submitting Changes

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add FARadioGroup component
fix: correct phone validation for UK numbers
docs: update migration guide
test: add tests for FAPassword strength
chore: update dependencies
```

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation
- `test` — Tests
- `chore` — Maintenance
- `refactor` — Code refactoring
- `perf` — Performance improvement

### Pull Request Process

1. **Update tests**
   - Add tests for new features
   - Ensure all tests pass

2. **Update documentation**
   - Update API.md for API changes
   - Update README.md if needed
   - Add Storybook story for new components

3. **Create Pull Request**
   - Use descriptive title
   - Reference related issues
   - Describe changes clearly

4. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Tests added/updated
   - [ ] All tests pass
   - [ ] Storybook story added
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No new warnings
   ```

5. **Review Process**
   - Wait for maintainer review
   - Address feedback
   - Once approved, PR will be merged

---

## Component Checklist

When adding a new component, ensure:

- [ ] Component file in `src/components/`
- [ ] Props interface exported
- [ ] ForwardRef implemented
- [ ] DisplayName set
- [ ] Unit tests in `__tests__/`
- [ ] Storybook story in `src/stories/`
- [ ] Exported from `src/index.ts`
- [ ] Props documented in `docs/API.md`
- [ ] Example added to examples (if major component)

---

## Questions?

- 💬 [Discussions](https://github.com/formular/atomos/discussions)
- 🐛 [Issues](https://github.com/formular/atomos/issues)
- 📧 Email: support@formular.dev

---

**Thank you for contributing! 🙏**
