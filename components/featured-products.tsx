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
      alt="ITR-3811 4D MIMO Traffic Radar"
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
          4D MIMO Radar
        </Badge>
      </div>

      <p className="text-xl text-white/90 font-medium">
        4D MIMO Traffic Radar for Highway & Intersection Monitoring
      </p>
    </div>

    <p className="text-white/90 leading-relaxed">
      The <strong>ITR-3811</strong> is a state-of-the-art 4D MIMO traffic radar designed
      for highway, arterial, and intersection applications. It monitors, counts,
      and classifies vehicles across multiple lanes with high accuracy.
      A single radar can cover up to <strong>8 lanes</strong> in one direction with a
      maximum detection range of <strong>276 meters</strong>.  
      The system provides reliable traffic monitoring worldwide and supports
      speed enforcement compliant with <strong>OIML R91 up to 230 km/h</strong>.
    </p>

    {/* Key Specs */}
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: 'Detection Range', value: 'Up to 276 m' },
        { label: 'Lane Coverage', value: 'Up to 8 lanes' },
        { label: 'Operating Frequency', value: '24 GHz ISM Band' },
        { label: 'Vehicle Classification', value: '4 categories up to 150 m' },
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
        {/* ===================== PRODUCT 2 ===================== */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

  {/* Content */}
  <div className="space-y-8">

    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <h3 className="text-4xl md:text-5xl font-bold text-white">
          iSYS-4001
        </h3>

        <Badge className="bg-white/20 text-white border border-white/30">
          FSK Radar System
        </Badge>
      </div>

      <p className="text-xl text-white/90 font-medium">
        Long-Range Motion Detection & Speed Measurement Radar
      </p>
    </div>

    <p className="text-white/90 leading-relaxed">
      The <strong>iSYS-4001</strong> is a long-range radar motion detector designed
      for traffic monitoring, industrial automation, security applications,
      and smart infrastructure systems. Operating in the <strong>24 GHz ISM band</strong>,
      the radar measures distance, velocity, and direction of moving objects.
      With its integrated radar signal-processing unit and robust 
      <strong>IP67 metal enclosure</strong>, the device offers a reliable
      plug-and-play solution for outdoor environments.
    </p>

    {/* Specs */}
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: 'Detection Range', value: '0.3 m – 150 m' },
        { label: 'Speed Measurement', value: '0.8 – 250 km/h' },
        { label: 'Operating Frequency', value: '24 GHz ISM Band' },
        { label: 'Protection Rating', value: 'IP67 Housing' },
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
      alt="iSYS-4001 Radar System"
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
