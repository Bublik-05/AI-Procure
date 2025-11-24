from fastapi import APIRouter

router = APIRouter()

@router.get("/{tender_id}")
async def parse_document(tender_id: str):
    """Parse placeholder: UI calls GET `/parse/{id}`.

    Adjust implementation to return parsed data for `tender_id`.
    """
    return {"parsed": True, "tender_id": tender_id}
