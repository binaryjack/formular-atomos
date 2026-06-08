/**
 * SyncBridge - Bidirectional synchronization between FormularAgent and AtomosAgent
 * 
 * Responsibilities:
 * - Connect FormularAgent events to AtomosAgent updates
 * - Connect AtomosAgent events to FormularAgent updates
 * - Ensure consistent state between both agents
 * - Prevent circular update loops
 */

import { AtomosAgent, type AtomosAgentEvents } from './AtomosAgent';
import { FormularAgent, type FormularAgentEvents } from './FormularAgent';

export interface SyncBridgeConfig {
  /** Debounce delay for field changes in ms (default: 0) */
  debounceMs?: number;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * SyncBridge - The connector between FormularAgent and AtomosAgent
 */
export class SyncBridge {
  private formularAgent: FormularAgent;
  private atomosAgent: AtomosAgent;
  private config: SyncBridgeConfig;
  private isUpdating: boolean = false;

  constructor(
    formularAgent: FormularAgent,
    atomosAgent: AtomosAgent,
    config?: SyncBridgeConfig
  ) {
    this.formularAgent = formularAgent;
    this.atomosAgent = atomosAgent;
    this.config = config || {};
  }

  /**
   * Initialize the sync bridge
   * Sets up all event listeners between agents
   */
  initialize(): void {
    this.log('Initializing SyncBridge');
    this.setupFormularToAtomosSync();
    this.setupAtomosToFormularSync();
  }

  /**
   * Set up events from FormularAgent to AtomosAgent
   * When Formular detects changes, update Atomos UI
   */
  private setupFormularToAtomosSync(): void {
    const _formularEvents: Partial<FormularAgentEvents> = {
      // When a field value changes in Formular, update Atomos UI
      onFieldChange: (fieldName: string, value: unknown) => {
        if (this.isUpdating) return;
        this.log(`Formular -> Atomos: Field ${fieldName} changed to`, value);
        this.isUpdating = true;
        this.atomosAgent.updateFieldValue(fieldName, value);
        this.isUpdating = false;
      },

      // When a field validation occurs in Formular, update Atomos UI errors
      onFieldValidation: (fieldName: string, isValid: boolean, errors: string[]) => {
        if (this.isUpdating) return;
        this.log(`Formular -> Atomos: Field ${fieldName} validation`, { isValid, errors });
        this.isUpdating = true;
        this.atomosAgent.updateFieldError(fieldName, isValid ? undefined : errors[0]);
        this.isUpdating = false;
      },

      // When form state changes in Formular, update Atomos UI states
      onFormStateChange: (state) => {
        if (this.isUpdating) return;
        this.log('Formular -> Atomos: Form state changed', state);
        // TODO: Update Atomos form-level states (busy, dirty, etc.)
      },

      // When submit succeeds in Formular
      onSubmitSuccess: (data) => {
        this.log('Formular -> Atomos: Submit success', data);
        // TODO: Handle submit success in UI
      },

      // When submit fails in Formular
      onSubmitError: (error) => {
        this.log('Formular -> Atomos: Submit error', error);
        // TODO: Handle submit error in UI
      },
    };

    // TODO: Attach these events to FormularAgent
    // This will be done when FormularAgent supports event registration
  }

  /**
   * Set up events from AtomosAgent to FormularAgent
   * When user interacts with UI, update Formular logic
   */
  private setupAtomosToFormularSync(): void {
    const _atomosEvents: Partial<AtomosAgentEvents> = {
      // When user changes a field in UI, update Formular
      onFieldChange: (fieldName: string, value: unknown) => {
        if (this.isUpdating) return;
        this.log(`Atomos -> Formular: Field ${fieldName} changed to`, value);
        this.isUpdating = true;
        this.formularAgent.setFieldValue(fieldName, value);
        this.isUpdating = false;
      },

      // When user blurs a field in UI, trigger validation in Formular
      onFieldBlur: (fieldName: string) => {
        if (this.isUpdating) return;
        this.log(`Atomos -> Formular: Field ${fieldName} blurred`);
        // TODO: Trigger field validation in Formular
      },

      // When user focuses a field in UI
      onFieldFocus: (fieldName: string) => {
        this.log(`Atomos -> Formular: Field ${fieldName} focused`);
        // Optional: Could trigger field-specific logic in Formular
      },
    };

    // TODO: Attach these events to AtomosAgent
    // This will be done when AtomosAgent supports event registration
  }

  /**
   * Manually sync Formular state to Atomos
   * Useful for initial sync or refresh
   */
  syncFormularToAtomos(): void {
    this.log('Manual sync: Formular -> Atomos');
    try {
      this.isUpdating = true;
      const formData = this.formularAgent.getData();
      
      Object.entries(formData).forEach(([fieldName, value]) => {
        this.atomosAgent.updateFieldValue(fieldName, value);
      });

      // TODO: Sync validation states
      // TODO: Sync form-level states (dirty, valid, busy)
    } finally {
      this.isUpdating = false;
    }
  }

  /**
   * Manually sync Atomos state to Formular
   * Useful for initial sync or refresh
   */
  syncAtomosToFormular(): void {
    this.log('Manual sync: Atomos -> Formular');
    try {
      this.isUpdating = true;
      const fieldStates = this.atomosAgent.getAllFieldStates();
      
      fieldStates.forEach((state, fieldName) => {
        this.formularAgent.setFieldValue(fieldName, state.value);
      });
    } finally {
      this.isUpdating = false;
    }
  }

  /**
   * Debug logging
   */
  private log(message: string, data?: unknown): void {
    if (this.config.debug) {
      if (data !== undefined) {
        console.log(`[SyncBridge] ${message}`, data);
      } else {
        console.log(`[SyncBridge] ${message}`);
      }
    }
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    this.log('Disposing SyncBridge');
    // TODO: Remove event listeners
    this.isUpdating = false;
  }
}
