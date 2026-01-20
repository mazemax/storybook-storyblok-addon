/**
 * Panel component for detailed component documentation and metadata display
 */

import React, { useState, useCallback, useMemo } from 'react'
import { useStorybookApi } from '@storybook/api'
import { styled } from '@storybook/theming'
import { extractMetadata } from './utils/extractMetadata'
import { generateStoryblokJSON, formatStoryblokJSON } from './utils/generateStoryblokJSON'
import { generateStoryblokClipboardPayload } from './utils/generateBlockInstance'
import { copyJSONToClipboard } from './utils/clipboard'
import { BOOKMARKLET_CODE } from './bookmarklet'

interface PanelProps {
  active: boolean
  key?: string
}

const PanelWrapper = styled.div(({ theme }) => ({
  padding: '1rem',
  background: theme.background.content,
  color: theme.color.defaultText,
  height: '100%',
  overflow: 'auto',
}))

const Section = styled.div({
  marginBottom: '1.5rem',
})

const SectionTitle = styled.h3(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: theme.color.defaultText,
}))

const ComponentTitle = styled.h2(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  marginBottom: '0.5rem',
  color: theme.color.defaultText,
}))

const Description = styled.p(({ theme }) => ({
  fontSize: '13px',
  lineHeight: 1.6,
  color: theme.color.mediumdark,
  marginBottom: '1rem',
}))

const VariantList = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
})

const VariantBadge = styled.div(({ theme }) => ({
  padding: '0.25rem 0.75rem',
  background: theme.color.secondary,
  color: theme.color.lightest,
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 500,
}))

const PropsTable = styled.table(({ theme }) => ({
  width: '100%',
  fontSize: '13px',
  borderCollapse: 'collapse',
  '& th': {
    textAlign: 'left',
    padding: '0.5rem',
    borderBottom: `1px solid ${theme.appBorderColor}`,
    fontWeight: 600,
    color: theme.color.defaultText,
  },
  '& td': {
    padding: '0.5rem',
    borderBottom: `1px solid ${theme.appBorderColor}`,
    color: theme.color.defaultText,
  },
  '& code': {
    background: theme.background.hoverable,
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '12px',
    color: theme.color.secondary,
  },
}))

const JSONPreview = styled.pre(({ theme }) => ({
  background: theme.background.app,
  border: `1px solid ${theme.appBorderColor}`,
  borderRadius: '4px',
  padding: '1rem',
  fontSize: '12px',
  lineHeight: 1.5,
  overflow: 'auto',
  maxHeight: '400px',
  color: theme.color.defaultText,
  fontFamily: 'monospace',
}))

