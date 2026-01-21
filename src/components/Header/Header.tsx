import React from 'react'

import type { Header } from '@/payload-types'
import { getCachedGlobal } from '@/utils/getGlobals'
import HeaderClient from './Header.client'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  // console.log('Header Data:', headerData)

  return <HeaderClient headerData={headerData} />
}
