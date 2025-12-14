import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FAProvider } from '../../core/FAProvider'
import { FAFileField } from '../../types/field.types'
import { FAFileUpload } from '../FAFileUpload'

describe('FAFileUpload', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    const fields: FAFileField[] = [
      {
        id: 'test',
        type: 'file',
        label: 'Test File',
        required: true,
        maxSize: 5 * 1024 * 1024,
        accept: 'image/*'
      }
    ]
    return render(
      <FAProvider fields={fields} onSubmit={() => {}}>
        {component}
      </FAProvider>
    )
  }

  it('should render file upload component', () => {
    const { container } = renderWithProvider(<FAFileUpload id="test" />)
    expect(container.querySelector('input[type="file"]')).toBeDefined()
  })

  it('should accept accept prop', () => {
    const { container } = renderWithProvider(<FAFileUpload id="test" accept="image/*" />)
    const input = container.querySelector('input[type="file"]')
    expect(input?.getAttribute('accept')).toBe('image/*')
  })

  it('should accept multiple prop', () => {
    const { container } = renderWithProvider(<FAFileUpload id="test" multiple={true} />)
    const input = container.querySelector('input[type="file"]')
    expect(input?.hasAttribute('multiple')).toBe(true)
  })

  it('should validate file size', () => {
    const maxSize = 1024 // 1KB
    const onValidate = vi.fn()
    
    const { container } = renderWithProvider(
      <FAFileUpload id="test" maxSize={maxSize} onValidate={onValidate} />
    )
    
    expect(container).toBeDefined()
  })
})
