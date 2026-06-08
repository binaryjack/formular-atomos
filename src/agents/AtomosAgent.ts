/**
 * AtomosAgent - Manages all UI rendering using @atomos/ui
 * 
 * Responsibilities:
 * - Initialize Atomos FormProvider
 * - Render form fields using Atomos components
 * - Handle user interactions (onChange, onBlur, etc.)
 * - Update UI state based on FormularAgent events
 * - Emit UI events to FormularAgent via SyncBridge
 */

import type { FormState } from '@atomos/ui';

export interface AtomosAgentConfig {
  /** Initial form state */
  initialState?: Partial<FormState>;
  /** Custom field renderers */
  customRenderers?: Record<string, React.ComponentType<unknown>>;
}

export interface AtomosAgentEvents {
  onFieldChange: (fieldName: string, value: unknown) => void;
  onFieldBlur: (fieldName: string) => void;
  onFieldFocus: (fieldName: string) => void;
}

export interface FieldUIState {
  value: unknown;
  error?: string;
  touched: boolean;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * AtomosAgent - The UI layer of the form
 */
export class AtomosAgent {
  private config: AtomosAgentConfig;
  private events: Partial<AtomosAgentEvents>;
  private fieldStates: Map<string, FieldUIState>;
  private formState: FormState | null = null;

  constructor(config?: AtomosAgentConfig, events?: Partial<AtomosAgentEvents>) {
    this.config = config || {};
    this.events = events || {};
    this.fieldStates = new Map();
  }

  /**
   * Initialize the Atomos UI system
   */
  initialize(fields: Array<{ name: string; value?: unknown }>): void {
    // TODO: Initialize field states from field descriptors
    // TODO: Set up FormProvider initial state
    fields.forEach(field => {
      this.fieldStates.set(field.name, {
        value: field.value,
        touched: false,
        disabled: false,
        loading: false,
      });
    });
  }

  /**
   * Update a field value in the UI
   */
  updateFieldValue(fieldName: string, value: unknown): void {
    const state = this.fieldStates.get(fieldName);
    if (state) {
      state.value = value;
      this.fieldStates.set(fieldName, { ...state });
    }
  }

  /**
   * Update a field error in the UI
   */
  updateFieldError(fieldName: string, error?: string): void {
    const state = this.fieldStates.get(fieldName);
    if (state) {
      state.error = error;
      this.fieldStates.set(fieldName, { ...state });
    }
  }

  /**
   * Update a field touched state
   */
  updateFieldTouched(fieldName: string, touched: boolean): void {
    const state = this.fieldStates.get(fieldName);
    if (state) {
      state.touched = touched;
      this.fieldStates.set(fieldName, { ...state });
    }
  }

  /**
   * Update a field disabled state
   */
  updateFieldDisabled(fieldName: string, disabled: boolean): void {
    const state = this.fieldStates.get(fieldName);
    if (state) {
      state.disabled = disabled;
      this.fieldStates.set(fieldName, { ...state });
    }
  }

  /**
   * Update a field loading state
   */
  updateFieldLoading(fieldName: string, loading: boolean): void {
    const state = this.fieldStates.get(fieldName);
    if (state) {
      state.loading = loading;
      this.fieldStates.set(fieldName, { ...state });
    }
  }

  /**
   * Get current field state
   */
  getFieldState(fieldName: string): FieldUIState | undefined {
    return this.fieldStates.get(fieldName);
  }

  /**
   * Get all field states
   */
  getAllFieldStates(): Map<string, FieldUIState> {
    return new Map(this.fieldStates);
  }

  /**
   * Handle field change from UI
   */
  handleFieldChange(fieldName: string, value: unknown): void {
    this.updateFieldValue(fieldName, value);
    this.events.onFieldChange?.(fieldName, value);
  }

  /**
   * Handle field blur from UI
   */
  handleFieldBlur(fieldName: string): void {
    this.updateFieldTouched(fieldName, true);
    this.events.onFieldBlur?.(fieldName);
  }

  /**
   * Handle field focus from UI
   */
  handleFieldFocus(fieldName: string): void {
    this.events.onFieldFocus?.(fieldName);
  }

  /**
   * Render fields for React components
   * Returns field states that can be consumed by Atomos components
   */
  renderFields(): Array<{ name: string; state: FieldUIState }> {
    const fields: Array<{ name: string; state: FieldUIState }> = [];
    this.fieldStates.forEach((state, name) => {
      fields.push({ name, state });
    });
    return fields;
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    this.fieldStates.clear();
    this.formState = null;
  }
}
