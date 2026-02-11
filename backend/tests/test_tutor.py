import pytest
from unittest.mock import patch
from agents.tutor import Tutor

@pytest.fixture
def tutor():
    return Tutor()

@patch("agents.tutor.ai_service")
def test_create_lesson_calls_ai_service(mock_ai_service, tutor, mock_code_analysis):
    # Setup mock return
    expected_response = {
        "chapters": [{"title": "Mock Chapter", "content": "Content"}],
        "quiz": []
    }
    mock_ai_service.generate_lesson_content.return_value = expected_response
    
    # Call method
    result = tutor.create_lesson(mock_code_analysis)
    
    # Verify it called the service with correct data
    mock_ai_service.generate_lesson_content.assert_called_once_with(mock_code_analysis)
    assert result == expected_response
