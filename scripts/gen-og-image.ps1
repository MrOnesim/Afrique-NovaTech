Add-Type -AssemblyName System.Drawing

$e = [string][char]0x00E9  # é
$o = [string][char]0x00F4  # ô
$i = [string][char]0x00EE  # î

$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(5,5,5), [System.Drawing.Color]::FromArgb(20,12,5), 90)
$g.FillRectangle($bg, $rect)

$glow = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow.AddEllipse(750, -220, 900, 900)
$gb = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow)
$gb.CenterColor = [System.Drawing.Color]::FromArgb(90, 255, 120, 0)
$gb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 255, 120, 0))
$g.FillPath($gb, $glow)

$glow2 = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow2.AddEllipse(-350, 150, 800, 800)
$gb2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow2)
$gb2.CenterColor = [System.Drawing.Color]::FromArgb(60, 0, 230, 250)
$gb2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 230, 250))
$g.FillPath($gb2, $glow2)

function Draw-Text($text, $size, $bold, $color, $y) {
    $style = [System.Drawing.FontStyle]::Regular
    if ($bold) { $style = [System.Drawing.FontStyle]::Bold }
    $font = New-Object System.Drawing.Font("Segoe UI", $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
    $brush = New-Object System.Drawing.SolidBrush($color)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $r = [System.Drawing.RectangleF]::new(0, $y, $w, $size * 1.6)
    $g.DrawString($text, $font, $brush, $r, $sf)
}

Draw-Text "Afrique NovaTech" 80 $true ([System.Drawing.Color]::FromArgb(255,255,255)) 180
$lineBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(120, 255, 130, 0))
$g.FillRectangle($lineBrush, 480, 310, 240, 3)
Draw-Text ("Studio de cr" + $e + "ation web & solutions digitales") 32 $false ([System.Drawing.Color]::FromArgb(235,255,255,255)) 335
Draw-Text ("Cotonou, B" + $e + "nin   -   Sites  .  Apps  .  SaaS  .  E-commerce") 24 $false ([System.Drawing.Color]::FromArgb(150,255,255,255)) 425

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
$bmp.Save("public\og-image.jpg", $codec, $ep)

$g.Dispose()
$bmp.Dispose()
Write-Output "og-image.jpg genere"
