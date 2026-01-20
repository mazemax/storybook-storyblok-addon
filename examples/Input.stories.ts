import type { Meta, StoryObj } from '@storybook/vue3'
import Input from './Input.vue'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Input value (v-model)',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number'],
      description: 'Input type',
      defaultValue: 'text',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    hint: {
      control: 'text',
      description: 'Hint text displayed below input',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Required indicator',
      defaultValue: false,
    },
    'update:modelValue': {
      table: {
        disable: true,
      },
    },
    blur: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A versatile input component with support for various input types, labels, hints, and error states. Includes built-in validation styling and accessibility features.',
      },
    },
    storyblok: {
      blockName: 'input',
      displayName: 'Input Field',
      category: 'Forms',
      icon: 'block-icon-input',
      fieldMappings: {
        type: {
          type: 'option',
          options: [
            { name: 'Text', value: 'text' },
            { name: 'Email', value: 'email' },
            { name: 'Password', value: 'password' },
            { name: 'Phone', value: 'tel' },
            { name: 'URL', value: 'url' },
            { name: 'Number', value: 'number' },
          ],
          description: 'Type of input field',
        },
        label: {
          type: 'text',
          description: 'Label text for the input',
        },
        placeholder: {
          type: 'text',
          description: 'Placeholder text shown when empty',
        },
        hint: {
          type: 'text',
          description: 'Helpful hint text displayed below input',
        },
        error: {
          type: 'text',
          description: 'Error message to display',
        },
        disabled: {
          type: 'boolean',
          description: 'Whether the input is disabled',
        },
        required: {
          type: 'boolean',
          description: 'Whether the field is required',
        },
      },
      documentation: 'http://localhost:6006/?path=/docs/components-input--docs',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Text: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    hint: 'Please enter your first and last name',
    type: 'text',
    required: true,
  },
}

export const Email: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    hint: 'We will never share your email',
    type: 'email',
    required: true,
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    hint: 'Must be at least 8 characters',
    type: 'password',
    required: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
    error: 'Please enter a valid email address',
    modelValue: 'invalid-email',
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Your username',
    type: 'text',
    disabled: true,
    modelValue: 'john_doe',
  },
}

export const Phone: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    type: 'tel',
    hint: 'Include country code for international numbers',
  },
}
