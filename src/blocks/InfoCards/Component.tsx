import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { InfoCardsBlockType } from '@/payload-types'

export const InfoCardsBlock: React.FC<InfoCardsBlockType> = ({ card }) => {
  if (!card?.length) return null

  return (
    <section className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] container my-4 lg:my-20">
      {card.map((item, index) => {
        const icon = typeof item.icon === 'object' ? item.icon : null

        return (
          <div key={item.id ?? index} className="flex gap-4 p-6 items-center">
            {icon?.url && (
              <Image
                src={icon.url}
                alt={icon.alt || ''}
                width={64}
                height={64}
                className="w-[64px] h-[64px]"
              />
            )}

            {item.text && <RichText data={item.text} />}
          </div>
        )
      })}
    </section>
  )
}
