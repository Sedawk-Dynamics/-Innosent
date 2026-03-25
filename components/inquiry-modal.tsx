'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X, Send, Loader2 } from 'lucide-react'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

// ==============================
// CONFIG
// ==============================

const URL_REGEX =
  /https?:\/\/[^\s<>"{}|\\^`\[\]]*[^\s<>"{}|\\^`\[\].,!?;:()]/gi

const ALLOWED_PATTERNS = [
  /^https:\/\/www\.innosent\.co\.in(\/.*)?$/i,
  /^https:\/\/shop\.innosent\.co\.in\/product\/.+$/i,
]

// ==============================
// HELPERS
// ==============================

function extractUrls(text: string): string[] {
  const matches = text.match(URL_REGEX) || []
  return [...new Set(matches)]
}

function isAllowedUrl(url: string): boolean {
  return ALLOWED_PATTERNS.some((pattern) => pattern.test(url))
}

// ==============================
// COMPONENT
// ==============================

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    product: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateClient = () => {
    if (extractUrls(formData.name).length)
      return 'Name cannot contain URLs'

    if (extractUrls(formData.company).length)
      return 'Company cannot contain URLs'

    if (extractUrls(formData.phone).length)
      return 'Phone cannot contain URLs'

    const urls = extractUrls(formData.message)

    if (urls.length > 0) {
      const invalid = urls.filter((u) => !isAllowedUrl(u))

      if (invalid.length > 0) {
        return `Only allowed links:
https://www.innosent.co.in/
https://shop.innosent.co.in/product/*`
      }
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const err = validateClient()
    if (err) {
      setError(err)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error?.join?.(', ') || 'Submission failed')
        return
      }

      alert('✅ Inquiry sent successfully')

      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        product: '',
        message: '',
      })

      onClose()
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-4">

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <Input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
            <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />

            <select name="product" value={formData.product} onChange={handleChange} required className="w-full border p-2 rounded">
              <option value="">Select product</option>
              <option value="itr-3811">ITR-3811</option>
              <option value="isys-4001">ISYS-4001</option>
              <option value="itr-3810">ITR-3810</option>
              <option value="imd-3000">IMD-3000</option>
              <option value="Other">Other</option>
            </select>

            <Textarea name="message" value={formData.message} onChange={handleChange} required />

            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Send size={16} />}
              Send Inquiry
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}