# Draws the app icon (yellow tile, route line, der/die/das stations) as PNGs for the PWA and Android.
param([string]$Root = (Split-Path -Parent $PSScriptRoot))
Add-Type -AssemblyName System.Drawing

function Draw-Icon([int]$size, [string]$path, [double]$scale = 1.0, [bool]$rounded = $true, [bool]$transparent = $false) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)
  $k = $size / 512.0
  $yellow = [System.Drawing.Color]::FromArgb(255, 255, 204, 0)
  if (-not $transparent) {
    $brush = New-Object System.Drawing.SolidBrush $yellow
    if ($rounded) {
      $r = 112 * $k
      $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
      $gp.AddArc(0, 0, 2 * $r, 2 * $r, 180, 90)
      $gp.AddArc($size - 2 * $r, 0, 2 * $r, 2 * $r, 270, 90)
      $gp.AddArc($size - 2 * $r, $size - 2 * $r, 2 * $r, 2 * $r, 0, 90)
      $gp.AddArc(0, $size - 2 * $r, 2 * $r, 2 * $r, 90, 90)
      $gp.CloseFigure()
      $g.FillPath($brush, $gp)
    } else {
      $g.FillRectangle($brush, 0, 0, $size, $size)
    }
  }
  # content scaled around the centre
  $s = $k * $scale
  $off = ($size - 512 * $s) / 2
  $ink = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 24, 32, 44))
  $g.FillRectangle($ink, [float]($off + 242 * $s), [float]($off + 120 * $s), [float](28 * $s), [float](272 * $s))
  $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $colors = @(
    [System.Drawing.Color]::FromArgb(255, 31, 95, 214),
    [System.Drawing.Color]::FromArgb(255, 211, 47, 62),
    [System.Drawing.Color]::FromArgb(255, 18, 132, 74)
  )
  $ys = @(136, 256, 376)
  for ($i = 0; $i -lt 3; $i++) {
    $cx = $off + 256 * $s
    $cy = $off + $ys[$i] * $s
    $rad = 42 * $s
    $pen = New-Object System.Drawing.Pen $colors[$i], ([float](24 * $s))
    $g.FillEllipse($white, [float]($cx - $rad), [float]($cy - $rad), [float](2 * $rad), [float](2 * $rad))
    $g.DrawEllipse($pen, [float]($cx - $rad), [float]($cy - $rad), [float](2 * $rad), [float](2 * $rad))
  }
  $dir = Split-Path -Parent $path
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

$pub = Join-Path $Root 'public'
Draw-Icon 192 (Join-Path $pub 'icon-192.png')
Draw-Icon 512 (Join-Path $pub 'icon-512.png')
Draw-Icon 512 (Join-Path $pub 'icon-maskable-512.png') 0.78 $false
Draw-Icon 180 (Join-Path $pub 'apple-touch-icon.png') 1.0 $false

$res = Join-Path $Root 'android\app\src\main\res'
if (Test-Path $res) {
  $legacy = @{ 'mdpi' = 48; 'hdpi' = 72; 'xhdpi' = 96; 'xxhdpi' = 144; 'xxxhdpi' = 192 }
  $fore = @{ 'mdpi' = 108; 'hdpi' = 162; 'xhdpi' = 216; 'xxhdpi' = 324; 'xxxhdpi' = 432 }
  foreach ($d in $legacy.Keys) {
    Draw-Icon $legacy[$d] (Join-Path $res "mipmap-$d\ic_launcher.png")
    Draw-Icon $legacy[$d] (Join-Path $res "mipmap-$d\ic_launcher_round.png") 0.9 $false
    # adaptive foreground: content inside the 66% safe zone, transparent background
    Draw-Icon $fore[$d] (Join-Path $res "mipmap-$d\ic_launcher_foreground.png") 0.62 $false $true
  }
  Write-Output 'Android icons written'

  # Splash screens: keep each file's size, light background with the icon in the middle
  $tmp = Join-Path $env:TEMP 'almanca-kocu-splash-icon.png'
  Draw-Icon 512 $tmp
  $icon = [System.Drawing.Image]::FromFile($tmp)
  Get-ChildItem $res -Recurse -Filter 'splash.png' | ForEach-Object {
    $old = [System.Drawing.Image]::FromFile($_.FullName)
    $w = $old.Width; $h = $old.Height
    $old.Dispose()
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.Clear([System.Drawing.Color]::FromArgb(255, 243, 245, 247))
    $side = [int]([Math]::Min($w, $h) * 0.28)
    $g.DrawImage($icon, [int](($w - $side) / 2), [int](($h - $side) / 2), $side, $side)
    $bmp.Save($_.FullName, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()
  }
  $icon.Dispose()
  Write-Output 'Splash screens written'
}
Write-Output 'PWA icons written'
