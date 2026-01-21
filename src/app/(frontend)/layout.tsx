import React from 'react'

import { Roboto, Roboto_Slab } from 'next/font/google'

import './globals.css'
import { Header } from '@/globals/Header/Header'

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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${baseFont.variable} ${headingFont.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
