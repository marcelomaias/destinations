import Image from 'next/image'

export function ImageBlock({ image, caption, fullWidth }: any) {
  return (
    <section className={fullWidth ? 'w-full' : 'max-w-5xl mx-auto'}>
      <Image
        src={image.url}
        alt={image.alt || ''}
        width={1600}
        height={900}
        className="rounded-xl"
      />

      {caption && <p className="mt-2 text-center text-sm text-gray-500">{caption}</p>}
    </section>
  )
}
