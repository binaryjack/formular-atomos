# Phase 2: Integration Roadmap

## Current Status

✅ **Completed:**
- Agent architecture created (FormularAgent, AtomosAgent, SyncBridge)
- FAAdapter updated to support agent integration
- Type system prepared for real library integration
- All existing components maintained (FAInput, FASelect, etc.)
- Demo remains functional with fallback validation

🔄 **In Progress:**
- Waiting for formular.dev and @atomos/ui workspace linking

## Next Steps

### Step 1: Link Workspace Packages

The project expects formular.dev and @atomos/ui to be available as workspace packages. You have two options:

#### Option A: Local Development Setup (Recommended)
```bash
# Clone both repositories as siblings to this project
cd E:\Sources
git clone https://github.com/binaryjack/formular.dev.git
git clone https://github.com/binaryjack/atomos.dev.git

# Update pnpm-workspace.yaml to include them
# Add to formular-atomos/pnpm-workspace.yaml:
packages:
  - '.'
  - 'demo'
  - 'packages/*'
  - '../formular.dev'
  - '../atomos.dev/packages/ui'  # Adjust path based on atomos.dev structure

# Install dependencies
pnpm install
```

#### Option B: npm Link (Alternative)
```bash
# In formular.dev
cd E:\Sources\formular.dev
pnpm link --global

# In atomos.dev
cd E:\Sources\atomos.dev
pnpm link --global

# In formular-atomos
cd E:\Sources\formular-atomos
pnpm link --global formular.dev
pnpm link --global @atomos/ui
```

### Step 2: Update Type Declarations

Once packages are linked, replace mock types with real imports:

#### File: `src/agents/FormularAgent.ts`

**Replace:**
```typescript
// Note: formular.dev types will be imported when the library is properly linked
type IServiceManager = any;
type IFormularManager = any;
type IFormular = any;
type IFieldDescriptor = any;
type IFormDescriptor = any;
```

**With:**
```typescript
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

#### File: `src/types/formular-dev.d.ts`

**Delete** the entire mock declaration file or update it to re-export real types.

#### File: `src/types/atomos-ui.d.ts`

**Update** to re-export real types from @atomos/ui.

### Step 3: Implement FormularAgent Methods

Uncomment and complete the implementation in `src/agents/FormularAgent.ts`:

```typescript
async initialize(): Promise<void> {
  // Import real ServiceManager from formular.dev
  const { ServiceManager } = await import('formular.dev');
  
  // Initialize ServiceManager with IoC container
  this.serviceManager = new ServiceManager();
  
  // Get FormularManager from ServiceManager
  this.formularManager = this.serviceManager.get<IFormularManager>('FormularManager');
  
  // Create Formular instance from field descriptors
  this.formular = await this.formularManager.createFromDescriptors(
    this.config.fields,
    this.config.formDescriptor
  );
  
  // Set up event listeners
  this.formular.on('fieldChange', (fieldName: string, value: unknown) => {
    this.events.onFieldChange?.(fieldName, value);
  });
  
  this.formular.on('fieldValidation', (fieldName: string, result: ValidationResult) => {
    this.events.onFieldValidation?.(
      fieldName,
      result.isValid,
      result.errors
    );
  });
  
  this.formular.on('stateChange', (state) => {
    this.events.onFormStateChange?.({
      isDirty: state.isDirty,
      isValid: state.isValid,
      isBusy: state.isBusy,
    });
  });
  
  // Emit initial state
  this.events.onFormStateChange?.({
    isDirty: this.formular.isDirty(),
    isValid: this.formular.isValid(),
    isBusy: this.formular.isBusy(),
  });
}

getData(): Record<string, unknown> {
  if (!this.formular) {
    throw new Error('FormularAgent not initialized');
  }
  return this.formular.getData();
}

async validate(): Promise<boolean> {
  if (!this.formular) {
    throw new Error('FormularAgent not initialized');
  }
  return await this.formular.validate();
}

async submit(): Promise<void> {
  if (!this.formular) {
    throw new Error('FormularAgent not initialized');
  }

  try {
    const isValid = await this.validate();
    if (!isValid) {
      throw new Error('Form validation failed');
    }
    
    const data = this.getData();
    this.events.onSubmitSuccess?.(data);
  } catch (error) {
    this.events.onSubmitError?.(error as Error);
    throw error;
  }
}

// ... implement other methods similarly
```

### Step 4: Implement AtomosAgent Methods

Complete the implementation in `src/agents/AtomosAgent.ts` to connect with real Atomos UI:

```typescript
initialize(fields: Array<{ name: string; value?: unknown }>): void {
  // Initialize with Atomos FormProvider state structure
  fields.forEach(field => {
    this.fieldStates.set(field.name, {
      value: field.value,
      touched: false,
      disabled: false,
      loading: false,
    });
  });
  
  // Set up FormState compatible with @atomos/ui
  this.formState = {
    fields: Array.from(this.fieldStates.entries()).map(([name, state]) => ({
      name,
      value: state.value,
      error: state.error,
      touched: state.touched,
      isValid: !state.error,
    })),
    isSubmitting: false,
    isValid: true,
  };
}
```

### Step 5: Implement SyncBridge Event System

Complete the event wiring in `src/agents/SyncBridge.ts`:

```typescript
private setupFormularToAtomosSync(): void {
  // Attach events to FormularAgent
  // This requires FormularAgent to support event registration
  // Implementation depends on formular.dev's event system
}

