from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    repo_url: str
    file_path: str

class GraphNode(BaseModel):
    id: str
    type: str  # "function" | "class"
    label: Optional[str] = None   
    position: Dict[str, float] = {"x": 0, "y": 0}
    data: Dict[str, Any] = {}


class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None

class GraphData(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

class Chapter(BaseModel):
    title: str
    content: str

class QuizOption(BaseModel):
    text: str
    id: str

class QuizQuestion(BaseModel):
    question: str
    options: List[QuizOption]
    answer: str  # id of the correct option

class AnalyzeResponse(BaseModel):
    graph: GraphData
    chapters: List[Chapter]
    quiz: List[QuizQuestion]
