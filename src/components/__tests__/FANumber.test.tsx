import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAProvider } from '../../core/FAProvider'
import { FAField } from '../../types/field.types'
import { FANumber } from '../FANumber'

describe('FANumber', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    const fields: FAField[] = [
      {
        id: 'test',
        type: 'number',
        label: 'Test Number',
        required: true
      }
    ]
    return render(
      <FAProvider fields={fields} onSubmit={() => {}}>
        {component}
      </FAProvider>
    )
  }

  it('should render number input', () => {
    renderWithProvider(<FANumber id="test" />)
    const input = screen.getByRole('spinbutton')
    expect(input.getAttribute('type')).toBe('number')
  })

  it('should accept min and max props', () => {
    renderWithProvider(<FANumber id="test" min={0} max={100} />)
    const input = screen.getByRole('spinbutton')
    expect(input.getAttribute('min')).toBe('0')
    expect(input.getAttribute('max')).toBe('100')
  })

  it('should accept step prop', () => {
    renderWithProvider(<FANumber id="test" step={5} />)
    const input = screen.getByRole('spinbutton')
    expect(input.getAttribute('step')).toBe('5')
  })
})
