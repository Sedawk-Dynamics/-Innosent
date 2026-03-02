'use client'

import { Card } from '@/components/ui/card'
import { Check, X } from 'lucide-react'

const products = [
  { 
    name: 'ITR-3811', 
    category: 'Traffic Radar',
    frequency: '24 GHz',
    range: '276m', 
    speed: '±233 km/h',
    accuracy: '±0.23 km/h',
    temp: '-40 to +80°C',
    ip: 'IP67'
  },
  { 
    name: 'ISYS-4001/4002', 
    category: 'K-Band Motion Detector',
    frequency: '24 GHz',
    range: '150m', 
    speed: '±250 km/h',
    accuracy: '±0.8 km/h',
    temp: '-25 to +60°C',
    ip: 'IP67'
  },
  { 
    name: 'ITR-3810', 
    category: 'Traffic Radar',
    frequency: '24 GHz',
    range: '300m', 
    speed: '±233 km/h',
    accuracy: '±0.23 km/h',
    temp: '-40 to +80°C',
    ip: 'IP67'
  },
  { 
    name: 'IDR-2050', 
    category: '60 GHz Distance Sensor',
    frequency: '60 GHz',
    range: '10m', 
    accuracy: '±5mm',
    speed: 'N/A',
    temp: '-40 to +85°C',
    ip: 'IP67'
  },
  { 
    name: 'ISYS-5021', 
    category: '3D MIMO Radar',
    frequency: '24 GHz',
    range: '150m', 
    speed: '±34.9 km/h',
    accuracy: 'High',
    temp: '-40 to +70°C',
    ip: 'IP67'
  },
  { 
    name: 'ISYS-4010', 
    category: 'K-Band Motion Detector',
    frequency: '24 GHz',
    range: '150m', 
    speed: '±250 km/h',
    accuracy: '±0.8 km/h',
    temp: '-25 to +60°C',
    ip: 'IP67'
  },
]

const categories = [
  { key: 'name', label: 'Product', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'frequency', label: 'Frequency', type: 'text' },
  { key: 'range', label: 'Detection Range', type: 'text' },
  { key: 'speed', label: 'Speed Range', type: 'text' },
  { key: 'accuracy', label: 'Accuracy', type: 'text' },
  { key: 'temp', label: 'Temperature', type: 'text' },
  { key: 'ip', label: 'IP Rating', type: 'text' },
]

export function ProductComparison() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Product Comparison
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Compare specifications across our complete product range
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto animate-fade-in-up">
          <Card className="p-6 border-border/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {categories.map((cat) => (
                    <th key={cat.key} className="text-left py-4 px-4 font-bold text-foreground/70 text-sm">
                      {cat.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={idx} className="border-b border-border/30 hover:bg-primary/5 transition-smooth">
                    {categories.map((cat) => (
                      <td key={`${idx}-${cat.key}`} className="py-4 px-4 text-sm">
                        <span className={cat.key === 'name' ? 'font-bold text-primary' : 'text-foreground/80'}>
                          {product[cat.key as keyof typeof product] as string}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </section>
  )
}