const CopyButton = styled.button(({ theme }) => ({
  padding: '0.5rem 1rem',
  background: theme.color.secondary,
  color: theme.color.lightest,
  border: 'none',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  marginRight: '0.5rem',
  '&:hover': {
    background: theme.color.secondary,
    opacity: 0.9,
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}))

const Link = styled.a(({ theme }) => ({
  color: theme.color.secondary,
  textDecoration: 'none',
  fontSize: '13px',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const EmptyState = styled.div(({ theme }) => ({
  padding: '2rem',
  textAlign: 'center',
  color: theme.color.mediumdark,
  fontSize: '14px',
}))

const BookmarkletBox = styled.div(({ theme }) => ({
  padding: '1rem',
  background: theme.background.app,
  border: `1px solid ${theme.appBorderColor}`,
  borderRadius: '4px',
  marginTop: '1rem',
}))

const BookmarkletLink = styled.a({
  display: 'inline-block',
  padding: '8px 16px',
  background: '#00b3b0',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  fontWeight: 600,
  fontSize: '14px',
  cursor: 'grab',
  '&:hover': {
    background: '#009e9b',
  },
})

const InstructionList = styled.ol(({ theme }) => ({
  margin: '12px 0',
  paddingLeft: '20px',
  fontSize: '13px',
  color: theme.color.defaultText,
  '& li': {
    marginBottom: '4px',
  },
}))

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const api = useStorybookApi()
  const [copyState, setCopyState] = useState<'idle' | 'success'>('idle')

  // Get current story
  const story = api.getCurrentStoryData()

  // Extract metadata
  const metadata = useMemo(() => {
    if (!story) return null
    try {
      return extractMetadata(story)
    } catch (error) {
      console.error('Failed to extract metadata:', error)
      return null
    }
  }, [story])

  // Generate Storyblok JSON (schema format for reference)
  const storyblokJSON = useMemo(() => {
    if (!metadata) return null
    try {
      return generateStoryblokJSON(metadata, {
        addStorybookLink: true,
      })
    } catch (error) {
      console.error('Failed to generate Storyblok JSON:', error)
      return null
    }
  }, [metadata])

  // Generate clipboard payload (block instance format for pasting)
  const clipboardPayload = useMemo(() => {
    if (!metadata) return null
    try {
      return generateStoryblokClipboardPayload(metadata, {
        includeAllProps: true,
      })
    } catch (error) {
      console.error('Failed to generate clipboard payload:', error)
      return null
    }
  }, [metadata])

  // Format JSON for display
  const formattedJSON = useMemo(() => {
    if (!storyblokJSON) return ''
    return formatStoryblokJSON(storyblokJSON, 2)
  }, [storyblokJSON])

  const handleCopy = useCallback(async () => {
    if (!clipboardPayload) return

    try {
      await copyJSONToClipboard(clipboardPayload, 2)
      setCopyState('success')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }, [clipboardPayload])

  if (!active) {
    return null
  }

  if (!story || !metadata) {
    return (
      <PanelWrapper>
        <EmptyState>
          Select a story to view component metadata and generate Storyblok
          configuration.
        </EmptyState>
      </PanelWrapper>
    )
  }

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <PanelWrapper>
        {/* Component Overview */}
        <Section>
          <ComponentTitle>{metadata.componentName}</ComponentTitle>
          {metadata.description && (
            <Description>{metadata.description}</Description>
          )}
          {metadata.storyblokConfig?.category && (
            <div>
              <strong>Category:</strong> {metadata.storyblokConfig.category}
            </div>
          )}
        </Section>

        {/* Available Variants */}
        {metadata.variants.length > 0 && (
          <Section>
            <SectionTitle>Available Variants</SectionTitle>
            <VariantList>
              {metadata.variants.map((variant) => (
                <VariantBadge key={variant}>{variant}</VariantBadge>
              ))}
            </VariantList>
          </Section>
        )}

        {/* Props/Fields */}
        {Object.keys(metadata.props).length > 0 && (
          <Section>
            <SectionTitle>Component Props</SectionTitle>
            <PropsTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(metadata.props).map(([propName, propType]) => (
                  <tr key={propName}>
                    <td>
                      <code>{propName}</code>
                    </td>
                    <td>
                      <code>
                        {propType.control?.type ||
                          propType.type?.name ||
                          'any'}
                      </code>
                    </td>
                    <td>{propType.description || '-'}</td>
                    <td>
                      {propType.defaultValue !== undefined ? (
                        <code>{String(propType.defaultValue)}</code>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </PropsTable>
          </Section>
        )}

        {/* JSON Preview */}
        {formattedJSON && (
          <Section>
            <SectionTitle>Storyblok Block Schema</SectionTitle>
            <JSONPreview>{formattedJSON}</JSONPreview>
          </Section>
        )}

        {/* Actions */}
        <Section>
          <CopyButton onClick={handleCopy} disabled={!clipboardPayload}>
            {copyState === 'success' ? '✓ Copied!' : '📋 Copy Block to Clipboard'}
          </CopyButton>
          {metadata.storyblokConfig?.documentation && (
            <Link
              href={metadata.storyblokConfig.documentation}
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 View Documentation
            </Link>
          )}
          {metadata.storyblokConfig?.figmaUrl && (
            <>
              {' | '}
              <Link
                href={metadata.storyblokConfig.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🎨 View in Figma
              </Link>
            </>
          )}
        </Section>

        {/* Bookmarklet Installation */}
        <Section>
          <SectionTitle>📌 Paste to Storyblok</SectionTitle>
          <BookmarkletBox>
            <p style={{ margin: '0 0 12px 0', fontSize: '13px' }}>
              Storyblok uses internal storage. Drag this bookmarklet to your bookmarks bar:
            </p>
            <BookmarkletLink
              href={BOOKMARKLET_CODE}
              onClick={(e) => {
                e.preventDefault()
                alert('Drag this link to your bookmarks bar!')
              }}
            >
              📋 Paste to Storyblok
            </BookmarkletLink>
            <InstructionList>
              <li>Copy a block using the button above</li>
              <li>Go to Storyblok editor</li>
              <li>Click the bookmarklet in your bookmarks bar</li>
              <li>Use "Paste Block" in Storyblok to insert the block</li>
            </InstructionList>
          </BookmarkletBox>
        </Section>
      </PanelWrapper>
    </div>
  )
}
