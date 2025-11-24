from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import upload, parse, extract, match, risk

app = FastAPI()

# Allow cross-origin requests from the frontend during development.
# In production, restrict `allow_origins` to specific origins.
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(upload.router, prefix="/upload")
app.include_router(parse.router, prefix="/parse")
app.include_router(extract.router, prefix="/extract")
app.include_router(match.router, prefix="/match")
app.include_router(risk.router, prefix="/risk")
