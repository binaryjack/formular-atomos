import type { Meta, StoryObj } from '@storybook/react'
import { FAToggle } from '../components/FAToggle'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

const meta: Meta<typeof FAToggle> = {
  title: 'Components/FAToggle',
  component: FAToggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'notifications',
          type: 'toggle',
          label: 'Enable notifications',
          required: false
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
type Story = StoryObj<typeof FAToggle>

export const Default: Story = {
  args: {
    id: 'notifications'
  }
}

export const WithHelpText: Story = {
  args: {
    id: 'notifications',
    helpText: 'Receive email notifications for updates'
  }
}

export const Disabled: Story = {
  args: {
    id: 'notifications',
    disabled: true
  }
}
