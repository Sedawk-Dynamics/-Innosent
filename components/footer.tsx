import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background text-foreground relative overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="space-y-6">
            <Image
              src="/innosent-logo.png"
              alt="InnoSent Logo"
              width={220}
              height={60}
              className="h-auto w-auto max-w-[200px] hover:opacity-80 transition-smooth"
            />
            <p className="text-sm text-foreground/60 leading-relaxed">
              Leading innovators in radar sensor technology for 25+ years.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-primary">Products</h4>
            <ul className="space-y-2 text-sm">
              {['Traffic Sensors', 'Industrial Sensors', 'Smart Interfaces', 'Custom Solutions'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-foreground/70 hover:text-secondary transition-smooth hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-primary">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Careers', 'Blog', 'Press'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-foreground/70 hover:text-secondary transition-smooth hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-primary">Resources</h4>
            <ul className="space-y-2 text-sm">
              {['Documentation', 'Technical Specs', 'Datasheets', 'Support'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-foreground/70 hover:text-secondary transition-smooth hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <Separator className="bg-border mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-sm text-foreground/60 font-medium">
            © {currentYear} InnoSent India Private Limited. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, idx) => (
              <a key={idx} href="#" className="text-foreground/60 hover:text-primary transition-smooth hover:underline">
                {link}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[Facebook, Linkedin, Twitter, Youtube].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-foreground/60 hover:text-secondary hover:scale-125 transition-smooth"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  )
}
