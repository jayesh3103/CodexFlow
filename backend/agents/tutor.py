from typing import Dict, Any, List
from services.ai_service import ai_service

class Tutor:
    def create_lesson(self, analysis_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generates educational content (Chapters + Quiz) based on the code analysis.
        Uses the AIService (Gemini) to generate content.
        """
        # Limit the raw code sent to avoid token limits if necessary (Gemini has large window though)
        # For now, we pass the full analysis data which includes definitions and imports.
        
        # In the future, if analysis_data['raw_code'] is too huge, truncate it here.
        # analysis_data['raw_code'] = analysis_data['raw_code'][:10000] 

        return ai_service.generate_lesson_content(analysis_data)
