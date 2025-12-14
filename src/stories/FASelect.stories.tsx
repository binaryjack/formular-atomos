import type { Meta, StoryObj } from '@storybook/react'
import { FASelect } from '../components/FASelect'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

const meta: Meta<typeof FASelect> = {
  title: 'Components/FASelect',
  component: FASelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'country',
          type: 'select',
          label: 'Country',
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
type Story = StoryObj<typeof FASelect>

export const Default: Story = {
  args: {
    id: 'country',
    children: (
      <>
        <option value="">Select a country...</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
      </>
    )
  }
}

export const WithHelpText: Story = {
  args: {
    id: 'country',
    helpText: 'Select your country of residence',
    children: (
      <>
        <option value="">Select a country...</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
      </>
    )
  }
}

export const Disabled: Story = {
  args: {
    id: 'country',
    disabled: true,
    children: (
      <>
        <option value="">Select a country...</option>
        <option value="us">United States</option>
      </>
    )
  }
}
