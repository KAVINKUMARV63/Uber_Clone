'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Car, MapPin, CreditCard, Shield, Star, Users } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-pulse">
          <Car className="h-12 w-12 text-primary" />
        </div>
      </div>
    )
  }

  if (isSignedIn) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-white">
      {/* Navigation Header */}
      <nav className="absolute top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
  <Car className="h-10 w-10  text-black" /> {/* larger & thicker stroke */}
  <span className="text-3xl font-extrabold text-gray-900">Creative Cabs</span> {/* larger and heavier font */}
</div>

            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
  Your ride,
  <span className="text-primary block">your way</span>
</h1>
<p className="text-2xl text-gray-700 leading-relaxed">
  Experience the future of ride-hailing with Creative. Book rides instantly, 
  track in real-time, and pay seamlessly.
</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up">
                 <Button size="lg" className="w-full sm:w-auto font-semibold tracking-wide">
  Book Your First Ride
</Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold tracking-wide">
  Drive with Creative Cabs
</Button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.9 rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">1M+ rides completed</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Graphic */}
            <div className="relative">
              <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl p-8 lg:p-12">
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-black text-lg">Your Next Ride</h3>
                      <div className="text-sm text-gray-500">Now</div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-600 rounded-full"></div> {/* slightly bigger & darker */}
<span className="text-base font-semibold text-gray-700">123 Main Street</span>
                      </div>
                      <div className="border-l-2 border-dashed border-gray-900 h-6 ml-1.5"></div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-600 rounded-full"></div>
<span className="text-base font-semibold text-gray-900">456 Oak Avenue</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-base font-bold text-gray-900">Estimated fare</div>
<div className="font-bold text-2xl text-gray-900">$12.50</div>
<Button className="w-full bg-blue-700 text-white font-semibold tracking-wide hover:bg-black transition-colors duration-300">
  Confirm Ride
</Button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Creative?
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're reimagining ride-hailing with cutting-edge technology and user-first design
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
  {
    icon: MapPin,
    title: 'Real-time Tracking',
    description: 'Track your ride and driver location in real-time with precise GPS accuracy',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Pay safely with our encrypted payment system powered by Stripe',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All drivers are verified and rides are monitored for your security',
  },
  {
    icon: Star,
    title: 'Top Rated Service',
    description: 'Join thousands of satisfied customers who rate us 5 stars',
  },
].map((feature, index) => (
  <div key={index} className="text-center group">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors">
      <feature.icon className="h-10 w-10   text-black" /> {/* larger and thicker icon with primary color */}
    </div>
    <h3 className="text-xl font-extrabold text-gray-900 mb-3">{feature.title}</h3> {/* bold title */}
    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
  </div>
))}

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-black mb-8 leading-relaxed">
            Join Creative today and experience the most reliable ride-hailing service in your city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto  border-white text-black hover:bg-blue-700ue hover:text-primary">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-black hover:bg-blue-700ue hover:text-primary">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Car className="h-8 w-8 text-white opacity-80" />
 
            <span className="text-2xl text-white font-bold">Creative Cabs</span>
            </div>
            <div className="text-white text-sm">
              © 2025 Creative. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
