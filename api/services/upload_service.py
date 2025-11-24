import uuid
import shutil
from pathlib import Path

UPLOAD_DIR = Path("data/raw")

async def save_file(file):
    file_id = str(uuid.uuid4())
    output_path = UPLOAD_DIR / f"{file_id}_{file.filename}"

    # Ensure the upload directory exists to avoid FileNotFoundError.
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    # Write file content to disk. `file` is a Starlette UploadFile.
    # Using blocking file I/O inside an async function is acceptable for small files,
    # but consider using a threadpool for large uploads in production.
    with open(output_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_id
