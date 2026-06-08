import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAProvider } from '../../core/FAProvider'
import { FARadioGroupField } from '../../types/field.types'
import { FARadioGroup } from '../FARadioGroup'

describe('FARadioGroup', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    const fields: FARadioGroupField[] = [
      {
        id: 'test',
        type: 'radio',
        label: 'Test Radio',
        required: true,
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]
      }
    ]
    return render(
      <FAProvider fields={fields} onSubmit={() => {}}>
        {component}
      </FAProvider>
    )
  }

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  it('should render all radio options', () => {
    renderWithProvider(<FARadioGroup id="test" options={options} />)
    expect(screen.getByLabelText('Option 1')).toBeDefined()
    expect(screen.getByLabelText('Option 2')).toBeDefined()
    expect(screen.getByLabelText('Option 3')).toBeDefined()
  })

  it('should render with vertical orientation by default', () => {
    const { container } = renderWithProvider(<FARadioGroup id="test" options={options} />)
    expect(container.querySelector('.flex-col')).toBeDefined()
  })

  it('should render with horizontal orientation', () => {
    const { container } = renderWithProvider(<FARadioGroup id="test" options={options} orientation="horizontal" />)
    expect(container.querySelector('.flex-row')).toBeDefined()
  })
})
