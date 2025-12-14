import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAProvider } from '../../core/FAProvider'
import { FAField } from '../../types/field.types'
import { FAEmail } from '../FAEmail'

describe('FAEmail', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    const fields: FAField[] = [
      {
        id: 'test',
        type: 'email',
        label: 'Test Email',
        required: true
      }
    ]
    return render(
      <FAProvider fields={fields} onSubmit={() => {}}>
        {component}
      </FAProvider>
    )
  }

  it('should render email input', () => {
    renderWithProvider(<FAEmail id="test" />)
    const input = screen.getByRole('textbox')
    expect(input.getAttribute('type')).toBe('email')
  })

  it('should render with placeholder', () => {
    renderWithProvider(<FAEmail id="test" placeholder="you@example.com" />)
    expect(screen.getByPlaceholderText('you@example.com')).toBeDefined()
  })
})
