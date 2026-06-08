/**
 * FAFileUpload - File upload component with validation
 */

import { FAFileUploadProps } from '@/types/component.types'
import { FormFileUpload } from '@atomos/ui'
import { forwardRef } from 'react'

export const FAFileUpload = forwardRef<HTMLInputElement, FAFileUploadProps>(
  (
    {
      id,
      className,
      helpText,
      disabled = false,
      accept,
      multiple = false,
      maxSize,
      showFileList = true,
      onFileChange,
      onValidate,
      testId: _testId
    },
    ref
  ) => {
    // Custom validator that includes max size check
    const handleValidate = (files: File[]): string | null => {
      // Check max size if specified
      if (maxSize) {
        const oversized = files.find((file) => file.size > maxSize)
        if (oversized) {
          const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1)
          return `File size must not exceed ${maxSizeMB}MB`
        }
      }

      // Run custom validator if provided
      if (onValidate) {
        return onValidate(files)
      }

      return null
    }

    return (
      <FormFileUpload
        ref={ref}
        id={id}
        accept={accept}
        multiple={multiple}
        helpText={helpText}
        disabled={disabled}
        showFileList={showFileList}
        onFileChange={onFileChange}
        onValidate={handleValidate}
        className={className}
      />
    )
  }
)

FAFileUpload.displayName = 'FAFileUpload'
