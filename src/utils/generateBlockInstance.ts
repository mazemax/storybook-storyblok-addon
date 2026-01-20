/**
 * Generate a Storyblok block instance that can be pasted into the visual editor
 */

import type { ComponentMetadata } from './extractMetadata'

/**
 * Generate a UUID v4 for Storyblok block _uid
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Convert component name to kebab-case for Storyblok component name
 * NOTE: Some Storyblok spaces use PascalCase, so this is now optional
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * Keep the component name as-is (PascalCase)
 */
function preserveCase(str: string): string {
  return str.replace(/[\s]+/g, '')
}

/**
 * Get default value for a prop based on its argType
 */
function getDefaultValue(argType: any): any {
  // Check for explicit default value
  if (argType.defaultValue !== undefined) {
    return argType.defaultValue
  }

  // Check table default value
  if (argType.table?.defaultValue?.summary !== undefined) {
    const summary = argType.table.defaultValue.summary
    // Try to parse JSON values like "false" or "[]"
    try {
      return JSON.parse(summary)
    } catch {
      return summary
    }
  }

  // Return type-appropriate defaults based on control type
  const controlType = argType.control?.type
  switch (controlType) {
    case 'boolean':
      return false
    case 'number':
    case 'range':
      return 0
    case 'select':
    case 'inline-radio':
    case 'radio':
      // Return first option if available
      const options = argType.options || argType.control?.options
      return options?.[0] || ''
    case 'multi-select':
    case 'inline-check':
    case 'check':
      return []
    case 'object':
    case 'array':
      return []
    default:
      return ''
  }
}

export interface StoryblokBlockInstance {
  id: string  // Storyblok expects empty string for new blocks
  _uid: string
  component: string
  [key: string]: any
}

/**
 * Generate a Storyblok block instance from component metadata
 * This format can be pasted directly into Storyblok's visual editor
 */
export function generateBlockInstance(
  metadata: ComponentMetadata,
  options?: {
    componentPrefix?: string
    includeAllProps?: boolean
    customValues?: Record<string, any>
    useKebabCase?: boolean  // Set to false to preserve PascalCase
  }
): StoryblokBlockInstance {
  const { componentName, props, storyblokConfig } = metadata
  const { componentPrefix = '', includeAllProps = true, customValues = {}, useKebabCase = false } = options || {}

  // Generate component name
  // Priority: storyblokConfig.blockName > preserveCase > kebab-case
  const componentId =
    storyblokConfig?.blockName ||
    (useKebabCase
      ? toKebabCase(componentPrefix + componentName)
      : preserveCase(componentPrefix + componentName))

  // Build the block instance (matching Storyblok's exact format)
  const instance: StoryblokBlockInstance = {
    id: '',  // Storyblok expects empty string for new/copied blocks
    _uid: generateUUID(),
    component: componentId,
  }

  // Add props with their default values
  if (includeAllProps) {
    Object.entries(props).forEach(([propName, argType]) => {
      // Use custom value if provided, otherwise use default
      if (customValues[propName] !== undefined) {
        instance[propName] = customValues[propName]
      } else {
        instance[propName] = getDefaultValue(argType)
      }
    })
  }

  return instance
}

/**
 * Generate multiple block instances (for array/bloks fields)
 */
export function generateBlockInstances(
  metadata: ComponentMetadata,
  count: number = 1,
  options?: {
    componentPrefix?: string
    includeAllProps?: boolean
    customValues?: Record<string, any>
  }
): StoryblokBlockInstance[] {
  return Array.from({ length: count }, () =>
    generateBlockInstance(metadata, options)
  )
}

/**
 * Generate a Storyblok-compatible clipboard payload
 * Wraps block(s) in the format Storyblok expects for paste operations
 */
export function generateStoryblokClipboardPayload(
  metadata: ComponentMetadata,
  options?: {
    componentPrefix?: string
    includeAllProps?: boolean
    customValues?: Record<string, any>
  }
): StoryblokBlockInstance[] {
  // Storyblok's bloks fields expect an array of blocks
  const block = generateBlockInstance(metadata, options)
  return [block]
}

/**
 * Format options for Storyblok clipboard
 */
export type ClipboardFormat = 'array' | 'wrapped' | 'single'

/**
 * Generate clipboard payload in different formats to test compatibility
 */
export function generateClipboardPayloadWithFormat(
  metadata: ComponentMetadata,
  format: ClipboardFormat,
  options?: {
    componentPrefix?: string
    includeAllProps?: boolean
    customValues?: Record<string, any>
  }
): any {
  const block = generateBlockInstance(metadata, options)

  switch (format) {
    case 'array':
      // Format 1: Simple array of blocks
      return [block]

    case 'wrapped':
      // Format 2: Wrapped with Storyblok marker (hypothesis H9)
      return {
        __sb_js_bridge_clipboard__: true,
        blocks: [block]
      }

    case 'single':
      // Format 3: Single block object
      return block

    default:
      return [block]
  }
}
