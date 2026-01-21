import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'

type Props = {
  params: {
    slug: string
  }
}

export default async function DestinationPage({ params }: Props) {
  const payload = await getPayload({
    config: configPromise,
  })

  const { docs } = await payload.find({
    collection: 'destinations',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  const destination = docs[0]

  if (!destination) {
    notFound()
  }

  return (
    <main>
      {/* Render blocks */}
      <RenderBlocks blocks={destination.layout} />
    </main>
  )
}
