'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Loading } from '@/components/ui/Loading'
import { RideBookingMap } from '@/components/map/RideBookingMap'
import { RideRequestForm } from '@/components/ride/RideRequestForm'
import { Car, MapPin, Clock, Star, Menu } from 'lucide-react'
import { formatCurrency, getTimeAgo } from '@/lib/utils'


interface RecentRide {
  id: string
  dropoff_address: string
  total_fare: number
  completed_at: string
  rating: number | null
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [recentRides, setRecentRides] = useState<RecentRide[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return

    fetchRecentRides()
    createUserInDatabase()
  }, [isLoaded, user])

  async function createUserInDatabase() {
    if (!user) return
    const userData = {
      clerk_id: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? '',
      first_name: user.firstName ?? '',
      last_name: user.lastName ?? '',
      phone_number: user.primaryPhoneNumber?.phoneNumber ?? null,
      profile_image_url: user.imageUrl ?? null,
    }
    try {
      const { error } = await supabase.from('users').upsert(userData, {
        onConflict: 'clerk_id',
      })
      if (error) console.error('Error creating/updating user:', error)
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  async function fetchRecentRides() {
    if (!user) return
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('id, dropoff_address, total_fare, completed_at, rating')
        .eq('rider_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(3)
      if (error) {
        console.error('Error fetching rides:', error)
      } else {
        setRecentRides(data || [])
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded) {
    return <Loading className="min-h-screen" variant="car" text="Loading dashboard..." />
  }

  return (
    <div className="min-h-screen bg-gray-400">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-gray-800" />
              <span className="text-2xl font-bold text-gray-900">Creative Cabs</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-800 focus:outline-none focus:ring-0 active:outline-none hover:text-gray-500">
                Home
              </Link>
              <Link href="/history" className="text-gray-800 hover:text-gray-500">
                My Rides
              </Link>
              <Link href="/profile" className="text-gray-800 hover:text-gray-500">
                Profile
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <UserButton appearance={{ elements: { avatarBox: 'h-10 w-10' } }} showName />
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
          <p className="mt-2 text-gray-800">Where would you like to go today?</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map and Booking */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Car className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Book a Ride</h3>
                    <p className="text-sm text-gray-800">Quick and easy booking</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Schedule Ride</h3>
                    <p className="text-sm text-gray-800">Plan ahead</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className= "text-gray-800">Book Your Next Ride</CardTitle>
              </CardHeader>
              <CardContent>
                <RideBookingMap />
                <div className="mt-6">
                  <RideRequestForm />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className= "text-gray-800">Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img src={user?.imageUrl} alt="Profile" className="h-12 w-12 rounded-full" />
                  <div>
                    <h4 className="font-semibold">
                      {user?.firstName} {user?.lastName}
                    </h4>
                    <p className="text-sm text-gray-800">{user?.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{recentRides.length}</div>
                    <div className="text-xs text-gray-800">Completed Rides</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">4.9</div>
                    <div className="text-xs text-gray-800">Rating</div>
                  </div>
                </div>

                <Link href="/profile">
                  <Button variant="outline" className="w-full text-gray-800">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className= "text-gray-800">Recent Rides</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Loading text="Loading rides..." />
                ) : recentRides.length > 0 ? (
                  <div className="space-y-4">
                    {recentRides.map((ride) => (
                      <div
                        key={ride.id}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
                      >
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {ride.dropoff_address}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-800">{getTimeAgo(ride.completed_at)}</p>
                            <p className="text-sm font-semibold text-primary">
                              {formatCurrency(ride.total_fare)}
                            </p>
                          </div>
                          {ride.rating && (
                            <div className="flex items-center mt-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-800 ml-1">{ride.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <Link href="/history">
                      <Button variant="outline" className="w-full text-gray-800">
                        View All Rides
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Car className="h-12 w-12 text-gray-800 mx-auto mb-4" />
                    <p className="text-sm text-gray-800">No rides yet. Book your first ride!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


