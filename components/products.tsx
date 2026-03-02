import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    id: 'itr-3810',
    name: 'ITR-3810',
    category: 'Traffic Radar',
    description: 'Advanced traffic monitoring sensor for real-time vehicle detection and speed measurement',
    features: ['High accuracy', 'Long range', 'Weather resistant'],
    image: '/ITR-3810.jpeg',
  },
  {
    id: 'isys-4001',
    name: 'Industrial Sensors',
    category: 'Safety & Automation',
    description: 'Precision sensors for collision avoidance, level measurement, and object detection',
    features: ['Compact design', 'Easy integration', 'Reliable'],
    image: '/ISYS-4001.jpeg',
  },
  {
    id: 'isys-5021',
    name: 'Touchless Switch',
    category: 'Smart Interface',
    description: 'Innovative touchless control solution for hygienic and reliable operation',
    features: ['Gesture control', 'Hygenic', 'Low power'],
    image: '/ISYS-5021.jpeg',
  },
]

export function Products() {
  return (
    <section id="products" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-4 mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Our Product Lines
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-balance leading-relaxed">
            Comprehensive radar sensor solutions for every application and requirement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <Link key={idx} href={`/products#${product.id}`} className="group">
              <Card
                className="overflow-hidden hover-lift border border-border/50 backdrop-blur-sm animate-scale-in transition-smooth h-full"
                style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative h-56 w-full overflow-hidden bg-muted">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-smooth duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                </div>

                {/* Product Content */}
                <div className="p-6 space-y-4 bg-gradient-to-b from-background/50 to-background flex flex-col h-[calc(100%-224px)]">
                  <div className="space-y-3">
                    <Badge className="bg-secondary/20 text-secondary hover:bg-secondary/30 border-secondary/30 border transition-smooth">
                      {product.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-primary leading-tight">{product.name}</h3>
                  </div>

                  <p className="text-foreground/70 text-sm leading-relaxed">{product.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.features.map((feature, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs border-accent/30 text-accent hover:border-accent/60 transition-smooth"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <button className="w-full mt-auto px-4 py-2 bg-gradient-to-r from-primary/15 to-primary/10 text-primary hover:from-primary/25 hover:to-primary/20 rounded-lg font-semibold transition-smooth flex items-center justify-center gap-2">
                    Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-smooth" />
                  </button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
