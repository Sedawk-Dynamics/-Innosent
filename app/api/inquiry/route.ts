import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

function validateNoUrls(field: string, value: string) {
  const urls = extractUrls(value)
  if (urls.length > 0) {
    return {
      valid: false,
      error: `${field} cannot contain URLs.`,
    }
  }
  return { valid: true }
}

function escapeHtml(text: string) {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

// ==============================
// VALIDATION
// ==============================

function validateForm(data: any) {
  const errors: string[] = []

  if (!data.name || data.name.length < 2) {
    errors.push('Name is required')
  } else {
    const res = validateNoUrls('Name', data.name)
    if (!res.valid) errors.push(res.error!)
  }

  if (!data.email) {
    errors.push('Email required')
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email')
    }
  }

  if (!data.company) {
    errors.push('Company required')
  } else {
    const res = validateNoUrls('Company', data.company)
    if (!res.valid) errors.push(res.error!)
  }

  if (data.phone) {
    const res = validateNoUrls('Phone', data.phone)
    if (!res.valid) errors.push(res.error!)
  }

  if (!data.product) {
    errors.push('Product required')
  }

  if (!data.message || data.message.length < 10) {
    errors.push('Message must be at least 10 characters')
  } else {
    const urls = extractUrls(data.message)

    if (urls.length > 0) {
      const invalid = urls.filter((u) => !isAllowedUrl(u))

      if (invalid.length > 0) {
        errors.push(
          `Only allowed links:\nhttps://www.innosent.co.in/\nhttps://shop.innosent.co.in/product/*`
        )
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// ==============================
// API
// ==============================

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validation = validateForm(body)

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors },
        { status: 400 }
      )
    }

    const { name, email, company, phone, product, message } = body

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    try {
      await transporter.verify()
    } catch (e) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const html = `
      <h2>New Product Inquiry</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Company:</b> ${escapeHtml(company)}</p>
      <p><b>Phone:</b> ${escapeHtml(phone || '-')}</p>
      <p><b>Product:</b> ${escapeHtml(product)}</p>
      <p><b>Message:</b><br/>${escapeHtml(message)}</p>
    `

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `[Inquiry] ${product}`,
      html,
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry sent successfully',
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}