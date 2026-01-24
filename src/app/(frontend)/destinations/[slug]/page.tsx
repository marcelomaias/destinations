import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { generateMeta } from '@/lib/generateMeta'
import React, { cache } from 'react'

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

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  // const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'destinations',
    // draft,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
