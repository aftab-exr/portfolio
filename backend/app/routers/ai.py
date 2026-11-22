from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth import verify_owner
from app.database import get_db
from app.schemas import (
    EnhanceProjectRequest,
    EnhanceProjectResponse,
    PortfolioChatRequest,
    PortfolioChatResponse,
)
from app.services.ai_service import chat_with_portfolio, enhance_project_with_ai

router = APIRouter(prefix="/api/ai", tags=["AI"])


@router.post(
    "/enhance-project",
    response_model=EnhanceProjectResponse,
    dependencies=[Depends(verify_owner)],
)
async def enhance_project(payload: EnhanceProjectRequest):
    return await enhance_project_with_ai(payload)


@router.post("/chat", response_model=PortfolioChatResponse)
def portfolio_chat(payload: PortfolioChatRequest, db: Session = Depends(get_db)):
    return chat_with_portfolio(
        message=payload.message,
        history=payload.history,
        db=db,
    )
