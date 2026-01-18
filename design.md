# Rutansh Design Specification

## 1. Design Philosophy: "Archival Modernism"

**Rutansh** is designed as a counter-thesis to the modern, high-velocity web. It does not scream for attention; it waits for it. The aesthetic direction is **"Archival Modernism"**—a blend of heritage publishing (old books, manifestos, museums) with stark, modern technical systems (code, data structures).

### Core Values
*   **Slowness:** Interactions are deliberate. Animations are slow. Reading is the primary action.
*   **Tactility:** The screen should feel like paper, not plastic. Texture is essential.
*   **Permanence:** The UI suggests longevity. Use of borders, serif fonts, and archival metadata (IDs, dates) reinforces this.
*   **Systemic:** Visuals balance organic thought (Serif) with mechanical structure (Monospace).

---

## 2. Global Aesthetics

### Color Palette
The palette is earthy and high-contrast, avoiding "tech" blues or neons.

| Token | Color | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Paper** | ![#Fdfcf8](https://via.placeholder.com/15/Fdfcf8/000000?text=+) `Warm White` | `#Fdfcf8` | Main background. mimics untreated paper. |
| **Charcoal** | ![#1A1A1A](https://via.placeholder.com/15/1A1A1A/000000?text=+) `Deep Black` | `#1A1A1A` | Primary text, borders, high contrast elements. |
| **Terracotta** | ![#9A3B26](https://via.placeholder.com/15/9A3B26/000000?text=+) `Burnt Clay` | `#9A3B26` | The only accent color. Used for links, highlights, and active states. Represents earth/Bharat. |
| **Muted** | ![#E5E2D9](https://via.placeholder.com/15/E5E2D9/000000?text=+) `Stone Gray` | `#E5E2D9` | Dividers, inactive borders. |
| **Dark Bg** | ![#0f0f0f](https://via.placeholder.com/15/0f0f0f/000000?text=+) `Void Black` | `#0f0f0f` | Dark mode background. Not pure black, but deep charcoal. |

### Typography
The type hierarchy creates the "Heritage vs. System" tension.

1.  **Headings:** *Playfair Display* (Serif). High contrast, editorial, classic. Used for Titles and Drop Caps.
2.  **Body:** *Lora* (Serif). Optimized for screen reading. High x-height, comfortable.
3.  **Metadata:** *JetBrains Mono* (Monospace). Technical, robotic. Used for tags, dates, IDs, and captions.
4.  **UI:** *Inter* (Sans-serif). Invisible, functional. Used for navigation and buttons.

### Texture & Atmosphere
*   **Noise Overlay:** A fixed SVG noise filter (`opacity: 0.04`) sits over the entire app. It breaks the digital sterility of flat colors, adding a subconscious "grain" to the experience.
*   **Motion:** Transitions use `ease-soft` (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`). Elements don't "pop" in; they drift or dissolve.

---

## 3. Component Architecture

### A. The Header (Navigation)
*   **Look:** Minimalist. Starts transparent.
*   **Behavior:**
    *   **On Scroll:** Transforms into a `backdrop-blur` glass strip with a distinct bottom border.
    *   **Progress Line:** A subtle terracotta line at the absolute bottom of the header tracks the user's scroll percentage (reading progress).
*   **Interaction:** Links have a specialized hover effect where a bottom border expands from left to right (`w-0` to `w-full`).

### B. Hero Section (Home)
*   **Look:** Large, centered typography. "Vol. 01" badge mimics journal editions.
*   **The "Orbit" Animation:** A background element consisting of three concentric circles (dashed and solid).
    *   They rotate at very slow speeds (60s, 90s, 120s) in opposite directions.
    *   **Meaning:** Represents "Long-term Decisions" and time scales (Yugas).

### C. Article Card
*   **Look:** A grid item enclosed in light gray borders. Brutalist structure.
*   **Metadata:** Displays "ID" (Systemic) and "Category" (Organizational).
*   **Interaction (Hover):**
    *   **Accent:** A Terracotta line slides in at the top.
    *   **Arrow:** The top-right arrow moves up-right (`translate-x-1 -translate-y-1`).
    *   **Typography:** The title color shifts to Terracotta.
    *   **Background:** Subtle shift to pure white (or dark panel) to lift it from the background.

### D. The Reading Experience (Article Page)
*   **Layout:** Single column, max-width `740px` (optimal 65-75 chars per line).
*   **Drop Cap:** The first letter of the article is massive, utilizing *Playfair Display* in Terracotta.
*   **Margin Notes (Special Feature):**
    *   **Syntax:** `{{Term|Definition|Text}}`
    *   **Visual:** Underlined with a dashed Terracotta line.
    *   **Interaction:** Clicking/Hovering reveals a floating card with the definition. This allows complex terms to be used without breaking the flow for advanced readers, while aiding learners.
*   **Formatting:**
    *   **Bold:** Rendered as `strong` for emphasis.
    *   **Italic:** Rendered as `em` for foreign words or internal thought.
    *   **Blockquotes:** Thick left border (`border-l-4`), italicized text.

### E. Admin Interface ("The Custodian")
*   **Metaphor:** A control room or archives back-office.
*   **Visuals:** Cleaner, more utilitarian. Focus on data tables and input fields.
*   **Editor Toolbar:** A floating or fixed bar providing quick access to formatting tools (Bold, Italic, Quote) and the "Define" tool.
*   **Definition Tool:** A dedicated modal that allows the Custodian to select text and attach a definition without manually typing the syntax.

---

## 4. User Interaction (UX) Patterns

### Page Transitions
We use `AnimatePresence` with `mode="wait"`.
*   **Exit:** Old page fades out (`opacity: 0`).
*   **Enter:** New page fades in.
*   **Feel:** Like slowly turning a page in a heavy book. No jarring cuts.

### Dark Mode Strategy
*   **Inversion:** Not just color inversion.
*   **Contrast:** Reduced contrast in Dark Mode to prevent eye strain. White becomes `#E0E0E0`, Black becomes `#0f0f0f`.
*   **Texture:** The noise overlay is inverted or opacity-adjusted to ensure the grain remains visible but not distracting on dark backgrounds.

### Mobile Responsiveness
*   **Menu:** A full-screen overlay that fades in.
*   **Type Scale:** Headings scale down but remain dominant.
*   **Touch Targets:** Buttons and cards have ample padding (`p-6` or `p-8`) to accommodate "fat finger" errors.

---

## 5. Technical Design Implementation

### Syntax Parser (`contentParser.tsx`)
A custom regex-based parser transforms plain text stored in `localStorage` into rich React components.
*   **Input:** `The concept of {{Dharma|Duty|Dharma}} is **vital**.`
*   **Output:** `<p>The concept of <MarginNote term="Dharma" definition="Duty">Dharma</MarginNote> is <strong>vital</strong>.</p>`
*   **Order of Operations:** Margin Notes -> Bold -> Italic.

### Persistence Strategy
*   **Storage:** `localStorage`. This creates a "personal archive" feel. Data lives in the user's browser (or the admin's), respecting privacy and decentralized ethos.

---

*This document represents the visual contract of Rutansh. Any deviations must be weighed against the core philosophy of Slowness and Heritage.*
