# PowerShell script to download images from Unsplash and store them locally
# Organized by usage

# Define base directories
$blogHeroDir = ".\public\images\blogs\hero"
$blogContentDir = ".\public\images\blogs\content"
$blogAuthorDir = ".\public\images\blogs\authors"
$contactBgDir = ".\public\images\contact"
$aboutBgDir = ".\public\images\about"

# Function to download image from URL
function Download-Image {
    param (
        [string]$url,
        [string]$outputPath
    )
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath
        Write-Host "Downloaded: $url -> $outputPath" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download: $url" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

# Make sure directories exist
if (!(Test-Path $blogHeroDir)) { New-Item -ItemType Directory -Path $blogHeroDir -Force }
if (!(Test-Path $blogContentDir)) { New-Item -ItemType Directory -Path $blogContentDir -Force }
if (!(Test-Path $blogAuthorDir)) { New-Item -ItemType Directory -Path $blogAuthorDir -Force }
if (!(Test-Path $contactBgDir)) { New-Item -ItemType Directory -Path $contactBgDir -Force }
if (!(Test-Path $aboutBgDir)) { New-Item -ItemType Directory -Path $aboutBgDir -Force }

# Blog hero images
$blogHeroImages = @(
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000"
)

# Blog author images
$blogAuthorImages = @(
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=200",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    "https://images.unsplash.com/photo-1564564295391-7f24f26f568b?q=80&w=200"
)

# Blog content images
$blogContentImages = @(
    "https://images.unsplash.com/photo-1616593969747-4797dc75033e?q=80&w=1000",
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000",
    "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1000",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000",
    "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1000",
    "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1000",
    "https://images.unsplash.com/photo-1594761051656-71868b4aebd9?q=80&w=1000",
    "https://images.unsplash.com/photo-1600607687644-c7171b16498f?q=80&w=1000",
    "https://images.unsplash.com/photo-1556910103-1c02745aec78?q=80&w=1000",
    "https://images.unsplash.com/photo-1600585154526-990dced4db3d?q=80&w=1000",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000",
    "https://images.unsplash.com/photo-1600607686527-ddc628cbd2bf?q=80&w=1000",
    "https://images.unsplash.com/photo-1600607687165-116c3a056652?q=80&w=1000",
    "https://images.unsplash.com/photo-1600566752584-e1e5a1fd5a08?q=80&w=1000",
    "https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=80&w=1000",
    "https://images.unsplash.com/photo-1594760135052-125e893aa064?q=80&w=1000"
)

# Contact page background options
$contactBgImages = @(
    "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1600607688066-890987f18a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1572742478197-e07d2b9a443e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
)

# About page images
$aboutBgImages = @(
    "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
)

# Create a simple logo if it doesn't exist
if (!(Test-Path ".\public\images\logo.png")) {
    $logoPath = ".\public\images\logo.png"
    $logoUrl = "https://via.placeholder.com/200x80?text=LOGO"
    Download-Image -url $logoUrl -outputPath $logoPath
}

# Download blog hero images
Write-Host "Downloading blog hero images..." -ForegroundColor Cyan
for ($i = 0; $i -lt $blogHeroImages.Count; $i++) {
    $outputPath = Join-Path $blogHeroDir "hero-$($i+1).jpg"
    Download-Image -url $blogHeroImages[$i] -outputPath $outputPath
}

# Download blog author images
Write-Host "Downloading blog author images..." -ForegroundColor Cyan
for ($i = 0; $i -lt $blogAuthorImages.Count; $i++) {
    $outputPath = Join-Path $blogAuthorDir "author-$($i+1).jpg"
    Download-Image -url $blogAuthorImages[$i] -outputPath $outputPath
}

# Download blog content images
Write-Host "Downloading blog content images..." -ForegroundColor Cyan
for ($i = 0; $i -lt $blogContentImages.Count; $i++) {
    $outputPath = Join-Path $blogContentDir "content-$($i+1).jpg"
    Download-Image -url $blogContentImages[$i] -outputPath $outputPath
}

# Download contact background images
Write-Host "Downloading contact background images..." -ForegroundColor Cyan
for ($i = 0; $i -lt $contactBgImages.Count; $i++) {
    $outputPath = Join-Path $contactBgDir "bg-$($i+1).jpg"
    Download-Image -url $contactBgImages[$i] -outputPath $outputPath
}

# Download about page images
Write-Host "Downloading about page images..." -ForegroundColor Cyan
for ($i = 0; $i -lt $aboutBgImages.Count; $i++) {
    $outputPath = Join-Path $aboutBgDir "bg-$($i+1).jpg"
    Download-Image -url $aboutBgImages[$i] -outputPath $outputPath
}

Write-Host "Image download completed! All images are now stored locally." -ForegroundColor Green 