import type { Meta, StoryObj } from '@storybook/react'
import { FAInput } from '../components/FAInput'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

const meta: Meta<typeof FAInput> = {
  title: 'Components/FAInput',
  component: FAInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true,
          validation: {
            formular: { minLength: 3, maxLength: 20 }
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
type Story = StoryObj<typeof FAInput>

export const Default: Story = {
  args: {
    id: 'username',
    placeholder: 'Enter your username'
  }
}

export const WithHelpText: Story = {
  args: {
    id: 'username',
    placeholder: 'Enter your username',
    helpText: '3-20 characters required'
  }
}

export const Disabled: Story = {
  args: {
    id: 'username',
    placeholder: 'Enter your username',
    disabled: true
  }
}
