import type { Footer as FooterType } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ContactRow } from './ContactRow'

type Props = {
  footer: FooterType
}

export function FooterContactColumn({ footer }: Props) {
  return (
    <div className="space-y-6">
      {footer.textColumn4 && <RichText data={footer.textColumn4} />}

      <ContactRow icon={footer.iconAddress} text={footer.textAddress} />

      <ContactRow icon={footer.iconPhone} text={footer.textPhone} />

      <ContactRow icon={footer.iconMobile} text={footer.textMobile} />
    </div>
  )
}
