'use client'

import { useState, useEffect } from 'react'
import { HomePageLoader } from '@/components/loaders'

interface HomeClientProps {
  children: React.ReactNode
}

export function HomeClient({ children }: HomeClientProps) {
  const [showLoader, setShowLoader] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    // Check if user has already seen the loader this session
    const visited = sessionStorage.getItem('homepage-visited')
    if (visited) {
      setShowLoader(false)
      setHasVisited(true)
    }
  }, [])

  const handleLoaderComplete = () => {
    sessionStorage.setItem('homepage-visited', 'true')
    setShowLoader(false)
    setHasVisited(true)
  }

  // Skip loader if already visited this session
  if (hasVisited && !showLoader) {
    return <>{children}</>
  }

  return (
    <>
      {showLoader && <HomePageLoader onComplete={handleLoaderComplete} />}
      <div style={{ opacity: showLoader ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        {children}
      </div>
    </>
  )
}
