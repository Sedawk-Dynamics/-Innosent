'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, TrendingUp, Shield, Clock } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const clients = [
  { id: 1, name: 'Annex', logo: '/supporter/amnex_logo.png' },
  { id: 2, name: 'Cube Highways', logo: '/supporter/cube_highways.jpg' },
  { id: 3, name: 'IIT Bombay', logo: '/supporter/IIT-BOMBAY.webp' },
  { id: 4, name: 'IIT Delhi', logo: '/supporter/IIT-Delhi.png' },
  { id: 5, name: 'IIT Roorkee', logo: '/supporter/iit-roorkee.png' },
  { id: 6, name: 'Indian Institute of Astrophysics', logo: '/supporter/Indian-institute-of-astro.png' },
  { id: 7, name: 'ISRO', logo: '/supporter/isro.png' },
  { id: 8, name: 'Qualix', logo: '/supporter/Qualix.png' },
  { id: 9, name: 'Superwave', logo: '/supporter/SUPERWAVE.png' },
  { id: 10, name: 'Tata Motors', logo: '/supporter/tata-motors.png' },
  { id: 11, name: 'Trafficool', logo: '/supporter/trafficsol.png' },
  { id: 12, name: 'Vaan', logo: '/supporter/Vaaan.png' },
]

// Duplicate for seamless infinite loop
const duplicatedClients = [...clients, ...clients]

const stats = [
  {
    icon: TrendingUp,
    value: '500+',
    label: 'Active Partners',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/20',
  },
  {
    icon: Shield,
    value: '98%',
    label: 'Satisfaction Rate',
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/20',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Support Available',
    color: 'text-teal-600',
    bgColor: 'bg-teal-500/20',
  },
]

export function TrustedClients() {
  const sectionRef = useScrollAnimation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const startScroll = () => {
    const container = scrollContainerRef.current
    if (!container || scrollIntervalRef.current) return

    scrollIntervalRef.current = setInterval(() => {
      container.scrollLeft += 2.5

      // Reset when half scrolled (because duplicated array)
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0
      }
    }, 16)
  }

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }
  }

  useEffect(() => {
    startScroll()
    return () => stopScroll()
  }, [])

  const handlePrev = () => {
    const container = scrollContainerRef.current
    if (!container) return
    container.scrollLeft -= 300
  }

  const handleNext = () => {
    const container = scrollContainerRef.current
    if (!container) return
    container.scrollLeft += 300
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-primary/5 to-white py-20 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Partnering with India's most innovative and trusted organizations
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group mb-20">

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-hidden"
            onMouseEnter={stopScroll}
            onMouseLeave={startScroll}
          >
            <div className="flex gap-12 items-center py-6">
              {duplicatedClients.map((client, index) => (
                <div key={`${client.id}-${index}`} className="flex-shrink-0">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300 shadow-md">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={120}
                      height={120}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-4`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-foreground/70 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}