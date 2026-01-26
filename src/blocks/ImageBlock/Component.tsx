import { ImageBlockType, Media } from '@/payload-types'
import Image from 'next/image'

export const ImageBlock: React.FC<ImageBlockType> = ({ image, caption, fullWidth }) => {
  const theImage = image && typeof image === 'object' ? (image as Media) : null
  return (
    <section className={fullWidth ? 'w-full' : 'max-w-5xl mx-auto'}>
      {theImage?.url && (
        <Image
          src={theImage.url}
          alt={theImage.alt || ''}
          width={1600}
          height={900}
          className="rounded-xl"
        />
      )}

      {caption && <p className="mt-2 text-center text-sm text-gray-500">{caption}</p>}
    </section>
  )
}
