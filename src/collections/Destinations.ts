import { CarouselBlock } from '@/blocks/Carousel/config'
import { Heading } from '@/blocks/Heading/config'
import { ImageBlock } from '@/blocks/ImageBlock/config'
import { TextBlock } from '@/blocks/TextBlock/config'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Destinations: CollectionConfig = {
  slug: 'destinations',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'layout',
      type: 'blocks',
      blocks: [TextBlock, ImageBlock, CarouselBlock, Heading],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'showOnPopularList',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
