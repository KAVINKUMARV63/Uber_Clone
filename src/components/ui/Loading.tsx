import { Car, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
  variant?: 'spinner' | 'car' | 'dots'
}

export function Loading({ 
  className, 
  size = 'md', 
  text, 
  variant = 'spinner' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  if (variant === 'car') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
        <div className="loading-pulse">
          <Car className={cn(sizeClasses[size], 'text-primary')} />
        </div>
        {text && (
          <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
        )}
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
        {text && (
          <p className="text-sm text-muted-foreground">{text}</p>
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      <Loader2 className={cn(sizeClasses[size], 'animate-spin text-primary')} />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
}

// Full screen loading overlay
export function LoadingOverlay({ 
  text = 'Loading...', 
  variant = 'car' 
}: { 
  text?: string
  variant?: LoadingProps['variant']
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="rounded-lg bg-background p-8 shadow-lg border">
        <Loading size="lg" text={text} variant={variant} />
      </div>
    </div>
  )
}

// Inline loading for buttons
export function ButtonLoading({ 
  text = 'Loading...',
  className 
}: { 
  text?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{text}</span>
    </div>
  )
}

// Skeleton loading for cards
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-lg border bg-card p-6', className)}>
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded animate-pulse" />
          <div className="h-3 bg-muted rounded animate-pulse w-4/5" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-muted rounded animate-pulse w-1/4" />
          <div className="h-3 bg-muted rounded animate-pulse w-1/6" />
        </div>
      </div>
    </div>
  )
}

// Map loading placeholder
export function MapLoading({ className }: { className?: string }) {
  return (
    <div className={cn(
      'relative bg-muted rounded-lg overflow-hidden',
      'h-[400px] flex items-center justify-center',
      className
    )}>
      <div className="text-center space-y-4">
        <Loading variant="dots" size="lg" />
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
      {/* Animated background effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
    </div>
  )
}

// Ride status loading
export function RideStatusLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="relative">
          <Car className="h-12 w-12 text-primary mx-auto" />
          <div className="absolute -inset-2 border-2 border-primary/30 rounded-full animate-ping" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Finding your ride...</h3>
          <p className="text-muted-foreground">Please wait while we connect you with a driver</p>
        </div>
      </div>
    </div>
  )
}