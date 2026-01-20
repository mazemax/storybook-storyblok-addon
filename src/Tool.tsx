/**
 * Toolbar component for quick copy-to-clipboard functionality
 */

import React, { useState, useCallback } from 'react'
import { useStorybookApi } from '@storybook/api'
import { extractMetadata } from './utils/extractMetadata'
import { generateStoryblokClipboardPayload } from './utils/generateBlockInstance'
import { copyJSONToClipboard } from './utils/clipboard'

type CopyState = 'idle' | 'copying' | 'success' | 'error'

export const Tool: React.FC = () => {
  const api = useStorybookApi()
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Get current story
  const story = api.getCurrentStoryData()

  const handleCopyClick = useCallback(async () => {
    if (!story) {
      setErrorMessage('No story selected')
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 3000)
      return
    }

    try {
      setCopyState('copying')

      // Extract metadata from current story
      const metadata = extractMetadata(story)

      // Generate Storyblok clipboard payload (array of blocks for bloks fields)
      const clipboardPayload = generateStoryblokClipboardPayload(metadata, {
        includeAllProps: true,
      })

      // Copy to clipboard using ClipboardItem with JSON MIME type for better compatibility
      const jsonString = JSON.stringify(clipboardPayload, null, 2)
      try {
        // Try ClipboardItem API with JSON MIME type
        const blob = new Blob([jsonString], { type: 'application/json' })
        const clipboardItem = new ClipboardItem({
          'application/json': blob,
          'text/plain': new Blob([jsonString], { type: 'text/plain' })
        })
        await navigator.clipboard.write([clipboardItem])
      } catch (clipboardItemError) {
        // Fallback to regular text copy
        await copyJSONToClipboard(clipboardPayload, 2)
      }

      setCopyState('success')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to copy'
      )
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 3000)
    }
  }, [story])

  // Icon and title based on state
  const getIconAndTitle = () => {
    switch (copyState) {
      case 'copying':
        return { icon: 'sync', title: 'Copying...' }
      case 'success':
        return { icon: 'check', title: 'Copied!' }
      case 'error':
        return { icon: 'closeAlt', title: errorMessage || 'Copy failed' }
      default:
        return { icon: 'copy', title: 'Copy to Storyblok' }
    }
  }

  const { icon, title } = getIconAndTitle()

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px',
        cursor: !story || copyState === 'copying' ? 'not-allowed' : 'pointer',
        opacity: !story || copyState === 'copying' ? 0.5 : 1,
        fontSize: '14px',
      }}
      title={title}
      onClick={!story || copyState === 'copying' ? undefined : handleCopyClick}
    >
      {icon === 'sync' && '⟳'}
      {icon === 'check' && '✓'}
      {icon === 'closeAlt' && '✕'}
      {icon === 'copy' && '📋'}
    </div>
  )
}
