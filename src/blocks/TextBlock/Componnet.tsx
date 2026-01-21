import { RichText } from '@payloadcms/richtext-lexical/react'

export function TextBlock({ heading, content }: any) {
  return (
    <section className="py-16 max-w-3xl mx-auto px-4">
      {heading && <h2 className="font-semibold mb-6">{heading}</h2>}
      {content && <RichText data={content} />}
    </section>
  )
}
