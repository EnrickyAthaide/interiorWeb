# PowerShell script to download the showcase images

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "public\images\about\showcase"

# Download the showcase images
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1600607687126-8a3414349a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" -OutFile "public\images\about\showcase\luxury-interior.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" -OutFile "public\images\about\showcase\modern-space.jpg"

Write-Host "Showcase images downloaded successfully." 