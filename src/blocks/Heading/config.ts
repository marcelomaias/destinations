import type { Block } from 'payload'

export const Heading: Block = {
  slug: 'heading',
  interfaceName: 'HeadingBlockType',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'richText' },
    { name: 'ctaText', type: 'text' },
    { name: 'ctaLink', type: 'text' },
  ],
}
