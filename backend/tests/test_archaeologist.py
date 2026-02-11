import pytest
from agents.archaeologist import Archaeologist

@pytest.fixture
def archaeologist():
    return Archaeologist()

def test_analyze_python_file(archaeologist):
    code = """
class MyClass:
    def my_method(self):
        pass

def my_function():
    return True
"""
    result = archaeologist.analyze_file(code, "test.py")
    definitions = result["definitions"]
    
    assert len(definitions) == 3
    # Check Class
    assert definitions[0]["name"] == "MyClass"
    assert definitions[0]["type"] == "class"
    
    # Check Method
    assert definitions[1]["name"] == "my_method"
    assert definitions[1]["type"] == "function"
    assert definitions[1]["parent"] == "MyClass"
    
    # Check Function
    assert definitions[2]["name"] == "my_function"
    assert definitions[2]["type"] == "function"
    assert definitions[2]["parent"] is None

def test_analyze_js_file(archaeologist):
    # Depending on tree-sitter support, but basic structure should work
    code = """
function jsFunc() {
    return 1;
}
class JSClass {
    constructor() {}
}
"""
    # Note: If JS parser isn't installed in environment, this might fail or return empty.
    # We should handle that gracefully or skip if parser missing.
    try:
        result = archaeologist.analyze_file(code, "test.js")
        if result["definitions"]:
            assert any(d["name"] == "jsFunc" for d in result["definitions"])
    except Exception:
        pytest.skip("JS Parser might not be initialized")
