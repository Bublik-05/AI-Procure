<#
bootstrap.ps1

One-command bootstrap for Windows (PowerShell):
- creates + activates a Python venv
- installs Python dependencies from `requirements.txt`
- installs frontend deps in `ui/`
- ensures `ui/.env` contains `VITE_API_URL=http://localhost:8000`
- starts the dev servers via `dev.ps1`

Usage (PowerShell):
  ./bootstrap.ps1

Notes:
- Run this from the repository root.
- Requires `python` and `npm` available on PATH.
#>

Set-StrictMode -Version Latest

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Push-Location $root

Write-Host "Bootstrapping project..."

# 1) Setup Python venv
if (-Not (Test-Path -Path .\.venv)) {
    Write-Host "Creating virtual environment..."
    python -m venv .venv
}

Write-Host "Activating virtual environment..."
. .\.venv\Scripts\Activate.ps1

Write-Host "Installing Python requirements..."
if (Test-Path requirements.txt) {
    pip install -r requirements.txt
} else {
    Write-Host "No requirements.txt found; skipping Python deps install." -ForegroundColor Yellow
}

# 2) Install frontend deps
if (Test-Path ui\package.json) {
    Push-Location ui
    Write-Host "Installing frontend npm dependencies..."
    npm install

    # Ensure VITE_API_URL env file
    $envFile = Join-Path (Get-Location) ".env"
    if (-Not (Test-Path $envFile)) {
        Write-Host "Creating ui/.env with VITE_API_URL=http://localhost:8000"
        "VITE_API_URL=http://localhost:8000" | Out-File -FilePath $envFile -Encoding UTF8
    } else {
        Write-Host "ui/.env already exists; leaving it unchanged."
    }

    Pop-Location
} else {
    Write-Host "No ui/package.json found; skipping frontend install." -ForegroundColor Yellow
}

# 3) Start both servers
Write-Host "Launching dev servers (see separate windows) ..."
& .\dev.ps1

Pop-Location
Write-Host "Bootstrap finished."
