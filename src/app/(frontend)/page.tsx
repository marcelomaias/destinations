import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/getPageBySlug'
import { generateMetadata } from './[slug]/page'

import { RenderBlocks } from '@/components/RenderBlocks'

export default async function HomePage() {
  const page = await getPageBySlug('pages', 'home')

  if (!page) notFound()

  return (
    <>
      <main>
        <RenderBlocks blocks={page.layout ?? []} />
      </main>
    </>
  )
}

export { generateMetadata }
