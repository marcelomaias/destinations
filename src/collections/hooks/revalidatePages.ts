import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidatePages: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  // 1. If the page is published, revalidate its path
  if (doc._status === 'published') {
    revalidatePath(`/${doc.slug}`)
  }

  // 2. If the page was published but is now a draft (Unpublished), revalidate it
  if (previousDoc?._status === 'published' && doc._status === 'draft') {
    revalidatePath(`/${previousDoc.slug}`)
  }

  // 3. Optional: Revalidate the homepage if it has a menu or list of pages
  revalidatePath('/')

  return doc
}
