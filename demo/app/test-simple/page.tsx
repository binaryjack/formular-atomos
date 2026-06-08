'use client'

import { FormInput, FormProvider } from '@atomos/ui'
import { useState } from 'react'

export default function TestSimplePage() {
  const [fields, setFields] = useState([
    { name: 'test', label: 'Test', value: '' }
  ])

  const handleChange = (name: string, value: unknown) => {
    console.log('handleChange called', name, value)
    setFields(prev => prev.map(f => 
      f.name === name ? { ...f, value } : f
    ))
  }

  const handleBlur = (name: string) => {
    console.log('handleBlur called', name)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4 text-white">Simple Test</h1>
      <FormProvider
        initialFields={fields}
        handleChange={handleChange}
        handleBlur={handleBlur}
        onSubmit={() => {}}
      >
        <div>
          <label htmlFor="test" className="block mb-2 text-white">Test Field</label>
          <FormInput id="test" />
          <pre className="mt-4 p-4 bg-gray-800 text-white">
            {JSON.stringify(fields, null, 2)}
          </pre>
        </div>
      </FormProvider>
    </div>
  )
}
