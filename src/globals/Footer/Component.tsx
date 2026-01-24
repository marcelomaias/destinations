import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Footer as FooterType } from '@/payload-types'
import { FooterColumn } from './FooterColumn'
import { FooterContactColumn } from '././FooterContactColumn'

export async function Footer() {
  const payload = await getPayload({ config: configPromise })

  const footer = (await payload.findGlobal({
    slug: 'footer',
  })) as FooterType | null

  if (!footer) return null

  return (
    <footer className="showBackgroundImage">
      <div
        className="
          container
          grid
          gap-10
          px-4
          py-16
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <FooterColumn
          title={footer.titleColumn1}
          links={footer.footerLinksColumn1}
          text={footer.textColumn1}
        />

        <FooterColumn
          title={footer.titleColumn2}
          links={footer.footerLinksColumn2}
          text={footer.textColumn2}
        />

        <FooterColumn
          title={footer.titleColumn3}
          links={footer.footerLinksColumn3}
          text={footer.textColumn3}
        />

        <FooterContactColumn footer={footer} />
      </div>
    </footer>
  )
}
