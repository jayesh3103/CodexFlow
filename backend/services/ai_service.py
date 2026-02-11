import google.generativeai as genai
from config import config
import json

class AIService:
    def __init__(self):
        if not config.GEMINI_API_KEY:
            print("Warning: GEMINI_API_KEY not found in environment variables.")
        else:
            genai.configure(api_key=config.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-2.0-flash')

    def generate_lesson_content(self, code_analysis: dict) -> dict:
        """
        Generates lesson content using Gemini based on the code analysis.
        Returns a dictionary with 'chapters' and 'quiz'.
        """
        if not config.GEMINI_API_KEY:
            return self._get_fallback_content()

        prompt = f"""
        You are an expert coding tutor. Analyze the following code metadata and generate a structured lesson.
        
        Code Metadata:
        {json.dumps(code_analysis, indent=2)}

        Output Format (JSON):
        {{
            "chapters": [
                {{ "title": "Section Title", "content": "Detailed explanation..." }}
            ],
            "quiz": [
                {{
                    "question": "Question text?",
                    "options": [
                        {{ "text": "Option A", "id": "a" }},
                        {{ "text": "Option B", "id": "b" }}
                    ],
                    "answer": "correct_id"
                }}
            ]
        }}
        
        Generate 3 chapters (Introduction, detailed logic explanation, best practices) and 2 quiz questions.
        Ensure the content is specific to the code provided.
        """

        try:
            response = self.model.generate_content(prompt)
            # Clean up potential markdown code blocks in response
            text = response.text.replace("```json", "").replace("```", "")
            return json.loads(text)
        except Exception as e:
            print(f"AI Generation failed: {e}")
            return self._get_fallback_content()

    def _get_fallback_content(self):
        """Returns mock data if AI fails or is not configured."""
        return {
            "chapters": [
                {
                    "title": "AI Unavailable",
                    "content": "Please configure GEMINI_API_KEY in backend/.env to get real AI-generated lessons."
                }
            ],
            "quiz": []
        }

ai_service = AIService()
