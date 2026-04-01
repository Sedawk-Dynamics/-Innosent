'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InquiryModal } from '@/components/inquiry-modal'

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const navItems = [
    { label: 'Products', href: '/products' },
    { label: 'Featured', href: '#featured-products' },
    { label: 'About', href: '#about' },
    { label: 'Technology', href: '#technology' },
    { label: 'Industries', href: '#industries' },
    { label: 'Contact', href: '#contact' },
  ]

  const searchableItems = [
    { id: 'featured-products', label: 'Featured Products' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'applications', label: 'Applications' },
    { id: 'technology', label: 'Technology' },
    { id: 'industries', label: 'Industries' },
    { id: 'contact', label: 'Contact' },
    { id: 'radar-tech-intro', label: 'Radar Technology' },
  ]

  // ✅ FIXED SOCIAL LINKS
  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/innosentindia/', label: 'Facebook' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/innosent-india/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/innosent_india/', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com/innosent_india', label: 'Twitter' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && pathname !== '/') {
      e.preventDefault()
      window.location.href = `/${href}`
    }
  }

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const query = searchQuery.toLowerCase().trim()

      if (!query) {
        setSearchResult('Please enter a search term')
        setTimeout(() => setSearchResult(null), 2000)
        return
      }

      const match = searchableItems.find(
        item =>
          item.label.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query)
      )

      if (match) {
        if (pathname !== '/') {
          window.location.href = `/#${match.id}`
        } else {
          const element = document.getElementById(match.id)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setTimeout(() => {
              setSearchResult(null)
              setSearchQuery('')
              setIsSearchOpen(false)
            }, 300)
          } else {
            setSearchResult('Section not found')
          }
        }
      } else {
        setSearchResult('No matching section found')
      }
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/innosent-logo.png"
              alt="InnoSent"
              width={200}
              height={60}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-8">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">

            {/* Search */}
           

            {/* Social */}
            <div className="flex gap-3 border-l pl-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>

            <Button onClick={() => setIsInquiryOpen(true)}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden p-4 space-y-3">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href)
                  setIsOpen(false)
                }}
                className="block"
              >
                {item.label}
              </a>
            ))}

            <div className="flex justify-center gap-5 pt-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => {
                setIsInquiryOpen(true)
                setIsOpen(false)
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center pt-20"
          onClick={() => setIsSearchOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search..."
              className="p-3 w-[400px] border rounded"
            />
            {searchResult && <p>{searchResult}</p>}
          </div>
        </div>
      )}

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </>
  )
}