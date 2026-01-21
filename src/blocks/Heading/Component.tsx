import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

export function Heading({ image, title, subtitle, ctaText, ctaLink }: any) {
  return (
    <section className="relative h-[40vh] w-full overflow-hidden">
      {/* Background image */}
      {image && (
        <Image src={image.url} alt={image.alt || title} fill className="object-cover" priority />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end justify-center text-white px-4 py-8">
        <div className="w-full max-w-5xl">
          {title && <h1>{title}</h1>}
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
