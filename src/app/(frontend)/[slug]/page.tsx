import type { Metadata } from 'next'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { generateMeta } from '@/lib/generateMeta'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'

import { RenderBlocks } from '@/components/RenderBlocks'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2, // Populate relationships (like form in ContactBlock)
  })

  const page = result.docs[0]

  if (!page) {
    notFound()
  }

  // console.log('PAGE: ', page)

  return (
    <>
      <main>
        <RenderBlocks blocks={page.layout} currentSlug={slug} />
      </main>
    </>
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
    collection: 'pages',
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
