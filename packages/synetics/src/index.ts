import { createSignal, createContext, useContext, t_element, insert, createEffect } from '@synetics/synetics.dev';

// Types
export interface FormularContextValue {
  schema: any;
  getValue: (name: string) => any;
  setValue: (name: string, value: any) => void;
  getError: (name: string) => string | null;
  setError: (name: string, error: string | null) => void;
  setTouched: (name: string, isTouched: boolean) => void;
  isTouched: (name: string) => boolean;
}

const FormContext = createContext<FormularContextValue>();

// Provider Component
export function FormProvider(props: {
  form: any;
  onSubmit: (data: any) => void;
  children?: any;
}) {
  const [values, setValues] = createSignal<Record<string, any>>({});
  const [errors, setErrors] = createSignal<Record<string, string | null>>({});
  const [touched, setTouched] = createSignal<Record<string, boolean>>({});

  const getValue = (name: string) => values()[name] || '';
  const getError = (name: string) => errors()[name] || null;
  const isTouchedFn = (name: string) => touched()[name] || false;

  const validateField = (name: string, val: any) => {
    if (props.form && props.form.shape && props.form.shape[name]) {
      const fieldSchema = props.form.shape[name];
      const result = fieldSchema.safeParse(val);
      setErrors(prev => ({ ...prev, [name]: result.success ? null : result.error.message }));
      return result.success;
    }
    return true;
  };

  const setValue = (name: string, val: any) => {
    setValues(prev => ({ ...prev, [name]: val }));
    validateField(name, val);
  };

  const setTouchedFn = (name: string, isTouchedState: boolean) => {
    setTouched(prev => ({ ...prev, [name]: isTouchedState }));
    validateField(name, getValue(name));
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    let isValid = true;
    const currentValues = values();
    const newTouched: Record<string, boolean> = {};

    if (props.form && props.form.shape) {
      Object.keys(props.form.shape).forEach(key => {
        newTouched[key] = true;
        const result = props.form.shape[key].safeParse(currentValues[key]);
        if (!result.success) {
          isValid = false;
          setErrors(prev => ({ ...prev, [key]: result.error.message }));
        }
      });
      setTouched(prev => ({ ...prev, ...newTouched }));
    }

    if (isValid && props.form) {
      const data = props.form.parse(currentValues);
      props.onSubmit(data);
    }
  };

  const contextValue: FormularContextValue = {
    schema: props.form,
    getValue,
    setValue,
    getError,
    setError: (name, err) => setErrors(prev => ({ ...prev, [name]: err })),
    setTouched: setTouchedFn,
    isTouched: isTouchedFn
  };

  return t_element('form', { onSubmit: handleSubmit }, 
    t_element(FormContext.Provider, { value: contextValue }, props.children)
  );
}

// Hook
export function useFormularField(name: string) {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormularField must be used within FormProvider");

  return {
    get value() { return ctx.getValue(name); },
    get error() { return ctx.getError(name); },
    get isTouched() { return ctx.isTouched(name); },
    onChange: (e: any) => ctx.setValue(name, e.target.value),
    onBlur: () => ctx.setTouched(name, true)
  };
}

// UI Components
export function Input(props: { name: string; type?: string; placeholder?: string; id?: string }) {
  const field = useFormularField(props.name);

  return t_element('div', { class: 'mb-4' }, [
    t_element('label', { class: 'block text-sm font-medium text-slate-300 mb-1', for: props.id || props.name }, props.name),
    t_element('input', {
      id: props.id || props.name,
      name: props.name,
      type: props.type || 'text',
      placeholder: props.placeholder,
      class: () => `w-full bg-[#08080a] border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 transition-all ${field.error && field.isTouched ? 'border-red-500 focus:ring-red-500/50' : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/50'}`,
      value: () => field.value,
      onInput: field.onChange,
      onBlur: field.onBlur
    }),
    () => field.error && field.isTouched ? t_element('p', { class: 'text-red-400 text-xs mt-1' }, field.error) : null
  ]);
}

export function Button(props: { type?: string; children?: any; class?: string }) {
  return t_element('button', {
    type: props.type || 'button',
    class: `px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors ${props.class || ''}`
  }, props.children);
}
