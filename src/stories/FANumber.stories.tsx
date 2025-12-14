import type { Meta, StoryObj } from '@storybook/react'
import { FANumber } from '../components/FANumber'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

const meta: Meta<typeof FANumber> = {
  title: 'Components/FANumber',
  component: FANumber,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'age',
          type: 'number',
          label: 'Age',
          required: true,
          validation: {
            formular: { min: 18, max: 120 }
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
type Story = StoryObj<typeof FANumber>

export const Default: Story = {
  args: {
    id: 'age',
    placeholder: 'Enter your age'
  }
}

export const WithRange: Story = {
  args: {
    id: 'age',
    placeholder: 'Enter your age',
    min: 18,
    max: 120,
    helpText: 'Must be 18 or older'
  }
}

export const WithStep: Story = {
  args: {
    id: 'age',
    placeholder: 'Enter your age',
    step: 5,
    helpText: 'Age in 5-year increments'
  }
}
