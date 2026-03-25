import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Input validation schema
interface ContactFormData {
  name: string
  email: string
  company?: string
  subject?: string
  message: string
}

// URL validation utilities
const URL_REGEX = /https?:\/\/[^\s<>"{}|\\^`\[\]]*[^\s<>"{}|\\^`\[\].,!?;:()]/gi
const APPROVED_DOMAINS = ['innosent.in', 'innosent.co.in', 'innosent.com', 'github.com', 'linkedin.com', 'youtube.com', 'innosent-india']

/**
 * Extract all URLs from text
 */
function extractUrls(text: string): string[] {
  const matches = text.match(URL_REGEX) || []
  return [...new Set(matches)] // Remove duplicates
}

/**
 * Validate if a URL is from an approved domain
 */
function isApprovedUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()

    // Check if any approved domain matches
    return APPROVED_DOMAINS.some((domain) => {
      const normalizedDomain = domain.toLowerCase()
      return hostname === normalizedDomain || hostname.endsWith(`.${normalizedDomain}`)
    })
  } catch {
    // Invalid URL format
    return false
  }
}

/**
 * Validate that a field does not contain any URLs
 */
function validateNoUrls(fieldName: string, fieldValue: string): { valid: boolean; error?: string } {
  const urls = extractUrls(fieldValue)

  if (urls.length === 0) {
    return { valid: true }
  }

  const urlList = urls.slice(0, 2).join(', ')
  const moreCount = urls.length > 2 ? ` and ${urls.length - 2} more` : ''

  return {
    valid: false,
    error: `${fieldName} cannot contain URLs or links. Found: ${urlList}${moreCount}. Please remove all links and try again.`,
  }
}

// Helper function to escape HTML special characters
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

// Validate form data
function validateFormData(data: unknown): { valid: boolean; errors: string[]; data?: ContactFormData } {
  const errors: string[] = []

  if (typeof data !== 'object' || data === null) {
    return { valid: false, errors: ['Invalid request body'] }
  }

  const formData = data as Record<string, unknown>

  // Name validation
  if (!formData.name || typeof formData.name !== 'string') {
    errors.push('Name is required')
  } else if (formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters')
  } else if (formData.name.trim().length > 100) {
    errors.push('Name must not exceed 100 characters')
  } else {
    // Check for URLs in name
    const nameUrlValidation = validateNoUrls('Name', formData.name)
    if (!nameUrlValidation.valid) {
      errors.push(nameUrlValidation.error || 'Name contains invalid URLs')
    }
  }

  // Email validation
  if (!formData.email || typeof formData.email !== 'string') {
    errors.push('Email is required')
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      errors.push('Please provide a valid email address')
    } else {
      // Check for URLs in email field
      const emailUrlValidation = validateNoUrls('Email', formData.email)
      if (!emailUrlValidation.valid) {
        errors.push(emailUrlValidation.error || 'Email contains invalid URLs')
      }
    }
  }

  // Message validation
  if (!formData.message || typeof formData.message !== 'string') {
    errors.push('Message is required')
  } else if (formData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters')
  } else if (formData.message.trim().length > 5000) {
    errors.push('Message must not exceed 5000 characters')
  } else {
    // Validate URLs in message - only approved URLs allowed
    const urls = extractUrls(formData.message)
    if (urls.length > 0) {
      const rejectedUrls: string[] = []
      for (const url of urls) {
        if (!isApprovedUrl(url)) {
          rejectedUrls.push(url)
        }
      }
      if (rejectedUrls.length > 0) {
        const rejectedList = rejectedUrls.slice(0, 3).join(', ')
        const moreCount = rejectedUrls.length > 3 ? ` and ${rejectedUrls.length - 3} more` : ''
        errors.push(
          `Message contains invalid URLs: ${rejectedList}${moreCount}. Only InnoSent-related links and approved sources are permitted.`
        )
      }
    }
  }

  // Company validation (optional)
  if (formData.company && typeof formData.company !== 'string') {
    errors.push('Company must be a text field')
  } else if (typeof formData.company === 'string' && formData.company.trim().length > 150) {
    errors.push('Company name must not exceed 150 characters')
  } else if (typeof formData.company === 'string' && formData.company.trim().length > 0) {
    // Check for URLs in company
    const companyUrlValidation = validateNoUrls('Company name', formData.company)
    if (!companyUrlValidation.valid) {
      errors.push(companyUrlValidation.error || 'Company name contains invalid URLs')
    }
  }

  // Subject validation (optional)
  if (formData.subject && typeof formData.subject !== 'string') {
    errors.push('Subject must be a text field')
  } else if (typeof formData.subject === 'string' && formData.subject.trim().length > 200) {
    errors.push('Subject must not exceed 200 characters')
  } else if (typeof formData.subject === 'string' && formData.subject.trim().length > 0) {
    // Check for URLs in subject
    const subjectUrlValidation = validateNoUrls('Subject', formData.subject)
    if (!subjectUrlValidation.valid) {
      errors.push(subjectUrlValidation.error || 'Subject contains invalid URLs')
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    errors: [],
    data: {
      name: (formData.name as string).trim(),
      email: (formData.email as string).trim(),
      company: (formData.company as string | undefined)?.trim() || undefined,
      subject: (formData.subject as string | undefined)?.trim() || 'Contact Form Submission',
      message: (formData.message as string).trim(),
    },
  }
}

export async function POST(req: Request) {
  // Check for required environment variables
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL', 'TO_EMAIL']
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missingEnvVars.length > 0) {
    console.error('[v0] Missing environment variables:', missingEnvVars.join(', '))
    return NextResponse.json(
      { error: 'Server configuration error. Please try again later.' },
      { status: 500 }
    )
  }

  try {
    // Parse and validate request body
    const body = await req.json()
    const validation = validateFormData(body)

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    const { name, email, company, subject, message } = validation.data!

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error('[v0] SMTP verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Email service temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    // Prepare email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
            .field { margin: 15px 0; }
            .field-label { font-weight: bold; color: #667eea; font-size: 14px; text-transform: uppercase; }
            .field-value { margin: 5px 0 0 0; padding: 10px; background: white; border-left: 4px solid #667eea; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            .reply-to { color: #764ba2; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${escapeHtml(name)}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a class="reply-to" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
              </div>

              ${company ? `
                <div class="field">
                  <div class="field-label">Company</div>
                  <div class="field-value">${escapeHtml(company)}</div>
                </div>
              ` : ''}

              <div class="field">
                <div class="field-label">Subject</div>
                <div class="field-value">${escapeHtml(subject)}</div>
              </div>

              <div class="field">
                <div class="field-label">Message</div>
                <div class="field-value">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
              </div>

              <div class="footer">
                <p>This email was sent from the InnoSent contact form.</p>
                <p>Reply to: <a class="reply-to" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const plainTextContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Subject: ${subject}

Message:
${message}

---
This email was sent from the InnoSent contact form.
Reply to: ${email}
    `.trim()

    // Send email to admin
    const mailOptions = {
      from: `"InnoSent Contact Form" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: htmlContent,
      text: plainTextContent,
    }

    await transporter.sendMail(mailOptions)

    // Send confirmation email to user
    const confirmationMailOptions = {
      from: `"InnoSent" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: 'We received your message - InnoSent',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
              .message { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Thank you for reaching out!</h1>
              </div>
              <div class="content">
                <p>Hi ${escapeHtml(name)},</p>
                
                <p>We've received your message and appreciate you contacting InnoSent. Our team will review your inquiry and get back to you within 24 hours.</p>
                
                <div class="message">
                  <strong>Your Message Details:</strong><br>
                  Subject: ${escapeHtml(subject)}<br>
                  Received: ${new Date().toLocaleString()}
                </div>

                <p>If you need immediate assistance, please contact us at:</p>
                <ul>
                  <li><strong>Email:</strong> ${escapeHtml(process.env.FROM_EMAIL || 'support@innosent.in')}</li>
                  <li><strong>Phone:</strong> +91 9719411764</li>
                </ul>

                <p>Thank you for your interest in InnoSent!</p>
                
                <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} InnoSent. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Thank you for reaching out to InnoSent!\n\nWe've received your message and will get back to you within 24 hours.\n\nSubject: ${subject}\nReceived: ${new Date().toLocaleString()}\n\nThank you!`,
    }

    await transporter.sendMail(confirmationMailOptions)

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!',
        urlsDetected: extractUrls(message).length > 0,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Contact form error:', error)

    // Determine error type for better logging
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
