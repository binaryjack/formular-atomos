import type { Meta, StoryObj } from '@storybook/react'
import { FACheckbox } from '../components/FACheckbox'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

const meta: Meta<typeof FACheckbox> = {
  title: 'Components/FACheckbox',
  component: FACheckbox,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'terms',
          type: 'checkbox',
          label: 'I agree to the terms and conditions',
          required: true
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
type Story = StoryObj<typeof FACheckbox>

export const Default: Story = {
  args: {
    id: 'terms'
  }
}

export const WithHelpText: Story = {
  args: {
    id: 'terms',
    helpText: 'You must accept to continue'
  }
}

export const Disabled: Story = {
  args: {
    id: 'terms',
    disabled: true
  }
}
