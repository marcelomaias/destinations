import { APIError, type CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data) {
          // 1. Check Dimensions
          if (data.width > 2000 || data.height > 1200) {
            throw new APIError(
              'Image too large! Max dimensions: 2000x1200px.',
              400,
              undefined,
              true,
            )
          }
          // 2. Check File Size (600KB = 614,400 bytes)
          if (data.filesize > 600000) {
            throw new APIError('File size exceeds 600KB limit.', 400, undefined, true)
          }
        }
        return data
      },
    ],
  },
  admin: {
    description: 'Max file size 600KB | Max file dimensions 2000x1200px',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
