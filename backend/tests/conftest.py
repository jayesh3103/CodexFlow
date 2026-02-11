import sys
import os
import pytest

# Add backend root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

@pytest.fixture
def mock_code_analysis():
    return {
        "definitions": [
            {"name": "TestClass", "type": "class", "parent": None},
            {"name": "test_method", "type": "function", "parent": "TestClass"},
            {"name": "helper_func", "type": "function", "parent": None}
        ],
        "imports": ["os", "sys"],
        "raw_code": "class TestClass:\n    def test_method(self): pass\n\ndef helper_func(): pass"
    }
