/**
 * Generate Storyblok-compatible block schema from component metadata
 */

import type { ComponentMetadata } from './extractMetadata'
import { mapArgTypesToStoryblokFields } from './fieldMapper'

export interface StoryblokBlockSchema {
  name: string
  display_name: string
  description?: string
  schema: Record<string, any>
  image?: string
  preview_field?: string
  is_root?: boolean
  preview_tmpl?: string
  is_nestable?: boolean
  all_presets?: any[]
  preset_id?: string | null
  real_name?: string
  component_group_uuid?: string | null
}

/**
 * Convert component name to kebab-case for Storyblok block name
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * Generate Storybook documentation URL
 */
function generateStorybookUrl(componentName: string, baseUrl?: string): string {
  const base = baseUrl || 'http://localhost:6006'
  const path = componentName.toLowerCase().replace(/\s+/g, '-')
  return `${base}/?path=/docs/${path}--docs`
}

/**
 * Generate Storyblok block schema from component metadata
 */
export function generateStoryblokJSON(
  metadata: ComponentMetadata,
  options?: {
    storybookBaseUrl?: string
    componentPrefix?: string
    addStorybookLink?: boolean
  }
): StoryblokBlockSchema {
  const {
    componentName,
    description,
    props,
    storyblokConfig,
  } = metadata

  const {
    storybookBaseUrl,
    componentPrefix = '',
    addStorybookLink = true,
  } = options || {}

  // Generate block name (kebab-case)
  const blockName =
    storyblokConfig?.blockName ||
    toKebabCase(componentPrefix + componentName)

  // Generate display name
  const displayName =
    storyblokConfig?.displayName ||
    componentName.replace(/([A-Z])/g, ' $1').trim()

  // Convert props to Storyblok fields
  const schema = mapArgTypesToStoryblokFields(
    props,
    storyblokConfig?.fieldMappings
  )

  // Add Storybook documentation link as a field
  if (addStorybookLink) {
    const storybookUrl =
      storyblokConfig?.documentation ||
      generateStorybookUrl(componentName, storybookBaseUrl)

    schema._storybook_link = {
      type: 'text',
      description: 'Link to Storybook documentation',
      default_value: storybookUrl,
      display_name: 'Storybook Documentation',
    }
  }

  // Add Figma link if provided
  if (storyblokConfig?.figmaUrl) {
    schema._figma_link = {
      type: 'text',
      description: 'Link to Figma design',
      default_value: storyblokConfig.figmaUrl,
      display_name: 'Figma Design',
    }
  }

  // Build the Storyblok block schema
  const blockSchema: StoryblokBlockSchema = {
    name: blockName,
    display_name: displayName,
    schema,
    is_root: false,
    is_nestable: true,
    all_presets: [],
    preset_id: null,
    real_name: blockName,
    component_group_uuid: null,
  }

  // Add description if available
  if (description) {
    blockSchema.description = description
  }

  // Add image/icon if provided
  if (storyblokConfig?.icon) {
    blockSchema.image = storyblokConfig.icon
  }

  return blockSchema
}

/**
 * Format the Storyblok JSON for display or copying
 */
export function formatStoryblokJSON(
  schema: StoryblokBlockSchema,
  indent = 2
): string {
  return JSON.stringify(schema, null, indent)
}
