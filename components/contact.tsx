'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function Contact() {
  const sectionRef = useScrollAnimation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30 scroll-animate-in" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">Get In Touch</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-balance leading-relaxed">
            Have questions about our products? We're here to help. Contact our team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: 'Email',
                items: ['info@innosent.in', 'sales@innosent.in'],
              },
              {
                icon: Phone,
                title: 'Phone',
                items: ['+91 9719411764'],
              },
              {
                icon: MapPin,
                title: 'Address',
                items: ['982/1M, 983M Salempur Industrial Area', 'Roorkee, Haridwar'],
              },
              {
                icon: Clock,
                title: 'Hours',
                items: ['Mon - Fri: 9:30 AM - 6:00 PM', 'Sat - Sun: Closed'],
              },
            ].map((card, idx) => {
              const Icon = card.icon
              return (
                <Card 
                  key={idx} 
                  className="p-6 hover-lift border border-border/50 backdrop-blur-sm group animate-scale-in"
                  style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-secondary/20 group-hover:bg-secondary/30 transition-smooth">
                        <Icon className="h-6 w-6 text-secondary group-hover:text-accent transition-smooth" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-smooth">{card.title}</h3>
                      {card.items.map((item, i) => (
                        <p key={i} className="text-foreground/70 text-sm">{item}</p>
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
            <Card className="p-8 border border-border/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-bold text-foreground">
                    Company Name
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="border-border/50 focus:border-primary focus:ring-primary transition-smooth"
                  />
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
                    placeholder="Tell us about your project or inquiry..."
                    required
                    rows={5}
                    className="border-border/50 focus:border-primary focus:ring-primary transition-smooth resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 shadow-md hover:shadow-lg transition-smooth font-semibold flex items-center justify-center gap-2 group"
                >
                  <Send size={18} className="group-hover:translate-x-1 transition-smooth" />
                  Send Message
                </Button>

                <p className="text-xs text-foreground/50 text-center font-medium">
                  We'll get back to you within 24 hours
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
