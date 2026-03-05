'use client'

import Image from "next/image"
import { Card } from "@/components/ui/card"

const certifications = [
  {
    name: "FCC",
    image: "/certifications/fcc.png",
  },
  {
    name: "CE",
    image: "/certifications/ce.png",
  },
  {
    name: "UKCA",
    image: "/certifications/ukca.png",
  },
  {
    name: "BIS",
    image: "/certifications/Bis.png",
  },
]

export function CertificationsSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Certifications
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Our radar products comply with international regulatory standards
            ensuring safety, quality, and reliability.
          </p>
        </div>

        {/* Certification Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {certifications.map((item, index) => (
            <Card
              key={index}
              className="flex items-center justify-center p-8 hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={80}
                className="object-contain grayscale hover:grayscale-0 transition"
              />
            </Card>
          ))}

        </div>
      </div>
    </section>
  )
}