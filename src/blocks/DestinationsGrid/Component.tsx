// DestinationsGrid.tsx (SERVER)
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PopularDestinationsLayout } from './PopularDestinationsLayout'
import { AllDestinationsLayout } from './AllDestinationsLayout'
import { DestinationsFilterClient } from './Component.client'

// Assuming your payload-types file has a type named exactly this:
import { DestinationsGridBlockType } from '@/payload-types'

// Interface combining the block type and the extra prop
interface Props extends DestinationsGridBlockType {
  currentSlug?: string
}

// Exported Function Name: DestinationsGrid
// Type applied to props: Props
export async function DestinationsGrid({ showOnlyPopular, maxItems, currentSlug }: Props) {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'destinations',
    where: showOnlyPopular
      ? {
          showOnPopularList: {
            equals: true,
          },
        }
      : undefined,
    limit: maxItems || 0,
    depth: 2,
  })

  if (showOnlyPopular || currentSlug === 'destinations') {
    if (currentSlug === 'destinations') {
      return <DestinationsFilterClient destinations={docs} />
    }

    return <PopularDestinationsLayout destinations={docs} />
  }

  return <AllDestinationsLayout destinations={docs} />
}
