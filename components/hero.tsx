import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[600px]">
          {/* Left Content - 50% */}
          <div className="space-y-8 animate-fade-in-left" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-6">
              <div 
                className="inline-block bg-secondary/15 text-secondary px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-secondary/20 animate-slide-down"
                style={{ animationDelay: '0.2s' }}
              >
                Advanced Radar Technology
              </div>
              <h1 
                className="text-5xl md:text-6xl lg:text-6xl font-bold text-balance text-primary leading-tight animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                Next-Generation Sensor Solutions
              </h1>
              <p 
                className="text-lg md:text-xl text-foreground/75 text-balance leading-relaxed animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                Precision radar sensors for traffic monitoring, industrial automation, and safety applications. Trusted by leading companies worldwide.
              </p>
            </div>

            <div 
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 h-auto gap-2 shadow-lg hover:shadow-xl transition-smooth hover-lift w-full sm:w-auto">
                  Explore Products <ArrowRight size={20} />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/5 text-base px-8 py-6 h-auto gap-2 bg-transparent transition-smooth hover:border-primary/50"
              >
                <Play size={20} /> Watch Demo
              </Button>
            </div>

            <div 
              className="grid grid-cols-2 gap-8 pt-6 animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="space-y-2 group cursor-default">
                <p className="text-4xl font-bold text-primary group-hover:text-secondary transition-smooth">25+</p>
                <p className="text-sm text-foreground/60 font-medium">Years of Innovation</p>
              </div>
              <div className="space-y-2 group cursor-default">
                <p className="text-4xl font-bold text-secondary group-hover:text-accent transition-smooth">500+</p>
                <p className="text-sm text-foreground/60 font-medium">Global Customers</p>
              </div>
            </div>
          </div>

          {/* Right Image - 50% */}
          <div 
            className="relative h-96 md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-right hover-lift group"
            style={{ animationDelay: '0.3s' }}
          >
            <Image
              src="/hero-radar.jpg"
              alt="Advanced radar sensor technology"
              fill
              className="object-cover group-hover:scale-110 transition-smooth duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent group-hover:from-primary/35 transition-smooth" />
            <div className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Animated Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
    </section>
  )
}
