'use client'

import { useState, useEffect } from 'react'
import Loading from '@/components/atom/loading'

export default function PricingLoaderOverlay() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide the loader after 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return <Loading fullScreen={true} size="lg" text="Loading pricing..." />
}


