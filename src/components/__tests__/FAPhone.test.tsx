import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAProvider } from '../../core/FAProvider'
import { FAPhoneField } from '../../types/field.types'
import { FAPhone } from '../FAPhone'

describe('FAPhone', () => {
  const renderWithProvider = (component: React.ReactElement, country: 'US' | 'UK' | 'DE' = 'US') => {
    const fields: FAPhoneField[] = [
      {
        id: 'test',
        type: 'phone',
        label: 'Test Phone',
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

  it('should render phone input for US', () => {
    renderWithProvider(<FAPhone id="test" country="US" />)
    const input = screen.getByRole('textbox')
    expect(input.getAttribute('type')).toBe('tel')
  })

  it('should show correct format hint for US', () => {
    renderWithProvider(<FAPhone id="test" country="US" />)
    expect(screen.getByText(/555-123-4567/)).toBeDefined()
  })

  it('should show correct format hint for UK', () => {
    renderWithProvider(<FAPhone id="test" country="UK" />, 'UK')
    expect(screen.getByText(/\+44 20 1234 5678/)).toBeDefined()
  })

  it('should show correct format hint for Germany', () => {
    renderWithProvider(<FAPhone id="test" country="DE" />, 'DE')
    expect(screen.getByText(/\+49 30 12345678/)).toBeDefined()
  })
})
