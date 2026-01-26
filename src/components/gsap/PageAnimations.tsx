'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(SplitText, ScrollTrigger)

export function PageAnimations({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const disableReveal = pathname === '/destinations'

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (!disableReveal) {
          document.querySelectorAll('.popular-destination-grid').forEach((section) => {
            const items = section.querySelectorAll('.popular-destination-item')

            gsap.fromTo(
              items,
              { autoAlpha: 0, x: 100 },
              {
                autoAlpha: 1,
                x: 0,
                stagger: 0.05,
                // ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'top 60%',
                  scrub: 1,
                },
              },
            )
          })
        }

        document.querySelectorAll('.all-destinations').forEach((container) => {
          const items = container.querySelectorAll('.stamp')

          gsap.fromTo(
            items,
            { rotate: -180, x: -100 },
            {
              rotate: 0,
              x: 0,
              stagger: 0.5,
              scrollTrigger: {
                trigger: '.stamp',
                start: 'top bottom',
                end: 'top 60%',
                scrub: 1,
                // markers: true,
              },
            },
          )
        })
      })

      return () => ctx.revert()
    },
    { dependencies: [pathname] },
  )

  return <>{children}</>
}
