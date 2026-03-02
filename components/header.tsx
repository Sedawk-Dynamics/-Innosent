'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'
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

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  // Handle navigation with proper anchor link support
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If link has an anchor and we're on products page, go to home first then scroll
    if (href.startsWith('#') && pathname !== '/') {
      e.preventDefault()
      window.location.href = `/${href}`
    }
  }

  // Focus search input when it opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Handle search
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const query = searchQuery.toLowerCase().trim()
      
      if (!query) {
        setSearchResult('Please enter a search term')
        setTimeout(() => setSearchResult(null), 2000)
        return
      }

      // Find matching section
      const match = searchableItems.find(
        item => item.label.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)
      )

      if (match) {
        // If not on home page, navigate there first
        if (pathname !== '/') {
          window.location.href = `/#${match.id}`
        } else {
          // Smooth scroll to section
          const element = document.getElementById(match.id)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            
            // Reset search state after a delay
            setTimeout(() => {
              setSearchResult(null)
              setSearchQuery('')
              setIsSearchOpen(false)
            }, 300)
          } else {
            setSearchResult('Section not found on page')
            setTimeout(() => setSearchResult(null), 3000)
          }
        }
      } else {
        setSearchResult(`No section found matching "${query}". Try: Products, About, Technology, Industries, Contact`)
        setTimeout(() => setSearchResult(null), 4000)
      }
    }
  }

  // Close search on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm animate-slide-down">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group hover:opacity-80 transition-smooth animate-logo-pop-in">
            <Image
              src="/innosent-logo.png"
              alt="InnoSent Logo"
              width={220}
              height={60}
              className="h-auto w-auto max-w-[200px] hover:opacity-80 transition-smooth"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">

            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-smooth relative group"
                style={{ animationDelay: `${0.05 * idx}s` }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-smooth duration-300" />
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-smooth"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Social Links */}
            <div className="flex items-center gap-4 border-l border-border pl-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="text-foreground/60 hover:text-secondary hover:scale-110 transition-smooth"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setIsInquiryOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-smooth"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 animate-slide-down">
            <div className="px-4 py-4 space-y-2">

              {/* Mobile Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
                />
                {searchResult && (
                  <div className="mt-2 text-xs text-foreground/70 px-2 animate-fade-in-up">
                    {searchResult}
                  </div>
                )}
              </div>

              {navItems.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 py-3 px-3 rounded-lg transition-smooth"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Social Icons */}
              <div className="flex justify-center gap-6 pt-4 border-t border-border mt-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      aria-label={social.label}
                      className="text-foreground/60 hover:text-secondary hover:scale-110 transition-smooth"
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>

              <Button
                onClick={() => {
                  setIsInquiryOpen(true)
                  setIsOpen(false)
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6 shadow-md transition-smooth"
              >
                Get Started
              </Button>

            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 animate-fade-in-up"
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="max-w-2xl mx-auto mt-20 px-4 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-background rounded-lg shadow-2xl border border-border/50 overflow-hidden">
              <div className="relative">
                <Search className="absolute left-4 top-4 text-foreground/40" size={20} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, sections, technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-background text-foreground placeholder:text-foreground/40 focus:outline-none border-b border-border/30"
                />
              </div>

              {searchResult && (
                <div className="px-4 py-3 text-sm text-foreground/70 border-b border-border/30 bg-muted/50">
                  {searchResult}
                </div>
              )}

              {/* Search Suggestions */}
              <div className="max-h-96 overflow-y-auto">
                {!searchQuery && (
                  <div className="p-6 text-center">
                    <p className="text-sm text-foreground/60 mb-4">Popular searches:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['Products', 'Technology', 'Industries', 'About', 'Contact'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            const match = searchableItems.find((s) =>
                              s.label.toLowerCase().includes(item.toLowerCase())
                            )
                            if (match) {
                              window.location.href = `/#${match.id}`
                            }
                          }}
                          className="px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-smooth"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
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
