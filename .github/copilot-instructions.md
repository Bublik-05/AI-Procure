# Copilot instructions for AI coding agents

This file summarizes the concrete, discoverable patterns in the AI-Procure codebase to help an AI coding assistant be immediately productive.

**Architecture:**
- **Backend:** `api/` — FastAPI app entry is `api/main.py` which includes routers from `api/routers/*`.
- **Frontend:** `ui/` — React + Vite app in `ui/` with `ui/src` components and `ui/src/services/api.js` for HTTP calls.
- **Service boundary:** Frontend talks to the backend over HTTP; the frontend uses `import.meta.env.VITE_API_URL` as `BASE`.

**Key files to inspect:**
- `api/main.py` — registers routers with `app.include_router(...)`.
- `api/routers/*.py` — endpoint definitions (upload, parse, extract, match, risk).
- `api/services/upload_service.py` — saves uploaded files to `data/raw` using a UUID-prefixed filename and returns the `file_id`.
- `ui/src/services/api.js` — frontend service functions: `uploadTender`, `parseTender`, `extractTender`, `matchSuppliers`, `getRisk`.
- `ui/src/components/UploadForm.jsx` — example of FormData upload and expected response shape (`result.tender_id`).

**Concrete patterns & examples**
- API endpoints: the UI calls `${BASE}/upload`, `${BASE}/parse/:id`, `${BASE}/extract/:id`, `${BASE}/match/:id`, `${BASE}/risk/:id` (see `ui/src/services/api.js`).
- Upload payload: frontend sends a `FormData` with key `file` (see `UploadForm.jsx` and `uploadTender`).
- File storage: backend `save_file(file)` writes to `data/raw` and returns a UUID string (see `upload_service.py`).
- Router registration: `api/main.py` includes routers with prefixes (e.g. `prefix="/upload"`). Note: some routers also set their own `prefix` inside the module (see `parse.py`), so confirm the final route path when adding endpoints.

**Known inconsistent or surprising details discovered**
- `api/routers/upload.py` defines a POST handler `@router.post("/upload")` while `api/main.py` includes the router with `prefix="/upload"`. This can produce `/upload/upload` endpoints — verify the active path before calling or changing routes.
- `ui/src/components/UploadForm.jsx` expects `result.tender_id` from the upload response, but backend upload route currently contains a placeholder (`...`) — check and align response keys.

**Developer workflows & commands**
- Start backend (PowerShell):
  - `pip install -r requirements.txt` (if requirements exist) then:
  - `uvicorn api.main:app --reload --host 0.0.0.0 --port 8000`
- Start frontend (PowerShell) from `ui/`:
  - `cd ui; npm install; npm run dev`
- Build frontend:
  - `cd ui; npm run build`
- Lint frontend:
  - `cd ui; npm run lint`

**One-command dev (Windows)**
- A convenience script `bootstrap.ps1` is provided in the repo root to install dependencies and launch both servers.
- Usage (PowerShell, from repo root): `./bootstrap.ps1` — it will:
  - create and activate a Python venv (`.venv`) and install `requirements.txt`;
  - install frontend deps in `ui/` with `npm install`;
  - create `ui/.env` with `VITE_API_URL=http://localhost:8000` if missing;
  - call `dev.ps1` which starts `uvicorn` and `npm run dev` in separate windows.

If you prefer a cross-platform npm-based launcher, consider adding a root `package.json` and using `concurrently`.

**Conventions to follow when coding here**
- Use FastAPI routers; register new endpoints in `api/routers` and include them in `api/main.py`.
- Keep JSON response shapes consistent with what frontend components expect (search for `result.` usages in `ui/src/components` to confirm keys).
- Frontend services consistently call `res.json()`; add explicit error handling if returning non-JSON or error status.
- Use `data/raw` for persisted uploaded files; use `upload_service.save_file` conventions (UUID prefix).

**Integration points & environment**
- Frontend uses `VITE_API_URL` — ensure `ui/.env` or the environment sets this to `http://localhost:8000` (or target host).
- There is a small JS helper in `api/services/api.js` that also points to `http://localhost:8000/upload` — check for duplicate or legacy API client code when modifying API behavior.

If anything here is unclear or you want examples added (e.g., exact expected JSON shapes for each endpoint, more router examples, or a suggested fix for the `/upload` duplication), tell me which parts to expand and I'll update this file.
