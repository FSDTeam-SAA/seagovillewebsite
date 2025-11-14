import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

const Subscribe = () => {
  return (
    <section 
      className="w-full py-16 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/subscribe.jpg')" }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
              Stay in the Loop!
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive deals, 
              new menu items, and special promotions. Don&apos;t miss out on the latest pizza perfection!
            </p>
          </div>

          {/* Subscribe Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-10 h-12 bg-white/90 border-white/20 focus:bg-white transition-all duration-300"
                />
              </div>
              <Button 
                size="lg"
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 hover:scale-105"
              >
                Subscribe Now
              </Button>
            </div>
            
            {/* Privacy Note */}
            <p className="text-white/70 text-sm mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">🎁</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Exclusive Deals</h4>
              <p className="text-white/80 text-sm">Special discounts only for subscribers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">🍕</span>
              </div>
              <h4 className="text-white font-semibold mb-2">New Menu Items</h4>
              <p className="text-white/80 text-sm">Be the first to try our latest creations</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">⭐</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Special Events</h4>
              <p className="text-white/80 text-sm">Invitations to pizza tasting events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribe