'use client'

import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { useRef } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { useScrollTriggerAnimation, useStaggerAnimation } from '@/hooks/use-gsap-scroll-trigger'

export function About() {
  const sectionRef = useScrollAnimation()
  const imageRef = useScrollTriggerAnimation({
    animation: { x: -50, opacity: 1, duration: 1 },
  })
  const contentRef = useRef(null)
  const featuresRef = useRef(null)
  useStaggerAnimation(featuresRef, '.feature-item')

  const features = [
    'High-precision detection & measurement',
    'Weather-independent operation',
    'Extreme temperature tolerance',
    'Extended detection ranges',
    'Configurable sensing zones',
    'Industry-leading accuracy',
  ]

  return (
    <section
      id="about"
      className="py-16 sm:py-20 md:py-32 bg-background scroll-animate-in"
      ref={sectionRef}
    >
      {/* ✅ Fixed Mobile Padding Here */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <div
            ref={imageRef}
            className="relative h-80 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl hover-lift order-2 lg:order-1 mx-4 sm:mx-6 md:mx-0 ml-20"
          >
            <Image
              src="/1.webp"
              alt="Precision radar sensor technology"
              fill
              className="object-cover hover:scale-110 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent" />
            <div className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none" />
          </div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2" ref={contentRef}>

            {/* Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight">
                About InnoSent
              </h2>
              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                Since 1999, InnoSent has been a pioneer in radar sensor technology,
                delivering innovative solutions for traffic monitoring and industrial automation.
              </p>
            </div>

            {/* Mission */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Our Mission
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm sm:text-base">
                To develop intelligent sensor solutions that enhance safety,
                improve efficiency, and enable seamless automation across diverse industries.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Why Choose InnoSent?
              </h3>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                ref={featuresRef}
              >
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="feature-item flex items-start gap-3 group"
                  >
                    <CheckCircle
                      className="text-accent flex-shrink-0 mt-1 group-hover:text-secondary transition-all"
                      size={20}
                    />
                    <span className="text-foreground/80 text-sm sm:text-base group-hover:text-foreground transition-all">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-border/50">
              <div className="space-y-1 sm:space-y-2 group cursor-default">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary group-hover:text-accent transition-all">
                  170+
                </p>
                <p className="text-xs sm:text-sm text-foreground/60 font-medium">
                  Expert Team
                </p>
              </div>

              <div className="space-y-1 sm:space-y-2 group cursor-default">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary group-hover:text-secondary transition-all">
                  50+
                </p>
                <p className="text-xs sm:text-sm text-foreground/60 font-medium">
                  Patents
                </p>
              </div>

              <div className="space-y-1 sm:space-y-2 group cursor-default">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent group-hover:text-primary transition-all">
                  100+
                </p>
                <p className="text-xs sm:text-sm text-foreground/60 font-medium">
                  Industries
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
