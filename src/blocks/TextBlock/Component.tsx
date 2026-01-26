import { TextBlockType } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const TextBlock: React.FC<TextBlockType> = ({ heading, content }) => {
  return (
    <section className="max-w-3xl mx-auto px-4">
      {heading && <h2 className="font-semibold mb-6">{heading}</h2>}
      {content && <RichText data={content} />}
    </section>
  )
}
