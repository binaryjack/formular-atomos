import type { Meta, StoryObj } from '@storybook/react'
import { FAPassword } from '../components/FAPassword'
import { FAProvider } from '../core/FAProvider'
import { FAPasswordField } from '../types/field.types'

const meta: Meta<typeof FAPassword> = {
  title: 'Components/FAPassword',
  component: FAPassword,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAPasswordField[] = [
        {
          id: 'password',
          type: 'password',
          label: 'Password',
          required: true,
          strength: 'medium',
          validation: {
            formular: { minLength: 8 }
          }
        }
      ]
      return (
        <FAProvider fields={fields} onSubmit={(data) => console.log(data)}>
          <Story />
        </FAProvider>
      )
    }
  ]
}

export default meta
type Story = StoryObj<typeof FAPassword>

export const MediumStrength: Story = {
  args: {
    id: 'password',
    placeholder: 'Enter password',
    strength: 'medium',
    helpText: 'At least 8 characters'
  }
}

export const StrongStrength: Story = {
  args: {
    id: 'password',
    placeholder: 'Enter password',
    strength: 'strong',
    helpText: 'At least 12 characters with mixed case, numbers, and symbols'
  }
}

export const Disabled: Story = {
  args: {
    id: 'password',
    placeholder: 'Enter password',
    disabled: true
  }
}
