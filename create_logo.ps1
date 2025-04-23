# Create a simple .NET logo generator
Add-Type -AssemblyName System.Drawing

# Set dimensions
$width = 200
$height = 80

# Create bitmap and graphics
$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# Set background to black
$graphics.Clear([System.Drawing.Color]::Black)

# Create text brush and font
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$font = New-Object System.Drawing.Font("Arial", 18, [System.Drawing.FontStyle]::Bold)

# Draw text centered
$text = "LOGO"
$textSize = $graphics.MeasureString($text, $font)
$x = ($width - $textSize.Width) / 2
$y = ($height - $textSize.Height) / 2
$graphics.DrawString($text, $font, $brush, $x, $y)

# Add decorative line
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::DarkGoldenrod, 2)
$graphics.DrawLine($pen, 20, $height - 20, $width - 20, $height - 20)

# Save the image
$outputPath = ".\public\images\logo.png"
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Clean up
$graphics.Dispose()
$bitmap.Dispose()

Write-Host "Logo created successfully at $outputPath" 