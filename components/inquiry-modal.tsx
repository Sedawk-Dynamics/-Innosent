'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X, Send } from 'lucide-react'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    product: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Inquiry submitted:', formData)
    setFormData({ name: '', email: '', company: '', phone: '', product: '', message: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in-up"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-in">
        <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border/50">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/50 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">Product Inquiry</h2>
              <p className="text-sm text-foreground/60 mt-1">Get detailed information about our radar sensors</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <X size={24} className="text-foreground/60" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-foreground">
                  Full Name <span className="text-secondary">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="border-border/50 focus:border-primary focus:ring-primary transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-foreground">
                  Email Address <span className="text-secondary">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  className="border-border/50 focus:border-primary focus:ring-primary transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-bold text-foreground">
                  Company Name <span className="text-secondary">*</span>
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  required
                  className="border-border/50 focus:border-primary focus:ring-primary transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold text-foreground">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                  className="border-border/50 focus:border-primary focus:ring-primary transition-smooth"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="product" className="text-sm font-bold text-foreground">
                Interested Product <span className="text-secondary">*</span>
              </label>
              <select
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border/50 rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth"
              >
                <option value="">Select a product...</option>
                <option value="itr-3811">ITR-3811 Traffic Radar</option>
                <option value="isys-4001">ISYS-4001 Distance Measurement</option>
                <option value="itr-3810">ITR-3810 Traffic Radar</option>
                <option value="imd-3000">IMD-3000 Motion Sensor</option>
                <option value="isys-5020">ISYS-5020 Security Radar</option>
                <option value="other">Other / Multiple Products</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-foreground">
                Message <span className="text-secondary">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your application and requirements..."
                required
                rows={4}
                className="border-border/50 focus:border-primary focus:ring-primary transition-smooth resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-border/50 text-foreground hover:bg-muted transition-smooth bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-smooth flex items-center justify-center gap-2 group"
              >
                <Send size={18} className="group-hover:translate-x-1 transition-smooth" />
                Send Inquiry
              </Button>
            </div>

            <p className="text-xs text-foreground/50 text-center font-medium">
              We'll get back to you within 24 hours with detailed product information
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
