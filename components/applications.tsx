import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Zap, Shield, Gauge, Crosshair } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const applications = [
  {
    icon: Gauge,
    title: 'Traffic Monitoring',
    description: 'Real-time vehicle detection, speed measurement, and traffic flow analysis',
  },
  {
    icon: Shield,
    title: 'Collision Avoidance',
    description: 'Touchless safety systems for automated collision detection and prevention',
  },
  {
    icon: Zap,
    title: 'Industrial Automation',
    description: 'Smart factory solutions with Industry 4.0 integration and automation',
  },
  {
    icon: Crosshair,
    title: 'Level Measurement',
    description: 'Precise distance and level measurement through various materials',
  },
]

export function Applications() {
  const sectionRef = useScrollAnimation()
  
  return (
    <section
      id="applications"
      className="py-20 md:py-32 scroll-animate-in"
      style={{ backgroundColor: '#1F3E5F' }}
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Diverse Applications
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Radar technology solving real-world problems across multiple industries
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {applications.map((app, idx) => {
            const Icon = app.icon
            return (
              <Card
                key={idx}
                className="p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all">
                      <Icon className="h-6 w-6 text-white transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-white">
                      {app.title}
                    </h3>
                    <p className="text-white/80">
                      {app.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Featured Application */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-20 border-t border-white/30">

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Smart Traffic Management System
            </h3>
            <p className="text-lg text-white/80 leading-relaxed">
              Our advanced traffic monitoring solutions provide real-time insights into vehicle movement, speed patterns, and traffic flow optimization.
            </p>

            <ul className="space-y-3">
              {[
                'Real-time vehicle counting and classification',
                'Accurate speed measurement and enforcement',
                'Weather-independent operation',
                'Integration with smart city platforms',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-white mt-2" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/industrial-app.jpg"
              alt="Smart traffic management system"
              fill
              className="object-cover hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  )
}
