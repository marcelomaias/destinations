import { TextHeadingBlockType } from '@/payload-types'

export const TextHeading: React.FC<TextHeadingBlockType> = ({ heading, subheading }) => {
  return (
    <section className="pb-4 container px-4">
      {subheading && <span className="uppercase text-sm">{subheading}</span>}
      {heading && <h2 className="">{heading}</h2>}
    </section>
  )
}
