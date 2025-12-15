'use client'

import type { FAField } from '@formular/atomos'
import { FAInput, FASet } from '@formular/atomos'
import { FormDemo } from '../../../components/FormDemo'

const loginFields: FAField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Email is required' },
      email: { value: true, message: 'Please enter a valid email address' },
      guide: 'Enter your registered email address',
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Password is required' },
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      guide: 'Enter your password (minimum 8 characters)',
    },
  },
]

const codeExample = `import { FAProvider, FAInput, FASet } from '@formular/atomos'

function LoginForm() {
  const handleSubmit = async (data: FAField[]) => {
    // Process login with validated data
    console.log('Login data:', data)
  }

  return (
    <FAProvider fields={loginFields} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <FASet id="email">
          <FAInput id="email" />
        </FASet>

        <FASet id="password">
          <FAInput id="password" />
        </FASet>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Sign In
        </button>
      </div>
    </FAProvider>
  )
}`

const configExample = `const loginFields: FAField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Email is required' },
      email: { value: true, message: 'Please enter a valid email address' },
      guide: 'Enter your registered email address',
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Password is required' },
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      guide: 'Enter your password (minimum 8 characters)',
    },
  },
]`

export function LoginFormExample() {
  return (
    <FormDemo
      formName="login-form"
      title="Login Form"
      description="A simple authentication form demonstrating email validation, password requirements, and real-time field validation with helpful guidance."
      fields={loginFields}
      codeExample={codeExample}
      configExample={configExample}
    >
      <div className="space-y-4">
        <FASet id="email">
          <FAInput id="email" />
        </FASet>

        <FASet id="password">
          <FAInput id="password" />
        </FASet>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Sign In
        </button>
      </div>
    </FormDemo>
  )
}
