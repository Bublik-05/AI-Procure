from fastapi import APIRouter

router = APIRouter()

@router.get("/{tender_id}")
async def extract(tender_id: str):
    """Extraction placeholder: UI calls GET `/extract/{id}`.
    """
    return {"status": "extracted", "tender_id": tender_id}
