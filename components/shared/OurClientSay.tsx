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

const OurClientSay = () => {
  const [open,setOpen]=useState(false)
  const testimonials = [
    {
      id: 1,
      pizzaName: "Classic Pepperoni",
      rating: 5,
      text: "The pizzas here are truly amazing! The ingredients taste incredibly fresh, the crust has the perfect balance of crisp and softness, and the flavors are spot on. The ordering process was smooth, and my food arrived hot and right on time. I've already recommended it to my friends and family this is definitely my new favorite pizza spot!",
      author: "Sarah M."
    },
    {
      id: 2,
      pizzaName: "Margherita Classic",
      rating: 5,
      text: "Absolutely loved the Margherita pizza! The fresh basil and high-quality mozzarella made all the difference. The crust was perfectly crispy and the tomato sauce was flavorful without being too acidic. Will definitely be ordering again soon!",
      author: "Mike T."
    },
    {
      id: 3,
      pizzaName: "BBQ Chicken",
      rating: 5,
      text: "Best BBQ chicken pizza I've ever had! The chicken was tender, the barbecue sauce had the perfect sweet and smoky balance, and the red onions added a nice crunch. Delivery was faster than expected and everything arrived hot and fresh!",
      author: "James L."
    },
    {
      id: 4,
      pizzaName: "Vegetarian Supreme",
      rating: 5,
      text: "As a vegetarian, I'm always looking for great pizza options. This vegetarian supreme exceeded all expectations! Fresh vegetables, perfect cheese blend, and amazing crust. Highly recommended!",
      author: "Emma R."
    },
    {
      id: 5,
      pizzaName: "Hawaiian Paradise",
      rating: 5,
      text: "The perfect balance of sweet and savory! The pineapple was fresh, the ham was quality, and the cheese was perfectly melted. My whole family loved it!",
      author: "David K."
    },
    {
      id: 6,
      pizzaName: "Meat Lovers",
      rating: 5,
      text: "Incredible meat lovers pizza! Generous toppings, high-quality meats, and the perfect crust. This is exactly what a meat lovers pizza should be!",
      author: "Robert P."
    }
  ]

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
      className="w-full py-16 md:py-24 lg:py-24 bg-cover bg-center bg-no-repeat"
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
        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 h-full">
                  <div className="p-1">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="flex flex-col aspect-auto p-6 h-full">
                        {/* Pizza Name */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                          {testimonial.pizzaName}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center justify-center gap-1 mb-4">
                          {renderStars(testimonial.rating)}
                        </div>

                        {/* Divider */}
                        <div className="w-16 h-0.5 bg-primary mx-auto mb-6"></div>

                        {/* Testimonial Text */}
                        <blockquote className="text-gray-600 leading-relaxed text-base text-center mb-6 flex-grow line-clamp-7">
                          {testimonial.text}
                        </blockquote>

                        {/* Author */}
                        <div className="text-sm font-semibold text-gray-900 text-center mt-auto">
                          - {testimonial.author}
                        </div>
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