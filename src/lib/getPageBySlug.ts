import { cache } from 'react'
import { getPayload } from 'payload'
import type { Page } from '@/payload-types'

export const getPageBySlug = cache(
  async (collection: 'pages' | 'destinations', slug: string): Promise<Page | null> => {
    const payload = await getPayload({
      config: (await import('@/payload.config')).default,
    })

    const result = await payload.find({
      collection,
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      pagination: false,
      depth: 2,
      overrideAccess: true,
    })

    return (result.docs?.[0] as Page) || null
  },
)
