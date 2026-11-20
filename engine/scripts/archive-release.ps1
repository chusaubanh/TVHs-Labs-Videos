[CmdletBinding()]
param([Parameter(Mandatory=$true)][string]$Source,[Parameter(Mandatory=$true)][string]$Destination)
$ErrorActionPreference = 'Stop'
$resolvedSource = (Resolve-Path -LiteralPath $Source).Path
$resolvedDestination = [IO.Path]::GetFullPath($Destination)
$releaseRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../output/releases'))
if (-not $resolvedSource.StartsWith($releaseRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Nguồn phải thuộc output/releases.' }
if (-not $resolvedDestination.StartsWith($releaseRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'File ZIP phải thuộc output/releases.' }
if (Test-Path -LiteralPath $resolvedDestination) { throw 'ZIP đã tồn tại; không ghi đè.' }
Compress-Archive -LiteralPath $resolvedSource -DestinationPath $resolvedDestination -CompressionLevel Optimal
Write-Host "Đã tạo ZIP: $resolvedDestination"