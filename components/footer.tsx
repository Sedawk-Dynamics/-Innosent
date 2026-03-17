import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const products = [
    "Traffic Sensors",
    "Industrial Sensors",
    "Smart Interfaces",
    "Custom Solutions",
  ]

  const quickLinks = [
    { name: "About Us", link: "/#about" },
    { name: "Technology", link: "/#technology" },
    { name: "Industries", link: "/#industries" },
    { name: "Contact", link: "/#contact" },
  ]

  const policies = [
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms of Service", link: "/terms" },
    { name: "Cookie Policy", link: "/cookies" },
  ]

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">

        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-6">
            <Image
              src="/innosent-logo.png"
              alt="InnoSent Logo"
              width={220}
              height={60}
              className="h-auto w-auto max-w-[200px]"
            />

            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading innovators in radar sensor technology for 25+ years,
              delivering reliable solutions for mobility, industry, and smart
              infrastructure.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-primary">
              Products
            </h4>

            <ul className="space-y-2 text-sm">
              {products.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href="/products"
                    className="text-muted-foreground hover:text-secondary transition-all hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-primary">
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className="text-muted-foreground hover:text-secondary transition-all hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-primary">
              Follow Us
            </h4>

            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-secondary transition-transform hover:scale-110"
              >
                <Facebook size={20} />
              </Link>

              <Link
                href="#"
                className="text-muted-foreground hover:text-secondary transition-transform hover:scale-110"
              >
                <Linkedin size={20} />
              </Link>

              <Link
                href="#"
                className="text-muted-foreground hover:text-secondary transition-transform hover:scale-110"
              >
                <Twitter size={20} />
              </Link>

              <Link
                href="#"
                className="text-muted-foreground hover:text-secondary transition-transform hover:scale-110"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-sm text-muted-foreground">
            © {currentYear} InnoSent India Private Limited. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6 text-sm">
            {policies.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="text-muted-foreground hover:text-primary hover:underline transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}