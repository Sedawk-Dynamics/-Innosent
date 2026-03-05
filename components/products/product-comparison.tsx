'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText } from 'lucide-react'

const datasheets = [
  {
    name: 'ITR-3811',
    category: 'Traffic Radar',
    file: '/doc/ITR-3811_Data-Sheet.pdf',
  },
  {
    name: 'ITR-3810',
    category: 'Traffic Radar',
    file: '/doc/ITR-3810.pdf',
  },
  {
    name: 'ISYS-4001 / ISYS-4002',
    category: 'K-Band Motion Detector',
    file: '/doc/iSYS-4001-iSYS_4002.pdf',
  },
  {
    name: 'ISYS-4010',
    category: 'K-Band Motion Detector',
    file: '/doc/DataSheet_iSYS-4010.pdf',
  },
  {
    name: 'ISYS-5021',
    category: '3D MIMO Radar',
    file: '/doc/DataSheet_iSYS_5021.pdf',
  },
  {
    name: 'IDR-2050',
    category: '60 GHz Distance Sensor',
    file: '/doc/IDR-2050 datasheet.pdf',
  },
]

export function ProductComparison() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Product Datasheets
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Download detailed technical datasheets for our radar products
          </p>
        </div>

        {/* Datasheet Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasheets.map((item, index) => (
            <Card
              key={index}
              className="p-6 border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col h-full justify-between space-y-6">

                {/* Product Info */}
                <div className="space-y-3">

                  <div className="flex items-center gap-2 text-primary">
                    <FileText size={20} />
                    <span className="text-sm font-medium">
                      Datasheet
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-primary">
                    {item.name}
                  </h3>

                  <p className="text-sm text-foreground/70">
                    {item.category}
                  </p>

                </div>

                {/* Download Button */}
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="w-full"
                >
                  <Button className="w-full gap-2">
                    <Download size={18} />
                    Download PDF
                  </Button>
                </a>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}