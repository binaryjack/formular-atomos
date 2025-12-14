import type { Meta, StoryObj } from '@storybook/react'
import { FARadioGroup } from '../components/FARadioGroup'
import { FAProvider } from '../core/FAProvider'
import { FARadioGroupField } from '../types/field.types'

const meta: Meta<typeof FARadioGroup> = {
  title: 'Components/FARadioGroup',
  component: FARadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FARadioGroupField[] = [
        {
          id: 'plan',
          type: 'radio',
          label: 'Select a plan',
          required: true,
          options: [
            { value: 'free', label: 'Free' },
            { value: 'pro', label: 'Professional' },
            { value: 'enterprise', label: 'Enterprise' }
          ]
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
type Story = StoryObj<typeof FARadioGroup>

export const Vertical: Story = {
  args: {
    id: 'plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Professional' },
      { value: 'enterprise', label: 'Enterprise' }
    ]
  }
}

export const Horizontal: Story = {
  args: {
    id: 'plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Professional' },
      { value: 'enterprise', label: 'Enterprise' }
    ],
    orientation: 'horizontal'
  }
}

export const WithHelpText: Story = {
  args: {
    id: 'plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Professional' },
      { value: 'enterprise', label: 'Enterprise' }
    ],
    helpText: 'Choose the plan that best fits your needs'
  }
}

export const Disabled: Story = {
  args: {
    id: 'plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Professional' },
      { value: 'enterprise', label: 'Enterprise' }
    ],
    disabled: true
  }
}
