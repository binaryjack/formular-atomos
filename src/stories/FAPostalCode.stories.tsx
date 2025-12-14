import type { Meta, StoryObj } from '@storybook/react'
import { FAPostalCode } from '../components/FAPostalCode'
import { FAProvider } from '../core/FAProvider'
import { CountryCode } from '../types/country.types'
import { FAPostalCodeField } from '../types/field.types'

const meta: Meta<typeof FAPostalCode> = {
  title: 'Components/FAPostalCode',
  component: FAPostalCode,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FAPostalCode>

const createDecorator = (country: CountryCode) => (Story: any) => {
  const fields: FAPostalCodeField[] = [
    {
      id: 'postal',
      type: 'postal',
      label: 'Postal Code',
      required: true,
      country,
      validation: {
        formular: { postalCode: country }
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
    id: 'postal',
    country: 'US'
  },
  decorators: [createDecorator('US')]
}

export const Canada: Story = {
  args: {
    id: 'postal',
    country: 'CA'
  },
  decorators: [createDecorator('CA')]
}

export const UK: Story = {
  args: {
    id: 'postal',
    country: 'UK'
  },
  decorators: [createDecorator('UK')]
}

export const Germany: Story = {
  args: {
    id: 'postal',
    country: 'DE'
  },
  decorators: [createDecorator('DE')]
}

export const France: Story = {
  args: {
    id: 'postal',
    country: 'FR'
  },
  decorators: [createDecorator('FR')]
}

export const Switzerland: Story = {
  args: {
    id: 'postal',
    country: 'CH'
  },
  decorators: [createDecorator('CH')]
}
