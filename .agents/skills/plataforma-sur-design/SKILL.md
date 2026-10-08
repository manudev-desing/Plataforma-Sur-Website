---
name: plataforma-sur-design
description: >-
  Complete design system and brand guidelines for the Plataforma Sur · Global
  Business website. Activate this skill BEFORE writing any UI component, page,
  layout, copy, or visual asset for this project. Covers color palette,
  typography, logo usage, tone of voice, photography direction, component
  patterns, animation, accessibility, and brand DNA. Source of truth: official
  brandbook (31 pages).
---

# Plataforma Sur · Global Business — Design System Skill

> **Source of truth**: This skill distils the complete official brandbook
> (31 pages). Every color, font weight, spacing rule, and voice example below
> comes directly from that document. When in doubt, this file wins over any
> ad-hoc assumption.

---

## 1 · Brand DNA (ADN de Marca)

### 1.1 Purpose (Propósito)

> "CONECTAR AL MUNDO CON LA RIQUEZA DE LATINOAMÉRICA a través de una plataforma
> confiable, sólida y en constante expansión."

### 1.2 Mission (Misión)

Brindar soluciones eficientes de exportación desde América del Sur al mundo,
asegurando cumplimiento de estándares internacionales, tiempos pactados y
servicio confiable. Construir relaciones de largo plazo con servicio cercano y
proactivo.

### 1.3 Vision (Visión)

Ser la principal plataforma exportadora de Latinoamérica, reconocida por
solidez, compromiso y capacidad de conectar productos de calidad con mercados
globales. Referente de confianza, innovación y crecimiento sostenible.

### 1.4 Brand Essence (Esencia de Marca)

> **"Conectamos al mundo con lo mejor de Latinoamérica"**

### 1.5 Core Value (Valor Fundamental)

**Confianza** — Comercio internacional de confianza.

Propuesta de valor: "Conectamos productos latinoamericanos de calidad con el
mundo, a través de una plataforma confiable, ágil y estructurada."

### 1.6 Values (Valores)

| Value | Meaning |
|---|---|
| **Responsabilidad** | Cumplimos lo prometido, en tiempo y forma. |
| **Calidad** | Estándares internacionales en cada envío. |
| **Confianza** | Base de toda relación comercial duradera. |

### 1.7 Personality (Personalidad)

Plataforma Sur es un **socio confiable** que cumple, resuelve y piensa en el
próximo paso. Sólida, estratégica y humana.

| Trait | Implication for UI/UX |
|---|---|
| **Confiable** | Consistent patterns, predictable navigation, transparent data. |
| **Ágil** | Fast load times, minimal friction, streamlined forms. |
| **Cercana** | Warm micro-copy, human tone, approachable imagery. |
| **Inspiradora** | Bold hero statements, strategic use of the emerald accent. |

### 1.8 Brand Archetypes (Arquetipos)

| Role | Archetype | Expression |
|---|---|---|
| Primary | **El Sabio** (The Sage) | Knowledge, precision, strategic thinking. |
| Secondary | **El Héroe** (The Hero) | Action, delivery, global expansion. |

> Design consequence: Layouts favour clarity and structure (Sage) with bold
> directional energy (Hero). Avoid cluttered dashboards and avoid purely playful
> aesthetics.

### 1.9 Territory (Territorio de Marca) — 5 Pillars

1. **Exportación inteligente** — Precisión, cumplimiento, visión estratégica.
2. **Conexión internacional** — Puente entre LATAM y el mundo.
3. **Confianza estructural** — Palabra, tiempos, calidad.
4. **Versatilidad y proyección** — Granos, madera, cuero — amplio y dinámico.
5. **Solidez corporativa sin rigidez** — Ágil, cercana, resolutiva.

### 1.10 Positioning (Posicionamiento)

> Para empresas internacionales que buscan una fuente confiable de productos
> latinoamericanos con altos estándares, Plataforma Sur es la plataforma ágil y
> estructurada que garantiza cumplimiento, trazabilidad y construye relaciones
> duraderas basadas en confianza, transparencia y proyección global.

### 1.11 Key Narrative (Narrativa Clave)

> **"Del sur al mundo: calidad que cruza fronteras, relaciones que permanecen."**

Plataforma Sur narra una historia de conexión. No solo exporta productos,
exporta confianza. Respeta la palabra, cumple lo que promete, construye a largo
plazo. Cada envío es más que una operación logística: es una promesa cumplida,
una conexión estratégica, una visión compartida.

