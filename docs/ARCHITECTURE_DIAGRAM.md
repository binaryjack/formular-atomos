# Formular-Atomos Architecture Diagram

## Complete System Overview

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                            USER'S REACT APPLICATION                            │
└────────────────────────────────────┬──────────────────────────────────────────┘
                                     │
                                     │ imports
                                     ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                              PUBLIC API LAYER                                  │
│                          @formular/atomos exports                              │
│                                                                                 │
│  ┌────────────────┐    ┌────────────────┐    ┌─────────────────┐             │
│  │  FAProvider    │    │   FAInput      │    │   FASelect      │             │
│  │  (Context)     │    │   FACheckbox   │    │   FATextarea    │             │
│  └────────┬───────┘    │   FAToggle     │    │   FARadioGroup  │             │
│           │            │   FAEmail      │    │   FADatePicker  │             │
│           │            │   FAPassword   │    │   FATimePicker  │             │
│           │            │   FAPhone      │    │   FAFileUpload  │             │
│           │            └────────────────┘    └─────────────────┘             │
│           │                                                                    │
└───────────┼────────────────────────────────────────────────────────────────────┘
            │
            │ creates & manages
            ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                              BRIDGE LAYER                                      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                           FAAdapter                                      │  │
│  │                     (Orchestration Layer)                                │  │
│  │                                                                           │  │
│  │  Current Implementation:                                                 │  │
│  │  • Basic validation (fallback)                                           │  │
│  │  • Agent hooks (ready to activate)                                       │  │
│  │  • Event coordination                                                    │  │
│  │                                                                           │  │
│  │  When Libraries Linked:                                                  │  │
│  │  • Delegates to FormularAgent                                            │  │
│  │  • Manages SyncBridge                                                    │  │
│  │  • Handles AtomosAgent                                                   │  │
│  └────────────┬──────────────────────────────────────────┬──────────────────┘  │
│               │                                           │                     │
└───────────────┼───────────────────────────────────────────┼─────────────────────┘
                │                                           │
                │ initializes                               │ initializes
                ▼                                           ▼
┌───────────────────────────────────┐       ┌──────────────────────────────────┐
│      FORMULAR AGENT               │       │       ATOMOS AGENT               │
│    (Form Logic Manager)           │       │     (UI State Manager)           │
│                                   │       │                                  │
│  Responsibilities:                │       │  Responsibilities:               │
│  ✓ Initialize ServiceManager      │       │  ✓ Manage field states           │
│  ✓ Create Formular instances      │◄─────►│  ✓ Handle UI events              │
│  ✓ Validate fields                │  Sync │  ✓ Update errors                 │
│  ✓ Manage form state              │Bridge │  ✓ Track touched state           │
│  ✓ Handle submission              │       │  ✓ Control disabled state        │
│  ✓ Emit change events             │       │  ✓ Manage loading state          │
│                                   │       │                                  │
│  State:                           │       │  State:                          │
│  • isDirty: boolean               │       │  • fieldStates: Map<name, state> │
│  • isValid: boolean               │       │  • formState: FormState          │
│  • isBusy: boolean                │       │                                  │
│                                   │       │                                  │
│  Methods:                         │       │  Methods:                        │
│  • initialize()                   │       │  • initialize(fields)            │
│  • getData()                      │       │  • updateFieldValue()            │
│  • validate()                     │       │  • updateFieldError()            │
│  • submit()                       │       │  • updateFieldTouched()          │
│  • reset()                        │       │  • handleFieldChange()           │
│  • getField()                     │       │  • handleFieldBlur()             │
│  • setFieldValue()                │       │  • renderFields()                │
│                                   │       │                                  │
└────────────┬──────────────────────┘       └──────────────┬───────────────────┘
             │                                             │
             │ uses                                        │ uses
             ▼                                             ▼
