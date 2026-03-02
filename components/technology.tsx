'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { useRef } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { useScrollTriggerAnimation, useStaggerAnimation } from '@/hooks/use-gsap-scroll-trigger'
import { Radio, Target, Thermometer, Zap } from 'lucide-react'

const technologies = [
  {
    name: 'Millimeter-Wave Radar',
    description: 'Precise detection using millimeter-wave frequency for high-resolution sensing',
  },
  {
    name: 'Advanced Signal Processing',
    description: 'Proprietary algorithms for accurate target tracking and classification',
  },
  {
    name: 'Multi-Sensor Fusion',
    description: 'Integration of multiple sensors for comprehensive environmental awareness',
  },
  {
    name: 'Edge AI Integration',
    description: 'On-device processing for real-time decision making and low latency',
  },
]

export function Technology() {
  const sectionRef = useScrollAnimation()
  const imageRef = useScrollTriggerAnimation({
    animation: { x: -50, opacity: 1, duration: 1 },
  })
  const cardsRef = useRef(null)
  const featuresRef = useRef(null)

  useStaggerAnimation(cardsRef, '.tech-card')
  useStaggerAnimation(featuresRef, '.feature-stat')

  return (
    <section id="technology" className="py-20 md:py-32 bg-muted/30 scroll-animate-in" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image */}
          <div ref={imageRef} className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl hover-lift order-2 lg:order-1 mx-4 sm:mx-6 md:mx-0 ml-20">
            <Image
              src="/3.jpg"
              alt="Advanced radar sensor technology stack"
              fill
              className="object-cover hover:scale-110 transition-smooth duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent" />
            <div className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none" />
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                Cutting-Edge Technology
              </h2>
              <p className="text-lg text-foreground/70 text-balance leading-relaxed">
                Built on decades of research and development, our radar sensors incorporate the latest advancements in signal processing and AI.
              </p>
            </div>

            <div className="space-y-4">
              {technologies.slice(0, 2).map((tech, idx) => (
                <div key={idx} className="tech-item flex gap-4 group">
                  <div className="flex-shrink-0 w-1 h-full bg-gradient-to-b from-secondary to-accent rounded-full group-hover:w-1.5 transition-smooth" />
                  <div>
                    <h3 className="font-bold text-primary group-hover:text-secondary transition-smooth">{tech.name}</h3>
                    <p className="text-sm text-foreground/70 group-hover:text-foreground transition-smooth">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={cardsRef}>
          {technologies.map((tech, idx) => (
            <Card
              key={idx}
              className="tech-card p-6 border-l-4 border-l-primary hover-lift backdrop-blur-sm border-border/50 group"
            >
              <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-smooth mb-2">{tech.name}</h3>
              <p className="text-foreground/70 group-hover:text-foreground transition-smooth">{tech.description}</p>
            </Card>
          ))}
        </div>

        {/* Key Features - Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-20 border-t border-border/50" ref={featuresRef}>
          {[
            {
              label: 'Detection Range',
              value: 'Up to 300m',
              icon: Radio,
              color: '#F58220',
              bgColor: 'bg-orange-50',
              hoverBg: 'hover:bg-orange-100',
              textColor: 'text-orange-600',
              borderColor: 'border-orange-200'
            },
            {
              label: 'Accuracy',
              value: '±2cm',
              icon: Target,
              color: '#1F3E5F',
              bgColor: 'bg-blue-50',
              hoverBg: 'hover:bg-blue-100',
              textColor: 'text-blue-600',
              borderColor: 'border-blue-200'
            },
            {
              label: 'Operating Temp',
              value: '-40°C to +85°C',
              icon: Thermometer,
              color: '#00A3A6',
              bgColor: 'bg-teal-50',
              hoverBg: 'hover:bg-teal-100',
              textColor: 'text-teal-600',
              borderColor: 'border-teal-200'
            },
            {
              label: 'Power Efficiency',
              value: 'Ultra-low',
              icon: Zap,
              color: '#6DBE45',
              bgColor: 'bg-green-50',
              hoverBg: 'hover:bg-green-100',
              textColor: 'text-green-600',
              borderColor: 'border-green-200'
            },
          ].map((feature, idx) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={idx}
                className={`feature-stat group cursor-default p-6 rounded-xl transition-all duration-500 ease-out ${feature.bgColor} ${feature.hoverBg} border-2 ${feature.borderColor} shadow-lg hover:shadow-2xl hover:-translate-y-2`}
              >
                {/* Icon Container */}
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-lg mx-auto mb-4 transition-all duration-500 ease-out"
                  style={{
                    backgroundColor: `${feature.color}15`,
                  }}
                >
                  <IconComponent
                    size={32}
                    className="transition-all duration-500 ease-out"
                    style={{ color: feature.color }}
                  />
                </div>

                {/* Label */}
                <p className={`text-sm font-semibold text-center ${feature.textColor} transition-colors duration-500 ease-out mb-2`}>
                  {feature.label}
                </p>

                {/* Value */}
                <p className="font-bold text-center text-lg transition-colors duration-500 ease-out" style={{ color: feature.color }}>
                  {feature.value}
                </p>

                {/* Hover bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-lg transition-all duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ backgroundColor: feature.color }}
                />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