private setupAtomosToFormularSync(): void {
  // Attach events to AtomosAgent
  // Implementation depends on @atomos/ui's event system
}
```

### Step 6: Enable Agent Integration in FAAdapter

Uncomment the initialization in `src/core/FAAdapter.ts`:

```typescript
constructor(fields: FAField[], callbacks: {...}) {
  // ... existing code ...
  
  // Enable agent initialization
  this.initializeAgents().catch(console.error);
}
```

And uncomment all the agent-based implementations in the methods.

### Step 7: Test Integration

```bash
# Run tests
pnpm test

# Run demo
pnpm demo

# Build library
pnpm build
```

### Step 8: Update Documentation

Once integration is complete:
1. Update ATOMOS_INTEGRATION.md with real examples
2. Update README.md with installation instructions
3. Create migration guide for users upgrading from mocks
4. Add API reference with real formular.dev types

## Architecture Decision

The current implementation uses a **hybrid approach**:

1. **Public API**: Maintains existing FAProvider/FAAdapter pattern
   - Demo code works without changes
   - Backward compatible with current usage
   
2. **Internal Implementation**: Uses agent architecture
   - FormularAgent handles all formular.dev logic
   - AtomosAgent handles all Atomos UI logic
   - SyncBridge connects them bidirectionally
   
3. **Progressive Enhancement**:
   - Works with basic validation (fallback)
   - Automatically uses real formular.dev when available
   - Graceful degradation if libraries not linked

This approach ensures:
- ✅ Demo continues to work
- ✅ Clean separation of concerns
- ✅ Easy to test each layer independently
- ✅ Ready for real library integration
- ✅ No breaking changes to existing API

## Expected File Structure After Integration

```
formular-atomos/
├── src/
│   ├── agents/                    # Agent architecture (NEW)
│   │   ├── FormularAgent.ts      # ✅ Created, needs real impl
│   │   ├── AtomosAgent.ts        # ✅ Created, needs real impl
│   │   ├── SyncBridge.ts         # ✅ Created, needs real impl
│   │   └── index.ts              # ✅ Created
│   │
│   ├── core/                      # Core adapter layer
│   │   ├── FAAdapter.ts          # ✅ Updated with agent hooks
│   │   ├── FAProvider.tsx        # ✅ Works as-is
│   │   └── hooks/
│   │       └── useFAAdapter.tsx
│   │
│   ├── components/                # UI components (unchanged)
│   │   ├── FAInput.tsx
│   │   ├── FASelect.tsx
│   │   └── ... (all existing components)
│   │
│   ├── types/                     # Type definitions
│   │   ├── index.ts              # ✅ Updated, needs real imports
│   │   ├── formular-dev.d.ts     # ⚠️ Delete when real types available
│   │   └── atomos-ui.d.ts        # ⚠️ Delete when real types available
│   │
│   └── index.ts                   # Public exports
│
├── demo/                          # Demo app (works as-is)
├── packages/
│   └── atomos-ui-mock/           # ⚠️ Can be deleted after linking
│
├── pnpm-workspace.yaml           # ⚠️ Update to include real libraries
└── package.json                  # ✅ Already has workspace deps

External dependencies (to be linked):
../formular.dev/                  # Clone from github.com/binaryjack/formular.dev
../atomos.dev/                    # Clone from github.com/binaryjack/atomos.dev
```

## Questions to Resolve

1. **Formular.dev Structure**: What's the exact export structure?
   - Does it export ServiceManager directly?
   - What's the exact API for creating forms?
   
2. **Atomos UI Integration**: How does FormProvider actually work?
   - What props does it accept?
   - How do field components consume context?
   
3. **Event System**: Does formular.dev have built-in events?
   - Or do we need to poll state changes?
   - What's the best pattern for change detection?

## Recommended Next Action

**Option 1: Link Local Repositories**
```bash
# If you have formular.dev and atomos.dev locally
cd E:\Sources\formular-atomos
# Update pnpm-workspace.yaml
# Run pnpm install
```

**Option 2: Use GitHub Submodules**
```bash
git submodule add https://github.com/binaryjack/formular.dev.git external/formular.dev
git submodule add https://github.com/binaryjack/atomos.dev.git external/atomos.dev
# Update pnpm-workspace.yaml
# Run pnpm install
```

**Option 3: Examine Actual Library APIs First**
Before full integration, create a spike/prototype to understand:
1. How formular.dev actually initializes
2. How @atomos/ui FormProvider works
3. What the real IFieldDescriptor interface looks like
4. How validation events are emitted

Would you like me to:
- A) Proceed with examining formular.dev's actual API?
- B) Create a prototype integration with mock data?
- C) Document the remaining TODOs in more detail?
