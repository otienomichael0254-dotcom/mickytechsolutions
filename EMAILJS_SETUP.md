# EmailJS Setup Guide

## Current Configuration
- **Service ID**: `service_35gqr5w`
- **Public Key**: `5s8BwvdPKSrj6jufp`
- **Template ID (Notification)**: `template_6dyuk08v` ❌ NOT FOUND
- **Template ID (Auto-Reply)**: `template_b6fhvwu` ❌ NOT FOUND

## Error: Template IDs Not Found

The template IDs in your config don't exist in your EmailJS account. You need to either:

### Option A: Update Config with Your Actual Template IDs (Recommended)

1. Go to https://dashboard.emailjs.com/admin/templates
2. Note down your actual template IDs
3. Update `emailjs.config.js`:

```javascript
const EMAILJS_CONFIG = {
  publicKey: '5s8BwvdPKSrj6jufp',
  serviceId: 'service_35gqr5w',
  templateId: 'YOUR_ACTUAL_NOTIFICATION_TEMPLATE_ID',          // Replace this
  autoReplyTemplateId: 'YOUR_ACTUAL_AUTO_REPLY_TEMPLATE_ID',   // Replace this
};
```

### Option B: Create New Templates in EmailJS

If you don't have templates yet, create them:

#### Template 1: Auto-Reply to Visitor
- **Name**: Auto-Reply to Visitor
- **Subject**: Thank you for contacting us, {{to_name}}!
- **Recipient**: {{to_email}}
- **Content**: Use HTML from `email-templates.md` → Template 1

#### Template 2: Notification to You
- **Name**: New Contact Form Submission
- **Subject**: New inquiry from {{from_name}} - {{project_type}}
- **Recipient**: michael@spectre.dev (or your email)
- **Content**: Use HTML from `email-templates.md` → Template 2

### Template Variables Checklist

**Template 1 (Auto-Reply) must include:**
- `{{to_name}}` - Visitor's first name
- `{{to_email}}` - Visitor's email
- `{{from_name}}` - Your name (Michael Otieno Ouma)
- `{{from_name_full}}` - Visitor's full name
- `{{project_type}}` - Project type
- `{{budget}}` - Budget amount
- `{{company}}` - Company name
- `{{message}}` - The message content

**Template 2 (Notification) must include:**
- `{{from_name}}` - Visitor's full name
- `{{from_email}}` - Visitor's email
- `{{project_type}}` - Project type
- `{{budget}}` - Budget amount
- `{{company}}` - Company name
- `{{message}}` - The message content

## How to Update emailjs.config.js

After creating templates in EmailJS and getting their IDs:

```javascript
const EMAILJS_CONFIG = {
  publicKey: '5s8BwvdPKSrj6jufp',
  serviceId: 'service_35gqr5w',
  templateId: 'template_XXXXX',       // Copy from EmailJS dashboard
  autoReplyTemplateId: 'template_YYYYY',  // Copy from EmailJS dashboard
};
```

## Troubleshooting

- **400 Error**: Template ID doesn't exist
- **422 Error**: Template variables don't match what contact.html is sending
- **Check**: Make sure variable names in templates exactly match the list above

## Next Steps

1. Log into EmailJS dashboard
2. Go to Templates section
3. Create or verify your templates
4. Copy the template IDs
5. Update `emailjs.config.js`
6. Test the form
