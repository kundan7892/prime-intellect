# Prime Intellect Hero Section Clone

A high-fidelity, pixel-perfect frontend clone of the navigation header and hero section from [Prime Intellect](https://www.primeintellect.ai/). This project is built using pure HTML, Vanilla CSS, and custom JavaScript, leveraging the website's original assets and fonts.

## Features

- **Pristine Visual Fidelity**: Replicated layout, color hierarchy, and grid spacing exactly using the compiled original stylesheets.
- **Interactive Logo Grid**: Implemented hover states on the partner grid, including the Zapier/Ramp case study badges and the custom flying gif hover mask for Flapping Airplanes.
- **Micro-Animations**: Custom CSS translation transitions on buttons (sliding double-arrow hover effect) and header links.
- **Parallax Background**: Smooth scroll listener script driving the CSS translation variable (`--hero-parallax-y`) for the background loop video.
- **Local Web Fonts**: Preloaded custom typography (`ABC Favorit Mono` and `OCR X`) to prevent Layout Shift and preserve brand styling.

## Directory Structure

```text
├── _next/               # Preloaded fonts and stylesheets
├── backgrounds/         # Glass loop poster and videos
├── css/                 # Normalization overrides stylesheet
├── fonts/               # Custom ABC Favorit & OCR brand typography
├── icons/               # SVGs, icons, and partner logo directory
├── index.html           # Main cloned markup page
├── server.js            # Node.js static server
└── README.md            # Repository documentation
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed locally.

### Installation & Run

1. Clone this repository to your local machine:
   ```bash
   git clone <your-repository-url>
   cd <project-folder>
   ```

2. Start the zero-dependency dev server:
   ```bash
   node server.js
   ```

3. Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)
