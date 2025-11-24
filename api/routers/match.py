from fastapi import APIRouter

router = APIRouter()

@router.get("/{tender_id}")
async def match(tender_id: str):
    """Supplier matching placeholder. UI calls GET `/match/{id}` and expects `suppliers` in response.
    """
    # Return a small example list so UI can render without errors.
    return {
        "status": "matched",
        "tender_id": tender_id,
        "suppliers": [
            {"name": "Supplier A", "score": 0.85},
            {"name": "Supplier B", "score": 0.72},
        ],
    }