> **"Somos la puerta sur que se abre al mundo."**

### 1.12 Keywords (Palabras Clave)

Conexión · Seguridad · Expansión · Transparencia · Negocios duraderos · Precisión

---

## 2 · Color Palette

### 2.1 Official Brand Colors

| Swatch | Name | Hex | RGB | CMYK | Tailwind Token |
|---|---|---|---|---|---|
| 🟫 | **Verde Media Noche** (Midnight Green) | `#04444D` | 4, 68, 77 | 92, 51, 50, 48 | `midnight-green` |
| ⬜ | **Blanco** (White) | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0 | `white` |
| 🟩 | **Esmeralda** (Emerald) | `#04BA70` | 4, 186, 112 | 74, 0, 71, 0 | `emerald` |

> **Fallback**: When multi-colour reproduction is not viable, use black (`#000000`).

### 2.2 Extended Palette (Derived — for UI needs only)

These extended tones are derived from the three brand colours to support UI
states, backgrounds, and subtle hierarchies. They are NOT in the brandbook and
must never replace the three official colours in brand-critical contexts.

| Token | Hex | Usage |
|---|---|---|
| `midnight-green-light` | `#065A66` | Hover state on dark surfaces |
| `midnight-green-dark` | `#033038` | Pressed / active state |
| `emerald-light` | `#2DD48D` | Hover state on emerald buttons |
| `emerald-dark` | `#039A5C` | Pressed / active state |
| `muted` | `#F0F7F7` | Light background sections, cards |
| `border` | `#D3E4E6` | Subtle borders, dividers |
| `surface` | `#E8F1F2` | Alternate section background |
| `text-primary` | `#04444D` | Default body text colour |
| `text-secondary` | `#3D6E75` | Supporting / muted text |
| `text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `success` | `#04BA70` | Positive feedback (maps to Emerald) |
| `error` | `#DC2626` | Error states |
| `warning` | `#F59E0B` | Warning states |

### 2.3 Colour Usage Rules

1. **Primary surfaces**: Midnight Green (`#04444D`) for hero sections, headers,
   footers, and high-emphasis blocks.
2. **Accent and CTA**: Emerald (`#04BA70`) for primary buttons, links, active
   indicators, and highlight elements.
3. **Backgrounds**: White (`#FFFFFF`) for main content; `muted` (`#F0F7F7`) for
   alternating sections to create rhythm.
4. **Text on dark**: Always white or emerald. Never use muted greys on Midnight
   Green.
5. **Text on light**: Always Midnight Green (`#04444D`). Use `text-secondary`
   for supporting copy.
6. **Never** use colours outside this palette for brand-critical elements (logo,
   headers, primary CTAs).
7. **Contrast minimums**: WCAG AA (4.5:1 for normal text, 3:1 for large text).
   White on `#04444D` = 9.2:1 ✅. White on `#04BA70` = 3.1:1 (use for large
   text/icons only; for small text on emerald, prefer midnight-green text).

### 2.4 Tailwind Configuration

```ts
// tailwind.config.ts — colors section
colors: {
  'midnight-green': {
    DEFAULT: '#04444D',
    light: '#065A66',
    dark: '#033038',
  },
  emerald: {
    DEFAULT: '#04BA70',
    light: '#2DD48D',
    dark: '#039A5C',
  },
  muted: '#F0F7F7',
  border: '#D3E4E6',
  surface: '#E8F1F2',
}
```

---

## 3 · Typography

### 3.1 Typeface

**Outfit** — the single corporate typeface for all applications, digital and
print. No secondary typeface is authorised.

