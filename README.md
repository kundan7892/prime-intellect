# Prime Intellect Hero Section - Next.js Clone

A high-fidelity, pixel-perfect clone of the navigation header and hero section from [Prime Intellect](https://www.primeintellect.ai/), built as a modern **Next.js (App Router)** application. 

This project uses the original brand assets, CSS files, and web fonts to achieve an identical frontend replica.

## Features

- **Next.js Framework**: Migrated to Next.js App Router with modular layout.
- **Pristine Visual Fidelity**: Replicated layout, color hierarchy, and grid spacing exactly using the precompiled original stylesheets.
- **Interactive Logo Grid**: Implemented hover states on the partner grid, including the Zapier/Ramp case study badges and the custom flying gif hover mask for Flapping Airplanes.
- **Micro-Animations**: Custom CSS translation transitions on buttons (sliding double-arrow hover effect) and header links.
- **Parallax Background**: Smooth scroll listener script driving the CSS translation variable (`--hero-parallax-y`) for the background loop video.
- **Local Web Fonts**: Preloaded custom typography (`ABC Favorit Mono` and `OCR X`) to prevent Layout Shift and preserve brand styling.

## Project Structure

```text
├── src/
│   └── app/
│       ├── styles/
│       │   ├── 415672b643d6b238.css   # Main layout and animation styles
│       │   ├── 7ca52951e73d16f6.css   # Brand variables and utility styles
│       │   └── site.css               # Normalization overrides
│       ├── layout.js                  # Root Next.js Layout with font config and CSS imports
│       └── page.js                    # Compiled Home component in JSX format
├── public/
│   ├── _next/static/media/            # Absolute path mapped brand woff2 fonts
│   ├── backgrounds/                   # Parallax backdrop videos and posters
│   ├── fonts/                         # Custom ABC Favorit brand typography
│   └── icons/                         # Brand logos & 10 partner SVGs (including flapping airplanes gif)
├── package.json                       # Next.js npm dependencies
├── jsconfig.json                      # Next.js path configs
├── next.config.mjs                    # Next.js configurations
└── postcss.config.mjs                 # PostCSS config
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or newer) installed locally.

### Installation & Run

1. Clone this repository to your local machine:
   ```bash
   git clone <your-repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)
