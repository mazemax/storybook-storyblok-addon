# Storybook Storyblok Addon - Starter Code Scaffold

## File Structure
```
storybook-storyblok-addon/
├── src/
│   ├── Tool.tsx                    # Toolbar button component
│   ├── Panel.tsx                   # Panel UI component
│   ├── index.ts                    # Manager registration
│   ├── withGlobals.ts              # Preview decorator
│   ├── preset.ts                   # Preset configuration
│   └── utils/
│       ├── extractMetadata.ts      # Extract story metadata
│       ├── generateStoryblokJSON.ts # Convert to Storyblok format
│       ├── fieldMapper.ts          # Map control types to fields
│       └── clipboard.ts            # Clipboard utilities
├── .storybook/
│   └── main.ts                     # Storybook config example
├── package.json
├── tsconfig.json
└── tsup.config.ts                  # Build configuration
```

---

## 1. Core Files

### `src/index.ts` - Manager Registration
```typescript
import { addons, types } from '@storybook/manager-api'
import { Tool } from './Tool'

addons.register('mindvalley/storyblok', (api) => {
  addons.add('mindvalley/storyblok/tool', {
    type: types.TOOL,
    title: 'Storyblok',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <Tool />,
  })
})
```

---

### `src/Tool.tsx` - Toolbar Button
```typescript
import React, { useState } from 'react'
import { useStorybookApi } from '@storybook/manager-api'
import { IconButton } from '@storybook/components'
import { CopyIcon } from '@storybook/icons'
import { extractMetadata } from './utils/extractMetadata'
import { generateStoryblokSchema } from './utils/generateStoryblokJSON'
import { copyToClipboard } from './utils/clipboard'

export const Tool = () => {
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const api = useStorybookApi()

  const handleCopy = async () => {
    try {
      setLoading(true)
      
      // Get current story context
      const story = api.getCurrentStoryData()
      if (!story) {
        console.error('No story selected')
        return
      }

      // Extract metadata from story
      const metadata = extractMetadata(story)
      
      // Generate Storyblok-compatible JSON
      const storyblokSchema = generateStoryblokSchema(metadata)
      
      // Copy to clipboard
      await copyToClipboard(storyblokSchema)
      
      // Show success state
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <IconButton
      key="storyblok-copy"
      active={copied}
      title={copied ? 'Copied to clipboard!' : 'Copy to Storyblok'}
      onClick={handleCopy}
      disabled={loading}
    >
      <CopyIcon />
    </IconButton>
  )
}
```

---

### `src/Panel.tsx` - Panel Tab Component
```typescript
import React, { useState, useEffect } from 'react'
import { useStorybookApi, useParameter } from '@storybook/manager-api'
import { styled } from '@storybook/theming'
import { extractMetadata } from './utils/extractMetadata'
import { generateStoryblokSchema } from './utils/generateStoryblokJSON'

const PanelContainer = styled.div`
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  background: ${(props) => props.theme.background.secondary};
  color: ${(props) => props.theme.text.primary};
`

const SectionTitle = styled.h3`
  margin: 16px 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Description = styled.p`
  font-size: 13px;
  line-height: 1.5;
  margin: 0 0 12px 0;
  color: ${(props) => props.theme.text.secondary};
`

const JSONPreview = styled.pre`
  background: ${(props) => props.theme.background.primary};
  border: 1px solid ${(props) => props.theme.ui.border};
  border-radius: 4px;
  padding: 12px;
  font-size: 11px;
  overflow-x: auto;
  margin: 12px 0;
`

