import Image from 'next/image'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  icon?: Media | string | null
  text?: any
}

export function ContactRow({ icon, text }: Props) {
  if (!icon && !text) return null

  return (
    <div className="flex items-center gap-3 contact-info">
      {icon && typeof icon !== 'string' && icon.url && (
        <Image
          src={icon.url}
          alt={icon.alt || ''}
          width={20}
          height={20}
          className="mt-1 shrink-0"
        />
      )}

      {text && <RichText data={text} />}
    </div>
  )
}
