import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock console to avoid noise during tests
const consoleMock = {
  error: vi.fn(),
  warn: vi.fn()
}

// No need for beforeAll/afterAll, vitest handles mocking automatically
