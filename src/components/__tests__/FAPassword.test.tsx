import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAProvider } from '../../core/FAProvider'
import { FAPasswordField } from '../../types/field.types'
import { FAPassword } from '../FAPassword'

describe('FAPassword', () => {
  const renderWithProvider = (component: React.ReactElement, strength: 'medium' | 'strong' = 'medium') => {
    const fields: FAPasswordField[] = [
      {
        id: 'test',
        type: 'password',
        label: 'Test Password',
        required: true,
        strength
      }
    ]
    return render(
      <FAProvider fields={fields} onSubmit={() => {}}>
        {component}
      </FAProvider>
    )
  }

  it('should render password input', () => {
    renderWithProvider(<FAPassword id="test" />)
    const input = screen.getByLabelText('Test Password')
    expect(input.getAttribute('type')).toBe('password')
  })

  it('should accept strength prop', () => {
    renderWithProvider(<FAPassword id="test" strength="strong" />, 'strong')
    expect(screen.getByLabelText('Test Password')).toBeDefined()
  })
})