┌───────────────────────────────────┐       ┌──────────────────────────────────┐
│       formular.dev                │       │         @atomos/ui               │
│    (Real Form Engine)             │       │      (Real UI Library)           │
│                                   │       │                                  │
│  Components:                      │       │  Components:                     │
│  • ServiceManager (IoC)           │       │  • FormProvider (Context)        │
│  • FormularManager (Lifecycle)    │       │  • FormField (Interface)         │
│  • Formular (Form Instance)       │       │  • FormState (State)             │
│  • ValidationManager (Rules)      │       │  • useFormContext (Hook)         │
│  • InputFactory (Field Creation)  │       │  • FormAdapter (Integration)     │
│  • ValueManager (Parse/Serialize) │       │                                  │
│  • DomManager (DOM Binding)       │       │  Features:                       │
│  • StyleManager (CSS)             │       │  • Reducer-based state           │
│  • NotificationManager (Events)   │       │  • Context propagation           │
│                                   │       │  • Component composition         │
│  Features:                        │       │  • Accessibility built-in        │
│  • 18+ validators                 │       │                                  │
│  • 6+ languages                   │       │                                  │
│  • 12+ countries                  │       │                                  │
│  • Validation caching             │       │                                  │
│  • Custom validators              │       │                                  │
│                                   │       │                                  │
└───────────────────────────────────┘       └──────────────────────────────────┘
```

## Data Flow Diagrams

### User Input Flow

```
User Types in Input
        │
        ▼
┌────────────────┐
│  DOM Event     │ onChange
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  FAInput       │ component catches event
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  FormProvider  │ context dispatch
│  (@atomos/ui)  │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  FAAdapter     │ handleChange(name, value)
└───────┬────────┘
        │
        ├──► Current: Update local state
        │
        └──► When Linked:
             │
             ▼
        ┌────────────────┐
        │  AtomosAgent   │ handleFieldChange(name, value)
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │  SyncBridge    │ prevent circular updates
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │ FormularAgent  │ setFieldValue(name, value)
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │  formular.dev  │ update field, trigger validation
        │   Formular     │
        └───────┬────────┘
                │
                ▼
        Validation Event Emitted
```

### Validation Flow

```
formular.dev Validates Field
        │
        ▼
┌────────────────┐
│ ValidationMgr  │ runs validators
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ FormularAgent  │ onFieldValidation(name, isValid, errors)
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  SyncBridge    │ forward to UI
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  AtomosAgent   │ updateFieldError(name, error)
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  FAAdapter     │ setFieldError(name, error)
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  FAProvider    │ update context state
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  FAInput       │ re-render with error message
└────────────────┘
        │
        ▼
User Sees Error Message
```

### Form Submission Flow

```
User Clicks Submit
        │
        ▼
┌────────────────┐
│  FAProvider    │ handleAtomosSubmit()
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  FAAdapter     │ submit()
└───────┬────────┘
        │
        ├──► Current: validateAll() → return fields if valid
        │
        └──► When Linked:
             │
             ▼
        ┌────────────────┐
        │ FormularAgent  │ submit()
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │  formular.dev  │ validate() → getData()
        │   Formular     │
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │ FormularAgent  │ onSubmitSuccess(data)
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │  FAAdapter     │ return validated data
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │  FAProvider    │ call user's onSubmit(data)
        └───────┬────────┘
                │
                ▼
        User's Callback Executes
```

## Agent Interaction Matrix

```
┌─────────────────┬──────────────────┬──────────────────┬──────────────────┐
│                 │ FormularAgent    │ AtomosAgent      │ SyncBridge       │
├─────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ FormularAgent   │        -         │ via SyncBridge   │ emits events     │
│                 │                  │ (indirect)       │ to bridge        │
├─────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ AtomosAgent     │ via SyncBridge   │        -         │ emits events     │
│                 │ (indirect)       │                  │ to bridge        │
├─────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ SyncBridge      │ listens & calls  │ listens & calls  │        -         │
│                 │ methods          │ methods          │                  │
└─────────────────┴──────────────────┴──────────────────┴──────────────────┘

