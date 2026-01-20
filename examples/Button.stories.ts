import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
      defaultValue: 'Click me',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Visual style variant',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants and sizes. Use for primary actions, secondary actions, and form submissions.',
      },
    },
    storyblok: {
      blockName: 'button',
      displayName: 'Button',
      category: 'Interactive',
      icon: 'block-icon-button',
      fieldMappings: {
        label: {
          type: 'text',
          required: true,
          description: 'The text displayed on the button',
        },
        variant: {
          type: 'option',
          options: [
            { name: 'Primary', value: 'primary' },
            { name: 'Secondary', value: 'secondary' },
            { name: 'Outline', value: 'outline' },
          ],
          description: 'Visual style of the button',
        },
        size: {
          type: 'option',
          options: [
            { name: 'Small', value: 'small' },
            { name: 'Medium', value: 'medium' },
            { name: 'Large', value: 'large' },
          ],
          description: 'Size of the button',
        },
        disabled: {
          type: 'boolean',
          description: 'Whether the button is disabled',
        },
      },
      documentation: 'http://localhost:6006/?path=/docs/components-button--docs',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
    disabled: false,
  },
}

export const Outline: Story = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
    size: 'medium',
    disabled: false,
  },
}

export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'small',
    disabled: false,
  },
}

export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'large',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
}
