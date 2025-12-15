import type { Meta, StoryObj } from '@storybook/react'
import { FADatePicker } from '../components/FADatePicker'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

const meta: Meta<typeof FADatePicker> = {
  title: 'Components/FADatePicker',
  component: FADatePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'birthdate',
          type: 'date',
          label: 'Birth Date',
          required: true,
          validation: {
            formular: {
              custom: (value: any) => {
                if (!value) return 'Birth date is required'
                const date = new Date(value)
                const today = new Date()
                const age = today.getFullYear() - date.getFullYear()
                if (age < 18) return 'Must be 18 or older'
                if (age > 120) return 'Invalid birth date'
                return null
              }
            }
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
type Story = StoryObj<typeof FADatePicker>

export const Default: Story = {
  args: {
    id: 'birthdate'
  }
}

export const WithHelpText: Story = {
  args: {
    id: 'birthdate',
    helpText: 'You must be 18 or older'
  }
}

export const WithMinMax: Story = {
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'appointmentDate',
          type: 'date',
          label: 'Appointment Date',
          required: true,
          validation: {
            formular: {
              custom: (value: any) => {
                if (!value) return 'Please select a date'
                const date = new Date(value)
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                
                const maxDate = new Date()
                maxDate.setMonth(maxDate.getMonth() + 3)
                
                if (date < today) return 'Cannot select past dates'
                if (date > maxDate) return 'Cannot book more than 3 months ahead'
                return null
              }
            }
          }
        }
      ]
      return (
        <FAProvider fields={fields} onSubmit={(data) => console.log(data)}>
          <Story />
        </FAProvider>
      )
    }
  ],
  args: {
    id: 'appointmentDate',
    min: new Date(),
    max: (() => {
      const date = new Date()
      date.setMonth(date.getMonth() + 3)
      return date
    })(),
    helpText: 'Select a date within the next 3 months'
  }
}

export const Disabled: Story = {
  args: {
    id: 'birthdate',
    disabled: true
  }
}
