# PowerShell script to download high-quality images for project gallery sections

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "public\images\projects\high-quality" | Out-Null

Write-Host "Downloading high-quality gallery images..." -ForegroundColor Cyan

# High-quality interior images
$highQualityImages = @(
    @{
        url = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90"
        filename = "gallery-1.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90"
        filename = "gallery-2.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90" 
        filename = "gallery-3.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90"
        filename = "gallery-4.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90"
        filename = "gallery-5.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90"
        filename = "gallery-6.jpg"
    }
)

# Download each image
foreach ($image in $highQualityImages) {
    $outputPath = Join-Path "public\images\projects\high-quality" $image.filename
    Write-Host "Downloading $($image.url) to $outputPath"
    try {
        Invoke-WebRequest -Uri $image.url -OutFile $outputPath
        Write-Host "Downloaded: $($image.filename)" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download: $($image.url)" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

Write-Host "High-quality gallery images downloaded successfully!" -ForegroundColor Green 