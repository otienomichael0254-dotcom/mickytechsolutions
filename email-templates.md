# Template 1: Contact Form Acknowledgment (Auto-Reply sent to Visitor)

**EmailJS Template Configuration:**
- Goes to: Visitor's email address
- Template ID: `template_b6fhvwu` (autoReplyTemplateId)
- Subject: Thank you for contacting us, {{to_name}}!

**Required Variables in EmailJS Template:**
```
{{to_name}}
{{to_email}}
{{from_name}}
{{from_name_full}}
{{project_type}}
{{message}}
{{company}}
{{budget}}
```

**HTML Content:**

```html
<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; color: #cbd5e1;">
  <div style="color: #f1f5f9; font-size: 14px;">
    <strong>Thank you for contacting us, {{to_name}}!</strong>
  </div>
  <div style="margin-top: 20px; padding: 15px 0; border-width: 1px 0; border-style: dashed; border-color: rgba(56, 189, 248, 0.2);">
    <table role="presentation" style="width: 100%;">
      <tr>
        <td style="vertical-align: top; padding-right: 15px;">
          <div style="padding: 10px; background-color: rgba(56, 189, 248, 0.15); border-radius: 8px; font-size: 28px; text-align: center; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;" role="img" aria-label="user">
            👤
          </div>
        </td>
        <td style="vertical-align: top;">
          <div style="color: #38bdf8; font-size: 16px; font-weight: 600;">
            {{from_name_full}}
          </div>
          <div style="color: #64748b; font-size: 13px; margin-top: 4px;">
            {{to_email}} | Company: {{company}}
          </div>
          <p style="font-size: 14px; margin-top: 10px; color: #cbd5e1;">
            <strong>Project Type:</strong> {{project_type}} <br/>
            <strong>Budget:</strong> {{budget}}
          </p>
        </td>
      </tr>
    </table>
  </div>

  <div style="margin-top: 20px; padding: 20px; background: rgba(26, 41, 66, 0.4); border: 1px solid rgba(56, 189, 248, 0.12); border-radius: 8px;">
    <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 12px;">
      <strong style="color: #f1f5f9;">Your Message:</strong>
    </p>
    <p style="font-size: 13px; color: #cbd5e1; line-height: 1.6; padding: 12px; background: rgba(15, 23, 42, 0.5); border-left: 3px solid #38bdf8; border-radius: 4px;">
      {{message}}
    </p>
  </div>
</div>

<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(56, 189, 248, 0.12);">
  <p style="color: #cbd5e1; margin-bottom: 16px;">
    Hi {{to_name}},
  </p>
  
  <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 16px;">
    Thank you for reaching out! We've received your message regarding <strong style="color: #38bdf8;">{{project_type}}</strong>, and we appreciate you taking the time to contact us.
  </p>

  <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 16px;">
    I'll review your inquiry and get back to you as soon as possible. Typically, you can expect a response within <strong>24 hours</strong>.
  </p>

  <div style="margin: 20px 0; padding: 16px; background: rgba(52, 211, 153, 0.1); border-left: 4px solid #34d399; border-radius: 4px;">
    <p style="color: #34d399; font-size: 13px; font-weight: 600;">
      ✓ Message received and confirmed
    </p>
  </div>

  <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 16px;">
    In the meantime, feel free to explore my portfolio at:
    <br/>
    <a href="https://michaelotienoouma.vercel.app" style="color: #38bdf8; text-decoration: none; font-weight: 500;">
      https://michaelotienoouma.vercel.app
    </a>
  </p>

  <p style="color: #cbd5e1; margin-top: 24px; margin-bottom: 8px;">
    Best regards,<br/>
    <strong style="color: #f1f5f9;">{{from_name}}</strong><br/>
    <span style="color: #64748b; font-size: 13px;">Full-Stack Developer & Founder of Spectre</span>
  </p>
</div>

<footer style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed rgba(56, 189, 248, 0.1); font-size: 11px; color: #64748b; text-align: center;">
  <p>This is an automated acknowledgment. Please do not reply to this email.</p>
  <p style="margin-top: 8px;">
    <a href="https://michaelotienoouma.vercel.app" style="color: #38bdf8; text-decoration: none;">Portfolio</a> | 
    <a href="https://michaelotienoouma.vercel.app/projects.html" style="color: #38bdf8; text-decoration: none;">Projects</a> | 
    <a href="https://michaelotienoouma.vercel.app/contact.html" style="color: #38bdf8; text-decoration: none;">Contact</a>
  </p>
</footer>
```

# Template 2: New Message Notification (Sent to YOU - Admin)

**EmailJS Template Configuration:**
- Goes to: Your email address (michael@spectre.dev)
- Template ID: `template_6dyuk08v` (templateId)
- Subject: New inquiry from {{from_name}} - {{project_type}}

**Required Variables in EmailJS Template:**
```
{{from_name}}
{{from_email}}
{{reply_to}}
{{company}}
{{project_type}}
{{budget}}
{{message}}
```

**HTML Content:**

```html
<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #cbd5e1; background-color: #0f172a; padding: 20px;">
  <p style="color: #f1f5f9; margin-bottom: 16px;">
    <strong>🔔 New Message Received</strong>
  </p>

  <p style="line-height: 1.6; margin-bottom: 16px;">
    You have received a new inquiry for <strong style="color: #38bdf8;">{{project_type}}</strong> from the portfolio contact form.
  </p>

  <div style="margin: 24px 0; padding: 20px; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.12); border-radius: 8px;">
    <p style="color: #38bdf8; font-weight: 600; margin-bottom: 12px;">
      📋 Contact Details
    </p>
    <ul style="margin: 0; padding-left: 20px; color: #cbd5e1;">
      <li style="margin-bottom: 8px;"><strong>Name:</strong> {{from_name}}</li>
      <li style="margin-bottom: 8px;"><strong>Email:</strong> <a href="mailto:{{from_email}}" style="color: #38bdf8; text-decoration: none;">{{from_email}}</a></li>
      <li style="margin-bottom: 8px;"><strong>Company:</strong> {{company}}</li>
      <li style="margin-bottom: 8px;"><strong>Budget:</strong> {{budget}}</li>
    </ul>
  </div>

  <div style="margin-top: 20px; padding: 20px; background: rgba(26, 41, 66, 0.4); border: 1px solid rgba(56, 189, 248, 0.12); border-radius: 8px;">
    <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 12px;">
      <strong style="color: #f1f5f9;">Message:</strong>
    </p>
    <p style="font-size: 13px; color: #cbd5e1; line-height: 1.6; padding: 12px; background: rgba(15, 23, 42, 0.5); border-left: 3px solid #38bdf8; border-radius: 4px;">
      {{message}}
    </p>
  </div>

  <p style="color: #cbd5e1; margin-top: 24px; margin-bottom: 8px;">
    You can reply directly to this email to respond to {{from_name}}.
  </p>
</div>
```