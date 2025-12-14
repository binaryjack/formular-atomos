import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAProvider } from '../../core/FAProvider'
import { FAPostalCodeField } from '../../types/field.types'
import { FAPostalCode } from '../FAPostalCode'

describe('FAPostalCode', () => {
  const renderWithProvider = (component: React.ReactElement, country: 'US' | 'UK' | 'CA' = 'US') => {
    const fields: FAPostalCodeField[] = [
      {
        id: 'test',
        type: 'postal',
        label: 'Test Postal',
        required: true,
        country
      }
    ]
    return render(
      <FAProvider fields={fields} onSubmit={() => {}}>
        {component}
      </FAProvider>
    )
  }

  it('should render postal code input for US', () => {
    renderWithProvider(<FAPostalCode id="test" country="US" />)
    expect(screen.getByRole('textbox')).toBeDefined()
  })

  it('should show correct format hint for US', () => {
    renderWithProvider(<FAPostalCode id="test" country="US" />)
    expect(screen.getByText(/12345 or 12345-6789/)).toBeDefined()
  })

  it('should show correct format hint for UK', () => {
    renderWithProvider(<FAPostalCode id="test" country="UK" />, 'UK')
    expect(screen.getByText(/SW1A 1AA/)).toBeDefined()
  })

  it('should show correct format hint for Canada', () => {
    renderWithProvider(<FAPostalCode id="test" country="CA" />, 'CA')
    expect(screen.getByText(/K1A 0B1/)).toBeDefined()
  })
})
