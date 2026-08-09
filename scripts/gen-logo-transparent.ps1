Add-Type -AssemblyName System.Drawing

$src = (Resolve-Path "scripts\logo-source.png").Path
$orig = New-Object System.Drawing.Bitmap($src)

# 1) Choma-key : tout pixel sombre (fond) -> alpha 0, rampe douce pour l'antialiasing
$cleaned = New-Object System.Drawing.Bitmap($orig.Width, $orig.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt $orig.Height; $y++) {
    for ($x = 0; $x -lt $orig.Width; $x++) {
        $c = $orig.GetPixel($x, $y)
        $lum = [math]::Max($c.R, [math]::Max($c.G, $c.B))
        $alpha = [int]([math]::Max(0, [math]::Min(255, ($lum - 18) * 7)))
        $cleaned.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
    }
}

# 2) Redimensionner a 256x256 (haute qualite)
$size = 256
$out = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($out)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::Transparent)
$g.DrawImage($cleaned, 0, 0, $size, $size)
$g.Dispose()

$out.Save((Join-Path (Get-Location) "public\images\logo_novatech_transparent.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$out.Dispose(); $cleaned.Dispose(); $orig.Dispose()
Write-Output "logo_novatech_transparent.png genere"
