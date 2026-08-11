Add-Type -AssemblyName System.Drawing

$source = "scripts/logo-source.png"
$outDir = "public/icons"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$src = [System.Drawing.Image]::FromFile((Resolve-Path $source).Path)
$sizes = @(
  @{ Size = 512; Name = "icon-512.png" },
  @{ Size = 192; Name = "icon-192.png" },
  @{ Size = 180; Name = "apple-touch-icon.png" }
)

foreach ($item in $sizes) {
  $bmp = New-Object System.Drawing.Bitmap($item.Size, $item.Size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.DrawImage($src, 0, 0, $item.Size, $item.Size)
  $g.Dispose()
  $bmp.Save((Join-Path $outDir $item.Name), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Output ("{0} -> {1} ({2}px)" -f $item.Name, (Join-Path $outDir $item.Name), $item.Size)
}
$src.Dispose()
