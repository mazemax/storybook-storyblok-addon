/**
 * Map Storybook control types to Storyblok field types
 */

import type { ArgType } from './extractMetadata'

export interface StoryblokField {
  type: string
  description?: string
  required?: boolean
  default_value?: any
  options?: Array<{ name: string; value: string }>
  [key: string]: any
}

/**
 * Control type mapping from Storybook to Storyblok
 */
const CONTROL_TYPE_MAP: Record<string, string> = {
  // Select controls
  select: 'option',
  'multi-select': 'multiselect',
  'inline-radio': 'option',
  radio: 'option',
  'inline-check': 'multiselect',
  check: 'multiselect',

  // Text controls
  text: 'text',
  number: 'number',
  range: 'number',

  // Boolean
  boolean: 'boolean',

  // Date and time
  date: 'datetime',

  // Color
  color: 'color',

  // Complex types
  object: 'bloks',
  array: 'bloks',

  // File
  file: 'asset',
}

/**
 * Get Storyblok field type from Storybook control type
 */
function getStoryblokType(controlType?: string): string {
  if (!controlType) {
    return 'text'
  }
  return CONTROL_TYPE_MAP[controlType] || 'text'
}

/**
 * Convert argTypes to Storyblok field schema
 */
export function mapArgTypesToStoryblokFields(
  argTypes: Record<string, ArgType>,
  customMappings?: Record<string, any>
): Record<string, StoryblokField> {
  const fields: Record<string, StoryblokField> = {}

  Object.entries(argTypes).forEach(([propName, argType]) => {
    // Check if there's a custom mapping
    const customField = customMappings?.[propName]

    if (customField) {
      // Use custom mapping with some defaults
      fields[propName] = {
        type: customField.type || 'text',
        description: customField.description || argType.description,
        required: customField.required || false,
        default_value: customField.default_value || argType.defaultValue,
        ...customField,
      }
    } else {
      // Auto-generate from argType
      const controlType = argType.control?.type
      const storyblokType = getStoryblokType(controlType)

      const field: StoryblokField = {
        type: storyblokType,
        description: argType.description,
      }

      // Add default value if present
      if (argType.defaultValue !== undefined) {
        field.default_value = argType.defaultValue
      } else if (argType.table?.defaultValue?.summary) {
        field.default_value = argType.table.defaultValue.summary
      }

      // For select/option types, add options
      if (
        (storyblokType === 'option' || storyblokType === 'multiselect') &&
        (argType.options || argType.control?.options)
      ) {
        const options = argType.options || argType.control?.options || []
        field.options = options.map((opt: string) => ({
          name: opt.charAt(0).toUpperCase() + opt.slice(1),
          value: opt,
        }))
      }

      fields[propName] = field
    }
  })

  return fields
}

/**
 * Convert a single field mapping to Storyblok field format
 */
export function mapFieldToStoryblok(
  _fieldName: string,
  argType: ArgType,
  customMapping?: any
): StoryblokField {
  if (customMapping) {
    return {
      type: customMapping.type || 'text',
      description: customMapping.description || argType.description,
      required: customMapping.required || false,
      default_value: customMapping.default_value || argType.defaultValue,
      ...customMapping,
    }
  }

  const controlType = argType.control?.type
  const storyblokType = getStoryblokType(controlType)

  const field: StoryblokField = {
    type: storyblokType,
    description: argType.description,
  }

  if (argType.defaultValue !== undefined) {
    field.default_value = argType.defaultValue
  }

  if (
    (storyblokType === 'option' || storyblokType === 'multiselect') &&
    (argType.options || argType.control?.options)
  ) {
    const options = argType.options || argType.control?.options || []
    field.options = options.map((opt: string) => ({
      name: opt.charAt(0).toUpperCase() + opt.slice(1),
      value: opt,
    }))
  }

  return field
}
