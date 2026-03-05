'use client'

import { useEffect, useState } from 'react'
import LogoLoader from './logo-loader'

export default function StartLoader() {
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('siteLoaded')

    if (!alreadyLoaded) {
      setShow(true)

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            sessionStorage.setItem('siteLoaded', 'true')
            setTimeout(() => setShow(false), 300)
            return 100
          }
          return prev + 5
        })
      }, 70)

      return () => clearInterval(interval)
    }
  }, [])

  if (!show) return null

  return <LogoLoader progress={progress} />
}