import type { Meta, StoryObj } from '@storybook/react'
import { FAPhone } from '../components/FAPhone'
import { FAProvider } from '../core/FAProvider'
import { CountryCode } from '../types/country.types'
import { FAPhoneField } from '../types/field.types'

const meta: Meta<typeof FAPhone> = {
  title: 'Components/FAPhone',
  component: FAPhone,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FAPhone>

const createDecorator = (country: CountryCode) => (Story: any) => {
  const fields: FAPhoneField[] = [
    {
      id: 'phone',
      type: 'phone',
      label: 'Phone Number',
      required: true,
      country,
      validation: {
        formular: { phone: country }
      }
    }
  ]
  return (
    <FAProvider fields={fields} onSubmit={(data) => console.log(data)}>
      <Story />
    </FAProvider>
  )
}

export const US: Story = {
  args: {
    id: 'phone',
    country: 'US'
  },
  decorators: [createDecorator('US')]
}

export const Canada: Story = {
  args: {
    id: 'phone',
    country: 'CA'
  },
  decorators: [createDecorator('CA')]
}

export const UK: Story = {
  args: {
    id: 'phone',
    country: 'UK'
  },
  decorators: [createDecorator('UK')]
}

export const Germany: Story = {
  args: {
    id: 'phone',
    country: 'DE'
  },
  decorators: [createDecorator('DE')]
}

export const France: Story = {
  args: {
    id: 'phone',
    country: 'FR'
  },
  decorators: [createDecorator('FR')]
}

export const Switzerland: Story = {
  args: {
    id: 'phone',
    country: 'CH'
  },
  decorators: [createDecorator('CH')]
}
