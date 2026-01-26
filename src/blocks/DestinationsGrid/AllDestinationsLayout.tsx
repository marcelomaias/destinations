import Link from 'next/link'
import Image from 'next/image'
import { CircleArrowRight } from 'lucide-react'
import { extractPlainTextFromRichText } from '@/lib/extractPlainTextFromRichText'
import { DestinationsGridBlockType, Destination, Media } from '@/payload-types'

interface AllDestinationsLayoutProps extends Partial<DestinationsGridBlockType> {
  destinations: Destination[]
}

export const AllDestinationsLayout: React.FC<AllDestinationsLayoutProps> = ({ destinations }) => {
  return (
    <section className="all-destinations container relative grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4 mb-18 w-full px-4">
      <Image
        src="/images/stamp.svg"
        width={230}
        height={230}
        className="stamp absolute -top-[238px] md:-top-[246px] right-10 w-[128px] h-[128px] md:w-[230px] md:h-[230px]"
        alt="Stamp image."
      />
      {destinations?.map((destination) => {
        const headingBlock = destination.layout?.find((block) => block.blockType === 'heading') as
          | Extract<NonNullable<Destination['layout']>[number], { blockType: 'heading' }>
          | undefined

        const textBlock = destination.layout?.find((block) => block.blockType === 'textBlock') as
          | Extract<NonNullable<Destination['layout']>[number], { blockType: 'textBlock' }>
          | undefined

        const headerImage =
          headingBlock?.image && typeof headingBlock.image === 'object'
            ? (headingBlock.image as Media)
            : null

        const imageUrl = headerImage?.url
        const imageAlt = headerImage?.alt || destination.title

        const { text: previewText, truncated } = extractPlainTextFromRichText(
          textBlock?.content,
          120,
        )

        return (
          <Link
            key={destination.id}
            href={`/destinations/${destination.slug}`}
            className="group relative w-full aspect-video flex items-end rounded-xl overflow-hidden text-white p-8 sm:p-4 lg:p-8 sm:first-of-type:col-span-2 sm:first-of-type:aspect-16/5"
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
            )}

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 max-w-xl">
              <h3 className="text-2xl md:text-4xl font-normal">{destination.title}</h3>

              {previewText && (
                <p className="max-w-[500px] mt-2 leading-relaxed">
                  {previewText}
                  {truncated && '…'}
                </p>
              )}

              <span className="flex gap-2 items-center mt-2 uppercase tracking-wider text-sm">
                Read more <CircleArrowRight />
              </span>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
