import type { Meta, StoryObj } from '@storybook/react'
import { FACheckbox } from '../components/FACheckbox'
import { FADatePicker } from '../components/FADatePicker'
import { FAEmail } from '../components/FAEmail'
import { FAInput } from '../components/FAInput'
import { FANumber } from '../components/FANumber'
import { FAPassword } from '../components/FAPassword'
import { FASelect } from '../components/FASelect'
import { FASet } from '../components/FASet'
import { FATextarea } from '../components/FATextarea'
import { FATimePicker } from '../components/FATimePicker'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

/**
 * FASet is a container component that groups form fields together.
 * It provides consistent spacing, optional fieldset/legend wrapper, and clean API.
 * 
 * Use FASet to organize your form fields into logical sections.
 */

const meta: Meta<typeof FASet> = {
  title: 'Components/FASet',
  component: FASet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## FASet - Field Container Component

The \`FASet\` component provides a convenient way to group form fields with consistent spacing and optional fieldset wrapper.

### Features
- **Automatic Spacing**: Consistent gaps between fields (sm/md/lg)
- **Fieldset Wrapper**: Optional semantic HTML fieldset with legend
- **Flexible Layout**: Can render as fieldset or simple div container
- **Disabled Support**: Disable all child fields at once

### Basic Usage

\`\`\`tsx
import { FAProvider, FASet, FAInput, FAEmail } from '@formular/atomos'

const fields = [
  { id: 'name', name: 'name', type: 'text', label: 'Full Name', required: true },
  { id: 'email', name: 'email', type: 'email', label: 'Email', required: true }
]

<FAProvider fields={fields} onSubmit={handleSubmit}>
  <FASet legend="Contact Information">
    <FAInput id="name" />
    <FAEmail id="email" />
  </FASet>
</FAProvider>
\`\`\`

### Spacing Options

\`\`\`tsx
<FASet spacing="sm">   {/* 12px gap */}
<FASet spacing="md">   {/* 16px gap - default */}
<FASet spacing="lg">   {/* 24px gap */}
\`\`\`

### Without Fieldset

\`\`\`tsx
<FASet asFieldset={false} legend="Section Title">
  {/* Renders as div instead of fieldset */}
</FASet>
\`\`\`
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof FASet>

const sampleFields: FAField[] = [
  {
    id: 'firstName',
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    required: true,
    validation: {
      required: true,
      minLength: 2
    }
  },
  {
    id: 'lastName',
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    required: true,
    validation: {
      required: true,
      minLength: 2
    }
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Email Address',
    required: true,
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: 'Please enter a valid email address'
    }
  }
]

export const Default: Story = {
  render: () => (
    <FAProvider fields={sampleFields} onSubmit={(data) => console.log(data)}>
      <FASet legend="Personal Information">
        <FAInput id="firstName" placeholder="John" />
        <FAInput id="lastName" placeholder="Doe" />
        <FAEmail id="email" placeholder="john@example.com" />
      </FASet>
    </FAProvider>
  )
}

export const WithSmallSpacing: Story = {
  render: () => (
    <FAProvider fields={sampleFields} onSubmit={(data) => console.log(data)}>
      <FASet legend="Compact Form" spacing="sm">
        <FAInput id="firstName" />
        <FAInput id="lastName" />
        <FAEmail id="email" />
      </FASet>
    </FAProvider>
  )
}

export const WithLargeSpacing: Story = {
  render: () => (
    <FAProvider fields={sampleFields} onSubmit={(data) => console.log(data)}>
      <FASet legend="Spacious Form" spacing="lg">
        <FAInput id="firstName" />
        <FAInput id="lastName" />
        <FAEmail id="email" />
      </FASet>
    </FAProvider>
  )
}

export const WithoutFieldset: Story = {
  render: () => (
    <FAProvider fields={sampleFields} onSubmit={(data) => console.log(data)}>
      <FASet legend="Contact Details" asFieldset={false}>
        <FAInput id="firstName" />
        <FAInput id="lastName" />
        <FAEmail id="email" />
      </FASet>
    </FAProvider>
  )
}

export const MultipleFieldSets: Story = {
  render: () => {
    const allFields: FAField[] = [
      ...sampleFields,
      {
        id: 'age',
        name: 'age',
        type: 'number',
        label: 'Age',
        required: true,
        validation: {
          required: true,
          min: 18,
          max: 120
        }
      },
      {
        id: 'birthDate',
        name: 'birthDate',
        type: 'date',
        label: 'Birth Date',
        required: true
      },
      {
        id: 'preferredTime',
        name: 'preferredTime',
        type: 'time',
        label: 'Preferred Contact Time'
      },
      {
        id: 'country',
        name: 'country',
        type: 'select',
        label: 'Country',
        required: true,
        validation: {
          required: true
        }
      },
      {
        id: 'bio',
        name: 'bio',
        type: 'textarea',
        label: 'Bio',
        validation: {
          maxLength: 500
        }
      },
      {
        id: 'newsletter',
        name: 'newsletter',
        type: 'checkbox',
        label: 'Subscribe to newsletter'
      }
    ]

    return (
      <FAProvider fields={allFields} onSubmit={(data) => console.log(data)}>
        <div className="space-y-6 max-w-2xl">
          <FASet legend="Personal Information" spacing="md">
            <FAInput id="firstName" helpText="Your legal first name" />
            <FAInput id="lastName" helpText="Your legal last name" />
            <FAEmail id="email" helpText="We'll never share your email" />
          </FASet>

          <FASet legend="Additional Details" spacing="md">
            <FANumber id="age" helpText="Must be 18 or older" />
            <FADatePicker id="birthDate" />
            <FATimePicker id="preferredTime" helpText="When can we reach you?" />
          </FASet>

          <FASet legend="Location & Preferences" spacing="md">
            <FASelect id="country">
              <option value="">Select a country...</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </FASelect>
            <FATextarea id="bio" rows={4} helpText="Tell us about yourself (max 500 characters)" />
            <FACheckbox id="newsletter" />
          </FASet>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Submit Form
            </button>
            <button
              type="reset"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </FAProvider>
    )
  }
}

export const DisabledFieldSet: Story = {
  render: () => (
    <FAProvider fields={sampleFields} onSubmit={(data) => console.log(data)}>
      <FASet legend="Disabled Section" disabled>
        <FAInput id="firstName" />
        <FAInput id="lastName" />
        <FAEmail id="email" />
      </FASet>
    </FAProvider>
  )
}

export const NestedLayout: Story = {
  render: () => {
    const passwordFields: FAField[] = [
      {
        id: 'password',
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        validation: {
          required: true,
          minLength: 8
        }
      },
      {
        id: 'confirmPassword',
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        required: true,
        validation: {
          required: true
        }
      }
    ]

    return (
      <FAProvider fields={[...sampleFields, ...passwordFields]} onSubmit={(data) => console.log(data)}>
        <div className="max-w-2xl space-y-6">
          <FASet legend="Account Setup" spacing="lg">
            <FASet legend="Basic Info" asFieldset={false} spacing="sm">
              <FAInput id="firstName" />
              <FAInput id="lastName" />
              <FAEmail id="email" />
            </FASet>

            <FASet legend="Security" asFieldset={false} spacing="sm">
              <FAPassword id="password" showStrengthIndicator />
              <FAPassword id="confirmPassword" />
            </FASet>
          </FASet>
        </div>
      </FAProvider>
    )
  }
}
