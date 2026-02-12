from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ml_model import predict_competency

app = FastAPI()

# ✅ ADD CORS MIDDLEWARE HERE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React runs here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model (what frontend sends)
class QuizData(BaseModel):
    score: float
    accuracy: float
    time_taken: float


@app.post("/predict")
def predict(data: QuizData):
    result = predict_competency(
        data.score,
        data.accuracy,
        data.time_taken
    )

    return {
        "predicted_level": result
    }
