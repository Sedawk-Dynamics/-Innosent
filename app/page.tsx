'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { CertificationsSection } from "@/components/certifications-section"
import { Hero } from '@/components/hero'
import { ProductCarousel } from '@/components/product-carousel'
import { RadarTechIntro } from '@/components/radar-tech-intro'
import { FeaturedProducts } from '@/components/featured-products'
import { About } from '@/components/about'
import { Products } from '@/components/products'
import { Applications } from '@/components/applications'
import { Technology } from '@/components/technology'
import { Industries } from '@/components/industries'
import { TrustedClients } from '@/components/trusted-clients'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { InquiryModal } from '@/components/inquiry-modal'

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)

  // Listen for inquiry modal trigger from product showcase
  useEffect(() => {
    const handleOpenInquiry = () => {
      setIsInquiryOpen(true)
    }

    document.addEventListener('openInquiry', handleOpenInquiry)
    return () => document.removeEventListener('openInquiry', handleOpenInquiry)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Product Showcase */}
      {/* <Hero /> */}

      {/* Product Carousel */}
      <ProductCarousel />

      {/* About Us */}
      <About />

      {/* Explain Radar Technology */}
      <RadarTechIntro />
      <Technology />

      {/* Our Products */}
      <FeaturedProducts onInquiry={() => setIsInquiryOpen(true)} />
      <CertificationsSection/>
      
      {/* Companies We Serve */}
      <Industries />
      {/* Trusted Clients */}
      <TrustedClients />
      <Applications />



      {/* Contact Form */}
      <Contact />

      <Footer />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  )
}