const Button = styled.button`
  padding: 8px 12px;
  background: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.secondaryText};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  margin: 8px 0;
  width: 100%;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Panel = () => {
  const [metadata, setMetadata] = useState(null)
  const [storyblokSchema, setStoryblokSchema] = useState(null)
  const [copied, setCopied] = useState(false)
  const api = useStorybookApi()

  useEffect(() => {
    const story = api.getCurrentStoryData()
    if (story) {
      const extracted = extractMetadata(story)
      setMetadata(extracted)
      setStoryblokSchema(generateStoryblokSchema(extracted))
    }
  }, [api])

  const handleCopy = async () => {
    if (storyblokSchema) {
      await navigator.clipboard.writeText(
        JSON.stringify(storyblokSchema, null, 2)
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!metadata) {
    return <PanelContainer>Select a story to view component info</PanelContainer>
  }

  return (
    <PanelContainer>
      <SectionTitle>📋 Component Info</SectionTitle>
      <Description>{metadata.description || 'No description available'}</Description>

      {metadata.variants && metadata.variants.length > 0 && (
        <>
          <SectionTitle>🎨 Variants</SectionTitle>
          <ul>
            {metadata.variants.map((variant) => (
              <li key={variant}>{variant}</li>
            ))}
          </ul>
        </>
      )}

      {metadata.props && Object.keys(metadata.props).length > 0 && (
        <>
          <SectionTitle>⚙️ Props</SectionTitle>
          <ul>
            {Object.entries(metadata.props).map(([name, prop]) => (
              <li key={name}>
                <strong>{name}</strong>: {prop.control?.type || 'unknown'}
              </li>
            ))}
          </ul>
        </>
      )}

      <SectionTitle>📄 Storyblok Block Schema</SectionTitle>
      <JSONPreview>{JSON.stringify(storyblokSchema, null, 2)}</JSONPreview>

      <Button onClick={handleCopy}>
        {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
      </Button>
    </PanelContainer>
  )
}
```

---

### `src/withGlobals.ts` - Preview Decorator
```typescript
import { useGlobals } from '@storybook/api'

// Optional: Inject styles or modify preview based on addon state
export const withGlobals = (StoryFn) => {
  const [globals] = useGlobals()
  const isEnabled = globals['storyblok-addon']

  if (!isEnabled) return <StoryFn />

  // Add any preview-side modifications here
  return <StoryFn />
}
```

---

### `src/preset.ts` - Preset Configuration
```typescript
export const presets = () => [
  {
    name: '@storybook/addon-docs/preset',
    options: {
      configureJSX: true,
    },
  },
]

export const addons = [
  '@storybook/addon-docs',
  '@storybook/addon-essentials',
]
```

---

## 2. Utility Functions

### `src/utils/extractMetadata.ts`
```typescript
export interface ComponentMetadata {
  componentName: string
  description?: string
  props: Record<string, any>
  variants: string[]
  stories: string[]
  designTokens?: Record<string, any>
  storyblokConfig?: any
}

export const extractMetadata = (storyData: any): ComponentMetadata => {
  const {
    component,
    parameters = {},
    argTypes = {},
    stories = {},
  } = storyData

  return {
    componentName: component?.name || 'Unknown',
    description: parameters.docs?.description?.component,
    props: argTypes,
    variants: parameters.variants || Object.keys(stories),
    stories: Object.keys(stories),
    designTokens: parameters.designTokens,
    storyblokConfig: parameters.storyblok,
  }
}
```

---

### `src/utils/generateStoryblokJSON.ts`
```typescript
import { mapPropsToStoryblokFields } from './fieldMapper'
import type { ComponentMetadata } from './extractMetadata'

export interface StoryblokBlockSchema {
  name: string
  display_name: string
  description?: string
  schema: Record<string, any>
  preview?: {
    url?: string
  }
}

export const generateStoryblokSchema = (
  metadata: ComponentMetadata
): StoryblokBlockSchema => {
  const customConfig = metadata.storyblokConfig || {}

  return {
    name: customConfig.blockName || metadata.componentName.toLowerCase(),
    display_name: customConfig.displayName || metadata.componentName,
    description: metadata.description,
    schema: {
      ...mapPropsToStoryblokFields(metadata.props),
      // Add metadata link
      _storybook_link: {
        type: 'text',
        description: 'Link to component in Storybook',
        default_value: `https://storybook.example.com/?path=/docs/...`,
      },
    },
    preview: {
      url: customConfig.previewImage,
    },
  }
}
```

---

### `src/utils/fieldMapper.ts`
```typescript
const CONTROL_TYPE_MAP: Record<string, string> = {
  'select': 'option',
  'multi-select': 'multiselect',
  'inline-radio': 'option',
  'radio': 'option',
  'check': 'boolean',
  'inline-check': 'boolean',
  'boolean': 'boolean',
  'text': 'text',
  'number': 'number',
  'range': 'number',
  'object': 'json',
  'array': 'array',
  'date': 'datetime',
  'color': 'color',
}

