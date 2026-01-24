// DestinationsGrid.tsx (SERVER)

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PopularDestinationsLayout } from './PopularDestinationsLayout'
import { AllDestinationsLayout } from './AllDestinationsLayout'
import { DestinationsFilterClient } from './Component.client'

type Props = {
  showOnlyPopular?: boolean
  maxItems?: number
  currentSlug?: string
}

export async function DestinationsGrid({
  showOnlyPopular,
  maxItems,
  currentSlug,
}: Props) {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'destinations',
    where: showOnlyPopular
      ? { showOnPopularList: { equals: true } }
      : undefined,
    limit: maxItems || undefined,
    depth: 2,
  })

  // ❗ EXACT LOGIC PRESERVED
  if (showOnlyPopular || currentSlug === 'destinations') {
    // ✅ Only /destinations gets filtering
    if (currentSlug === 'destinations') {
      return <DestinationsFilterClient destinations={docs} />
    }

    return <PopularDestinationsLayout destinations={docs} />
  }

  return <AllDestinationsLayout destinations={docs} />
}
