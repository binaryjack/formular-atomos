/**
 * Type exports for formular-atomos
 * Re-exports types from formular.dev and @atomos/ui for convenience
 */

// Re-export Formular.dev types
export type {
    IDomManager, IExtendedInput, IFieldDescriptor,
    IFormDescriptor, IFormular, IFormularManager, IInputFactory, INotificationManager, IServiceManager, IStyleManager, IValidationManager, IValueManager
} from 'formular.dev';

// Re-export Atomos UI types
export type {
    FormAdapter, FormField, FormState
} from '@atomos/ui';

// Re-export local agent types
export type {
    AtomosAgentConfig,
    AtomosAgentEvents,
    FieldUIState, FormularAgentConfig,
    FormularAgentEvents, SyncBridgeConfig
} from '../agents';

// Re-export existing local types
export * from './component.types';
export * from './country.types';
export * from './field.types';
export * from './validation.types';

