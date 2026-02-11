import sys
import os
import unittest
from unittest.mock import patch, MagicMock

# Add backend to path so we can import modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from services.ai_service import AIService
from config import config

class TestAIService(unittest.TestCase):
    
    def test_fallback_when_no_key(self):
        """Test that the service returns fallback data when no API key is configured."""
        # Ensure no key is set for this test
        with patch.object(config, 'GEMINI_API_KEY', None):
            service = AIService()
            result = service.generate_lesson_content({"code": "print('hello')"})
            
            self.assertIn("chapters", result)
            self.assertEqual(result["chapters"][0]["title"], "AI Unavailable")

    @patch('google.generativeai.GenerativeModel')
    def test_generate_content_success(self, mock_model_class):
        """Test that the service parses valid JSON response from the LLM."""
        # Mock the config to have a key
        with patch.object(config, 'GEMINI_API_KEY', 'fake_key'):
            # Mock the model instance and its generate_content method
            mock_model_instance = MagicMock()
            mock_model_class.return_value = mock_model_instance
            
            # Mock the response object
            mock_response = MagicMock()
            mock_response.text = '''
            ```json
            {
                "chapters": [{"title": "Test Chapter", "content": "Content"}],
                "quiz": []
            }
            ```
            '''
            mock_model_instance.generate_content.return_value = mock_response
            
            service = AIService()
            result = service.generate_lesson_content({"code": "print('hello')"})
            
            self.assertEqual(result["chapters"][0]["title"], "Test Chapter")

if __name__ == '__main__':
    unittest.main()
