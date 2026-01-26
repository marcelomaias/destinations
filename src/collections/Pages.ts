import { CarouselBlock } from '@/blocks/Carousel/config'
import { ContactFormBlock } from '@/blocks/ContactBlock/config'
import { DestinationsGrid } from '@/blocks/DestinationsGrid/config'
import { Heading } from '@/blocks/Heading/config'
import { ImageBlock } from '@/blocks/ImageBlock/config'
import { InfoCards } from '@/blocks/InfoCards/config'
import { TextBlock } from '@/blocks/TextBlock/config'
import { TextHeading } from '@/blocks/TextHeading/config'
import { TextImage } from '@/blocks/TextImage/config'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { revalidatePages } from './hooks/revalidatePages'

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    maxPerDoc: 10,
    drafts: {
      validate: false,
      autosave: {
        interval: 100,
      },
    },
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageType'],
  },

  access: {
    read: () => true,
  },

  hooks: {
    afterChange: [revalidatePages],
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
      blocks: [
        TextBlock,
        ImageBlock,
        CarouselBlock,
        Heading,
        DestinationsGrid,
        TextHeading,
        InfoCards,
        TextImage,
        ContactFormBlock,
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
