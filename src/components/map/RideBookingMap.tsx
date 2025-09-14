'use client'

import { useEffect, useState } from 'react'
import { MapLoading } from '@/components/ui/Loading'

export function RideBookingMap() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <MapLoading />
  }

  return (
    <div className="ride-booking-map bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Interactive Leaflet Map Coming Soon</p>
        <p className="text-sm text-gray-500 mt-2">
          This will show pickup/dropoff selection
        </p>
      </div>
    </div>
  )
}
