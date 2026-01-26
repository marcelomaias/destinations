// PopularDestinationsLayout.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPinCheckInside } from 'lucide-react'
import { Destination, Media } from '@/payload-types'

interface PopularDestinationsLayoutProps {
  destinations: Destination[]
}

export function PopularDestinationsLayout({ destinations }: PopularDestinationsLayoutProps) {
  return (
    <div className="overflow-hidden">
      <section className="popular-destination-grid container grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8 my-4 w-full px-4">
        {destinations?.map((destination) => {
          // 1. Properly type the block extraction
          const headingBlock = destination.layout?.find(
            (block) => block.blockType === 'heading',
          ) as
            | Extract<NonNullable<Destination['layout']>[number], { blockType: 'heading' }>
            | undefined

          // 2. Safely extract the media object
          const headerImage =
            headingBlock?.image && typeof headingBlock.image === 'object'
              ? (headingBlock.image as Media)
              : null

          const imageUrl = headerImage?.url
          const imageAlt = headerImage?.alt || destination.title

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
                <h3 className="text-xl lg:text-2xl font-light">{destination.title}</h3>
                <span className="flex justify-center items-center mt-2 text-sm">
                  <MapPinCheckInside className="mr-1" />
                  {/* Ensure destination.location exists on your type */}
                  {destination.title}
                </span>
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
