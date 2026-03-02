'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is the difference between ITR-3811 and ITR-3810?',
    answer: 'The ITR-3811 is our premium traffic radar with enhanced detection range (200m vs 150m), better speed accuracy (±1 km/h vs ±2 km/h), and advanced multi-vehicle tracking. The ITR-3810 is ideal for space-constrained installations and offers excellent value for urban traffic monitoring.',
  },
  {
    question: 'Can ISYS-4001 be used for obstacle detection?',
    answer: 'Yes, the ISYS-4001 is particularly well-suited for obstacle avoidance applications with its precise ±2cm accuracy and 0.05m-15m range, making it perfect for robotics, automated parking, and industrial automation.',
  },
  {
    question: 'What is the operating temperature range?',
    answer: 'Operating temperature varies by product: ITR-3811 (-40°C to +70°C), ISYS-4001 (-40°C to +85°C), ISYS-5020 (-40°C to +100°C). All products include thermal compensation for stable performance across temperature extremes.',
  },
  {
    question: 'Are your products IP67 waterproof?',
    answer: 'Most of our products feature IP67 rating, making them suitable for outdoor and harsh environments. The ISYS-5020 offers IP68 rating for submersible applications. Check the datasheet for your specific product.',
  },
  {
    question: 'How long is the product warranty?',
    answer: 'All InnoSent products come with a 3-year manufacturer warranty covering defects in materials and workmanship. Extended warranty options are available for critical applications.',
  },
  {
    question: 'What support and documentation is available?',
    answer: 'We provide comprehensive documentation including datasheets, integration guides, API documentation, and technical support via email and phone. Additional training and consulting services are available for large deployments.',
  },
  {
    question: 'Can I integrate these sensors with existing systems?',
    answer: 'Yes! Our sensors support multiple integration options including Ethernet, CAN, RS485, and analog outputs. We provide SDKs and example code for popular platforms and IoT frameworks.',
  },
  {
    question: 'What is the typical power consumption?',
    answer: 'Our sensors are extremely power-efficient: ITR-3811 (<2W), ISYS-4001 (<1W), IMD-3000 (<0.5W). This makes them ideal for battery-powered and solar-powered applications.',
  },
]

export function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/70">
            Common questions about our products and specifications
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 animate-fade-in-up">
          {faqs.map((faq, idx) => (
            <Card
              key={idx}
              className="overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-muted/50 transition-smooth"
              >
                <span className="font-bold text-foreground text-balance pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 pt-0 border-t border-border/30 animate-fade-in-down">
                  <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 text-center space-y-4 animate-fade-in-up">
          <h3 className="text-xl font-bold text-primary">Still have questions?</h3>
          <p className="text-foreground/70">Our technical team is ready to help you find the perfect solution.</p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-smooth">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}
