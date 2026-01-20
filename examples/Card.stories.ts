import type { Meta, StoryObj } from '@storybook/vue3'
import Card from './Card.vue'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Card description',
    },
    imageUrl: {
      control: 'text',
      description: 'Card image URL',
    },
    ctaLabel: {
      control: 'text',
      description: 'Call-to-action button label',
    },
    ctaUrl: {
      control: 'text',
      description: 'Call-to-action button URL',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexible card component for displaying content with optional image, title, description, and call-to-action button. Supports custom footer content via slots.',
      },
    },
    storyblok: {
      blockName: 'card',
      displayName: 'Card',
      category: 'Content',
      icon: 'block-icon-card',
      fieldMappings: {
        title: {
          type: 'text',
          required: true,
          description: 'The main heading of the card',
        },
        description: {
          type: 'textarea',
          description: 'The descriptive text content',
        },
        imageUrl: {
          type: 'asset',
          filetypes: ['images'],
          description: 'Hero image for the card',
        },
        ctaLabel: {
          type: 'text',
          description: 'Call-to-action button text',
        },
        ctaUrl: {
          type: 'text',
          description: 'Call-to-action button link URL',
        },
      },
      documentation: 'http://localhost:6006/?path=/docs/components-card--docs',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  args: {
    title: 'Card Title',
    description:
      'This is a basic card with a title and description. It can be used to display various types of content.',
  },
}

export const WithImage: Story = {
  args: {
    title: 'Beautiful Landscape',
    description:
      'Explore stunning natural landscapes from around the world. Discover hidden gems and breathtaking views.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
  },
}

export const WithCTA: Story = {
  args: {
    title: 'Get Started Today',
    description:
      'Join thousands of satisfied customers and transform your experience with our platform.',
    ctaLabel: 'Sign Up Now',
    ctaUrl: 'https://example.com/signup',
  },
}

export const Complete: Story = {
  args: {
    title: 'Premium Course',
    description:
      'Learn from industry experts and advance your career with our comprehensive course. Includes lifetime access and certification.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    ctaLabel: 'Enroll Now',
    ctaUrl: 'https://example.com/enroll',
  },
}
