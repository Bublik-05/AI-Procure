from fastapi import APIRouter, UploadFile, File, HTTPException
from api.services.upload_service import save_file

router = APIRouter()

@router.post("/")
async def upload(file: UploadFile = File(...)):
    """Receive a multipart file, save it and return a JSON `tender_id`.

    Frontend expects `result.tender_id`.
    """
    try:
        file_id = await save_file(file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"tender_id": file_id}
