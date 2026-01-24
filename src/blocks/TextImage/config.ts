import type { Block } from 'payload'

export const TextImage: Block = {
  slug: 'textImage',
  labels: {
    singular: 'Text + Image',
    plural: 'Text + Images',
  },

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'radio',
          label: 'Layout Order',
          defaultValue: 'text-image',
          options: [
            {
              label: 'Text first',
              value: 'text-image',
            },
            {
              label: 'Image first',
              value: 'image-text',
            },
          ],
          admin: {
            layout: 'horizontal',
            width: '50%',
          },
        },
        {
          name: 'showBackgroundImage',
          type: 'checkbox',
          label: 'Show background',
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },

    {
      type: 'group',
      name: 'textContent',
      label: 'Text Content',
      fields: [
        {
          name: 'text',
          type: 'richText',
          label: 'Text',
          required: true,
        },
        {
          name: 'author',
          type: 'richText',
          label: 'Author',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Call to Action',
          fields: [
            {
              name: 'label',
              type: 'text',
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
              defaultValue: false,
            },
          ],
        },
      ],
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Image',
      required: true,
    },
  ],
}
