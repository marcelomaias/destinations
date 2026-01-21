import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { MapPinCheckInside } from 'lucide-react'

type Props = {
  showOnlyPopular?: boolean
}

export async function DestinationsGrid({ showOnlyPopular }: Props) {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'destinations',
    where: showOnlyPopular ? { showOnPopularList: { equals: true } } : undefined,
  })

  return (
    <section className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-between overflow-hidden mt-8 w-full max-w-5xl mx-auto px-4">
      {docs.map((destination) => {
        const headingBlock = destination.layout?.find((block: any) => block.blockType === 'heading')
        const imageUrl = (headingBlock as any)?.image?.url
        const imageAlt = (headingBlock as any)?.image?.alt || destination.title

        return (
          <Link
            key={destination.id}
            href={`/destinations/${destination.slug}`}
            className="place-card w-full aspect-[4/6] bg-slate-400 relative flex justify-center text-center text-white items-end rounded-xl overflow-hidden pb-8"
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover hover:scale-[1.2] transition-all"
                sizes="
      (max-width: 500px) 300px,
      (max-width: 900px) 500px,
      500px"
              />
            )}
            <div className="z-10 pointer-none:">
              <h3 className="text-lg md:text-2xl font-light [text-shadow:_2px_1px_3px_rgb(0_0_0_/_70%)]">
                {destination.title}
              </h3>
              <span className="flex justify-center items-center mt-2 text-sm md:text-lg font-light [text-shadow:_2px_1px_3px_rgb(0_0_0_/_70%)]">
                <MapPinCheckInside /> {destination.location}
              </span>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
