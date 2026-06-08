import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAProvider } from '../../core/FAProvider'
import { FAField } from '../../types/field.types'
import { FAInput } from '../FAInput'

describe('FAInput', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    const fields: FAField[] = [
      {
        id: 'test',
        type: 'text',
        label: 'Test Input',
        required: true
      }
    ]
    return render(
      <FAProvider fields={fields} onSubmit={() => {}}>
        {component}
      </FAProvider>
    )
  }

  it('should render input with placeholder', () => {
    renderWithProvider(<FAInput id="test" placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeDefined()
  })

  it('should accept disabled prop', () => {
    renderWithProvider(<FAInput id="test" disabled={true} />)
    const input = screen.getByRole('textbox')
    expect(input.hasAttribute('disabled')).toBe(true)
  })

  it('should apply custom className', () => {
    renderWithProvider(<FAInput id="test" className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('custom-class')
  })
})
