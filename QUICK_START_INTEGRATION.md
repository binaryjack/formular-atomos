# Quick Start: Complete the Integration

This guide assumes you have **formular.dev** and **@atomos/ui** ready to link.

---

## ⚡ 5-Minute Setup

### 1. Link the Libraries

```bash
# Clone both repositories (if not already local)
cd E:\Sources
git clone https://github.com/binaryjack/formular.dev.git
git clone https://github.com/binaryjack/atomos.dev.git

# Or use git submodules
cd E:\Sources\formular-atomos
git submodule add https://github.com/binaryjack/formular.dev.git external/formular.dev
git submodule add https://github.com/binaryjack/atomos.dev.git external/atomos.dev
```

### 2. Update Workspace Config

**Edit `pnpm-workspace.yaml`:**
```yaml
packages:
  - '.'
  - 'demo'
  - 'packages/*'
  - '../formular.dev'           # Add this line
  - '../atomos.dev/packages/ui' # Add this line (adjust path as needed)
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Fix Imports in FormularAgent

**File: `src/agents/FormularAgent.ts`**

**Replace lines 10-15:**
```typescript
// DELETE THESE:
type IServiceManager = any;
type IFormularManager = any;
type IFormular = any;
type IFieldDescriptor = any;
type IFormDescriptor = any;

// ADD THIS:
import type {
  IServiceManager,
  IFormularManager,
  IFormular,
  IFieldDescriptor,
  IFormDescriptor,
  IValidationManager,
  IInputFactory,
} from 'formular.dev';
```

### 5. Implement FormularAgent.initialize()

**File: `src/agents/FormularAgent.ts` line ~59**

**Replace the TODO with:**
```typescript
async initialize(): Promise<void> {
  const { ServiceManager } = await import('formular.dev');
  
  this.serviceManager = new ServiceManager();
  this.formularManager = this.serviceManager.get<IFormularManager>('FormularManager');
  
  this.formular = await this.formularManager.createFromDescriptors(
    this.config.fields,
    this.config.formDescriptor
  );
  
  // Set up event listeners
  this.formular.on('change', ({ fieldName, value }) => {
    this.events.onFieldChange?.(fieldName, value);
  });
  
  this.formular.on('validate', ({ fieldName, isValid, errors }) => {
    this.events.onFieldValidation?.(fieldName, isValid, errors || []);
  });
  
  // Emit initial state
  this.events.onFormStateChange?.({
    isDirty: this.formular.isDirty(),
    isValid: this.formular.isValid(),
    isBusy: this.formular.isBusy(),
  });
}
```

### 6. Implement Other FormularAgent Methods

**Quick implementations (adjust based on real API):**

```typescript
getData(): Record<string, unknown> {
  if (!this.formular) throw new Error('Not initialized');
  return this.formular.getData();
}

async validate(): Promise<boolean> {
  if (!this.formular) throw new Error('Not initialized');
  return await this.formular.validate();
}

async submit(): Promise<void> {
  if (!this.formular) throw new Error('Not initialized');
  try {
    if (!await this.validate()) throw new Error('Validation failed');
    const data = this.getData();
    this.events.onSubmitSuccess?.(data);
  } catch (error) {
    this.events.onSubmitError?.(error as Error);
    throw error;
  }
}

reset(): void {
  if (!this.formular) throw new Error('Not initialized');
  this.formular.reset();
}

getField(fieldName: string): unknown {
  if (!this.formular) throw new Error('Not initialized');
  return this.formular.getField(fieldName);
}

setFieldValue(fieldName: string, value: unknown): void {
  if (!this.formular) throw new Error('Not initialized');
  this.formular.setFieldValue(fieldName, value);
}

isDirty(): boolean {
  return this.formular?.isDirty() ?? false;
}

isValid(): boolean {
  return this.formular?.isValid() ?? false;
}

isBusy(): boolean {
  return this.formular?.isBusy() ?? false;
}
```

### 7. Enable Agents in FAAdapter

**File: `src/core/FAAdapter.ts` line ~52**

**Uncomment:**
```typescript
constructor(fields: FAField[], callbacks: {...}) {
  // ... existing code ...
  
  // UNCOMMENT THIS LINE:
  this.initializeAgents().catch(console.error);
}
```

### 8. Uncomment Agent Usage

**In `src/core/FAAdapter.ts`, uncomment all the `if (this.formularAgent)` blocks:**

Example in `validateField()`:
```typescript
async validateField(fieldName: string): Promise<boolean> {
  // UNCOMMENT THIS:
  if (this.formularAgent) {
    const field = this.formularAgent.getField(fieldName)
    // Trigger validation through FormularAgent
    return await this.formularAgent.validate()
  }
  
  // Fallback (can keep or remove)
  const field = this.fields.find((f) => f.name === fieldName)
  // ... existing fallback code ...
}
```

Repeat for all methods.

### 9. Test

```bash
# Run demo
pnpm demo

