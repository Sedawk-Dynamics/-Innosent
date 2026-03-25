'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock, Send, AlertCircle, CheckCircle, Info, Link as LinkIcon } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { useToast } from '@/hooks/use-toast'

export function Contact() {
  const sectionRef = useScrollAnimation()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]*[^\s<>"{}|\\^`\[\].,!?;:()]/gi

    // Helper to check for URLs in a field
    const hasUrls = (text: string): boolean => {
      return urlRegex.test(text)
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must not exceed 100 characters'
    } else if (hasUrls(formData.name)) {
      newErrors.name = 'Name cannot contain URLs or links'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please provide a valid email address'
      } else if (hasUrls(formData.email)) {
        newErrors.email = 'Email cannot contain URLs or links'
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 5000) {
      newErrors.message = 'Message must not exceed 5000 characters'
    }

    if (formData.company && formData.company.trim().length > 150) {
      newErrors.company = 'Company name must not exceed 150 characters'
    } else if (formData.company && hasUrls(formData.company)) {
      newErrors.company = 'Company name cannot contain URLs or links'
    }

    if (formData.subject && formData.subject.trim().length > 200) {
      newErrors.subject = 'Subject must not exceed 200 characters'
    } else if (formData.subject && hasUrls(formData.subject)) {
      newErrors.subject = 'Subject cannot contain URLs or links'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form client-side
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || undefined,
          subject: formData.subject.trim() || 'Contact Form Submission',
          message: formData.message.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitStatus('error')
        console.error('[v0] Contact form submission error:', data)

        // Parse error details for better UX
        let errorDescription = data.error || 'Failed to send your message. Please try again.'
        if (data.details && Array.isArray(data.details) && data.details.length > 0) {
          // Check if it's a URL-related error
          const urlError = data.details.find((err: string) =>
            err.toLowerCase().includes('url') || err.toLowerCase().includes('link')
          )
          if (urlError) {
            errorDescription = urlError
          } else {
            errorDescription = data.details[0]
          }
        }

        toast({
          title: 'Message Not Sent',
          description: errorDescription,
          variant: 'destructive',
        })
        return
      }

      setSubmitStatus('success')

      // Provide feedback about URL detection
      const successMessage = data.urlsDetected
        ? 'Your message with links has been sent successfully and verified!'
        : 'Your message has been sent successfully.'

      toast({
        title: 'Success!',
        description: successMessage,
      })

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
      })

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      console.error('[v0] Contact form network error:', error)
      toast({
        title: 'Error',
        description: 'A network error occurred. Please check your connection and try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
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
                items: ['info@innosent.co.in', 'sales@innosent.co.in'],
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
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3 items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900">Message Sent Successfully!</h3>
                    <p className="text-sm text-green-800 mt-1">We've received your message and will get back to you within 24 hours. Check your email for a confirmation.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900">Error Sending Message</h3>
                    <p className="text-sm text-red-800 mt-1">Something went wrong. Please try again or contact us directly.</p>
                  </div>
                </div>
              )}

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
                      disabled={isSubmitting}
                      className={`border-border/50 focus:border-primary focus:ring-primary transition-smooth ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                    <p className="text-xs text-foreground/50">No links or URLs allowed</p>
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
                      disabled={isSubmitting}
                      className={`border-border/50 focus:border-primary focus:ring-primary transition-smooth ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                    <p className="text-xs text-foreground/50">No links or URLs allowed</p>
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
                    disabled={isSubmitting}
                    className={`border-border/50 focus:border-primary focus:ring-primary transition-smooth ${
                      errors.company ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.company && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.company}
                    </p>
                  )}
                  <p className="text-xs text-foreground/50">No links or URLs allowed</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-bold text-foreground">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    disabled={isSubmitting}
                    className={`border-border/50 focus:border-primary focus:ring-primary transition-smooth ${
                      errors.subject ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.subject}
                    </p>
                  )}
                  <p className="text-xs text-foreground/50">No links or URLs allowed</p>
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
                    disabled={isSubmitting}
                    rows={5}
                    className={`border-border/50 focus:border-primary focus:ring-primary transition-smooth resize-none ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.message}
                    </p>
                  )}
                  <p className="text-xs text-foreground/50">
                    {formData.message.length} / 5000 characters
                  </p>

                  {/* URL Validation Helper */}
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex gap-2 items-start">
                    <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-800 space-y-1">
                      <p className="font-semibold">URL and Link Policy:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-blue-700">
                        <li>Name, Email, Company, and Subject: No URLs or links allowed</li>
                        <li>Message field: Only InnoSent and approved sources (GitHub, LinkedIn, YouTube)</li>
                        <li>Other links will be rejected</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 shadow-md hover:shadow-lg transition-smooth font-semibold flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="group-hover:translate-x-1 transition-smooth" />
                      Send Message
                    </>
                  )}
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
