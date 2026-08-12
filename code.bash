# PowerShell commands - run from the repository root.
# These resize the PNG assets in place while preserving aspect ratio and transparency.

Add-Type -AssemblyName System.Drawing

$repoRoot = (Resolve-Path ".").Path
$assetRoot = Join-Path $repoRoot "src\assets"
$tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) "labolavs-image-optimization"

if (-not $assetRoot.StartsWith($repoRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "The asset directory is outside the repository."
}

New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null

$targets = @(
  @{ Path = "icons\apps_icon.png"; MaxDimension = 256 },
  @{ Path = "icons\dna_icon.png"; MaxDimension = 256 },
  @{ Path = "icons\education_icon.png"; MaxDimension = 256 },
  @{ Path = "icons\fin_math.png"; MaxDimension = 256 },
  @{ Path = "icons\games_icon.png"; MaxDimension = 256 },
  @{ Path = "icons\maze_icon.png"; MaxDimension = 256 },
  @{ Path = "icons\open_icon.png"; MaxDimension = 256 },
  @{ Path = "logo_d.png"; MaxDimension = 512 },
  @{ Path = "logo_l.png"; MaxDimension = 512 }
)

foreach ($target in $targets) {
  $sourcePath = Join-Path $assetRoot $target.Path
  $sourceItem = Get-Item -LiteralPath $sourcePath
  $tempPath = Join-Path $tempRoot $sourceItem.Name
  $sourceImage = [System.Drawing.Image]::FromFile($sourcePath)

  try {
    $scale = [Math]::Min(
      1.0,
      $target.MaxDimension / [double][Math]::Max($sourceImage.Width, $sourceImage.Height)
    )
    $width = [Math]::Max(1, [int][Math]::Round($sourceImage.Width * $scale))
    $height = [Math]::Max(1, [int][Math]::Round($sourceImage.Height * $scale))
    $outputImage = New-Object System.Drawing.Bitmap(
      $width,
      $height,
      [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
    )

    try {
      $graphics = [System.Drawing.Graphics]::FromImage($outputImage)
      try {
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.DrawImage($sourceImage, 0, 0, $width, $height)
      }
      finally {
        $graphics.Dispose()
      }

      $outputImage.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $outputImage.Dispose()
    }
  }
  finally {
    $sourceImage.Dispose()
  }

  Move-Item -LiteralPath $tempPath -Destination $sourcePath -Force
  $optimizedItem = Get-Item -LiteralPath $sourcePath
  "{0}: {1} KB" -f $target.Path, [Math]::Round($optimizedItem.Length / 1KB, 1)
}

Remove-Item -LiteralPath $tempRoot -Force

npm run lint
npm run build
git status --short

# Publish the verified changes to the configured GitHub repository.
git add -- code.bash src/data/projects.js src/pages/CategoryPage.jsx src/assets/icons src/assets/logo_d.png src/assets/logo_l.png
git diff --cached --check
git diff --cached --stat
git commit -m "Add financial mathematics project and optimize images"
git pull --rebase origin main
git push origin main
