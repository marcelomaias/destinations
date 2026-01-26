import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMeta } from '@/lib/generateMeta'
import { RenderBlocks } from '@/components/RenderBlocks'
import { getPageBySlug } from '@/lib/getPageBySlug'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Define the exact shape Next.js 15 expects for dynamic routes
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Props) {
  // Await the params Promise to extract the slug
  const { slug } = await params

  // Await searchParams even if not used to satisfy TypeScript constraints
  const {} = await searchParams

  const page = await getPageBySlug('pages', slug)

  if (!page) {
    notFound()
  }

  return (
    <main>
      <RenderBlocks blocks={page.layout} currentSlug={slug} />
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug = 'home' } = await params
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await getPageBySlug('pages', decodedSlug)

  return generateMeta({ doc: page })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  // Fetch all pages, selecting only the slug field for performance
  const pages = await payload.find({
    collection: 'pages',
    limit: 0,
    select: {
      slug: true,
    },
  })

  // Return an array of objects where each object contains the slug
  return pages.docs.map((doc) => ({
    slug: doc.slug,
  }))
}
