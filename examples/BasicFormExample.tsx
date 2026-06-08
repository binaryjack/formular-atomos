/**
 * Basic Form Example
 * 
 * Demonstrates a simple registration form with text, email, password,
 * and checkbox inputs using @formular/atomos
 */

import {
    FACheckbox,
    FAEmail,
    FAField,
    FAInput,
    FAPassword,
    FAProvider
} from '@formular/atomos'

export function BasicFormExample() {
  const fields: FAField[] = [
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      validation: {
        formular: { minLength: 3, maxLength: 20 }
      }
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      validation: {
        formular: { email: true }
      }
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      strength: 'medium',
      validation: {
        formular: { minLength: 8 }
      }
    },
    {
      id: 'terms',
      type: 'checkbox',
      label: 'I agree to the terms and conditions',
      required: true
    }
  ]

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data)
    alert('Registration successful! Check the console for data.')
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      
      <FAProvider fields={fields} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FAInput
            id="username"
            placeholder="Choose a username"
            helpText="3-20 characters"
          />

          <FAEmail
            id="email"
            placeholder="you@example.com"
            helpText="We'll never share your email"
          />

          <FAPassword
            id="password"
            placeholder="Enter a secure password"
            strength="medium"
            helpText="At least 8 characters"
          />

          <FACheckbox id="terms" />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </div>
      </FAProvider>
    </div>
  )
}
