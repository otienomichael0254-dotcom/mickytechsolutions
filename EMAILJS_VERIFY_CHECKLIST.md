# EmailJS Template Verification Checklist

## Current Configuration
- Service ID: `service_35gqr5w`
- Public Key: `5s8BwvdPKSrj6jufp`
- Notification Template ID: `template_6dyuk08v`
- Auto-Reply Template ID: `template_b6fhvwu`

---

## ✅ TEMPLATE 1: `template_6dyuk08v` (Notification to YOU)

**Where it goes:** michael@spectre.dev

**MUST include these variables in the template:**
- `{{from_name}}` ← Visitor's full name
- `{{from_email}}` ← Visitor's email
- `{{reply_to}}` ← Reply email
- `{{company}}` ← Company name
- `{{project_type}}` ← Project type
- `{{budget}}` ← Budget
- `{{message}}` ← Message content

**Do NOT include:**
- `{{to_name}}`
- `{{to_email}}`
- `{{from_name_full}}`

---

## ✅ TEMPLATE 2: `template_b6fhvwu` (Auto-Reply to VISITOR)

**Where it goes:** {{to_email}} (visitor's email)

**MUST include these variables in the template:**
- `{{to_name}}` ← Visitor's first name
- `{{to_email}}` ← Visitor's email
- `{{from_name}}` ← Will be "Michael Otieno Ouma"
- `{{from_name_full}}` ← Visitor's full name
- `{{company}}` ← Company name
- `{{project_type}}` ← Project type
- `{{budget}}` ← Budget
- `{{message}}` ← Message content
- `{{reply_to}}` ← Will be "michael@spectre.dev"

**Do NOT include:**
- `{{from_email}}`

---

## How to Verify in EmailJS Dashboard

1. Go to https://dashboard.emailjs.com/admin/templates
2. Click on `template_6dyuk08v` (Notification template)
   - Check subject line includes `{{from_name}}` and `{{project_type}}`
   - Check HTML body includes all required variables
   - Verify "Send to" is set to your email or uses `{{to_email}}`

3. Click on `template_b6fhvwu` (Auto-reply template)
   - Check subject line includes `{{to_name}}`
   - Check HTML body includes all required variables  
   - Verify "Send to" is set to `{{to_email}}`

---

## Common Issues

### 400 Error: Template ID not found
- Template ID doesn't exist in your account
- Check spelling of template ID in both places

### 422 Error: Unprocessable Content
- Template is missing required variables
- Variable names don't match (case-sensitive!)
- Template "Send to" field is not configured correctly

### What to Check
1. ✓ Template IDs exist in your account
2. ✓ All variables listed above are in the template
3. ✓ Variable names match EXACTLY (including capitalization)
4. ✓ "Send to" field is properly configured in each template
5. ✓ Service ID matches in emailjs.config.js

---

## Quick Fix

If emails aren't sending:
1. Delete and recreate both templates
2. Copy variable names EXACTLY from this checklist
3. Use the HTML from email-templates.md
4. Set "Send to" field correctly (email address for notification, `{{to_email}}` for auto-reply)
