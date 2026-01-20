/**
 * Extract component metadata from Storybook story context
 */

export interface StoryblokConfig {
  blockName?: string
  displayName?: string
  category?: string
  icon?: string
  fieldMappings?: Record<string, any>
  documentation?: string
  figmaUrl?: string
}

export interface ArgType {
  name?: string
  description?: string
  type?: { name: string }
  control?: { type: string; options?: string[] }
  table?: { disable?: boolean; defaultValue?: { summary: string } }
  defaultValue?: any
  options?: string[]
}

export interface ComponentMetadata {
  componentName: string
  description?: string
  props: Record<string, ArgType>
  variants: string[]
  stories: string[]
  storyblokConfig?: StoryblokConfig
}

/**
 * Extract metadata from a Storybook story context
 */
export function extractMetadata(storyContext: any): ComponentMetadata {
  if (!storyContext) {
    throw new Error('Story context is required')
  }

  const {
    title = 'Unknown',
    argTypes = {},
    parameters = {},
  } = storyContext

  // Extract component name from title (e.g., "Components/Button" -> "Button")
  const componentName = title.split('/').pop() || 'Unknown'

  // Extract description from parameters
  const description =
    parameters?.docs?.description?.component ||
    parameters?.componentSubtitle ||
    undefined

  // Filter out disabled props and internal controls
  const props: Record<string, ArgType> = {}
  Object.keys(argTypes).forEach((key) => {
    const argType = argTypes[key]
    // Skip if explicitly disabled
    if (argType?.table?.disable === true) {
      return
    }
    // Skip internal Storybook controls
    if (key.startsWith('__')) {
      return
    }
    props[key] = argType
  })

  // Extract variant information (story names)
  const stories: string[] = []
  const variants: string[] = []

  if (storyContext.componentStories) {
    storyContext.componentStories.forEach((story: any) => {
      if (story.name) {
        stories.push(story.name)
        variants.push(story.name)
      }
    })
  }

  // Extract storyblok-specific configuration
  const storyblokConfig: StoryblokConfig | undefined = parameters?.storyblok

  return {
    componentName,
    description,
    props,
    variants,
    stories,
    storyblokConfig,
  }
}
