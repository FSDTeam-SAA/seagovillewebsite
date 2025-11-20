"use client";

import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '../ui/button';
import ReviewMolal from '../home/ReviewMolal';
import { Review, useReview } from '@/hooks/review';

const OurClientSay = () => {
  const [open,setOpen]=useState(false)
  const {data}=useReview()
  console.log('review data',data?.data)
  const rewview= data?.data || [];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <section 
      className="w-full py-16 md:py-24 lg:py-24 bg-cover bg-center  bg-no-repeat"
      style={{ backgroundImage: "url('/images/ourclientsay.png')" }}
    >
      {/* Overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 font-lobster text-white">
            What Our Customers Say
          </h2>
          <p className=" text-xs md:text-sm text-[#F8F9FA] ">
            Read experiences from pizza lovers who enjoy our fresh flavors, fast service, 
            and delicious quality every time.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-[80%] md:max-w-[80%] mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 items-stretch">
              {rewview.map((testimonial:Review) => (
                <CarouselItem key={testimonial._id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 h-full">
                  <div className="p-1">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="flex flex-col aspect-auto px-4 h-full">
                        {/* Pizza Name */}
                        <div className='flex justify-between items-center mb-8'>

                        <h3 className="text-sm md:text-base font-bold text-gray-900  ">
                          {testimonial.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center justify-center gap-1 ">
                          {renderStars(testimonial.rating)}
                        </div>
                        </div>

                        {/* Divider */}
                        {/* <div className="w-16 h-0.5 bg-primary mx-auto mb-6"></div> */}

                        {/* Testimonial Text */}
                        <blockquote className="text-gray-600 leading-relaxed text-sm md:text-base text-start  grow line-clamp-3">
                          {testimonial.comment}
                        </blockquote>

                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons */}
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border-gray-200" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border-gray-200" />
          </Carousel>
        </div>
        <Button onClick={()=> setOpen(true)} className='text-white bg-[#D62828] cursor-pointer hover:bg-[#d62828f6] flex justify-center rounded-sm px-10 py-5 mx-auto mt-10'>Write a Review</Button>
      </div>
      <ReviewMolal open={open} setOpen={setOpen} />
    </section>
  )
}

export default OurClientSay