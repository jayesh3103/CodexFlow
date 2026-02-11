import pytest
from agents.architect import Architect

@pytest.fixture
def architect():
    return Architect()

def test_generate_graph_structure(architect, mock_code_analysis):
    graph = architect.generate_graph(mock_code_analysis)
    
    nodes = graph["nodes"]
    edges = graph["edges"]
    
    # Check Nodes existence
    labels = [n["data"]["label"] for n in nodes]
    assert "class: TestClass" in labels
    assert "function: test_method" in labels
    assert "function: helper_func" in labels
    
    # Check Edges
    # helper_func should link to main file (or have no parent edge if we strictly follow logic)
    # test_method should link to TestClass
    
    # Find IDs
    class_node = next(n for n in nodes if "TestClass" in n["data"]["label"])
    method_node = next(n for n in nodes if "test_method" in n["data"]["label"])
    
    # Verify Parent-Child Edge
    edge_exists = any(
        e["source"] == class_node["id"] and e["target"] == method_node["id"] 
        for e in edges
    )
    assert edge_exists, "Edge between Class and Method missing"

def test_graph_styling(architect, mock_code_analysis):
    graph = architect.generate_graph(mock_code_analysis)
    nodes = graph["nodes"]
    
    class_node = next(n for n in nodes if "TestClass" in n["data"]["label"])
    method_node = next(n for n in nodes if "test_method" in n["data"]["label"])
    
    # Check distinct styles
    assert class_node["style"]["background"] != method_node["style"]["background"]
