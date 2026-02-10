from typing import Dict, Any, List

class Tutor:
    def create_lesson(self, analysis_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generates educational content (Chapters + Quiz) based on the code analysis.
        Uses mocked LLM responses for the MVP.
        """
        definitions = analysis_data.get("definitions", [])
        code_sample = analysis_data.get("raw_code", "")[:200]
        
        # Mock Chapter Generation
        chapters = [
             {
                "title": "Introduction",
                "content": f"This file contains {len(definitions)} main definitions. It appears to be a critical part of the module."
            },
            {
                "title": "Deep Dive",
                "content": "The code structure suggests a focus on modularity. Key components include: " + ", ".join([d['name'] for d in definitions[:3]])
            },
            {
                "title": "Best Practices",
                "content": "Notice how the imports are structured to keep dependencies clear. "
            }
        ]
        
        # Mock Quiz Generation
        quiz = [
            {
                "question": f"What is the primary role of '{definitions[0]['name']}'?" if definitions else "What is the main purpose of this file?",
                "options": [
                    {"text": "Data Transformation", "id": "a"},
                    {"text": "UI Rendering", "id": "b"},
                    {"text": "Network Request", "id": "c"},
                    {"text": "It depends on the context", "id": "d"}
                ],
                "answer": "d"
            },
            {
                "question": "How many major definitions were found?",
                "options": [
                    {"text": str(len(definitions)), "id": "a"},
                    {"text": str(len(definitions) + 5), "id": "b"},
                    {"text": "0", "id": "c"}
                ],
                "answer": "a"
            }
        ]
        
        return {
            "chapters": chapters,
            "quiz": quiz
        }
