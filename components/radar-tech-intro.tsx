import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, Target, Radio } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function RadarTechIntro() {
  const sectionRef = useScrollAnimation()

  const radarFeatures = [
    {
      icon: Radio,
      title: 'Advanced Radar Technology',
      description:
        'Millimeter-wave radar operating at 24 GHz & 77 GHz for precise detection',
    },
    {
      icon: Target,
      title: 'High Accuracy Sensing',
      description:
        'Sub-centimeter accuracy with real-time target tracking and classification',
    },
    {
      icon: Zap,
      title: 'All-Weather Operation',
      description:
        'Functions reliably in rain, fog, snow, and extreme temperature conditions',
    },
  ]

  return (
    <section
      id="radar-technology-intro"
      ref={sectionRef}
      className="py-20 md:py-28 scroll-animate-in"
      style={{ backgroundColor: '#DCFCE7' }} // Light Green Background
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <Badge className="bg-green-200 text-green-900 border border-green-300 hover:bg-green-300 transition-all duration-300">
            Radar Technology Foundation
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-green-900">
            What is Radar Technology?
          </h2>

          <p className="text-lg text-green-800 max-w-3xl mx-auto leading-relaxed">
            InnoSent's proprietary radar sensors use electromagnetic waves to
            detect, measure, and track objects with precision, providing
            reliable sensing in any environmental condition.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left Image */}
          <div className="relative h-96 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/69.png"
              alt="Radar Technology Visualization"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Right Content */}
          <div className="space-y-8">

            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-green-900 mb-3">
                Why Radar Sensors Matter
              </h3>
              <p className="text-green-800 leading-relaxed">
                Unlike cameras or LiDAR, radar sensors work independently of
                lighting conditions, dust, or weather. They provide:
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {radarFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="p-5 bg-white/70 backdrop-blur-md border border-green-200 hover:bg-white transition-all duration-300"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-200">
                        <Icon className="h-6 w-6 text-green-900" />
                      </div>

                      <div>
                        <h4 className="text-green-900 font-semibold">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-green-800">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Key Advantages */}
            <div className="pt-6 border-t border-green-300">
              <p className="text-sm font-semibold text-green-900 mb-3">
                Key Advantages:
              </p>

              <ul className="space-y-2">
                {[
                  'Operates in complete darkness and harsh weather',
                  'No privacy concerns – detects objects, not faces',
                  'Extremely power efficient for battery-powered devices',
                  'Compact form factor for easy integration',
                  'Proven reliability in automotive and industrial applications',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-green-800">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-green-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}