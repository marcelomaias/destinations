import { TextBlock } from '@/blocks/TextBlock/Component'
import { ImageBlock } from '@/blocks/ImageBlock/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { Heading } from '@/blocks/Heading/Component'
import { DestinationsGrid } from '@/blocks/DestinationsGrid/Component'
import { TextHeading } from '@/blocks/TextHeading/Component'
import { InfoCardsBlock } from '@/blocks/InfoCards/Component'
import { TextImageBlock } from '@/blocks/TextImage/Component'
import { ContactFormBlock } from '@/blocks/ContactBlock/Component'
// import { ImageTextBlock } from './blocks/ImageTextBlock'
// import { FeatureGrid } from './blocks/FeatureGrid'
// import { CallToAction } from './blocks/CallToAction'

type RenderBlocksProps = {
  blocks?: any[] | null
  currentSlug?: string
}

export function RenderBlocks({ blocks, currentSlug }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'carousel':
            return <CarouselBlock key={index} {...block} />

          case 'heading':
            return <Heading key={index} {...block} />

          case 'textBlock':
            return <TextBlock key={index} {...block} />

          case 'imageBlock':
            return <ImageBlock key={index} {...block} />

          case 'destinationsGrid':
            return <DestinationsGrid key={index} {...block} currentSlug={currentSlug} />
          case 'textHeading':
            return <TextHeading key={index} {...block} />

          case 'infoCards':
            return <InfoCardsBlock key={index} {...block} />

          case 'textImage':
            return <TextImageBlock key={index} {...block} />

          case 'contactForm':
            return <ContactFormBlock key={index} block={block} />

          // case 'imageText':
          //   return <ImageTextBlock key={index} {...block} />

          // case 'featureGrid':
          //   return <FeatureGrid key={index} {...block} />

          // case 'callToAction':
          //   return <CallToAction key={index} {...block} />

          default:
            return null
        }
      })}
    </>
  )
}
