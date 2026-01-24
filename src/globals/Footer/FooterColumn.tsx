import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

type FooterLink = {
  title?: string | null
  path?: string | null
}

type Props = {
  title?: string | null
  links?: FooterLink[] | null
  text?: any
}

export function FooterColumn({ title, links, text }: Props) {
  return (
    <div className="space-y-4">
      {title && <h4 className="text-lg font-semibold">{title}</h4>}

      {links && links.length > 0 && (
        <ul className="space-y-2 list-none">
          {links.map((link, index) =>
            link?.path ? (
              <li key={index}>
                <Link href={link.path} className="underline underline-offset-6 leading-8">
                  {link.title}
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      )}

      {text && <RichText data={text} />}
    </div>
  )
}
