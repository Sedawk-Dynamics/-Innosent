'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const products = [
  {
    id: 'itr-3811',
    title: 'ITR-3811',
    subtitle: '4D MIMO Traffic Radar',
    description:
      'Advanced traffic monitoring with real-time vehicle detection up to 276 meters.',
    image: '/hero/ITR-3811.png',
  },
  {
    id: 'isys-4001',
    title: 'ISYS-4001/4002',
    subtitle: 'K-Band Motion Detector',
    description:
      'Intelligent motion detection from 0.3m to 150m range with velocity measurement.',
    image: '/hero/iSYS-4002.png',
  },
  {
    id: 'itr-3810',
    title: 'ITR-3810',
    subtitle: 'Intersection Radar',
    description:
      'Precision traffic monitoring for complex intersections with vehicle classification.',
    image: '/hero/ITR-3811.png',
  },
  {
    id: 'isys-5021',
    title: 'ISYS-5021',
    subtitle: '3D MIMO Radar System',
    description:
      'Area surveillance with simultaneous speed, distance and angular measurement.',
    image: '/hero/ISys-5021.png',
  },
  {
    id: 'idr-2050',
    title: 'IDR-2050',
    subtitle: '60 GHz Distance Sensor',
    description:
      'Millimeter-accurate distance measurement for industrial applications.',
    image: '/hero/IDR-2050.png',
  },
]

export function ProductCarousel() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    )
  }

  // ✅ Auto slide every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (


    <section className="relative w-full min-h-[500px] md:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-r from-yellow-100 via-amber-100 to-yellow-200">

      {/* ===== Circular Dotted Background ===== */}
      <div className="absolute inset-0 pointer-events-none">

        <div
          className="absolute left-1/2 top-1/2 w-[950px] h-[950px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full opacity-70
          bg-[radial-gradient(circle,_rgba(234,88,12,0.6)_2px,_transparent_2px)]
          bg-[size:20px_20px]"
        />

        <div
          className="absolute left-1/2 top-1/2 w-[700px] h-[700px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full opacity-60
          bg-[radial-gradient(circle,_rgba(37,99,235,0.5)_2px,_transparent_2px)]
          bg-[size:24px_24px]"
        />

        <div
          className="absolute left-1/2 top-1/2 w-[500px] h-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-yellow-200 blur-3xl opacity-40"
        />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">

          <span className="inline-block bg-orange-500 text-white px-5 py-2 rounded-full text-sm tracking-wide mb-6 shadow-md">
            Radar Technology
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {products[current].title}
          </h2>

          <h3 className="text-xl text-orange-700 font-medium mb-6">
            {products[current].subtitle}
          </h3>

          <p className="text-slate-800 text-lg leading-relaxed mb-8 max-w-lg">
            {products[current].description}
          </p>

          <button
            onClick={() => router.push('/products')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
          >
            Read More
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative w-full flex items-center justify-center mt-10 md:mt-0">

          <Image
            src={products[current].image}
            alt={products[current].title}
            width={420}
            height={420}
            sizes="(max-width: 768px) 280px, 420px"
            className="object-contain drop-shadow-2xl"
            priority
          />

        </div>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-20"
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-20"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  )
}