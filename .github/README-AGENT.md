# Formular-Atomos Business Specialist Agent

## 📖 Documentation Index

This directory contains the **Business Specialist Agent** for the `@formular/atomos` project - a specialized Copilot agent that understands form validation domain knowledge and coordinates all development work.

---

## 📁 Files in This Directory

### **1. Agent Configuration**
- **`.copilotrc.json`**
  - Registers the Business Specialist with GitHub Copilot
  - Defines project-wide rules and conventions
  - Specifies agent triggers and delegation patterns
  - **Start here** to understand the agent's configuration

### **2. Core Agent Instructions**
- **`copilot-instructions/formular-atomos-business-specialist.md`**
  - Complete instructions for the Business Specialist
  - Domain knowledge (fields, providers, adapters, validation)
  - Naming conventions and architecture standards
  - Agent collaboration and routing logic
  - Business-driven workflows
  - **This is the agent's "brain"**

### **3. Quick Reference Guide**
- **`BUSINESS-AGENT-QUICK-REFERENCE.md`**
  - Fast lookup for developers
  - Naming conventions with examples
  - Validation strategy decision tree
  - Common mistakes to avoid
  - Troubleshooting guide
  - **Read this first when starting development**

### **4. Implementation Documentation**
- **`AGENT-IMPLEMENTATION-SUMMARY.md`**
  - Detailed explanation of what was built
  - How the agent works (architecture, workflows)
  - Key features and responsibilities
  - Most pertinent coding agents identified
  - Pre-selected rules that always apply
  - **Read this to understand the full system**

### **5. Activation Guide**
- **`AGENT-ACTIVATION.md`**
  - Quick start guide
  - How to trigger the agent
  - Example prompts
  - Verification checklist
  - **Read this to start using the agent**

---

## 🚀 Getting Started

### **For Developers:**

1. **Read:** `AGENT-ACTIVATION.md` (2 minutes)
2. **Reference:** `BUSINESS-AGENT-QUICK-REFERENCE.md` (bookmark this)
3. **Start coding:** The agent will guide you automatically

### **For Contributors:**

1. **Read:** `AGENT-IMPLEMENTATION-SUMMARY.md` (understand the system)
2. **Study:** `copilot-instructions/formular-atomos-business-specialist.md` (deep dive)
3. **Configure:** `.copilotrc.json` (modify if needed)

---

## 🎯 What This Agent Does

### **Primary Role:**
Acts as the **first point of contact** for all form-related development work in `@formular/atomos`.

### **Key Responsibilities:**

1. **Enforces Naming Conventions**
   - Components: PascalCase (FormularInput)
   - Files: kebab-case (formular-input.tsx)
   - Fields: camelCase (firstName, emailAddress)

2. **Routes to Coding Specialists**
   - React/TypeScript Specialist → Component implementation
   - State Management Specialist → Adapter logic
   - Accessibility Specialist → WCAG compliance
   - Testing Specialist → Unit/integration tests

3. **Ensures Rule Compliance**
   - All agents read `.copilot-rules.json` before acting
   - All agents acknowledge `ATOMOS_INTEGRATION.md` standards
   - Components stay < 200 lines
   - TypeScript strict mode enforced

4. **Validates Outcomes**
   - Type-safe code (no `any` in public APIs)
   - Accessible components (WCAG 2.1 AA)
   - Documentation updated
   - Examples provided

5. **Maintains Quality**
   - One concept per file
   - Zero configuration API
   - Automatic state synchronization
   - Enterprise-grade validation

---

## 🔑 Core Conventions

### **Naming:**
```typescript
// Components
FormularInput          → formular-input.tsx
FormularSelect         → formular-select.tsx
IFormularInputProps    → Props interface

// Fields (in form definitions)
firstName              → camelCase
emailAddress           → camelCase
phoneNumber            → camelCase

// Files
formular-input.tsx                → kebab-case
use-formular-atomos-adapter.ts    → kebab-case
field-validator.helper.ts         → kebab-case
```

### **Validation Strategy:**
```typescript
// Simple constraints → Atomos validators
validation: {
  required: true,
  minLength: 3,
  maxLength: 100
}

// Complex/domain validation → Formular validators
validation: {
  formularValidators: [
    { type: 'email' },                    // RFC 5322 compliant
    { type: 'phone', country: 'US' },     // US phone format
    { type: 'ssn', country: 'US' }        // Social Security Number
  ]
}

// Combine both when needed
validation: {
  required: true,                         // Atomos (simple)
  maxLength: 100,                         // Atomos (simple)
  formularValidators: [
    { type: 'email' }                     // Formular (complex)
  ]
}
```