# Open browser
# http://localhost:3011

# Test login form
# Test registration form
# Test checkout form

# Verify:
# - Validation works
# - Error messages appear
# - Form submits
# - Reset works
```

### 10. Clean Up (Optional)

```bash
# Delete mock type files
rm src/types/formular-dev.d.ts
rm src/types/atomos-ui.d.ts

# Delete Storybook directories
rm -rf .storybook
rm -rf src/stories

# Delete mock package
rm -rf packages/atomos-ui-mock
```

---

## 🔍 Troubleshooting

### Issue: "Cannot find module 'formular.dev'"

**Solution:**
```bash
# Check workspace is configured
cat pnpm-workspace.yaml

# Check formular.dev is linked
pnpm list formular.dev

# Re-install
rm -rf node_modules
pnpm install
```

### Issue: "IServiceManager is not exported"

**Solution:**
Check the actual exports from formular.dev:
```typescript
// In node_modules/formular.dev or your local clone
// Check what's actually exported
// Adjust imports accordingly
```

### Issue: TypeScript errors after linking

**Solution:**
```bash
# Clear TypeScript cache
rm -rf dist
rm tsconfig.tsbuildinfo

# Rebuild
pnpm build
```

### Issue: Circular update loop

**Solution:**
The `SyncBridge` has `isUpdating` flag. If you see infinite loops:
```typescript
// In SyncBridge.ts
console.log('SyncBridge update', { fieldName, value, isUpdating: this.isUpdating })
```

---

## 📋 Verification Checklist

After integration:

- [ ] `pnpm install` succeeds
- [ ] `pnpm build` succeeds
- [ ] `pnpm test` passes
- [ ] `pnpm demo` runs
- [ ] Login form validates email
- [ ] Login form shows error messages
- [ ] Login form submits successfully
- [ ] Registration form works
- [ ] Checkout form works
- [ ] Multi-language errors work (if configured)
- [ ] Country-specific validation works
- [ ] Form reset clears all fields
- [ ] TypeScript has no errors

---

## 🎯 Expected Results

### Before Integration (Current State)
```
✅ Demo runs
✅ Basic validation (email regex, required, min/max)
✅ Form submission works
❌ No advanced validators
❌ No multi-language support
❌ No country-specific validation
```

### After Integration (Goal State)
```
✅ Demo runs
✅ Full formular.dev validation (18+ validators)
✅ Multi-language error messages (6+ languages)
✅ Country-specific validation (12+ countries)
✅ ValidationManager caching
✅ Custom validator support
✅ Full formular.dev feature set
```

---

## 🚀 Next Steps After Integration

1. **Update Documentation**
   - Add real API examples to ATOMOS_INTEGRATION.md
   - Update README with installation instructions
   - Create migration guide

2. **Add Tests**
   - Unit tests for FormularAgent
   - Unit tests for AtomosAgent
   - Integration tests for SyncBridge
   - E2E tests for demo

3. **Optimize**
   - Add debouncing to SyncBridge
   - Implement validation caching
   - Add performance monitoring

4. **Enhance**
   - Add custom validators support
   - Add conditional validation
   - Add async validation
   - Add field dependencies

---

## 📖 Resources

- **INTEGRATION_COMPLETE_SUMMARY.md** - Full overview
- **ARCHITECTURE_DIAGRAM.md** - Visual diagrams
- **PHASE2_INTEGRATION_ROADMAP.md** - Detailed steps
- **formular.dev docs** - https://github.com/binaryjack/formular.dev
- **atomos.dev docs** - https://github.com/binaryjack/atomos.dev

---

## 💡 Pro Tips

1. **Start with one form** - Get login working first
2. **Use debug logging** - Enable SyncBridge debug mode
3. **Check the network tab** - Verify no extra requests
4. **Use React DevTools** - Inspect FormProvider state
5. **Read formular.dev code** - Understand the real API

---

**Time to complete**: ~30 minutes (assuming libraries are already cloned)

**Difficulty**: Easy (all integration points clearly marked)

**Risk**: Low (fallback validation ensures nothing breaks)

**Good luck! 🎉**
