// src/blocks/Carousel/Component.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export const CarouselBlock = ({ slides }: { slides: any[] }) => {
  return (
    <Carousel className="w-full h-[600px]">
      <CarouselContent>
        {slides?.map((slide, index) => (
          <CarouselItem key={index} className="relative h-[600px] w-full">
            {/* Using Next.js Image for 2026 performance standards */}
            <Image
              src={slide.image.url}
              alt={slide.heading}
              fill
              className="object-cover -z-10"
              priority={index === 0}
            />
            <div className="flex flex-col justify-end h-full bg-black/40 text-white p-10">
              <div className="max-w-[992px] mx-auto w-full">
                <h2 className="text-6xl font-bold mb-2">{slide.heading}</h2>
                <p className="text-xl mb-8">{slide.subheading}</p>
                {slide.cta?.link && (
                  <Link
                    href={slide.cta.link}
                    className="px-6 py-3 bg-white text-black font-semibold rounded-md"
                  >
                    {slide.cta.label || 'Learn More'}
                  </Link>
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 cursor-pointer" />
      <CarouselNext className="right-4 cursor-pointer" />
    </Carousel>
  )
}
