'use client'

import { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PopularDestinationsLayout } from './PopularDestinationsLayout'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowRightIcon } from 'lucide-react'

type Props = {
  destinations: any[]
}

export function DestinationsFilterClient({ destinations }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const locations = useMemo(() => {
    return Array.from(
      new Set(destinations.map(d => d.location).filter(Boolean))
    )
  }, [destinations])

  // 🔒 Validate param
  const rawLocation = searchParams.get('location')
  const location =
    rawLocation && locations.includes(rawLocation)
      ? rawLocation
      : 'all'

  const filteredDestinations = useMemo(() => {
    if (location === 'all') return destinations
    return destinations.filter(d => d.location === location)
  }, [location, destinations])

  function onLocationChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (value === 'all') {
      params.delete('location')
    } else {
      params.set('location', value)
    }

    router.replace(`?${params.toString()}`, { scroll: false })
  }

  
  return (
    <>
      {/* FILTER */}
      <div className="container flex justify-end items-center w-full">
        <div className="flex justify-end gap-2 shrink-0 uppercase text-sm">
          Filter by location <ArrowRightIcon />
        </div>

        <div className="px-4 my-6 max-w-sm">
          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger className="w-48 border-gray-900 cursor-pointer rounded-none px-6 py-3 uppercase text-sm">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>

              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* EXISTING LAYOUT */}
      <PopularDestinationsLayout destinations={filteredDestinations} />
    </>
  )
}
