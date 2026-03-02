'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { useStaggerAnimation } from '@/hooks/use-gsap-scroll-trigger'

interface IndustryUseCase {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  productDetails: Record<string, string[]>
}

const industries: IndustryUseCase[] = [
  {
    id: 'traffic-management',
    title: 'TRAFFIC MANAGEMENT',
    description:
      'Advanced radar-based traffic monitoring for highways, arterial roads, and intersections.',
    image: '/industries/traffic-management.jpg',
    technologies: ['ITR-3811', 'ITR-3810'],
    productDetails: {
      'ITR-3811': [
        'Real-time vehicle detection and classification',
        'Accurate multi-lane speed measurement',
        'Highway traffic analytics',
        'All-weather radar performance',
      ],
      'ITR-3810': [
        'Compact traffic radar solution',
        'Urban intersection monitoring',
        'Vehicle counting and speed capture',
        'Optimized for smart city deployment',
      ],
    },
  },
  {
    id: 'smart-cities',
    title: 'SMART CITIES',
    description:
      'Integrated radar solutions for intelligent transportation systems.',
    image: '/industries/smart-cities.jpg',
    technologies: ['ITR-3810', 'ITR-3811', 'ISYS-4001'],
    productDetails: {
      'ITR-3810': [
        'Urban traffic optimization',
        'Vehicle density monitoring',
        'Smart signal integration',
        'Low power city deployment',
      ],
      'ITR-3811': [
        'Advanced traffic analytics',
        'Multi-lane highway support',
        'Real-time monitoring',
        'Cloud-ready data integration',
      ],
      'ISYS-4001': [
        'Precision distance sensing',
        'Smart infrastructure monitoring',
        'Tank & level measurement',
        'Industrial-grade durability',
      ],
    },
  },
  {
    id: 'security-surveillance',
    title: 'SECURITY & SURVEILLANCE',
    description:
      'Perimeter protection and intrusion detection systems.',
    image: '/industries/security-surveillance.jpg',
    technologies: ['ISYS-4001', 'ISYS-4002'],
    productDetails: {
      'ISYS-4001': [
        'Perimeter intrusion detection',
        'Industrial facility protection',
        'Motion sensing accuracy',
        'Reliable 24/7 performance',
      ],
      'ISYS-4002': [
        'Advanced presence sensing',
        'High precision motion detection',
        'Security zone monitoring',
        'Smart alert integration',
      ],
    },
  },
]

/* 🔥 Separate Industry Item Component (IMPORTANT) */
function IndustryItem({ industry, reverse }: { industry: IndustryUseCase; reverse: boolean }) {
  const [selectedProduct, setSelectedProduct] = useState(industry.technologies[0])

  return (
    <div
      className={`industry-item grid lg:grid-cols-2 gap-12 md:gap-16 items-center ${reverse ? 'lg:auto-cols-fr lg:[direction:rtl]' : ''
        }`}
    >
      {/* TEXT */}
      <div className="space-y-6 lg:[direction:ltr]">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {industry.title}
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
            {industry.description}
          </p>
        </div>

        {/* 🔥 Clickable Product Buttons */}
        <div className="flex flex-wrap gap-3">
          {industry.technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedProduct(tech)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedProduct === tech
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* 🔥 Dynamic Details */}
        <div className="space-y-4 pt-4 border-t border-white/20">
          {industry.productDetails[selectedProduct]?.map((detail, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-1 bg-orange-500 mt-1" />
              <p className="text-white/75 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE */}
      <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden shadow-2xl group lg:[direction:ltr]">
        <Image
          src={industry.image}
          alt={industry.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-40" />
      </div>
    </div>
  )
}

export function Industries() {
  const sectionRef = useScrollAnimation()
  const industriesRef = useRef(null)
  useStaggerAnimation(industriesRef, '.industry-item')

  return (
    <section
      id="industries"
      className="bg-black text-white py-20 md:py-32 overflow-hidden scroll-animate-in"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-20 md:mb-32 text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            INDUSTRIES WE SERVE
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Advanced radar solutions tailored for diverse industries
          </p>
        </div>

        {/* Industries */}
        <div className="space-y-32 md:space-y-40" ref={industriesRef}>
          {industries.map((industry, idx) => (
            <IndustryItem
              key={industry.id}
              industry={industry}
              reverse={idx % 2 === 1}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 pt-20 border-t border-white/10 text-center">
          <p className="text-lg text-white/70 mb-4">
            Discover how our radar solutions transform your industry
          </p>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition">
            Explore All Solutions
          </button>
        </div>
      </div>
    </section>
  )
}