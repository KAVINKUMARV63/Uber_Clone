'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Car, MapPin } from 'lucide-react'

export function RideRequestForm() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-500" />
          <Input
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-500" />
          <Input
            placeholder="Enter destination"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="flex items-center space-x-2">
          <Car className="h-4 w-4" />
          <span>Economy</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Car className="h-4 w-4" />
          <span>Comfort</span>
        </Button>
      </div>

      <Button className="w-full" size="lg">
        Find Rides
      </Button>
    </div>
  )
}
