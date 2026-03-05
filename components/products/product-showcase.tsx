'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { InquiryModal } from '@/components/inquiry-modal'


const products = [
  {
    id: 'itr-3811',
    name: 'ITR-3811',
    category: 'Traffic Radar',
    badge: 'Bestseller',
    tagline: '4D MIMO Traffic Radar for Highway & Arterial Monitoring',
    description: 'State-of-the-art 4D MIMO radar sensor designed for comprehensive traffic management. Highly accurate speed measurement enables speed enforcement applications conforming to OIML R91.',
    image: '/ITR-3811.jpeg',
    features: [
      '4D MIMO FMCW Radar (24 GHz ISM Band)',
      'Speed measurement up to 230 km/h',
      'Vehicle detection up to 276m',
      'Vehicle classification up to 150m (4 classes)',
      '8-lane highway coverage',
      'OIML R91 compliant for speed enforcement',
    ],
    applications: [
      'Speed enforcement',
      'Highway monitoring',
      'Arterial road monitoring',
      'Intersection management',
      'Vehicle counting & classification',
      'Multilane traffic monitoring',
    ],
    specs: {
      'Detection Range': 'Up to 276m',
      'Speed Range': '-233 to +233 km/h',
      'Speed Accuracy': '±0.23 km/h',
      'Lane Coverage': 'Up to 8 lanes',
      'Temperature': '-40°C to +80°C',
      'IP Rating': 'IP67',
    },
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'isys-4001',
    name: 'ISYS-4001/4002',
    category: 'Motion Detection',
    badge: 'Industry Leading',
    tagline: 'K-Band Motion Detector for Industrial & Traffic Applications',
    description: 'K-Band based motion detector with intelligent μC decision unit. Detects moving objects from 0.3m to 150m with speed ranges from 0.8 to 250 km/h.',
    image: '/hero/iSYS-4002.png',
    features: [
      '24 GHz radar motion detector',
      'Detection range 0.3m - 150m',
      'Speed detection ±0.8 to ±250 km/h',
      'Direction discrimination',
      'IP67 robust metal housing',
      'Programmable output pins',
    ],
    applications: [
      'Industrial motion detection',
      'Energy saving lighting control',
      'Traffic monitoring',
      'Security applications',
      'Presence detection',
      'Automated gate control',
    ],
    specs: {
      'Detection Range': '0.3m - 150m',
      'Speed Range': '±0.8 to ±250 km/h',
      'Detection Angle': 'Horizontal 34°, Vertical 49°',
      'Supply Voltage': '10-30V DC',
      'Temperature': '-25°C to +60°C',
      'IP Rating': 'IP67',
    },
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'itr-3810',
    name: 'ITR-3810',
    category: 'Traffic Radar',
    badge: 'Professional',
    tagline: 'Intersection Management & Traffic Monitoring Radar',
    description: '4D MIMO FMCW radar designed for intersection management and traffic monitoring. Provides event output and multilane capability for comprehensive traffic analysis.',
    image: '/ITR-3810.jpeg',
    features: [
      '4D MIMO FMCW Radar (24 GHz ISM)',
      'Vehicle detection up to 300m',
      'Vehicle classification up to 183m',
      'Speed range -233 to +233 km/h',
      'Lane separation up to 240m',
      'Worldwide certification',
    ],
    applications: [
      'Intersection management',
      'Traffic monitoring',
      'Arterial management',
      'Vehicle counting',
      'Traffic flow analysis',
      'Real-time traffic management',
    ],
    specs: {
      'Detection Range': 'Up to 300m',
      'Speed Range': '-233 to +233 km/h',
      'Speed Accuracy': '±0.23 km/h',
      'Max Lanes': '16 lanes',
      'Temperature': '-40°C to +80°C',
      'IP Rating': 'IP67',
    },
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'idr-2050',
    name: 'IDR-2050',
    category: '60 GHz Distance Sensor',
    badge: 'Precision',
    tagline: '60 GHz Millimeter Precision Distance Measurement',
    description: 'Advanced 60 GHz radar sensor for millimeter-accurate distance measurement. Ideal for level measurement and industrial applications requiring high precision.',
    image: '/hero/IDR-2050.png',
    features: [
      '60 GHz radar sensor',
      'Millimeter accuracy (±5mm)',
      'Distance measurement 0-10m',
      'Velocity and direction output',
      'Small compact form factor',
      'UART interface',
    ],
    applications: [
      'Level measurement',
      'Distance sensing',
      'Industrial measurement',
      'Obstacle detection',
      'Proximity sensing',
      'Condition monitoring',
    ],
    specs: {
      'Detection Range': '0m - 10m',
      'Accuracy': '±5mm',
      'Frequency': '60-63.5 GHz',
      'Power Supply': '4-16V DC',
      'Temperature': '-40°C to +85°C',
      'Start-up Time': '190ms',
    },
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'isys-5021',
    name: 'ISYS-5021',
    category: '3D MIMO Radar',
    badge: 'Advanced',
    tagline: '3D MIMO Radar for Area Surveillance',
    description: 'Advanced 24 GHz 3D MIMO radar for simultaneous capture of speed, distance and angular deviation. Ideal for area surveillance and target tracking applications.',
    image: '/isys-5021-with-tracker-license-lg.jpg',
    features: [
      '24 GHz 3D MIMO Radar',
      'Detection up to 150m',
      'Angular resolution <12° in azimuth',
      '±75° field of view',
      'Target list output via SPI/Ethernet',
      'InnoSenT Smart Tracker license',
    ],
    applications: [
      'Area surveillance',
      'Movement detection',
      'Target tracking',
      'Velocity measurement',
      'Direction detection',
      'Angle measurement',
    ],
    specs: {
      'Detection Range': 'Up to 150m',
      'Frequency': '24.05-24.25 GHz',
      'Unambiguous Velocity': '±34.9 km/h',
      'Angular FOV': '±75°',
      'Temperature': '-40°C to +70°C',
      'Update Rate': '100ms',
    },
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'isys-4010',
    name: 'ISYS-4010',
    category: 'K-Band Motion Detector',
    badge: 'Compact',
    tagline: 'Compact K-Band FSK Motion Detection System',
    description: 'Compact K-Band based motion detector with unambiguous velocity up to ±250 km/h. Perfect for traffic monitoring and motion sensing applications.',
    image: '/iSYS-4010.jpeg',
    features: [
      '24 GHz K-Band FSK Radar',
      'Detection range 0.3m - 150m',
      'Unambiguous velocity ±250 km/h',
      'Minimum velocity ±0.8 km/h',
      'Direction discrimination',
      'Narrow beam 8.5° × 10°',
    ],
    applications: [
      'Traffic monitoring',
      'Motion detection',
      'Velocity measurement',
      'Direction sensing',
      'Industrial control',
      'Security systems',
    ],
    specs: {
      'Detection Range': '0.3m - 150m',
      'Speed Range': '±0.8 to ±250 km/h',
      'Beam Width': 'H: 8.5°, V: 10°',
      'Supply Voltage': '10-30V DC',
      'Temperature': '-25°C to +60°C',
      'IP Rating': 'IP67',
    },
    color: 'from-red-500 to-pink-500',
  },
]

