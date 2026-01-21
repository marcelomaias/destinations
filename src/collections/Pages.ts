import { CarouselBlock } from '@/blocks/Carousel/config'
import { DestinationsGrid } from '@/blocks/DestinationsGrid/config'
import { Heading } from '@/blocks/Heading/config'
import { ImageBlock } from '@/blocks/ImageBlock/config'
import { TextBlock } from '@/blocks/TextBlock/config'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageType'],
  },

  access: {
    read: () => true,
  },

  hooks: {
    beforeChange: [],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'pageType',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Home', value: 'home' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [TextBlock, ImageBlock, CarouselBlock, Heading, DestinationsGrid],
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

    // ─────────────────────────
    // Navigation helpers
    // ─────────────────────────
    {
      name: 'showInMenu',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar', // <--- This moves the field to the sidebar
      },
    },
    {
      name: 'menuLabel',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.showInMenu,
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar', // <--- This moves the field to the sidebar
      },
    },
  ],
}
