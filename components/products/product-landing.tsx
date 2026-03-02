'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function ProductLanding() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in-up">
          <Badge className="mx-auto bg-secondary/20 text-secondary border-secondary/30 border">
            Our Complete Product Line
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
            Advanced Radar Sensors for Every Application
          </h1>

          <p className="text-xl text-foreground/70 leading-relaxed">
            Industry-leading radar sensor solutions designed for precision, reliability, and performance across traffic management, industrial automation, and smart systems.
          </p>

          {/* <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-smooth gap-2">
              View All Products
              <ArrowRight size={18} />
            </Button>
            <Button variant="outline" className="border-primary/30 hover:bg-primary/5 transition-smooth">
              Download Datasheet
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  )
}
