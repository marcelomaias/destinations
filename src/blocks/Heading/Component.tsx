import React from 'react' // Import React for React.FC
import { HeadingBlockType, Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

// 1. Fix typo: React.FC (with a dot)
export const Heading: React.FC<HeadingBlockType> = ({
  image,
  title,
  subtitle,
  ctaText,
  ctaLink,
}) => {
  // 2. Type guard for the image to access .url safely
  const bgImage = image && typeof image === 'object' ? (image as Media) : null

  return (
    <section className="relative h-[40vh] w-full overflow-hidden mb-12">
      {/* 3. Use the safe bgImage variable */}
      {bgImage?.url && (
        <Image
          src={bgImage.url}
          alt={bgImage.alt || title || 'Heading Image'}
          fill
          className="object-cover"
          priority
        />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 z-10 flex items-end justify-center text-white px-4 py-8">
        <div className="w-full max-w-5xl">
          {title && <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">{title}</h1>}

          {/* subtitle is already typed correctly by HeadingBlockType */}
          {subtitle && <RichText data={subtitle} />}

          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="inline-block mt-8 rounded-sm bg-white px-8 py-4 text-black font-semibold"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
