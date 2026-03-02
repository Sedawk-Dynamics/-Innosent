import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductLanding } from '@/components/products/product-landing'
import { ProductShowcase } from '@/components/products/product-showcase'
import { ProductComparison } from '@/components/products/product-comparison'
import { ProductFAQ } from '@/components/products/product-faq'

export const metadata = {
  title: 'InnoSent Products - Advanced Radar Sensors',
  description: 'Explore our complete range of radar sensors including ITR-3811, ISYS-4001, and more. Industry-leading solutions for traffic, manufacturing, and smart systems.',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductLanding />
      <ProductShowcase />
      <ProductComparison />
      <ProductFAQ />
      <Footer />
    </div>
  )
}
