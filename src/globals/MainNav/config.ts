import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Navigation',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'array',
      name: 'headerLinks',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'path',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
      ],
      maxRows: 8,
    },
  ],
}
