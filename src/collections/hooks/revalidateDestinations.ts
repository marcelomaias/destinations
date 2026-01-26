import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateDestinations: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  // 1. Revalidate if the document is currently published
  if (doc._status === 'published') {
    revalidatePath(`/destinations/${doc.slug}`)
  }

  // 2. Revalidate if the document was published but is now a draft (Unpublished)
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    revalidatePath(`/destinations/${previousDoc.slug}`)
  }

  // 3. Always revalidate the destinations listing page to reflect changes
  revalidatePath('/')
  revalidatePath('/destinations')

  return doc
}
