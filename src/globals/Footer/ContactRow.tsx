import Image from 'next/image'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  icon?: Media | string | null
  text?: SerializedEditorState | null
}

export function ContactRow({ icon, text }: Props) {
  if (!icon && !text) return null

  const isPopulatedMedia = icon && typeof icon === 'object' && 'url' in icon

  return (
    <div className="flex items-center gap-3 contact-info">
      {isPopulatedMedia && icon.url && (
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
