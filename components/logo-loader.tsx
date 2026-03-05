'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LogoLoader() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 300)
          return 100
        }
        return prev + 5
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">

      {/* Logo */}
      <Image
        src="/innosent-logo.png"
        alt="InnoSenT"
        width={220}
        height={80}
        className="mb-8"
      />

      {/* Progress Bar */}
      <div className="w-64 h-3 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-3 text-sm text-gray-600 font-medium">
        {progress}%
      </p>

    </div>
  )
}







