'use client'

import { JsonView, defaultStyles } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

interface JsonDisplayProps {
  data: unknown
  title?: string
}

export function JsonDisplay({ data, title }: JsonDisplayProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <span className="text-sm font-medium text-gray-300">{title}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <JsonView
          data={data as object | unknown[]}
          shouldExpandNode={(level) => level < 2}
          style={{
            ...defaultStyles,
            container: 'font-mono text-sm',
            basicChildStyle: 'padding-left: 1rem',
          }}
        />
      </div>
    </div>
  )
}
