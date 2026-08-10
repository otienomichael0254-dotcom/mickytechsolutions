# Portfolio Project

## Overview

This is a modern, responsive portfolio website for **Michael Otieno Ouma** — a Full-Stack Developer and Founder of Spectre. The site showcases professional work, projects, and provides multiple ways to get in touch.

**Live Website:** https://michaelotienoouma.vercel.app

## Project Structure

```
Portfolio/
├── index.html          # Main portfolio/home page
├── contact.html        # Contact page with communication options
├── projects.html       # Projects showcase page
├── example.html        # Example/template page
├── kerry.md           # (Currently empty)
└── readme.md          # This documentation file
```

## Key Features

### 1. **Responsive Design**
   - Mobile-first approach with viewport meta tags
   - Flexible layouts that adapt to all screen sizes
   - Touch-friendly navigation and interactions

### 2. **Dark/Light Theme Support**
   - CSS custom properties (variables) for easy theme switching
   - `light-theme` class for toggled light mode
   - Smooth transitions between themes (0.3-0.4s ease)
   - Theme toggle button in header navigation

### 3. **Modern UI Components**
   - Glassmorphism effects using `backdrop-filter: blur()`
   - Gradient backgrounds for visual depth
   - Smooth scrolling throughout the site
   - Color-coded accents and hover states

### 4. **Accessibility & Performance**
   - Proper semantic HTML structure
   - Font preloading from Google Fonts (Inter typeface)
   - Fixed header for easy navigation
   - Z-index layering system for proper element stacking

## File Descriptions

### index.html
- **Purpose**: Main landing page and portfolio overview
- **Key Sections**: Header, hero section, navigation
- **Features**: 
  - Professional branding with logo
  - Theme toggle functionality
  - Navigation links to other pages
  - Gradient background styling

### contact.html
- **Purpose**: Contact form and communication options
- **Key Sections**: Contact form, header navigation
- **Features**:
  - Contact form with validation states
  - Input fields with custom styling
  - Success/error messaging (CSS variables: `--success`, `--error`)
  - Enhanced blur effects for premium feel
  - Input background styling specific to this page

### projects.html
- **Purpose**: Showcase of completed work and portfolio items
- **Key Sections**: Projects gallery/listing
- **Features**:
  - Color-coded project cards (purple `--purple: #a78bfa`, orange `--orange: #fb923c`)
  - Project filtering or sorting capabilities
  - Responsive grid layout for project display

### example.html
- **Purpose**: Template/example page
- **Status**: Available for additional content or testing

## Design System

### Color Palette

**Dark Theme (Default)**
- Primary Background: `#0f172a`
- Secondary Background: `#1a2942`
- Text Primary: `#f1f5f9`
- Text Secondary: `#cbd5e1`
- Accent: `#38bdf8` (light cyan)
- Accent Dark: `#0ea5e9` (darker blue)

**Light Theme**
- Primary Background: `#f0f6ff`
- Secondary Background: `#e2eeff`
- Text Primary: `#0f172a`
- Text Secondary: `#334155`
- Accent: `#0ea5e9`

### CSS Architecture

All styles use CSS custom properties (variables) defined in `:root` for:
- Easy maintenance and theme switching
- Consistent spacing and colors across all pages
- Quick updates to the entire design system

### Key CSS Variables
```css
--bg-primary       /* Main background */
--bg-secondary     /* Secondary background */
--bg-tertiary      /* Tertiary background (semi-transparent) */
--bg-card          /* Card backgrounds */
--text-primary     /* Primary text color */
--text-secondary   /* Secondary text color */
--accent           /* Primary accent color */
--accent-dark      /* Darker accent variant */
--border-color     /* Border styling */
--success          /* Success state color */
--error            /* Error state color */
```

## Navigation Structure

All pages feature a consistent fixed header with:
- Logo/branding on the left
- Navigation menu (Home, Projects, Contact, etc.)
- Theme toggle button on the right
- Backdrop blur effect for visual layering

## Typography

- **Font Family**: Inter (from Google Fonts) with system font fallbacks
- **Font Weights**: 300, 400, 500, 600, 700, 800
- **Fallback Fonts**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS custom properties (CSS variables)
- Backdrop-filter support for blur effects
- Responsive viewport support

## Development Notes

- **Header Z-index**: 1000 (ensures it stays on top)
- **Scroll Behavior**: Smooth scrolling enabled globally
- **Transitions**: 0.3-0.4s ease used consistently across hover states
- **Box Model**: Border-box sizing applied globally

## Future Enhancements

- Populate `kerry.md` with additional content
- Expand project descriptions and case studies
- Add portfolio filtering capabilities
- Implement form submission backend
- Add analytics and tracking
- SEO optimization

## Contact Information

This portfolio is designed to facilitate connections for:
- Freelance opportunities
- Collaborations
- Full-time employment inquiries
- General professional inquiries

---

**Last Updated**: 2026-06-11
