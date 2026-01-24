import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Navigation',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Column 1',
          fields: [
            {
              name: 'titleColumn1',
              type: 'text',
            },
            {
              type: 'array',
              name: 'footerLinksColumn1',
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
            {
              name: 'textColumn1',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Column 2',
          fields: [
            {
              name: 'titleColumn2',
              type: 'text',
            },
            {
              type: 'array',
              name: 'footerLinksColumn2',
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
            {
              name: 'textColumn2',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Column 3',
          fields: [
            {
              name: 'titleColumn3',
              type: 'text',
            },
            {
              type: 'array',
              name: 'footerLinksColumn3',
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
            {
              name: 'textColumn3',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Column 4',
          fields: [
            {
              name: 'textColumn4',
              type: 'richText',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'iconAddress',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'textAddress',
                  type: 'richText',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'iconPhone',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'textPhone',
                  type: 'richText',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'iconMobile',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'textMobile',
                  type: 'richText',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
