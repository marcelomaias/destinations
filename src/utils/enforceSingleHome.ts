import type { CollectionBeforeChangeHook } from 'payload'
import { ValidationError } from 'payload'

export const enforceSingleHome: CollectionBeforeChangeHook = async ({ data, req, originalDoc }) => {
  if (data.pageType !== 'home') return data

  const result = await req.payload.find({
    collection: 'pages',
    where: {
      pageType: { equals: 'home' },
    },
    limit: 1,
  })

  const existingHome = result.docs[0]

  // Creating a new Home page
  if (existingHome && !originalDoc) {
    throw new ValidationError({
      errors: [
        {
          path: 'pageType',
          message: 'Only one Home page is allowed.',
        },
      ],
    })
  }

  // Editing another page to Home
  if (existingHome && originalDoc && existingHome.id !== originalDoc.id) {
    throw new ValidationError({
      errors: [
        {
          path: 'pageType',
          message: 'Another page is already set as Home. Unset it first.',
        },
      ],
    })
  }

  // Force slug for Home
  data.slug = 'home'

  return data
}
