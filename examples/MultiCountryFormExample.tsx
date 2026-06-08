/**
 * Multi-Country Form Example
 * 
 * Demonstrates a contact form with country-specific phone and postal code
 * validation for multiple countries
 */

import {
    CountryCode,
    FAEmail,
    FAField,
    FAInput,
    FAPhone,
    FAPostalCode,
    FAProvider,
    FASelect,
    FATextarea
} from '@formular/atomos'
import { useState } from 'react'

export function MultiCountryFormExample() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('US')

  const getFields = (country: CountryCode): FAField[] => [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      validation: {
        formular: { minLength: 2 }
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
      country,
      validation: {
        formular: { phone: country }
      }
    },
    {
      id: 'postal',
      type: 'postal',
      label: 'Postal Code',
      required: true,
      country,
      validation: {
        formular: { postalCode: country }
      }
    },
    {
      id: 'address',
      type: 'textarea',
      label: 'Street Address',
      required: true,
      validation: {
        formular: { minLength: 10 }
      }
    }
  ]

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Contact form submitted:', data)
    alert(`Form submitted for ${selectedCountry}! Check the console.`)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">International Contact Form</h2>
      <p className="text-gray-600 mb-6">
        Select your country to see localized phone and postal code validation
      </p>

      <FAProvider fields={getFields(selectedCountry)} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FAInput id="name" placeholder="John Doe" />

          <FAEmail id="email" placeholder="john@example.com" />

          <FASelect
            id="country"
            onChange={(e) => setSelectedCountry(e.target.value as CountryCode)}
          >
            <option value="">Select a country...</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="CH">Switzerland</option>
            <option value="IT">Italy</option>
            <option value="ES">Spain</option>
            <option value="AT">Austria</option>
            <option value="NL">Netherlands</option>
            <option value="BE">Belgium</option>
            <option value="LU">Luxembourg</option>
          </FASelect>

          <FAPhone id="phone" country={selectedCountry} />

          <FAPostalCode id="postal" country={selectedCountry} />

          <FATextarea
            id="address"
            rows={3}
            placeholder="123 Main Street, Apt 4B"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Submit Contact Information
          </button>
        </div>
      </FAProvider>
    </div>
  )
}