export function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  return (
    <>
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Explore Our Products
          </h2>
          <p className="text-lg text-foreground/70">
            Each product engineered for specific applications with industry-leading performance
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-4">
              Select Product
            </h3>
            <div className="space-y-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 group ${selectedProduct.id === product.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border/30 hover:border-primary/50 bg-background'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-smooth">
                        {product.name}
                      </h4>
                      <p className="text-xs text-foreground/60 mt-1">{product.category}</p>
                    </div>
                    <Badge className="text-xs bg-secondary/20 text-secondary border-0">
                      {product.badge}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Detail */}
          <div className="lg:col-span-2 animate-fade-in-left">
            <Card className="p-8 border-border/50">
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-4xl font-bold text-primary">{selectedProduct.name}</h3>
                    <Badge className={`bg-gradient-to-r ${selectedProduct.color} text-white border-0`}>
                      {selectedProduct.category}
                    </Badge>
                  </div>
                  <p className="text-foreground/70">{selectedProduct.tagline}</p>
                  <p className="text-foreground/80 leading-relaxed">{selectedProduct.description}</p>
                </div>

                {/* Image */}
                <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden bg-muted flex items-center justify-center p-4 group hover:shadow-lg transition-smooth duration-300">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain hover:scale-110 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground">Key Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedProduct.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 group">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-smooth" />
                        <span className="text-foreground/80 group-hover:text-foreground transition-smooth">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
                  <h4 className="font-bold text-foreground">Technical Specifications</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-border/30 pb-2">
                        <span className="text-foreground/70 text-sm">{key}</span>
                        <span className="font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground">Applications</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.applications.map((app, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-secondary/15 text-secondary border-0">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    // onClick={() => {
                    //   // Trigger the inquiry modal
                    //   const event = new CustomEvent('openInquiry')
                    //   document.dispatchEvent(event)
                    // }}
                    onClick={() => setIsInquiryOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 flex-1 shadow-lg hover:shadow-xl transition-smooth"
                  >
                    Request Demo
                    <ChevronRight size={18} />
                  </Button>
                     


            




                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      
    </section>

     <InquiryModal
      isOpen={isInquiryOpen}
      onClose={() => setIsInquiryOpen(false)}
      product={selectedProduct.name}
    />
    </>

    
  )
}
