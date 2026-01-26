import type { Block } from 'payload'

export const TextHeading: Block = {
  slug: 'textHeading',
  interfaceName: 'TextHeadingBlockType',
  labels: {
    singular: 'Text Heading',
    plural: 'Text Headings',
  },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
  ],
}
