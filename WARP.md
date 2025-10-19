# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Plataforma Sur Website** - A Next.js 14 corporate website for a Latin American export company that connects the region with global markets. The site focuses on export services, logistics, and international trade solutions.

**Tech Stack:**
- Next.js 14 with App Router
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form for forms
- Lucide React for icons

## Development Commands

### Essential Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint for code quality
npm run lint
```

### Development Workflow
```bash
# Install dependencies
npm install

# Development with hot reload on port 3000
npm run dev

# Test production build locally
npm run build && npm start
```

## Architecture Overview

### App Structure (App Router)
- **App Directory**: Uses Next.js 13+ App Router pattern in `src/app/`
- **Page Structure**: Each route has its own folder with `page.tsx`
  - `/` - Homepage with hero, company overview, and CTA sections
  - `/historia` - Company history and background
  - `/servicios` - Export services and logistics offerings
  - `/productos` - Product catalog and offerings
  - `/valores` - Company values and sustainability
  - `/contacto` - Contact form and information

### Component Architecture
- **Layout System**: Root layout (`layout.tsx`) with Header/Footer wrapper
- **Shared Components**: Located in `src/components/`
  - `Header.tsx` - Navigation with mobile responsive menu and scroll effects
  - `Footer.tsx` - Site footer with company information
- **Page-Level Components**: Each page is a self-contained component with its own animations and sections

### Styling System
- **Tailwind CSS**: Primary styling framework with custom configuration
- **Custom Design System**: Brand colors and typography defined in `tailwind.config.ts`
  - `midnight-green`: #04444D (primary brand color)
  - `emerald`: #04BA70 (accent/call-to-action color)
- **Font System**: Google Fonts Outfit with weight variations
  - `font-outfit-regular`: 400
  - `font-outfit-semibold`: 600  
  - `font-outfit-bold`: 700
- **Utility Classes**: Custom CSS utilities in `globals.css`
  - `.btn-primary` / `.btn-secondary`: Button styles
  - `.hero-gradient`: Brand gradient background
  - `.section-padding`: Consistent section spacing
  - `.container-custom`: Max-width container (7xl)
  - `.card-hover`: Hover effects for cards

### Animation System
- **Framer Motion**: Used throughout for page transitions and scroll animations
- **Animation Patterns**:
  - Fade in from bottom (`y: 30` → `y: 0`)
  - Stagger animations for lists and grids
  - Hover effects with scale transforms
  - Floating animations for decorative elements
  - Scroll-triggered animations with `whileInView`

## Key Development Patterns

### Page Component Structure
All page components follow this pattern:
1. Client component with `'use client'`
2. Multiple sections with `section-padding` class
3. Framer Motion animations with staggered reveals
4. Consistent responsive grid layouts
5. Brand color gradients and styling

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Header adapts with mobile hamburger menu
- Grid layouts collapse appropriately on mobile
- Typography scales with responsive classes (`text-4xl md:text-6xl`)

### TypeScript Configuration
- Strict TypeScript configuration enabled
- Path aliasing: `@/*` maps to `./src/*`
- Next.js plugin integration for optimal bundling

## Brand & Design Guidelines

### Color Scheme
- **Primary**: Midnight Green (#04444D) for headings and main text
- **Accent**: Emerald (#04BA70) for CTAs and highlights  
- **Gradients**: Used extensively for hero sections and cards
- **Text**: White on dark backgrounds, gray-700 for body text

### Typography Hierarchy
- **Headlines**: `font-outfit-bold` with large responsive sizes
- **Subheadings**: `font-outfit-semibold` 
- **Body**: `font-outfit-regular` with relaxed line height
- **Consistent spacing**: Use Tailwind spacing scale

### Animation Principles
- Subtle entrance animations (0.6-0.8s duration)
- Staggered reveals for grouped content (0.1s delays)
- Hover effects with slight scale increases (1.05)
- Floating animations for decorative elements (6s infinite)

## Development Notes

### Form Handling
- React Hook Form is available for complex forms
- Contact page likely implements form validation and submission

### Icons & Assets  
- Lucide React provides all icons with consistent sizing
- Icons used: ArrowRight, Globe, TrendingUp, Shield, Users, Truck, CheckCircle, etc.

### Next.js Features Used
- App Router with nested layouts
- Metadata API for SEO in layout.tsx
- Google Fonts optimization with `next/font`
- Image optimization (if images are added)

### Performance Considerations
- Framer Motion animations are optimized for 60fps
- Components use `whileInView` to prevent unnecessary animations
- `viewport={{ once: true }}` prevents re-animation on re-scroll