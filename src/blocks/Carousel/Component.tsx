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
import { CarouselBlockType, Media } from '@/payload-types'

export const CarouselBlock: React.FC<CarouselBlockType> = ({ slides }) => {
  return (
    <Carousel className="w-full h-dvh mb-12">
      <CarouselContent>
        {slides?.map((slide, index) => {
          const image =
            slide.image && typeof slide.image === 'object' ? (slide.image as Media) : null
          return (
            <CarouselItem key={index} className="relative h-dvh w-full">
              {image?.url && (
                <Image
                  src={image.url}
                  alt={slide.heading}
                  fill
                  className="object-cover -z-10"
                  priority={index === 0}
                />
              )}
              <div className="flex flex-col justify-end h-full bg-black/40 text-white p-10 pb-20">
                <div className="container w-full">
                  <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight text-balance">
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
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="left-4 cursor-pointer bg-white border-none" />
      <CarouselNext className="right-4 cursor-pointer bg-white border-none" />
    </Carousel>
  )
}
