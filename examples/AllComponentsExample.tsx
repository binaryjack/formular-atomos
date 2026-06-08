/**
 * All Components Example
 * 
 * Comprehensive example showcasing ALL 12 components from @formular/atomos
 * in a single form
 */

import {
    FACheckbox,
    FAEmail,
    FAField,
    FAFileUpload,
    FAInput,
    FANumber,
    FAPassword,
    FAPhone,
    FAPostalCode,
    FAProvider,
    FARadioGroup,
    FASelect,
    FATextarea,
    FAToggle
} from '@formular/atomos'

export function AllComponentsExample() {
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
      id: 'age',
      type: 'number',
      label: 'Age',
      required: true,
      validation: {
        formular: { min: 18, max: 120 }
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
      strength: 'strong',
      validation: {
        formular: { minLength: 12 }
      }
    },
    {
      id: 'bio',
      type: 'textarea',
      label: 'Biography',
      required: true,
      validation: {
        formular: { minLength: 50, maxLength: 500 }
      }
    },
    {
      id: 'terms',
      type: 'checkbox',
      label: 'I agree to the terms and conditions',
      required: true
    },
    {
      id: 'notifications',
      type: 'toggle',
      label: 'Enable email notifications',
      required: false
    },
    {
      id: 'plan',
      type: 'radio',
      label: 'Select a plan',
      required: true,
      options: [
        { value: 'free', label: 'Free' },
        { value: 'pro', label: 'Professional ($9.99/mo)' },
        { value: 'enterprise', label: 'Enterprise (Contact Sales)' }
      ]
    },
    {
      id: 'country',
      type: 'select',
      label: 'Country',
      required: true
    },
    {
      id: 'phone',
      type: 'phone',
      label: 'Phone Number',
      required: true,
      country: 'US',
      validation: {
        formular: { phone: 'US' }
      }
    },
    {
      id: 'postal',
      type: 'postal',
      label: 'Postal Code',
      required: true,
      country: 'US',
      validation: {
        formular: { postalCode: 'US' }
      }
    },
    {
      id: 'avatar',
      type: 'file',
      label: 'Profile Picture',
      required: false,
      maxSize: 5 * 1024 * 1024,
      accept: 'image/*'
    }
  ]

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Complete form submitted:', data)
    alert('All 12 components validated successfully! Check the console.')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-2">All Components Showcase</h2>
      <p className="text-gray-600 mb-6">
        This form demonstrates all 12 components from @formular/atomos
      </p>

      <FAProvider fields={fields} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Text Inputs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Text Inputs</h3>
            
            <FAInput
              id="username"
              placeholder="Choose a username"
              helpText="3-20 characters"
            />

            <FANumber
              id="age"
              placeholder="Your age"
              min={18}
              max={120}
              helpText="Must be 18 or older"
            />

            <FAEmail
              id="email"
              placeholder="you@example.com"
            />

            <FAPassword
              id="password"
              placeholder="Enter a strong password"
              strength="strong"
              helpText="At least 12 characters with mixed case, numbers, and symbols"
            />

            <FATextarea
              id="bio"
              rows={4}
              placeholder="Tell us about yourself..."
              helpText="50-500 characters"
            />
          </div>

          {/* Column 2: Choice & Special Inputs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Choices & Specialized</h3>

            <FACheckbox id="terms" />

            <FAToggle id="notifications" />

            <FARadioGroup
              id="plan"
              options={[
                { value: 'free', label: 'Free' },
                { value: 'pro', label: 'Professional ($9.99/mo)' },
                { value: 'enterprise', label: 'Enterprise (Contact Sales)' }
              ]}
            />

            <FASelect id="country">
              <option value="">Select a country...</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="de">Germany</option>
            </FASelect>

            <FAPhone id="phone" country="US" />

            <FAPostalCode id="postal" country="US" />

            <FAFileUpload
              id="avatar"
              accept="image/*"
              maxSize={5 * 1024 * 1024}
              helpText="Max file size: 5MB"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
          >
            Submit Complete Form
          </button>
        </div>
      </FAProvider>
    </div>
  )
}
