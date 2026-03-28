# app.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Optional
import uvicorn
import logging

# Import the ML model
from ml_model import iq_predictor

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="IQ Recommendation API", version="1.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class QuizResultRequest(BaseModel):
    score: int
    total: int
    percentage: float
    time_taken: int
    correct_count: int
    wrong_count: int
    category_performance: Optional[Dict] = None

class IQRecommendationResponse(BaseModel):
    iq_score: int
    iq_level: str
    competency_level: str
    description: str
    strengths: list
    areas_for_improvement: list
    color: str
    icon: str
    recommendations: list
    learning_path: dict
    next_steps: list

@app.get("/")
async def root():
    return {
        "message": "IQ Recommendation API",
        "version": "1.0",
        "status": "running",
        "endpoints": {
            "/recommend": "POST - Get IQ recommendation",
            "/health": "GET - Health check"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "IQ Recommendation API"}

@app.post("/recommend", response_model=IQRecommendationResponse)
async def get_recommendation(request: QuizResultRequest):
    """
    Get IQ recommendation based on quiz performance
    """
    try:
        logger.info(f"Recommendation request: score={request.score}/{request.total}, "
                   f"percentage={request.percentage}%, time={request.time_taken}min")
        
        # Get recommendation from ML model
        recommendation = iq_predictor.get_iq_recommendation(
            score=request.score,
            total=request.total,
            percentage=request.percentage,
            time_taken=request.time_taken,
            category_performance=request.category_performance
        )
        
        logger.info(f"Recommendation generated: {recommendation['iq_level']} "
                   f"(IQ: {recommendation['iq_score']})")
        
        return recommendation
        
    except Exception as e:
        logger.error(f"Recommendation error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)