---

## 📊 Project Context

### **What is `@formular/atomos`?**

A bridge library that combines:
- **Atomos UI** (beautiful, accessible React components)
- **Formular.dev** (enterprise-grade validation)

### **Core Value Propositions:**
1. ✅ Beautiful, accessible UI out of the box
2. ✅ Powerful validation (email, phone, SSN, postal)
3. ✅ Multi-language error messages (6 languages)
4. ✅ Country-specific validation (12+ countries)
5. ✅ Type-safe TypeScript support
6. ✅ Zero configuration required
7. ✅ Automatic state synchronization

### **Supported:**
- **Countries:** US, CA, UK, FR, DE, ES, IT, PT, NL, BE, AU, NZ
- **Languages:** English, French, Spanish, German, Portuguese, Italian
- **Patterns:** Single-page, multi-step, dynamic/conditional forms

---

## 🎬 Example Usage

### **Ask the Business Specialist:**

```
"Add email validation to the contact form"
```

### **The Agent Will:**

1. ✅ Read `.copilot-rules.json` and `ATOMOS_INTEGRATION.md`
2. ✅ Define field schema (FormularAtomosField)
3. ✅ Specify validation (Formular email validator)
4. ✅ Delegate to React Specialist with requirements
5. ✅ Verify:
   - Naming conventions followed
   - Component < 200 lines
   - TypeScript strict
   - Accessible (WCAG AA)
   - Documentation updated

---

## 🚨 Critical Rules (Never Break)

1. **Type Safety:** No `any` types in public APIs
2. **Zero Configuration:** Works with minimal props
3. **Automatic Sync:** Adapter handles state (never manual)
4. **One Concept Per File:** One component/interface/enum per file
5. **Max 200 Lines:** Extract at 150, enforce at 200
6. **Accessibility Mandatory:** WCAG 2.1 AA compliance

---

## 📚 Related Documentation

| Document | Purpose |
|----------|---------|
| `ATOMOS_INTEGRATION.md` | API reference, examples, best practices |
| `copilot-starter-kit/.copilot-rules.json` | Project-wide coding standards |
| `copilot-starter-kit/agents/` | Other specialist agent definitions |
| `copilot-starter-kit/patterns/` | Architecture patterns |

---

## 🆘 Troubleshooting

### **Agent Not Activating?**
- Use trigger words: "form validation", "business requirements", "field schema"
- Check `.copilotrc.json` exists
- Verify `copilot-instructions/formular-atomos-business-specialist.md` exists

### **Need Help with Naming?**
- Read: `BUSINESS-AGENT-QUICK-REFERENCE.md` (Naming Conventions section)

### **Validation Strategy Unclear?**
- Read: `BUSINESS-AGENT-QUICK-REFERENCE.md` (Decision Tree section)

### **Want to Understand the System?**
- Read: `AGENT-IMPLEMENTATION-SUMMARY.md` (full architecture)

---

## 🎓 Learning Path

### **Beginner (15 minutes):**
1. Read `AGENT-ACTIVATION.md`
2. Scan `BUSINESS-AGENT-QUICK-REFERENCE.md`
3. Try example prompts
4. Reference quick guide as needed

### **Intermediate (45 minutes):**
1. Read `AGENT-IMPLEMENTATION-SUMMARY.md`
2. Study naming conventions and validation strategy
3. Review example workflows
4. Understand agent collaboration

### **Advanced (2+ hours):**
1. Read full `formular-atomos-business-specialist.md`
2. Study `.copilotrc.json` configuration
3. Review `ATOMOS_INTEGRATION.md` API reference
4. Explore `copilot-starter-kit/` patterns

---

## ✅ Status

**READY TO USE** - The Business Specialist Agent is fully configured and operational.

**Last Updated:** December 14, 2025

**Files:** 5 core documents + 1 agent instruction file

**Coverage:**
- ✅ Agent configuration
- ✅ Domain knowledge
- ✅ Naming conventions
- ✅ Validation strategy
- ✅ Agent routing
- ✅ Quality standards
- ✅ Documentation

---

**Your Business Specialist is ready to build enterprise-grade forms! 🚀**
