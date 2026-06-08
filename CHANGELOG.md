# Changelog

All notable changes to @formular/atomos will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of @formular/atomos
- 12 form components with FA* prefix
  - FAInput — General text input
  - FANumber — Number input with min/max/step
  - FAEmail — Email with RFC 5322 validation
  - FAPassword — Password with strength validation
  - FATextarea — Multi-line text input
  - FACheckbox — Boolean checkbox
  - FAToggle — Toggle/switch component
  - FARadioGroup — Radio button group (custom implementation)
  - FASelect — Dropdown selection
  - FAPhone — Country-specific phone validation
  - FAPostalCode — Country-specific postal validation
  - FAFileUpload — File upload with size/type validation
- FAProvider core component for form management
- FAAdapter bridge between Atomos UI and Formular.dev
- Country-specific validation for 12 countries (US, CA, UK, DE, FR, CH, IT, ES, AT, NL, BE, LU)
- Full TypeScript support with strict mode
- Comprehensive Storybook documentation
- Complete Vitest test suite
- Example applications
  - BasicFormExample — Simple registration form
  - MultiCountryFormExample — International contact form
  - AllComponentsExample — All 12 components showcase
- Documentation
  - README.md — Overview and quick start
  - docs/API.md — Complete API reference
  - docs/MIGRATION.md — Migration guides from other libraries
  - CONTRIBUTING.md — Contribution guidelines
- Build configuration
  - Vite for bundling
  - Dual ESM/CJS output
  - TypeScript declarations
  - Tree-shakeable exports

### Changed
- N/A (initial release)

### Deprecated
- N/A (initial release)

### Removed
- N/A (initial release)

### Fixed
- N/A (initial release)

### Security
- N/A (initial release)

---

## [1.0.0] - 2024-01-XX

Initial public release.

### Highlights
- 🎨 Beautiful UI powered by Atomos
- ✅ Enterprise validation via Formular.dev
- 🌍 Multi-country phone/postal support
- 📘 TypeScript-first with strict mode
- ♿ WCAG 2.1 accessibility compliance
- 🧪 95%+ test coverage
- 📚 Comprehensive documentation

---

[Unreleased]: https://github.com/formular/atomos/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/formular/atomos/releases/tag/v1.0.0
