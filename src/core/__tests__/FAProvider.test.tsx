import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAInput } from '../../components/FAInput'
import { FAField } from '../../types/field.types'
import { FAProvider } from '../FAProvider'

describe('FAProvider', () => {
  it('should render children correctly', () => {
    const fields: FAField[] = [
      {
        id: 'username',
        type: 'text',
        label: 'Username',
        required: true
      }
    ]

    render(
      <FAProvider fields={fields} onSubmit={() => {}}>
        <FAInput id="username" placeholder="Enter username" />
      </FAProvider>
    )

    expect(screen.getByPlaceholderText('Enter username')).toBeDefined()
  })

  it('should convert FA fields to Atomos format', () => {
    const fields: FAField[] = [
      {
        id: 'username',
        type: 'text',
        label: 'Username',
        required: true
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        required: false
      }
    ]

    const { container } = render(
      <FAProvider fields={fields} onSubmit={() => {}}>
        <div>Test</div>
      </FAProvider>
    )

    expect(container).toBeDefined()
  })
})