export const mapPropsToStoryblokFields = (
  argTypes: Record<string, any>
): Record<string, any> => {
  return Object.entries(argTypes).reduce((acc, [propName, argType]) => {
    // Skip disabled props
    if (argType.table?.disable) return acc

    const controlType = argType.control?.type
    const fieldType = CONTROL_TYPE_MAP[controlType] || 'text'

    const field: any = {
      type: fieldType,
    }

    // Add description if available
    if (argType.description) {
      field.description = argType.description
    }

    // Add options for select controls
    if (argType.control?.options) {
      field.options = argType.control.options.map((option: string) => ({
        name: option,
        value: option,
      }))
    }

    // Add default value
    if (argType.default !== undefined) {
      field.default_value = argType.default
    }

    acc[propName] = field
    return acc
  }, {})
}
```

---

### `src/utils/clipboard.ts`
```typescript
export const copyToClipboard = async (data: any): Promise<void> => {
  const jsonString = JSON.stringify(data, null, 2)
  
  try {
    await navigator.clipboard.writeText(jsonString)
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = jsonString
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

export const generateStoryblokComponentURL = (spaceId: string): string => {
  return `https://app.storyblok.com/#/me/spaces/${spaceId}/bloks`
}
```

---

## 3. Configuration Files

### `package.json` (Addon)
```json
{
  "name": "storybook-storyblok-addon",
  "version": "0.1.0",
  "description": "Storybook addon to copy components to Storyblok",
  "main": "dist/index.js",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs"
    },
    "./manager": "./dist/manager.js",
    "./preset": "./dist/preset.js"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@storybook/manager-api": "^6.5.16",
    "@storybook/components": "^6.5.16",
    "@storybook/theming": "^6.5.16",
    "@storybook/icons": "^1.0.0"
  },
  "devDependencies": {
    "@storybook/types": "^6.5.16",
    "typescript": "^5.0.0",
    "tsup": "^6.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
    "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0"
  },
  "keywords": ["storybook", "addon", "storyblok", "cms"],
  "storybook": {
    "displayName": "Storyblok Component Exporter",
    "icon": "https://avatars.githubusercontent.com/u/8393173?s=40",
    "frameworks": ["vue2", "vue3"],
    "categories": ["integration"]
  }
}
```

---

### `.storybook/main.ts` (Usage Example)
```typescript
import type { StorybookConfig } from '@storybook/nuxt'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    {
      name: 'storybook-storyblok-addon',
      options: {
        spaceId: process.env.STORYBLOK_SPACE_ID,
        accessToken: process.env.STORYBLOK_TOKEN,
      }
    }
  ],
  framework: {
    name: '@storybook/nuxt',
    options: {},
  },
}

export default config
```

---

### `tsup.config.ts` (Build Configuration)
```typescript
import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      manager: 'src/index.ts',
      preset: 'src/preset.ts',
    },
    outDir: 'dist',
    format: ['cjs', 'esm'],
    dts: true,
    external: [
      'react',
      'react-dom',
      '@storybook/manager-api',
      '@storybook/components',
      '@storybook/theming',
    ],
    esbuildOptions(options) {
      options.jsx = 'automatic'
    },
  },
])
```

---

## 4. Example Story With Metadata

### `src/components/Button/Button.stories.ts`
```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    storyblok: {
      blockName: 'button',
      displayName: 'Button Component',
      category: 'Interactive',
      icon: 'button',
    },
    docs: {
      description: {
        component:
          'A versatile button component supporting multiple sizes, variants, and states.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
      table: { type: { summary: 'string' } },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'danger'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      table: { defaultValue: { summary: false } },
    },
    onClick: {
      table: { disable: true }, // Don't expose to Storyblok
    },
  },
} satisfies Meta<typeof Button>

export const Primary: StoryObj<typeof meta> = {
  args: {
    label: 'Click me',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
}

export const Secondary: StoryObj<typeof meta> = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
    size: 'md',
  },
}

export default meta
```

---

## 5. Quick Start Commands

```bash
# Clone addon kit
npx degit storybookjs/addon-kit storybook-storyblok-addon
cd storybook-storyblok-addon

# Install dependencies
yarn install

# Start in watch mode
yarn dev

# Build addon
yarn build

# Type check
yarn type-check

# Link to main project (for testing)
cd /path/to/mindvalley
yarn link ../storybook-storyblok-addon
```

---

## 6. Integration Checklist

- [ ] Scaffold addon using Addon Kit
- [ ] Implement `Tool.tsx` with copy button
- [ ] Implement `Panel.tsx` with metadata display
- [ ] Add metadata extraction logic
- [ ] Create Storyblok JSON generator
- [ ] Add field type mapping
- [ ] Test with 3-5 components
- [ ] Document component annotation format
- [ ] Create team tutorial
- [ ] Publish to internal npm registry
- [ ] Integrate into Mindvalley Storybook

---

