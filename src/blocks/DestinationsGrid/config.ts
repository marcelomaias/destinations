import type { Block } from 'payload'

export const DestinationsGrid: Block = {
  slug: 'destinationsGrid',
  interfaceName: 'DestinationsGridBlockType',
  labels: {
    singular: 'Destinations Grid',
    plural: 'Destinations Grids',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'showOnlyPopular',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'maxItems',
          type: 'number',
          label: 'Maximum destinations to show',
          defaultValue: 8,
          min: 1,
          admin: {
            description: 'Leave empty to show all destinations',
            width: '50%',
          },
        },
      ],
    },
  ],
}
