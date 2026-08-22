# Zap Docs design direction

## Theme 1: Voltage Editorial
Very Brief Intro: A crisp technical editorial system with pale blue paper, navy ink, cyan energy, and amber signal accents. It feels precise, optimistic, and built for focused learning.
Probability: 0.04

## Theme 2: Terminal Workshop
Very Brief Intro: A warm, tactile developer workspace with charcoal surfaces, monospaced labels, and vivid tool colors. It feels hands-on and close to the craft of programming.
Probability: 0.07

## Theme 3: Signal Atlas
Very Brief Intro: A structured field guide for a growing language ecosystem, combining navigation rails, map-like markers, and restrained color blocks. It feels exploratory, organized, and quietly distinctive.
Probability: 0.03

## Selected Approach: Voltage Editorial

### Design Movement
Contemporary technical editorial design with Swiss-inspired hierarchy, wayfinding graphics, and a friendly developer-tool sensibility.

### Core Principles
1. Make navigation feel like a reliable instrument panel, not a decorative menu.
2. Pair navy ink and generous pale-blue space with focused cyan and amber signals.
3. Use asymmetric rails, strong typographic scale, and visible reading rhythm.
4. Keep interactions crisp, legible, and purposeful.

### Color Philosophy
The cyan in the supplied Zap mark becomes the active energy of the interface: links, focus, and forward motion. Amber becomes the signal color for indexing, status, and small moments of emphasis. Deep navy grounds the system like printed ink, while pale blue keeps long documentation sessions calm and breathable.

### Layout Paradigm
A persistent left documentation rail anchors the reading experience while the main content sits on a generous editorial column. The homepage uses a centered launch moment followed by an offset card field and a dark closing band, avoiding a generic centered dashboard.

### Signature Elements
1. A framed Zap logo mark used as a high-contrast navigation beacon.
2. Numbered section labels and amber micro-dots as a wayfinding language.
3. Navy code panels with cyan language labels and amber copy affordances.

### Interaction Philosophy
Every interaction should clarify location or progress. Active navigation is visibly anchored, hover states reveal the cyan signal without shifting layout, and search appears as a compact command surface rather than a full-screen interruption.

### Animation
Use short, interruptible transitions under 220ms for hover, active, and dropdown states. Entrance motion should be a restrained upward fade for hero and cards, with staggered timing only where it reinforces reading order. Respect reduced-motion preferences and never animate layout dimensions.

### Typography System
Use Manrope for headings and interface copy, with DM Mono reserved for labels, code, counts, and path-like metadata. Headlines use tight tracking and high contrast; body copy remains relaxed with generous line-height; micro-labels are compact, uppercase, and letter-spaced.

### Brand Essence
Zap Docs is the field guide for builders learning and shipping with the Zap programming language; it is clear, energetic, and more navigable than a conventional reference site.
Personality: precise, optimistic, kinetic.

### Brand Voice
Headlines are direct and confident. CTAs are active but not salesy. Microcopy is compact and helpful, with no filler greetings.

Example lines:
- "Build your first Zap program in under a minute."
- "Find the syntax, command, or example you need."

### Wordmark & Logo
Use the supplied bolt-and-brackets `logo.jpg` as the primary mark, contained in a black rounded frame to preserve contrast. Pair it with a stacked Zap / Documentation wordmark rather than typing a plain standalone title.

### Signature Brand Color
Zap Cyan: `#16c6e8`.

## Style Decisions

- Homepage composition uses offset cards, guide textures, numbered labels, and a dark code band rather than a default centered dashboard.
- Amber is reserved for indexing, section numbers, status cues, and small signal moments; Zap Cyan remains the active action and link color.
- Documentation routes use a persistent instrument-panel rail, framed Zap beacon, active-location cyan signal, editorial reading column, and DM Mono metadata.
