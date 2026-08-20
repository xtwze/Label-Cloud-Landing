---
name: LabelCloud
description: A restrained editorial operating surface for independent music labels.
colors:
  vinyl-black: "#111110"
  raised-black: "#191918"
  warm-paper: "#f0efe9"
  quiet-grey: "#aaa9a2"
  hairline: "rgb(240 239 233 / 15%)"
  signal-lilac: "#a997ff"
  error-coral: "#ff8d8d"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(3.4rem, 7vw, 6rem)"
    fontWeight: 590
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)"
    fontWeight: 570
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.07em"
rounded:
  control: "10px"
  surface: "14px"
spacing:
  compact: "12px"
  base: "16px"
  roomy: "24px"
  section-edge: "48px"
components:
  button-primary:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.vinyl-black}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "50px"
  button-quiet:
    backgroundColor: "rgb(17 17 16 / 28%)"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "50px"
  field:
    backgroundColor: "{colors.vinyl-black}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.control}"
    padding: "14px 15px"
---

# Design System: LabelCloud

## Overview

**Creative North Star: "The Quiet Record Room"**

LabelCloud feels like a precisely lit record archive after hours: dark, calm and tactile, with information taking precedence over decoration. The macro vinyl image supplies the music context, while the interface itself remains editorial and operational.

The product deliberately rejects chrome, robotic geometry and dense sci-fi dashboards. A single photorealistic vinyl record persists through the page and rotates with scroll progress, connecting the product story without adding decorative UI noise. Reduced-motion preferences fall back to the static hero photograph.

**Key Characteristics:**

- Near-black tonal surfaces with warm off-white type.
- Oversized, tightly tracked headings and quiet supporting copy.
- One rare lilac signal for focus, icons and selected details.
- Real music identity assets instead of invented dashboard mockups.
- One continuous vinyl object whose rotation and restrained movement mirror progress through the label workflow.

## Colors

The palette uses the tonal range of black vinyl and warm printed paper; lilac is a scarce functional signal.

### Primary

- **Signal Lilac:** reserved for focus, capability icons and the free-migration figure.

### Neutral

- **Vinyl Black:** the continuous page ground.
- **Raised Black:** form and card surfaces that need separation.
- **Warm Paper:** primary text and decisive actions.
- **Quiet Grey:** explanatory copy and low-priority labels.
- **Hairline:** section boundaries without boxed-in layouts.

### Named Rules

**The One Signal Rule.** Lilac marks interaction or a single meaningful fact; it never becomes a decorative wash.

## Typography

**Display Font:** Manrope (with sans-serif fallback)

**Body Font:** Manrope (with sans-serif fallback)

**Label/Mono Font:** IBM Plex Mono (with monospace fallback)

**Character:** Manrope gives the product a direct contemporary voice. IBM Plex Mono appears only in small operational notes where a technical register is useful.

### Hierarchy

- **Display:** medium weight, fluid oversized scale and compact leading; hero statements only.
- **Headline:** medium weight and tightly tracked; major section claims.
- **Title:** semibold around 1.4rem; capability and form-success titles.
- **Body:** regular weight with open leading; keep explanatory lines near 65–75 characters.
- **Label:** compact mono with light tracking; short metadata, never paragraphs.

### Named Rules

**The Statement First Rule.** Lead a section with one clear sentence; supporting copy stays smaller and quieter.

## Layout

Content lives inside a fluid 1320px maximum shell with 24px desktop side insets, tightening to 16px on mobile. Sections use generous vertical breathing room, asymmetric two-column editorial compositions and a 12-column capability grid. Below 900px, complex layouts collapse to one column; below 640px, actions and fields become full-width and navigation is reduced to brand plus primary action.

## Elevation & Depth

The core interface is flat. Depth comes from tonal layering, hairline separators, imagery and sticky scroll composition rather than routine shadows. The cookie notice is the only floating utility and may use an ambient shadow.

### Named Rules

**The Flat Archive Rule.** Product content stays on the page plane; shadow is reserved for genuinely floating utilities.

**The Spinning Record Rule.** The vinyl is the only continuous scroll-driven object. It stays behind copy, animates only with transforms and opacity, and never competes with controls.

**The Shared Center Rule.** The approved LabelCloud wordmark is a separate transparent asset used in the header and on the record label. Inside the record it inherits the disc rotation and the stage scale, so the two layers never drift apart.

## Shapes

Controls use gently rounded 10px corners. Larger surfaces use a restrained 14px radius. Section composition is mostly borderless; thin translucent rules separate major zones. Avoid capsules, ornamental frames and futuristic cut-corner geometry.

## Components

### Buttons

- **Shape:** compact rounded rectangle with a 50px minimum height.
- **Primary:** warm paper on vinyl black; inverted inside light sections.
- **Hover / Focus:** subtle tonal shift, lilac two-pixel focus outline, one-pixel active press.
- **Quiet:** translucent black with a low-contrast paper border.

### Cards / Containers

- **Corner Style:** gently rounded surface corners.
- **Background:** alternate between the two raised-black tones to establish rhythm.
- **Shadow Strategy:** none at rest.
- **Border:** omitted unless the surface is an input or a section boundary.
- **Internal Padding:** 24–34px depending on density.

### Inputs / Fields

- **Style:** vinyl-black fill, quiet hairline stroke and control radius.
- **Focus:** border changes to signal lilac; the fill rises one tone.
- **Error / Disabled:** coral copy for errors; submitting controls reduce opacity.

### Navigation

The desktop header is transparent over the hero, separated by one hairline. Links are small and quiet; the main action is underlined. Mobile removes secondary navigation instead of introducing a menu for three anchors.

## Do's and Don'ts

### Do:

- **Do** let one macro music image carry the visual atmosphere.
- **Do** keep copy factual, short and visibly hierarchical.
- **Do** use transforms and opacity for motion and honor reduced-motion preferences.
- **Do** preserve warm paper type against near-black surfaces.

### Don't:

- **Don't** add chrome, robots, neon circuitry or transformer-like 3D objects.
- **Don't** turn each section into a bordered card.
- **Don't** add multiple accent colors or decorative gradients.
- **Don't** fabricate client metrics, admin screenshots or product outcomes.
