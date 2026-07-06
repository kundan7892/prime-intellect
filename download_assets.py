import os
import requests

BASE_URL = "https://www.primeintellect.ai"

ASSETS = [
    # Logos and Icons
    "/icons/primeintellect-logo.svg",
    "/icons/arrow-up-right.svg",
    "/icons/partners/ramp.svg",
    "/icons/partners/nvidia.svg",
    "/icons/partners/zapier.svg",
    "/icons/partners/characterai.svg",
    "/icons/partners/goodfire.svg",
    "/icons/partners/inception.svg",
    "/icons/partners/arcee.svg",
    "/icons/partners/browserbase.svg",
    "/icons/partners/flapping-airplanes.svg",
    "/icons/partners/airplane-white-cropped.gif",
    "/icons/partners/standard-intelligence.svg",
    
    # Background videos and poster
    "/backgrounds/pi-glass-loop-poster.webp",
    "/backgrounds/pi-glass-loop-prod.webm",
    "/backgrounds/pi-glass-loop-prod.mp4",
    
    # Stylesheets
    "/_next/static/css/415672b643d6b238.css",
    "/_next/static/css/7ca52951e73d16f6.css",
    
    # Fonts
    "/_next/static/media/22a5144ee8d83bca-s.p.woff2",
    "/_next/static/media/7d4881bb7e1bf84d-s.p.woff2",
]

def download_file(url_path):
    url = BASE_URL + url_path
    # Remove query params for local file path
    local_path = url_path.split('?')[0].lstrip('/')
    local_dir = os.path.dirname(local_path)
    
    if local_dir and not os.path.exists(local_dir):
        os.makedirs(local_dir)
        print(f"Created directory: {local_dir}")
        
    print(f"Downloading {url} to {local_path}...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    response = requests.get(url, headers=headers, stream=True)
    if response.status_code == 200:
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Successfully downloaded {local_path}")
    else:
        print(f"Failed to download {url_path} (Status Code: {response.status_code})")

if __name__ == "__main__":
    print("Starting asset downloads...")
    for asset in ASSETS:
        download_file(asset)
    print("All downloads complete!")
