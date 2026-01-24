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
import { Button } from '@/components/ui/button'

export const CarouselBlock = ({ slides }: { slides: any[] }) => {
  return (
    <Carousel className="w-full h-dvh mb-12">
      <CarouselContent>
        {slides?.map((slide, index) => (
          <CarouselItem key={index} className="relative h-dvh w-full">
            {/* Using Next.js Image for 2026 performance standards */}
            <Image
              src={slide.image.url}
              alt={slide.heading}
              fill
              className="object-cover -z-10"
              priority={index === 0}
            />
            <div className="flex flex-col justify-end h-full bg-black/40 text-white p-10 pb-20">
              <div className="container w-full">
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-none">
                  {slide.heading}
                </h2>
                <p className="text-xl block mt-0 mb-4">{slide.subheading}</p>
                {slide.cta?.link && (
                  <Button asChild variant="secondary" className="">
                    <Link href={slide.cta.link} className="">
                      {slide.cta.label || 'Learn More'}
                    </Link>
                  </Button>
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
