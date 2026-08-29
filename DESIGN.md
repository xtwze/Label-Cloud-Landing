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
- Real music identity assets plus workflow-backed product previews; synthetic demo records are always identified as such.
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

Content lives inside a fluid 1320px maximum shell with 24px desktop side insets, tightening to 16px on mobile. Sections use generous vertical breathing room, asymmetric two-column editorial compositions and a 12-column capability grid. Below 900px, complex layouts collapse to one column; below 640px, actions and fields become full-width and public navigation is reduced to brand plus primary action. The product preview becomes edge-to-edge on mobile: workspace selectors stack, the sidebar becomes a two-column module switcher, and secondary row actions yield to primary content and status.

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

### Lyric Guard

Lyric Guard is a minimal product block, not a separate visual world. A sparse circular shield marker without lettering, short category list and compact demonstration result explain the in-house, local, context-aware text check within the same near-black, warm-paper and lilac system. The copy may state that political statements are one of the checked categories, the system is continuously improved and Lyric Guard is included in the base subscription. Risk levels remain technical signals for human review; the block must retain the disclaimer «Технический индикатор риска, не юридическая экспертиза.»

### Interactive Product Preview

The public page may contain one Operate-style preview inside the Persuade surface. It is a professional product frame adapted to the landing palette, with two explicit modes: «Кабинет лейбла» and «Кабинет артиста». Each mode owns its module navigation and resets to its overview when the mode changes. The label account remains white-label as «Ваш лейбл»; the artist demonstration uses the KONSTANTINOV identity with the simple role «Артист».

The label-only custom-feature navigation control uses the project mascot plus `/images/labelcloud-mascot-knock-sprite.png`, a six-frame transparent sprite sheet. On desktop, hover and keyboard focus reveal the upright vinyl-headed character entirely inside the empty lower part of the sidebar. Frames one and two introduce the character once; frames three through six then loop for as long as hover or focus remains. Its torso turns toward the control and one clear hand reaches up-left for two fingertip contacts per loop; a synchronized GSAP loop briefly depresses and rebounds the actual button at both contacts. Leaving or blurring the control stops both loops and resets the button. The opened custom-feature screen keeps the mascot in the free left visual column and the offer copy in the right column. Reduced-motion users see a still final pose, and the hover stage is hidden on mobile where hover is unavailable.

The label overview may combine compact demo statistics with two deliberately different chart semantics: period-switchable activity values and a cumulative total that never resets between periods. Artist overview actions are direct shortcuts into a new release, the current draft and the label chat; they do not duplicate passive summary cards.

New release starts with an explicit choice between a single and an album / EP. The single keeps one five-stage path—WAV, track metadata, release metadata, promo and lyrics—ending in a moderation result. The album separates general release data from its tracklist. Track order uses Pointer Events on a dedicated handle and GSAP Flip for live spatial preview; the handle suppresses native touch gestures while held (`touch-action: none`). Separate move arrows stay visually hidden, while Arrow Up / Arrow Down on the focused handle, descriptive labels and a polite live announcement preserve keyboard and screen-reader access. Required audio and cover selections gate continuation.

Sample people, releases, balances and report files are synthetic and must carry a visible demo-data label. Simulated file selectors change local demo state only and explicitly say when nothing is uploaded. The royalty-report interaction preserves three legible states—idle selection, disabled processing and ready confirmation—without implying that a real file was uploaded or a customer result was produced. One clearly labeled demo chat is shared by the label and artist workspaces: perspective determines incoming and outgoing bubbles, messages update local demo state, and unread badges clear on opening and increment for the opposite workspace. This pattern demonstrates interaction only and must not imply WebSocket, persistence or backend delivery.

## Do's and Don'ts

### Do:

- **Do** let one macro music image carry the visual atmosphere.
- **Do** keep copy factual, short and visibly hierarchical.
- **Do** use transforms and opacity for motion and honor reduced-motion preferences.
- **Do** preserve warm paper type against near-black surfaces.
- **Do** keep the product preview task-oriented: mode, module, content and status should remain clear at every viewport.
- **Do** pair pointer-driven spatial reordering with a focusable handle, keyboard arrow commands and live position announcements.

### Don't:

- **Don't** add chrome, robots, neon circuitry or transformer-like 3D objects.
- **Don't** turn each section into a bordered card.
- **Don't** add multiple accent colors or decorative gradients.
- **Don't** present synthetic preview records, balances or processing results as customer data or production outcomes.
- **Don't** treat framework development indicators as product UI; the Next.js development indicator is disabled.