Rule: Agents NEVER directly call each other
      All communication goes through SyncBridge
      This prevents circular updates and coupling
```

## State Management

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SINGLE SOURCE OF TRUTH                        │
│                                                                      │
│                          formular.dev                                │
│                         Formular Instance                            │
│                                                                      │
│  Fields: IFieldDescriptor[]                                         │
│  State: { isDirty, isValid, isBusy }                                │
│  Data: Record<string, unknown>                                      │
│                                                                      │
└──────────────────────┬──────────────────────────────────────────────┘
                       │
                       │ synchronized via
                       ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          UI REPRESENTATION                           │
│                                                                      │
│                          AtomosAgent                                 │
│                                                                      │
│  fieldStates: Map<name, FieldUIState>                               │
│  FieldUIState: { value, error, touched, disabled, loading }         │
│                                                                      │
└──────────────────────┬──────────────────────────────────────────────┘
                       │
                       │ consumed by
                       ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           REACT COMPONENTS                           │
│                                                                      │
│  FAInput, FASelect, FACheckbox, etc.                                │
│  Render UI based on field state                                     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Event System

```
FormularAgent Events               AtomosAgent Events
     │                                   │
     ├─ onFieldChange                   ├─ onFieldChange
     ├─ onFieldValidation               ├─ onFieldBlur
     ├─ onFormStateChange               └─ onFieldFocus
     ├─ onSubmitSuccess
     └─ onSubmitError
           │                                  │
           └──────────┬──────────────────────┘
                      │
                      ▼
              ┌──────────────┐
              │  SyncBridge  │
              │              │
              │  • Prevent   │
              │    circular  │
              │    updates   │
              │              │
              │  • Debug     │
              │    logging   │
              │              │
              │  • Manual    │
              │    sync      │
              └──────────────┘
```

## File Dependencies

```
src/index.ts
    │
    ├─► src/core/FAProvider.tsx
    │       │
    │       └─► src/core/FAAdapter.ts
    │               │
    │               ├─► src/agents/FormularAgent.ts
    │               │       │
    │               │       └─► formular.dev (external)
    │               │
    │               ├─► src/agents/AtomosAgent.ts
    │               │       │
    │               │       └─► @atomos/ui (external)
    │               │
    │               └─► src/agents/SyncBridge.ts
    │                       │
    │                       └─► (coordinates above two)
    │
    └─► src/components/FAInput.tsx
            │
            └─► @atomos/ui FormProvider (external)
```

## Type Flow

```
User's Code
    │
    │ uses
    ▼
FAField (public type)
    │
    │ converted to
    ▼
IFieldDescriptor (formular.dev)
    │
    │ used by
    ▼
FormularAgent
    │
    │ emits
    ▼
Events { name, value, errors }
    │
    │ processed by
    ▼
SyncBridge
    │
    │ updates
    ▼
AtomosAgent
    │
    │ exposes as
    ▼
FieldUIState
    │
    │ rendered by
    ▼
@atomos/ui Components
```

---

## Integration Status

### ✅ Currently Implemented
- All agent classes with complete interfaces
- SyncBridge architecture
- FAAdapter with agent hooks
- Event system design
- Type definitions

### ⏳ Waiting for Library Linking
- Real formular.dev initialization
- Real @atomos/ui integration
- Uncomment agent activation
- Replace mock types

### 🎯 Zero Changes Needed After Linking
- Public API (FAProvider, components)
- Demo application code
- Component implementations
- Type exports (just update sources)

---

This architecture ensures:
1. ✅ Clean separation of concerns
2. ✅ Single source of truth (formular.dev)
3. ✅ Unidirectional data flow (with sync)
4. ✅ No circular dependencies
5. ✅ Easy to test each layer
6. ✅ Progressive enhancement
7. ✅ Type safety throughout
