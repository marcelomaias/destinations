import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RenderBlocks } from '@/components/RenderBlocks'
import { generateMeta } from '@/lib/generateMeta'
import { getPageBySlug } from '@/lib/getPageBySlug'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Define the shape to match Next.js 15 PageProps
type Props = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DestinationPage({ params, searchParams }: Props) {
  // Await the dynamic APIs
  const { slug } = await params
  const {} = await searchParams // Await to satisfy the build constraint

  const destination = await getPageBySlug('destinations', slug)

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
  const page = await getPageBySlug('destinations', decodedSlug)

  return generateMeta({ doc: page })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const destinations = await payload.find({
    collection: 'destinations',
    limit: 0,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
    },
  })

  return destinations.docs.map((doc) => ({
    slug: doc.slug,
  }))
}
