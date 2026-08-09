Add-Type -AssemblyName System.Drawing

$w = 512
$h = 512
$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# transparent background
$g.Clear([System.Drawing.Color]::Transparent)

# 1. soft background ambient glow (Amber to Cyan)
$glowPath1 = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath1.AddEllipse(80, 80, 352, 352)
$pgb1 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath1)
$pgb1.CenterColor = [System.Drawing.Color]::FromArgb(60, 255, 110, 0) # semi-transparent orange
$pgb1.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 255, 110, 0))
$g.FillPath($pgb1, $glowPath1)

$glowPath2 = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath2.AddEllipse(120, 120, 272, 272)
$pgb2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath2)
$pgb2.CenterColor = [System.Drawing.Color]::FromArgb(50, 0, 242, 254) # semi-transparent cyan
$pgb2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 242, 254))
$g.FillPath($pgb2, $glowPath2)

# 2. Orbits (Tilted Ellipses)
$state = $g.Save()
$g.TranslateTransform(256, 256)

# Orbit 1 (Orange, tilted -25 deg)
$g.RotateTransform(-25)
$pen1 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(200, 255, 130, 0), 2)
$pen1.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$g.DrawEllipse($pen1, -180, -60, 360, 120)
# Orbit Node 1
$brushNode1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 150, 0))
$g.FillEllipse($brushNode1, -185, -8, 16, 16)

# Orbit 2 (Cyan, tilted 35 deg)
$g.RotateTransform(60) # -25 + 60 = 35 deg
$pen2 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(200, 0, 242, 254), 2)
$pen2.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$g.DrawEllipse($pen2, -200, -70, 400, 140)
# Orbit Node 2
$brushNode2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 242, 254))
$g.FillEllipse($brushNode2, 194, -6, 12, 12)

$g.Restore($state)

# 3. Connection Lines (Constellation lines)
$penLine = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 255, 255, 255), 1)
$g.DrawLine($penLine, 256, 256, 340, 160)
$g.DrawLine($penLine, 256, 256, 150, 200)
$g.DrawLine($penLine, 256, 256, 210, 360)
$g.DrawLine($penLine, 256, 256, 360, 330)

# 4. Constellation dots
$dotBrush1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 0, 242, 254))
$g.FillEllipse($dotBrush1, 340-4, 160-4, 8, 8)
$dotBrush2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 255, 110, 0))
$g.FillEllipse($dotBrush2, 150-3, 200-3, 6, 6)
$dotBrush3 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 255, 255, 255))
$g.FillEllipse($dotBrush3, 210-5, 360-5, 10, 10)
$dotBrush4 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200, 255, 200, 0))
$g.FillEllipse($dotBrush4, 360-3, 330-3, 6, 6)

# 5. Core glowing sphere
$corePath = New-Object System.Drawing.Drawing2D.GraphicsPath
$corePath.AddEllipse(176, 176, 160, 160)
$pgbCore = New-Object System.Drawing.Drawing2D.PathGradientBrush($corePath)
$pgbCore.CenterColor = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
$pgbCore.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 255, 110, 0))
$g.FillPath($pgbCore, $corePath)

# Add a sharp inner glow
$innerPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$innerPath.AddEllipse(206, 206, 100, 100)
$pgbInner = New-Object System.Drawing.Drawing2D.PathGradientBrush($innerPath)
$pgbInner.CenterColor = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
$pgbInner.SurroundColors = @([System.Drawing.Color]::FromArgb(150, 0, 242, 254))
$g.FillPath($pgbInner, $innerPath)

# 6. Save image as transparent PNG
$bmp.Save("public\images\hero_visual.png", [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
Write-Output "hero_visual.png generated successfully"
