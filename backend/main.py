from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import AnalyzeRequest, AnalyzeResponse, GraphData, Chapter, QuizQuestion
from services.github_loader import fetch_file_content
from agents.archaeologist import Archaeologist
from agents.architect import Architect
from agents.tutor import Tutor

import traceback

app = FastAPI(title="CodexFlow Backend")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For prototype, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Agents
archaeologist = Archaeologist()
architect = Architect()
tutor = Tutor()

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_repo(request: AnalyzeRequest):
    try:
        # 1. Fetch Code
        print(f"Fetching {request.file_path} from {request.repo_url}...")
        code = fetch_file_content(request.repo_url, request.file_path)
        
        # 2. Archaeologist Analysis
        print("Analyzing code structure...")
        analysis_data = archaeologist.analyze_file(code, request.file_path)
        
        # 3. Architect Graph Generation
        print("Generating graph...")
        graph_data_raw = architect.generate_graph(analysis_data)
        
        # 4. Tutor Lesson Generation
        print("Creating lesson content...")
        lesson_data = tutor.create_lesson(analysis_data)
        
        # Assemble Response
        return AnalyzeResponse(
            graph=GraphData(**graph_data_raw),
            chapters=[Chapter(**c) for c in lesson_data["chapters"]],
            quiz=[QuizQuestion(**q) for q in lesson_data["quiz"]]
        )
        
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
