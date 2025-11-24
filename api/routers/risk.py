from fastapi import APIRouter

router = APIRouter()

@router.get("/{tender_id}")
async def risk(tender_id: str):
    """Risk analysis placeholder. UI calls GET `/risk/{id}` and expects `risks` in response.
    """
    return {
        "status": "risk analyzed",
        "tender_id": tender_id,
        "risks": [{"description": "Potential delivery delay"}],
    }
