import type { Block } from 'payload'

export const DestinationsGrid: Block = {
  slug: 'destinationsGrid',
  labels: {
    singular: 'Destinations Grid',
    plural: 'Destinations Grids',
  },
  fields: [
    {
      name: 'showOnlyPopular',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
