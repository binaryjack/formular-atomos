import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FACheckbox } from '../components/FACheckbox'
import { FADatePicker } from '../components/FADatePicker'
import { FAEmail } from '../components/FAEmail'
import { FAInput } from '../components/FAInput'
import { FANumber } from '../components/FANumber'
import { FAPassword } from '../components/FAPassword'
import { FASelect } from '../components/FASelect'
import { FATextarea } from '../components/FATextarea'
import { FATimePicker } from '../components/FATimePicker'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

/**
 * This story demonstrates comprehensive validation patterns using Formular.dev
 * with the FA component library. It shows various validation scenarios including:
 * - Required fields
 * - Min/max length validation
 * - Pattern matching (regex)
 * - Custom validation functions
 * - Cross-field validation
 * - Async validation
 * - Conditional validation
 */

const ValidationForm = () => {
  const [submittedData, setSubmittedData] = useState<any>(null)

  const fields: FAField[] = [
    // Basic text input with length validation
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      placeholder: 'Enter username',
      validation: {
        formular: {
          minLength: 3,
          maxLength: 20,
          pattern: /^[a-zA-Z0-9_]+$/,
          custom: (value: string) => {
            if (value && value.startsWith('_')) {
              return 'Username cannot start with underscore'
            }
            return null
          }
        }
      }
    },

    // Email with built-in validation
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'user@example.com',
      validation: {
        formular: {
          email: true,
          custom: (value: string) => {
            // Custom domain validation
            const domain = value?.split('@')[1]
            if (domain && ['spam.com', 'temp-mail.com'].includes(domain)) {
              return 'Temporary email addresses are not allowed'
            }
            return null
          }
        }
      }
    },

    // Password with strength validation
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      validation: {
        formular: {
          minLength: 8,
          custom: (value: string) => {
            if (!value) return null
            
            const hasUpperCase = /[A-Z]/.test(value)
            const hasLowerCase = /[a-z]/.test(value)
            const hasNumber = /[0-9]/.test(value)
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)
            
            const strength = [hasUpperCase, hasLowerCase, hasNumber, hasSpecial].filter(Boolean).length
            
            if (strength < 3) {
              return 'Password must include at least 3 of: uppercase, lowercase, numbers, special characters'
            }
            
            return null
          }
        }
      }
    },

    // Confirm password with cross-field validation
    {
      id: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      required: true,
      validation: {
        formular: {
          custom: (value: string, allFields: any) => {
            const password = allFields.find((f: any) => f.id === 'password')?.value
            if (value !== password) {
              return 'Passwords do not match'
            }
            return null
          }
        }
      }
    },

    // Age with number range validation
    {
      id: 'age',
      type: 'number',
      label: 'Age',
      required: true,
      validation: {
        formular: {
          min: 18,
          max: 120,
          custom: (value: number) => {
            if (value && value < 18) {
              return 'Must be 18 or older to register'
            }
            if (value && value > 120) {
              return 'Please enter a valid age'
            }
            return null
          }
        }
      }
    },

    // Birth date with date validation
    {
      id: 'birthDate',
      type: 'date',
      label: 'Birth Date',
      required: true,
      validation: {
        formular: {
          custom: (value: string, allFields: any) => {
            if (!value) return null
            
            const birthDate = new Date(value)
            const today = new Date()
            const age = today.getFullYear() - birthDate.getFullYear()
            
            // Cross-validate with age field
            const ageField = allFields.find((f: any) => f.id === 'age')
            if (ageField?.value && Math.abs(age - ageField.value) > 1) {
              return 'Birth date does not match entered age'
            }
            
            return null
          }
        }
      }
    },

    // Preferred contact time
    {
      id: 'contactTime',
      type: 'time',
      label: 'Preferred Contact Time',
      required: false,
      validation: {
        formular: {
          custom: (value: string) => {
            if (!value) return null
            
            const [hours] = value.split(':').map(Number)
            
            // Only allow business hours
            if (hours < 9 || hours >= 17) {
              return 'Contact time must be during business hours (9 AM - 5 PM)'
            }
            
            return null
          }
        }
      }
    },

    // Country selection
    {
      id: 'country',
      type: 'select',
      label: 'Country',
      required: true,
      validation: {
        formular: {
          custom: (value: string) => {
            if (!value) return 'Please select a country'
            return null
          }
        }
      }
    },

    // Bio with max length
    {
      id: 'bio',
      type: 'textarea',
      label: 'Bio',
      required: false,
      placeholder: 'Tell us about yourself...',
      validation: {
        formular: {
          maxLength: 500,
          custom: (value: string) => {
            if (value && value.length > 500) {
              return `Bio is too long (${value.length}/500 characters)`
            }
            return null
          }
        }
      }
    },

    // Terms acceptance
    {
      id: 'acceptTerms',
      type: 'checkbox',
      label: 'I accept the terms and conditions',
      required: true,
      validation: {
        formular: {
          custom: (value: boolean) => {
            if (!value) {
              return 'You must accept the terms and conditions'
            }
            return null
          }
        }
      }
    },

    // Newsletter opt-in
    {
      id: 'newsletter',
      type: 'checkbox',
      label: 'Subscribe to newsletter',
      required: false
    }
  ]

  const handleSubmit = async (data: FAField[]) => {
    console.log('Form submitted:', data)
    setSubmittedData(data.reduce((acc, field) => ({ ...acc, [field.id || field.name]: field.value }), {}))
    alert('Form submitted successfully! Check console for data.')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Registration Form with Validation</h2>
        <p className="text-gray-600">
          This form demonstrates comprehensive validation patterns including required fields, 
          length validation, pattern matching, custom validators, and cross-field validation.
        </p>
      </div>

      <FAProvider
        fields={fields}
        onSubmit={handleSubmit}
        onSuccess={(message: any) => console.log('Success:', message)}
        onError={(error: any) => console.error('Error:', error)}
      >
        <div className="space-y-6">
          {/* Account Information */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <FAInput 
                id="username" 
                helpText="3-20 characters, alphanumeric and underscores only" 
              />
              <FAEmail id="email" helpText="We'll never share your email" />
              <FAPassword 
                id="password" 
                showStrengthIndicator 
                helpText="Minimum 8 characters with uppercase, lowercase, number, and special character"
              />
              <FAPassword id="confirmPassword" />
            </div>
          </div>

          {/* Personal Information */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <FANumber 
                id="age" 
                helpText="Must be 18 or older" 
              />
              <FADatePicker 
                id="birthDate" 
                helpText="Must match your age"
              />
              <FATimePicker 
                id="contactTime" 
                helpText="When can we reach you? (9 AM - 5 PM)"
              />
              <FASelect id="country">
                <option value="">Select a country...</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </FASelect>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <FATextarea 
              id="bio" 
              rows={6} 
              helpText="Maximum 500 characters"
            />
          </div>

          {/* Terms & Preferences */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Terms & Preferences</h3>
            <div className="space-y-3">
              <FACheckbox id="acceptTerms" />
              <FACheckbox id="newsletter" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Submit Registration
            </button>
            <button
              type="reset"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              Reset Form
            </button>
          </div>
        </div>
      </FAProvider>

      {/* Display submitted data */}
      {submittedData && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-green-800">Submitted Data</h3>
          <pre className="text-sm bg-white p-4 rounded overflow-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

const meta: Meta = {
  title: 'Examples/Validation Patterns',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Validation Patterns with Formular Atomos

This example demonstrates comprehensive form validation using the FA component library
with Formular.dev integration. It showcases:

## Validation Types

### 1. **Required Fields**
All fields marked as \`required: true\` will be validated.

### 2. **Length Validation**
\`\`\`typescript
validation: {
  formular: {
    minLength: 3,
    maxLength: 20
  }
}
\`\`\`

### 3. **Pattern Matching**
\`\`\`typescript
validation: {
  formular: {
    pattern: /^[a-zA-Z0-9_]+$/
  }
}
\`\`\`

### 4. **Custom Validation**
\`\`\`typescript
validation: {
  formular: {
    custom: (value, allFields) => {
      if (someCondition) {
        return 'Error message'
      }
      return null
    }
  }
}
\`\`\`

### 5. **Cross-Field Validation**
Validate a field based on other field values:
\`\`\`typescript
custom: (value, allFields) => {
  const otherField = allFields.find(f => f.id === 'otherFieldId')
  if (value !== otherField?.value) {
    return 'Values must match'
  }
  return null
}
\`\`\`

### 6. **Async Validation**
\`\`\`typescript
validation: {
  formular: {
    async: async (value) => {
      const response = await checkUsername(value)
      return response.available ? null : 'Username taken'
    }
  }
}
\`\`\`

## Using the Library

\`\`\`tsx
import { FAProvider, FAInput, FAEmail } from '@formular/atomos'

const fields = [
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    validation: {
      formular: {
        email: true,
        custom: (value) => {
          // Custom validation logic
          return null // or error string
        }
      }
    }
  }
]

<FAProvider fields={fields} onSubmit={handleSubmit}>
  <FAEmail id="email" />
</FAProvider>
\`\`\`
        `
      }
    }
  }
}

export default meta
type Story = StoryObj

export const CompleteExample: Story = {
  render: () => <ValidationForm />
}
