import type { Meta, StoryObj } from '@storybook/react'
import { FAFileUpload } from '../components/FAFileUpload'
import { FAProvider } from '../core/FAProvider'
import { FAFileField } from '../types/field.types'

const meta: Meta<typeof FAFileUpload> = {
  title: 'Components/FAFileUpload',
  component: FAFileUpload,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAFileField[] = [
        {
          id: 'avatar',
          type: 'file',
          label: 'Upload Avatar',
          required: true,
          maxSize: 5 * 1024 * 1024, // 5MB
          accept: 'image/*'
        }
      ]
      return (
        <FAProvider fields={fields} onSubmit={(data) => console.log(data)}>
          <Story />
        </FAProvider>
      )
    }
  ]
}

export default meta
type Story = StoryObj<typeof FAFileUpload>

export const ImageUpload: Story = {
  args: {
    id: 'avatar',
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024,
    helpText: 'Max file size: 5MB'
  }
}

export const DocumentUpload: Story = {
  args: {
    id: 'avatar',
    accept: '.pdf,.doc,.docx',
    maxSize: 10 * 1024 * 1024,
    helpText: 'Accepted: PDF, Word documents (Max 10MB)'
  }
}

export const MultipleFiles: Story = {
  args: {
    id: 'avatar',
    multiple: true,
    accept: 'image/*',
    maxSize: 2 * 1024 * 1024,
    helpText: 'Upload multiple images (Max 2MB each)'
  }
}

export const WithoutFileList: Story = {
  args: {
    id: 'avatar',
    accept: 'image/*',
    showFileList: false,
    helpText: 'File list hidden'
  }
}

export const Disabled: Story = {
  args: {
    id: 'avatar',
    accept: 'image/*',
    disabled: true
  }
}
