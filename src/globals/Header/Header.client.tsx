'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useState, useRef } from 'react'
import type { Header } from '@/payload-types'
import Image from 'next/image'
import Hamburger from './Hamburger'
import MobileMenu from './MobileMenu'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeaderClient({ headerData }: { headerData: Header }) {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '+=100',
          scrub: 1,
        },
      })

      tl.to(
        navRef.current,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          color: '#000',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.4)',
          paddingTop: '0.1rem',
          paddingBottom: '0.1rem',
          duration: 1,
        },
        0,
      )

      tl.to(
        logoRef.current,
        {
          scale: 0.8,
          filter: 'invert(0)',
          transformOrigin: 'center center',
          duration: 1,
        },
        0,
      )

      tl.to(
        '.hamburger',
        {
          '--bgHamburgerColor': '#000',
        },
        0,
      )
    },
    { scope: navRef },
  )

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-92 py-4 bg-transparent text-white"
      >
        <div className="flex items-center justify-between px-4">
          <Link href="/" className="logo">
            {typeof headerData?.logo === 'object' && headerData?.logo?.url && (
              <Image
                ref={logoRef}
                src={headerData.logo.url}
                alt={headerData.logo.alt || 'Logo'}
                width={200}
                height={60}
                priority
                className="max-w-12 invert"
              />
            )}
          </Link>

          {/* Desktop Nav*/}
          <nav className="hidden md:flex gap-8">
            {headerData?.headerLinks?.map((link, index) => (
              <Link key={index} href={link.path || '#'} className="uppercase font-semibold">
                {link.title}
              </Link>
            ))}
          </nav>

          <Hamburger isActive={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        headerData={headerData}
        closeMenu={() => setIsMenuOpen(false)}
      />
    </>
  )
}