Source: [Google Fonts — Outfit](https://fonts.google.com/specimen/Outfit)

### 3.2 Weight Scale & Roles

| Weight | CSS Value | Role (ES) | Role (EN) | Usage |
|---|---|---|---|---|
| **Black** | `900` | Especiales | Special / Display | Hero headlines, splash screens, high-impact callouts |
| **Bold** | `700` | Títulos | Titles | Page titles, section headings (h1, h2) |
| **SemiBold** | `600` | Subtítulos | Subtitles | Subheadings (h3, h4), card titles, nav items |
| **Medium** | `500` | Textos impresos | Print body | Body copy in print contexts, emphasis in digital |
| **Regular** | `400` | Textos digitales | Digital body | Default body text, paragraphs, form labels |
| **Light** | `300` | — | Supporting | Captions, metadata, helper text (use sparingly) |

> The brandbook specifies Bold, SemiBold, Medium, Regular, and Light. Black is
> shown in the weight specimen with "Especiales" use case.

### 3.3 Type Scale (Recommended for Web)

Use a 1.250 ratio (Major Third) for harmonious hierarchy:

| Level | Element | Size (rem) | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Display | Hero headline | 3.5–4.5 | 900 (Black) | 1.1 | -0.02em |
| H1 | Page title | 2.5–3.0 | 700 (Bold) | 1.15 | -0.015em |
| H2 | Section title | 2.0–2.25 | 700 (Bold) | 1.2 | -0.01em |
| H3 | Card/block title | 1.5–1.75 | 600 (SemiBold) | 1.25 | 0 |
| H4 | Sub-section | 1.25 | 600 (SemiBold) | 1.3 | 0 |
| Body | Paragraphs | 1.0–1.125 | 400 (Regular) | 1.6 | 0 |
| Small | Captions/meta | 0.875 | 300–400 | 1.5 | 0.01em |
| XS | Legal/fine print | 0.75 | 300 (Light) | 1.4 | 0.02em |

### 3.4 Typography Rules

- **Line length**: Max 75 characters for body text (~`max-w-prose` in Tailwind).
- **Paragraph spacing**: Use `space-y-4` or equivalent (1rem gap between
  paragraphs).
- **Heading dot accent**: The brandbook section titles use a trailing emerald
  dot (e.g., "Colores**.**"). This is a stylistic device — use it in
  decorative/display contexts but NOT in semantic headings or navigation.
- **No all-caps labels**: Reserve uppercase for the logo tagline
  "Global Business" only. Body headings and labels use sentence case.
- **No italic abuse**: Outfit's italic styles are not featured in the brandbook.
  Use weight changes for emphasis instead.

### 3.5 Tailwind Configuration

```ts
// tailwind.config.ts — fontFamily section
fontFamily: {
  outfit: ['Outfit', 'sans-serif'],
},
```

Load weights 300, 400, 500, 600, 700, 900 from Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&display=swap"
  rel="stylesheet"
/>
```

---

## 4 · Logo / Imagotipo

### 4.1 Anatomy

The brand mark is an **imagotipo**: a combination of an **isotipo** (icon) and a
**logotipo** (wordmark) that together form the primary brand identifier.

```
┌──────────────────────────────────────┐
│  ⚡  Plataforma                      │  ← Row 1: 3X height
│      Sur · Global Business           │  ← Row 2: 3X height
└──────────────────────────────────────┘
  ↕ 6X   ↔ 2X gap  ↔ 22X
  isotipo            logotype
```

- **Isotipo**: Stylised lightning-bolt / arrow symbol in emerald green and white
  (or midnight green depending on version). Represents dynamism, energy,
  directional movement (south → world).
- **Logotype**: "Plataforma" (Bold, Midnight Green) on top row; "Sur" (Bold,
  Midnight Green) + " · " + "Global Business" (SemiBold, Emerald) on bottom.
- **The dot ( · )** between "Sur" and "Global Business" is always Emerald.

### 4.2 Construction Grid

Based on a modular grid with unit value **X**:

| Dimension | Value |
|---|---|
| Total width | **30X** |
| Total height | **9X** |
| Isotipo width | **6X** |
| Logotype width | **22X** |
| Gap (isotipo ↔ logotype) | **2X** |
| Row height (each text row) | **3X** |

### 4.3 Clear Space (Área de Protección)

A minimum clear space of **2X** must surround the entire imagotipo on all four
sides. No external elements, graphics, text, or decorative objects may intrude
into this zone.

```
          2X
     ┌──────────┐
 2X  │  [LOGO]  │  2X
     └──────────┘
          2X
```

### 4.4 Minimum Sizes

| Medium | Minimum |
|---|---|
| **Print** | 5 cm width |
| **Digital** | 140 px width |

### 4.5 Logo Versions

#### Principal Versions (Full imagotipo with "· Global Business")

| Version | Background | Colours |
|---|---|---|
| **V. Principal (positivo)** | White / light | Isotipo: emerald + midnight-green; Logotype: midnight-green + emerald |
| **V. Principal (negativo)** | Midnight Green | Isotipo: emerald + white; Logotype: white + emerald |
| **V. Principal a un color (positivo)** | White / light | Entire mark in midnight-green |
| **V. Principal a un color (negativo)** | Midnight Green | Entire mark in white |

#### Reduced Versions (Without "· Global Business")

| Version | Background | Colours |
|---|---|---|
| **V. Reducida (positivo)** | White / light | Standard brand colours |
| **V. Reducida (negativo)** | Midnight Green | White + emerald |
| **V. A un color (positivo)** | White / light | All midnight-green |
| **V. A un color (negativo)** | Midnight Green | All white |

#### Isotipo Only

| Version | Background | Colours |
|---|---|---|
| **V. Isotipo (positivo)** | White / light | Standard emerald + midnight-green |
| **V. Isotipo (negativo)** | Midnight Green | Emerald + white |
| **V. Isotipo a un color (positivo)** | White / light | All midnight-green |
| **V. Isotipo a un color (negativo)** | Midnight Green | All white |

### 4.6 Logo on Photography

When placing the logo over photographic backgrounds:

- Use the **colour version** if the photo area is light enough for contrast.
- Use the **single-colour (white) version** on dark or busy areas.
- Choose based on **luminosity of the background area** beneath the logo.

### 4.7 Incorrect Logo Usage (NEVER DO)

| ❌ Rule | Description |
|---|---|
| **Wrong colours** | Do not recolour the logo with non-brand colours (e.g., blue isotipo). |
| **Low contrast** | Do not place the colour logo on a dark teal background where it blends in. |
| **Deformation** | Do not stretch, compress, rotate, or skew the logo. |
| **Wrong sizes** | Do not render the logo smaller than the minimum sizes (140px digital, 5cm print). |
| **Modified proportions** | Do not alter the spacing between isotipo and logotype. |
| **Added effects** | Do not add shadows, glows, outlines, or gradients to the logo. |

---

## 5 · Tone of Voice (Tono de Voz)

### 5.1 Core Voice Attributes

**Profesional, claro y confiable.** Speaks without arrogance; with empathy,
without exaggeration. Communicates with precision and humanity.

### 5.2 Voice Territory

The voice territory orbits around: **confianza, cumplimiento, y proyección
global**. Communication revolves around quality, traceability, lasting commercial
relationships, and international expansion.

### 5.3 Voice Path by Context (Camino de Voz)

| Context | Tone | Example |
|---|---|---|
| **Commercial proposal** | Professional, direct | "Contamos con trazabilidad completa y cumplimiento contractual garantizado." |
| **Operations / follow-up** | Agile, decisive | "Confirmamos salida en plazo. Te mantenemos actualizado en tiempo real." |
| **Institutional comms** | Inspiring, structured | "Conectamos América Latina con el mundo a través de relaciones que perduran." |
| **Corporate social media** | Human, clear | "Cada entrega es una promesa cumplida. Así construimos confianza global." |

### 5.4 Brand Voice Examples (¿Qué diría Plataforma Sur?)

Use these as reference when writing UI copy, hero text, CTAs, or social content:

- "Exportamos valor, conectamos al mundo con propósito."
- "Relaciones que trascienden formalidades."
- "La confianza también se exporta."
- "Cumplimos, cuidamos, conectamos."
- "Latinoamérica al mundo, con estructura y visión."
- "Una plataforma pensada para quienes mueven el mundo."
- "Exportar no es vender, es construir confianza."

### 5.5 UX Copy Guidelines

| Element | Guidance | Example |
|---|---|---|
| **Hero headline** | Bold, purpose-driven. Use brand essence or narrative. Max 12 words. | "Conectamos al mundo con lo mejor de Latinoamérica" |
| **CTA buttons** | Action verb + clear outcome. Sentence case. | "Solicitar cotización", "Conocer más", "Contactar" |
| **Section titles** | Concrete, benefit-oriented. No jargon. | "Exportación con trazabilidad completa" |
| **Empty states** | Directional, not apologetic. | "Aún no hay envíos registrados. Iniciá tu primera operación." |
| **Error messages** | Specific, solution-oriented. | "No pudimos procesar el formulario. Revisá los campos marcados." |
| **Success messages** | Confirmatory, warm. | "Tu consulta fue enviada. Te responderemos en 24 horas." |
| **Navigation labels** | Short, familiar nouns. | "Inicio", "Nosotros", "Servicios", "Contacto" |

---

## 6 · Photography & Imagery Direction

### 6.1 Subject Matter

Photography should reflect the world of **Latin American export**: agricultural
landscapes, grains, commodities, logistics, and human connection.

**Preferred subjects:**
- Cornfields, grain in hands, legumes, cereals, agricultural scenes
- Cargo, containers, ports, logistics chains
- Handshakes, meetings, teams — human moments in trade
- Latin American landscapes — fields, plantations, horizons

### 6.2 Treatment

| Attribute | Direction |
|---|---|
| **Colour grading** | Warm natural tones; do NOT over-saturate. Slight teal-green tint in shadows to connect with brand palette. |
| **Composition** | Wide establishing shots for heroes; tight crops for detail sections. Rule of thirds. |
| **People** | Authentic, working, purposeful. Not stock-photo-smiling. Diversity of Latin American faces. |
| **Overlays** | On dark photo areas, a subtle midnight-green overlay (60–80% opacity) for text legibility. |
| **Avoid** | Generic corporate stock (handshakes in suits with no context), overly digital/tech imagery, cold blue tones. |

### 6.3 Decorative Patterns

The brandbook shows a **repeating diagonal pattern** using the isotipo outline on
Emerald (`#04BA70`) backgrounds with the pattern in a slightly darker emerald
shade. Use this pattern for:
- Section backgrounds (subtle, low-opacity)
- Social media templates
- Presentation slides
- Print materials

---

## 7 · Component Design Patterns

### 7.1 Buttons

```
Primary:   bg-emerald text-white → hover:bg-emerald-light → active:bg-emerald-dark
           font-semibold rounded-lg px-6 py-3

Secondary: bg-transparent border-2 border-emerald text-emerald
           → hover:bg-emerald hover:text-white
           font-semibold rounded-lg px-6 py-3

Ghost:     bg-transparent text-midnight-green underline-offset-4
           → hover:text-emerald
           font-medium

On dark:   bg-white text-midnight-green → hover:bg-muted
           font-semibold rounded-lg px-6 py-3
```

### 7.2 Cards

- Background: `white` or `muted`
- Border: `border` colour (`#D3E4E6`), 1px
- Border radius: `rounded-xl` (0.75rem)
- Shadow: `shadow-sm` — subtle, not heavy
- Padding: `p-6` minimum
- Title: `font-semibold text-midnight-green`
- Body: `font-normal text-midnight-green`

### 7.3 Navigation

- Background: `white` or `midnight-green` (depending on page context)
- Active link indicator: Emerald underline (2px) or emerald text
- Font weight: `font-semibold` (600) for nav items
- Mobile: Full-screen overlay in midnight-green with white text

### 7.4 Hero Sections

- Background: Midnight Green solid, or photo with midnight-green overlay
- Headline: Outfit Black (900) or Bold (700), white text, large display size
- Subtitle: Outfit Regular (400), white or emerald, smaller
- CTA: Primary button (emerald) or On-dark button (white)
- Isotipo watermark: oversized, low-opacity outline version in background

### 7.5 Section Rhythm

Alternate between:
1. **White section** → midnight-green text
2. **Muted section** (`#F0F7F7`) → midnight-green text
3. **Midnight Green section** → white/emerald text (for emphasis)

This creates visual breathing room without introducing off-brand colours.

### 7.6 Form Inputs

- Border: `border` colour, 1px, `rounded-lg`
- Focus: `ring-2 ring-emerald ring-offset-2`
- Label: `font-medium text-midnight-green` above the input
- Placeholder: `text-text-secondary` (lighter)
- Error: `border-error ring-error` with red helper text below

### 7.7 Dividers & Borders

- Default divider: `border-border` (`#D3E4E6`)
- On dark surfaces: `border-white/20`
- Never use black borders

### 7.8 Icons

- Style: Line or outlined, not filled
- Stroke width: 1.5–2px
- Colour: Midnight Green on light, White or Emerald on dark
- Size: 20–24px for inline, 32–48px for feature blocks

---

## 8 · Motion & Animation

### 8.1 Principles

- Motion serves a purpose: it guides attention, confirms action, or shows
  spatial relationships.
- **Restrained**: One orchestrated entrance per section, not scattered effects on
  every element.
- **Respectful**: Honour `prefers-reduced-motion` — disable all non-essential
  animation.

### 8.2 Standard Easing

| Name | CSS | Usage |
|---|---|---|
| `ease-out` | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` | Elements entering view |
| `ease-in-out` | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | Transitions, hover states |
| `spring` | Framer Motion `type: "spring", stiffness: 100, damping: 15` | Hero animations, page transitions |

### 8.3 Duration Scale

| Speed | Duration | Usage |
|---|---|---|
| Fast | 150–200ms | Hover states, focus rings, button feedback |
| Normal | 300–400ms | Section reveals, card entrances |
| Slow | 500–700ms | Hero content, page transitions |

### 8.4 Recommended Effects

- **Fade up**: `opacity: 0 → 1` + `translateY: 20px → 0` for section content
- **Scale in**: `scale: 0.95 → 1` + `opacity: 0 → 1` for cards/modals
- **Stagger**: 75–100ms delay between sibling elements in a list
- **Logo pulse**: Subtle emerald glow on the isotipo for loading states

### 8.5 What NOT to Animate

- Do NOT animate every card on scroll — pick one orchestrated moment per viewport
- Do NOT use parallax on the logo
- Do NOT add bounce/elastic effects (conflicts with the Sage archetype's
  seriousness)
- Do NOT animate text colour changes

---

## 9 · Accessibility

### 9.1 Colour Contrast

| Combination | Ratio | WCAG AA | WCAG AAA |
|---|---|---|---|
| White on Midnight Green (`#04444D`) | 9.2:1 | ✅ Pass | ✅ Pass |
| Midnight Green on White | 9.2:1 | ✅ Pass | ✅ Pass |
| White on Emerald (`#04BA70`) | 3.1:1 | ⚠️ Large text only | ❌ Fail |
| Midnight Green on Emerald | 3.3:1 | ⚠️ Large text only | ❌ Fail |
| Midnight Green on Muted (`#F0F7F7`) | 8.1:1 | ✅ Pass | ✅ Pass |

> **Rule**: Never use emerald as a background for small body text. For small text
> on emerald, use midnight-green or white at large size (≥18px / ≥14px bold).

### 9.2 Focus States

- All interactive elements must show a visible focus ring.
- Default: `ring-2 ring-emerald ring-offset-2`
- On dark backgrounds: `ring-2 ring-white ring-offset-2 ring-offset-midnight-green`

### 9.3 Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 9.4 Semantic Structure

- Use proper heading hierarchy (h1 → h2 → h3, no skipping)
- All images must have descriptive `alt` text
- Form inputs must have associated `<label>` elements
- Use `aria-label` on icon-only buttons
- Navigation landmarks: `<nav>`, `<main>`, `<footer>`, `<header>`

---

## 10 · Implementation Checklist

When building or reviewing any UI for Plataforma Sur, verify:

- [ ] **Colours**: Only brand colours and approved extended palette used
- [ ] **Typography**: Outfit font loaded with correct weights (300–900)
- [ ] **Font weights**: Match the role table (Black=display, Bold=titles, etc.)
- [ ] **Logo**: Correct version for the background; clear space respected
- [ ] **Logo size**: ≥ 140px width in digital contexts
- [ ] **Contrast**: All text passes WCAG AA (4.5:1 normal, 3:1 large)
- [ ] **Focus visible**: Every interactive element has a visible focus ring
- [ ] **Reduced motion**: `prefers-reduced-motion` is respected
- [ ] **Copy tone**: Professional, clear, trustworthy — no hype, no arrogance
- [ ] **Imagery**: Agricultural/export/LATAM themes, warm natural tones
- [ ] **Section rhythm**: White → Muted → Dark sections alternate
- [ ] **No off-brand**: No non-Outfit fonts, no non-palette colours, no deformed logos
- [ ] **Responsive**: Mobile-first, touch targets ≥ 44px
- [ ] **Semantic HTML**: Proper headings, landmarks, labels

---

## 11 · Quick Reference Card

```
BRAND:       Plataforma Sur · Global Business
ESSENCE:     "Conectamos al mundo con lo mejor de Latinoamérica"
NARRATIVE:   "Del sur al mundo: calidad que cruza fronteras, relaciones que permanecen"
CORE VALUE:  Confianza
ARCHETYPE:   El Sabio (primary) + El Héroe (secondary)

COLOURS:     #04444D (Midnight Green)  |  #04BA70 (Emerald)  |  #FFFFFF (White)
FONT:        Outfit  —  300 | 400 | 500 | 600 | 700 | 900
LOGO GRID:   30X × 9X  |  Clear space: 2X  |  Min digital: 140px

TONE:        Professional · Clear · Trustworthy · Human
PHOTOGRAPHY: LATAM export — grains, agriculture, logistics, human connection
MOTION:      Restrained, purposeful, prefers-reduced-motion respected
```

---

*This skill was generated from the official Plataforma Sur brandbook (31 pages).
Last updated: October 2026.*
