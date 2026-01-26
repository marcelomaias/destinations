import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { TextImageBlockType } from '@/payload-types'
import { Button } from '@/components/ui/button'

export const TextImageBlock: React.FC<TextImageBlockType> = ({
  layout = 'text-image',
  showBackgroundImage = true,
  textContent,
  image,
}) => {
  const imageFirst = layout === 'image-text'

  const mainImage = typeof image === 'object' ? image : null

  const icon = typeof textContent?.icon === 'object' ? textContent.icon : null

  return (
    <section
      className={`relative overflow-hidden my-4 lg:my-20 ${showBackgroundImage ? 'showBackgroundImage' : ''}`}
    >
      <div className="container z-10 grid gap-12 md:grid-cols-2 items-center px-4 py-10 lg:py-20">
        {/* Image */}
        <div className={imageFirst ? 'md:order-1' : 'md:order-2'}>
          {mainImage?.url && (
            <Image
              src={mainImage.url}
              alt={mainImage.alt || ''}
              width={mainImage.width || 900}
              height={mainImage.height || 600}
              className="rounded-2xl aspect-video"
            />
          )}
        </div>

        {/* Text */}
        <div className={imageFirst ? 'md:order-2' : 'md:order-1'}>
          <div className="flex flex-col items-start gap-4">
            {textContent?.text && <RichText data={textContent.text} />}

            {icon?.url && textContent?.author && (
              <div className="flex gap-4 items-center mt-8">
                <Image src={icon.url} alt={icon.alt || ''} width={48} height={48} />

                <RichText data={textContent.author} />
              </div>
            )}

            {textContent?.cta?.label && textContent?.cta?.url && (
              <Button asChild variant="outline">
                <Link
                  href={textContent.cta.url}
                  target={textContent.cta.newTab ? '_blank' : undefined}
                  rel={textContent.cta.newTab ? 'noopener noreferrer' : undefined}
                >
                  {textContent.cta.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
