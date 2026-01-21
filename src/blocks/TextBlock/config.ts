import type { Block } from 'payload'

export const TextBlock: Block = {
  slug: 'textBlock',
  labels: {
    singular: 'Text Block',
    plural: 'Text Blocks',
  },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'content', type: 'richText' },
  ],
}
