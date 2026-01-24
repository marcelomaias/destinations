// PopularDestinationsLayout.tsx
import Link from 'next/link'
import Image from 'next/image'
import { MapPinCheckInside } from 'lucide-react'

export function PopularDestinationsLayout({ destinations }: { destinations: any[] }) {
  return (
    <div className="overflow-hidden">
      <section className="popular-destination-grid container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-4 w-full px-4">
        {destinations.map((destination) => {
          const headingBlock = destination.layout?.find(
            (block: any) => block.blockType === 'heading',
          )

          const imageUrl = headingBlock?.image?.url
          const imageAlt = headingBlock?.image?.alt || destination.title

          return (
            <Link
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              className="popular-destination-item group relative w-full aspect-4/6 flex items-end justify-center rounded-xl overflow-hidden text-white pb-8"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.1]"
                />
              )}

              <div className="absolute inset-0 bg-black/50" />

              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-light">{destination.title}</h3>
                <span className="flex justify-center items-center mt-2 text-sm">
                  <MapPinCheckInside className="mr-1" />
                  {destination.location}
                </span>
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
