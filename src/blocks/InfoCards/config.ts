import type { Block } from 'payload'

export const InfoCards: Block = {
  slug: 'infoCards',
  labels: {
    singular: 'Info Card',
    plural: 'Info Cards',
  },
  fields: [
    {
        type: 'array',
        name: 'card',
        label: 'Card',
        minRows: 1,
        maxRows: 4,
        fields: [
            { name: 'icon', type: 'upload', relationTo: 'media' },
            { name: 'text', type: 'richText' },
        ],
    }
  ],
}