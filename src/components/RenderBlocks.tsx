import { TextBlock } from '@/blocks/TextBlock/Componnet'
import { ImageBlock } from '@/blocks/ImageBlock/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { Heading } from '@/blocks/Heading/Component'
import { DestinationsGrid } from '@/blocks/DestinationsGrid/Component'
// import { ImageTextBlock } from './blocks/ImageTextBlock'
// import { FeatureGrid } from './blocks/FeatureGrid'
// import { CallToAction } from './blocks/CallToAction'

export function RenderBlocks({ blocks }: { blocks?: any[] | null }) {
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
            return <DestinationsGrid key={index} {...block} />

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
