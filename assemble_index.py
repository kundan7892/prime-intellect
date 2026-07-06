import re

# Read the extracted structure HTML file
with open("extracted_structure.html", "r", encoding="utf-8") as f:
    structure = f.read()

# Extract header HTML
header_match = re.search(r"=== HEADER ===\n(<header.*?</header>)", structure, re.DOTALL)
header_html = header_match.group(1) if header_match else ""

# Extract hero section HTML
hero_match = re.search(r"=== HERO SECTION ===\n(<section.*?</section>)", structure, re.DOTALL)
hero_html = hero_match.group(1) if hero_match else ""

# Clean query params from HTML (e.g., ?dpl=dpl_ffBS2TpxtuKKEaKTvYxE9zddngi2 or &amp;dpl=...)
clean_header = re.sub(r"\?dpl=[A-Za-z0-9_]+", "", header_html)
clean_header = re.sub(r"&amp;dpl=[A-Za-z0-9_]+", "", clean_header)

clean_hero = re.sub(r"\?dpl=[A-Za-z0-9_]+", "", hero_html)
clean_hero = re.sub(r"&amp;dpl=[A-Za-z0-9_]+", "", clean_hero)

# Construct the full index.html
html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Prime Intellect - The Open Stack for Self-Improving Agents</title>
    <meta name="description" content="The compute and infrastructure platform for you to train, evaluate, and deploy your own agentic models.">
    
    <!-- Preload fonts to avoid layout shift -->
    <link rel="preload" href="/_next/static/media/22a5144ee8d83bca-s.p.woff2" as="font" crossorigin="" type="font/woff2">
    <link rel="preload" href="/_next/static/media/7d4881bb7e1bf84d-s.p.woff2" as="font" crossorigin="" type="font/woff2">
    <link rel="preload" href="/fonts/ABCFavoritMono-Regular-Trial.woff2" as="font" crossorigin="" type="font/woff2">
    <link rel="preload" href="/fonts/ABCFavoritMono-Bold-Trial.woff2" as="font" crossorigin="" type="font/woff2">
    
    <!-- Preload logo and poster -->
    <link rel="preload" as="image" href="/icons/primeintellect-logo.svg">
    <link rel="preload" as="image" href="/backgrounds/pi-glass-loop-poster.webp">
    
    <!-- Original Web CSS Stylesheets -->
    <link rel="stylesheet" href="/_next/static/css/7ca52951e73d16f6.css">
    <link rel="stylesheet" href="/_next/static/css/415672b643d6b238.css">
    
    <!-- Custom site styling overrides -->
    <link rel="stylesheet" href="/css/site.css">
</head>
<body class="__variable_bd525c __variable_3bed08 antialiased bg-black text-white selection:bg-white/20 selection:text-white">
    <div hidden=""></div>
    
    {clean_header}
    
    <div class="max-w-360 mx-auto px-4 md:px-5">
        <main class="min-h-screen">
            {clean_hero}
        </main>
    </div>

    <!-- Parallax Background Scroll Script -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {{
            const parallaxWrapper = document.querySelector(".will-change-transform");
            if (parallaxWrapper) {{
                window.addEventListener("scroll", () => {{
                    const scrolled = window.pageYOffset;
                    // Apply parallax scroll effect multiplier (0.25 to 0.35 is optimal)
                    const yVal = scrolled * 0.35;
                    parallaxWrapper.style.setProperty("--hero-parallax-y", `${{yVal}}px`);
                }}, {{ passive: true }});
            }}
        }});
    </script>
</body>
</html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("index.html assembled successfully!")
