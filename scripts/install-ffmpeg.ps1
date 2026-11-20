# Tải FFmpeg đầy đủ vào cache dự án, không sửa PATH hệ thống và không cần quyền admin.
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$version = '9.0.2'
$expectedHash = '60f467265b1e312373dbcd92200c2618a74850f98d3d078e94296bb3fa2047ba'
$url = "https://www.gyan.dev/ffmpeg/builds/packages/ffmpeg-$version-essentials_build.zip"
$cacheRoot = Join-Path $projectRoot '.cache/tools/ffmpeg'
$downloadRoot = Join-Path $projectRoot '.cache/downloads'
$archiveFile = Join-Path $downloadRoot "ffmpeg-$version.zip"
New-Item -ItemType Directory -Force -Path $downloadRoot,(Join-Path $cacheRoot 'bin') | Out-Null
if ((Test-Path -LiteralPath (Join-Path $cacheRoot 'bin/ffmpeg.exe')) -and (Test-Path -LiteralPath (Join-Path $cacheRoot 'bin/ffprobe.exe'))) {
    $installedVersion = & (Join-Path $cacheRoot 'bin/ffmpeg.exe') -version 2>$null | Select-Object -First 1
    if ($installedVersion -like "*ffmpeg version $version*") { Write-Host "FFmpeg $version đã có trong cache dự án."; exit 0 }
}
if (-not (Test-Path -LiteralPath $archiveFile)) {
    Write-Host "Đang tải FFmpeg $version…"
    & curl.exe --fail --location --retry 2 --connect-timeout 20 --output "$archiveFile.part" $url
    if ($LASTEXITCODE -ne 0) { throw 'Không tải được FFmpeg. Chạy lại khi kết nối mạng ổn định.' }
    Move-Item -LiteralPath "$archiveFile.part" -Destination $archiveFile -Force
}
if ((Get-FileHash -LiteralPath $archiveFile -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expectedHash) { throw 'SHA-256 của FFmpeg không khớp. Không giải nén hoặc chạy file.' }
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [IO.Compression.ZipFile]::OpenRead($archiveFile)
try {
    foreach ($entry in $zip.Entries) {
        $destination = $null
        if ($entry.FullName -match '^[^/]+/bin/(ffmpeg|ffprobe)\.exe$') { $destination = Join-Path $cacheRoot ('bin/' + $entry.Name) }
        elseif ($entry.FullName -match '^[^/]+/(LICENSE|README)\.txt$') { $destination = Join-Path $cacheRoot $entry.Name }
        if ($destination) { [IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $destination, $true) }
    }
} finally { $zip.Dispose() }
foreach ($name in @('ffmpeg','ffprobe')) { if (-not (Test-Path -LiteralPath (Join-Path $cacheRoot "bin/$name.exe"))) { throw "Gói tải về thiếu $name.exe" } }
[IO.File]::WriteAllText((Join-Path $cacheRoot 'source.json'), (@{ version=$version; url=$url; sha256=$expectedHash; officialReference='https://ffmpeg.org/download.html' } | ConvertTo-Json))
Write-Host "Đã cài FFmpeg $version và ffprobe vào cache dự án; SHA-256 khớp."