'use client'

import type { FAField } from '@formular/atomos'
import { FAProvider } from '@formular/atomos'
import { ReactNode, useState } from 'react'
import { CodeBlock } from './CodeBlock'
import { JsonDisplay } from './JsonDisplay'

interface FormDemoProps {
  title: string
  description: string
  formName: string
  fields: FAField[]
  children: ReactNode
  codeExample: string
  configExample?: string
}

export function FormDemo({
  title,
  description,
  formName,
  fields,
  children,
  codeExample,
  configExample,
}: FormDemoProps) {
  const [result, setResult] = useState<FAField[] | null>(null)
  const [activeTab, setActiveTab] = useState<'form' | 'code' | 'config'>('form')

  const handleSubmit = async (data: FAField[]) => {
    console.log('Form submitted:', data)
    setResult(data)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg text-gray-300">{description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Form & Tabs */}
        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="bg-gray-800 rounded-lg p-1 flex gap-2">
            <TabButton
              active={activeTab === 'form'}
              onClick={() => setActiveTab('form')}
            >
              Interactive Form
            </TabButton>
            <TabButton
              active={activeTab === 'code'}
              onClick={() => setActiveTab('code')}
            >
              Code
            </TabButton>
            {configExample && (
              <TabButton
                active={activeTab === 'config'}
                onClick={() => setActiveTab('config')}
              >
                Configuration
              </TabButton>
            )}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            {activeTab === 'form' && (
              <FAProvider formName={formName} fields={fields} onSubmit={handleSubmit}>
                {children}
              </FAProvider>
            )}
            {activeTab === 'code' && (
              <CodeBlock code={codeExample} language="tsx" />
            )}
            {activeTab === 'config' && configExample && (
              <CodeBlock code={configExample} language="typescript" title="Field Configuration" />
            )}
          </div>
        </div>

        {/* Right Column - Result */}
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-1">
            <div className="px-4 py-2">
              <span className="text-sm font-medium text-gray-300">Form Result</span>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 min-h-[400px]">
            {result ? (
              <JsonDisplay
                data={result.reduce((acc, field) => {
                  acc[field.name] = field.value
                  return acc
                }, {} as Record<string, unknown>)}
              />
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-400">
                Submit the form to see results
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? 'bg-gray-700 text-white'
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  )
}
