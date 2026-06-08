import type { Meta, StoryObj } from '@storybook/react'
import { FAEmail } from '../components/FAEmail'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

const meta: Meta<typeof FAEmail> = {
  title: 'Components/FAEmail',
  component: FAEmail,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          required: true,
          validation: {
            formular: { email: true }
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
type Story = StoryObj<typeof FAEmail>

export const Default: Story = {
  args: {
    id: 'email',
    placeholder: 'you@example.com'
  }
}

export const WithHelpText: Story = {
  args: {
    id: 'email',
    placeholder: 'you@example.com',
    helpText: 'We will never share your email'
  }
}

export const Disabled: Story = {
  args: {
    id: 'email',
    placeholder: 'you@example.com',
    disabled: true
  }
}
