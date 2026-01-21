import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getPageBySlug(slug: string) {
  const payload = await getPayload({
    config,
  })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  return result.docs[0] ?? null
}
