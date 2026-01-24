import React from 'react'

import { Roboto, Roboto_Slab } from 'next/font/google'

import './globals.css'
import { Header } from '@/globals/Header/Header'
import { Footer } from '@/globals/Footer/Component'
import { PageAnimations } from '@/components/gsap/PageAnimations'

const baseFont = Roboto({
  subsets: ['latin'],
  variable: '--font-base',
  display: 'swap',
})

const headingFont = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: { slug?: string }
}) {
  const { children } = props

  return (
    <html lang="en" className={`${baseFont.variable} ${headingFont.variable}`}>
      <PageAnimations>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </PageAnimations>
    </html>
  )
}
