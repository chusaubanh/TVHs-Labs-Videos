[CmdletBinding()]
param([switch]$NoOpen)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
Set-Location -LiteralPath $projectRoot
if (-not (Get-Command node.exe -ErrorAction SilentlyContinue)) {
    if (-not (Get-Command winget.exe -ErrorAction SilentlyContinue)) { throw 'Cần Node.js 22.18 trở lên. Cài từ https://nodejs.org rồi mở lại ứng dụng.' }
    & winget.exe install --id OpenJS.NodeJS.LTS --exact --silent --accept-package-agreements --accept-source-agreements
    if ($LASTEXITCODE -ne 0) { throw 'Không cài được Node.js.' }
    $env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
}
$nodeVersion = [version]((& node.exe --version).TrimStart('v'))
if ($nodeVersion -lt [version]'22.18.0') { throw 'Cần Node.js 22.18 trở lên. Hãy cập nhật Node rồi chạy lại.' }
if (-not (Test-Path -LiteralPath 'node_modules/tsx/package.json') -or -not (Test-Path -LiteralPath '.venv-media/Scripts/python.exe') -or -not (Test-Path -LiteralPath '.cache/tools/ffmpeg/bin/ffmpeg.exe')) {
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'setup-windows.ps1') -BaseOnly
    if ($LASTEXITCODE -ne 0) { throw 'Cài môi trường chưa hoàn tất.' }
}
& npm.cmd run integrations:build
if ($LASTEXITCODE -ne 0) { throw 'Không dựng được giao diện.' }
if ($NoOpen) { & node.exe --import tsx scripts/app/server.ts --no-open } else { & node.exe --import tsx scripts/app/server.ts }
exit $LASTEXITCODE