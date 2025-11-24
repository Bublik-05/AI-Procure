<#
dev.ps1

Starts backend (uvicorn) and frontend (Vite) for development using a single command.

Usage (PowerShell):
  ./dev.ps1

Requirements:
- `uvicorn` must be available on PATH (from your Python environment).
- `npm` must be available on PATH.

This script launches two separate processes so logs will appear in new windows.
If you prefer jobs instead, modify the script to use `Start-Job`.
#>

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Host "Starting backend (uvicorn) and frontend (npm run dev)..."

# Start backend (new process)
Start-Process -FilePath "uvicorn" -ArgumentList "api.main:app --reload --host 0.0.0.0 --port 8000" -WorkingDirectory $scriptRoot -WindowStyle Normal

# Start frontend (new process)
Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory (Join-Path $scriptRoot "ui") -WindowStyle Normal

Write-Host "Started uvicorn and npm dev server. Use Task Manager or Stop-Process to stop them."
