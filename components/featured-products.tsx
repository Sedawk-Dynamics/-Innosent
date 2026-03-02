'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface FeaturedProductsProps {
  onInquiry: () => void
}

export function FeaturedProducts({ onInquiry }: FeaturedProductsProps) {
  const sectionRef = useScrollAnimation()

  return (
    <section
      id="featured-products"
      ref={sectionRef}
      className="py-20 md:py-32 scroll-animate-in bg-gradient-to-br from-[#008c8f] via-[#00A3A6] to-[#006d70]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-20 animate-fade-in-up">
          <Badge className="bg-white/20 text-white border border-white/30">
            Flagship Products
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our Flagship Radar Sensors
          </h2>

          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Industry-leading radar solutions trusted by global enterprises for
            precision, reliability, and performance.
          </p>
        </div>

        {/* ===================== PRODUCT 1 ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 pb-24 border-b border-white/30">

          {/* Image */}
          <div className="relative h-96 md:h-[500px] rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex items-center justify-center p-10 order-2 lg:order-1">
            <Image
              src="/hero/ITR-3811.png"
              alt="ITR-3811 Traffic Radar Sensor"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-all duration-500 hover:scale-105"
              priority
            />
            <Badge className="absolute top-6 right-6 bg-white text-[#00A3A6] border-0">
              Bestseller
            </Badge>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">

            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  ITR-3811
                </h3>
                <Badge className="bg-white/20 text-white border border-white/30">
                  Traffic Radar
                </Badge>
              </div>

              <p className="text-xl text-white/90 font-medium">
                Advanced Traffic Monitoring & Vehicle Classification
              </p>
            </div>

            <p className="text-white/90 leading-relaxed">
              The ITR-3811 is our premium traffic monitoring radar, delivering
              real-time vehicle detection, speed measurement, and classification
              for smart traffic systems.
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Detection Range', value: 'Up to 200m' },
                { label: 'Speed Accuracy', value: '±1 km/h' },
                { label: 'Operating Frequency', value: '24 GHz' },
                { label: 'Angular Resolution', value: '±0.5°' },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
                >
                  <p className="text-xs text-white/70">{spec.label}</p>
                  <p className="font-bold text-white">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products#itr-3811" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/20 bg-transparent w-full"
                >
                  <Play size={18} className="mr-2" />
                  View Details
                </Button>
              </Link>

              <Button
                onClick={onInquiry}
                className="bg-white text-[#00A3A6] hover:bg-white/90"
              >
                Request Information
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* ===================== PRODUCT 2 ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Content */}
          <div className="space-y-8">

            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  ISYS-4001
                </h3>
                <Badge className="bg-white/20 text-white border border-white/30">
                  Distance Measurement
                </Badge>
              </div>

              <p className="text-xl text-white/90 font-medium">
                Precision Distance & Level Measurement Radar
              </p>
            </div>

            <p className="text-white/90 leading-relaxed">
              The ISYS-4001 delivers precise distance and level measurement in
              industrial automation, tank monitoring, and smart inventory systems.
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Measurement Range', value: '0.05m - 15m' },
                { label: 'Accuracy', value: '±2cm' },
                { label: 'Operating Frequency', value: '77 GHz' },
                { label: 'Response Time', value: '< 100ms' },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
                >
                  <p className="text-xs text-white/70">{spec.label}</p>
                  <p className="font-bold text-white">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products#isys-4001" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/20 bg-transparent w-full"
                >
                  <Play size={18} className="mr-2" />
                  View Details
                </Button>
              </Link>

              <Button
                onClick={onInquiry}
                className="bg-white text-[#00A3A6] hover:bg-white/90"
              >
                Request Information
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-96 md:h-[500px] rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex items-center justify-center p-10">
            <Image
              src="/hero/iSYS-4002.png"
              alt="ISYS-4001 Distance Measurement Radar"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-all duration-500 hover:scale-105"
            />
            <Badge className="absolute top-6 right-6 bg-white text-[#00A3A6] border-0">
              Industry Leading
            </Badge>
          </div>
        </div>

      </div>
    </section>
  )
}
