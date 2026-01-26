import { CarouselBlock } from '@/blocks/Carousel/config'
import { Heading } from '@/blocks/Heading/config'
import { ImageBlock } from '@/blocks/ImageBlock/config'
import { InfoCards } from '@/blocks/InfoCards/config'
import { TextBlock } from '@/blocks/TextBlock/config'
import { TextHeading } from '@/blocks/TextHeading/config'
import { TextImage } from '@/blocks/TextImage/config'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { revalidateDestinations } from './hooks/revalidateDestinations'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
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
    defaultColumns: ['title', 'slug'],
  },
  hooks: {
    afterChange: [revalidateDestinations],
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
      blocks: [TextBlock, ImageBlock, CarouselBlock, Heading, TextHeading, InfoCards, TextImage],
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
