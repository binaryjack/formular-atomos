import type { Meta, StoryObj } from '@storybook/react'
import { FATextarea } from '../components/FATextarea'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

const meta: Meta<typeof FATextarea> = {
  title: 'Components/FATextarea',
  component: FATextarea,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'bio',
          type: 'textarea',
          label: 'Biography',
          required: true,
          validation: {
            formular: { minLength: 50, maxLength: 500 }
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
type Story = StoryObj<typeof FATextarea>

export const Default: Story = {
  args: {
    id: 'bio',
    placeholder: 'Tell us about yourself...'
  }
}

export const WithRows: Story = {
  args: {
    id: 'bio',
    placeholder: 'Tell us about yourself...',
    rows: 6,
    helpText: '50-500 characters'
  }
}

export const Disabled: Story = {
  args: {
    id: 'bio',
    placeholder: 'Tell us about yourself...',
    disabled: true
  }
}
