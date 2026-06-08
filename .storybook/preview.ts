import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1e293b'
        },
        {
          name: 'light',
          value: '#ffffff'
        }
      ]
    },
    docs: {
      theme: {
        base: 'dark',
        colorPrimary: '#3b82f6',
        colorSecondary: '#8b5cf6',
        appBg: '#0f172a',
        appContentBg: '#1e293b',
        appBorderColor: '#334155',
        textColor: '#e2e8f0',
        barTextColor: '#94a3b8',
        barSelectedColor: '#3b82f6',
        barBg: '#1e293b',
        inputBg: '#0f172a',
        inputBorder: '#475569',
        inputTextColor: '#e2e8f0'
      }
    }
  }
}

export default preview
