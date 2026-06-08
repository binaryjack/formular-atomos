import type { Meta, StoryObj } from '@storybook/react'
import { FATimePicker } from '../components/FATimePicker'
import { FAProvider } from '../core/FAProvider'
import { FAField } from '../types/field.types'

const meta: Meta<typeof FATimePicker> = {
  title: 'Components/FATimePicker',
  component: FATimePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const fields: FAField[] = [
        {
          id: 'meetingTime',
          type: 'time',
          label: 'Meeting Time',
          required: true,
          validation: {
            formular: {
              custom: (value: string) => {
                if (!value) return 'Meeting time is required'
                const [hours, minutes] = value.split(':').map(Number)
                
                // Business hours: 9 AM to 5 PM
                if (hours < 9 || hours >= 17) {
                  return 'Meeting must be during business hours (9 AM - 5 PM)'
                }
                
                // Must be on the hour or half hour
                if (minutes !== 0 && minutes !== 30) {
                  return 'Meeting times must be on the hour or half hour'
                }
                
                return null
              }
            }
          }
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
type Story = StoryObj<typeof FATimePicker>

export const Default: Story = {
  args: {
    id: 'meetingTime'
  }
}

export const WithHelpText: Story = {
  args: {
    id: 'meetingTime',
    helpText: 'Select time during business hours (9 AM - 5 PM)'
  }
}

export const With30MinStep: Story = {
  args: {
    id: 'meetingTime',
    step: 1800, // 30 minutes in seconds
    helpText: '30-minute intervals only'
  }
}

export const Disabled: Story = {
  args: {
    id: 'meetingTime',
    disabled: true
  }
}
