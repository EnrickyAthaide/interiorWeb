# PowerShell script to download homepage images
# Define base directories
$homeDir = ".\public\images\home"

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

# Make sure home directory exists
if (!(Test-Path $homeDir)) { New-Item -ItemType Directory -Path $homeDir -Force }

# Project images
$projectImages = @(
    "https://www.essajeesatelier.com/wp-content/uploads/2023/05/Simple-Splendour-grid-home.jpg",
    "https://www.essajeesatelier.com/wp-content/uploads/2023/07/A-Timeless-Legacy-home.jpg",
    "https://www.essajeesatelier.com/wp-content/uploads/2023/05/Luxe-In-The-CIty-grid-home.jpg"
)

# About image and seamless images
$aboutImage = "https://www.essajeesatelier.com/wp-content/uploads/2023/07/Sarah-Sham.jpg"
$seamlessBefore = "https://www.essajeesatelier.com/wp-content/uploads/2023/07/Before-.jpg"
$seamlessAfter = "https://www.essajeesatelier.com/wp-content/uploads/2023/07/After-.jpg"

# Additional found images
$founderImage = "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
$quoteBackground = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"

# Download project images
Write-Host "Downloading project images..." -ForegroundColor Cyan
for ($i = 0; $i -lt $projectImages.Count; $i++) {
    $outputPath = Join-Path $homeDir "project-$($i+1).jpg"
    Download-Image -url $projectImages[$i] -outputPath $outputPath
}

# Download about image
Write-Host "Downloading about image..." -ForegroundColor Cyan
$aboutOutputPath = Join-Path $homeDir "about.jpg"
Download-Image -url $aboutImage -outputPath $aboutOutputPath

# Download seamless images
Write-Host "Downloading seamless images..." -ForegroundColor Cyan
$beforeOutputPath = Join-Path $homeDir "before.jpg"
Download-Image -url $seamlessBefore -outputPath $beforeOutputPath

$afterOutputPath = Join-Path $homeDir "after.jpg"
Download-Image -url $seamlessAfter -outputPath $afterOutputPath

# Download founder image
Write-Host "Downloading founder image..." -ForegroundColor Cyan
$founderDir = ".\public\images\about\founder"
if (!(Test-Path $founderDir)) { New-Item -ItemType Directory -Path $founderDir -Force }
$founderOutputPath = Join-Path $founderDir "founder.jpg"
Download-Image -url $founderImage -outputPath $founderOutputPath

# Download quote background
Write-Host "Downloading quote background..." -ForegroundColor Cyan
$quoteOutputPath = Join-Path ".\public\images\about" "quote-bg.jpg"
Download-Image -url $quoteBackground -outputPath $quoteOutputPath

Write-Host "Image download completed! All homepage images are now stored locally." -ForegroundColor Green 