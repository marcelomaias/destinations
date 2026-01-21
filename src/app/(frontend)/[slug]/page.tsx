import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { RenderBlocks } from '@/components/RenderBlocks'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const page = result.docs[0]

  if (!page) {
    notFound()
  }

  console.log('PAGE: ', page)

  return (
    <>
      <main>
        <RenderBlocks blocks={page.layout} />
      </main>
    </>
  )
}
