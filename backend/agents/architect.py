from typing import List, Dict, Any
import random

class Architect:
    def generate_graph(self, analysis_data: Dict[str, Any]) -> Dict[str, List[Any]]:
        """
        Generates a React Flow compatible graph from analysis data.
        """
        definitions = analysis_data.get("definitions", [])
        imports = analysis_data.get("imports", [])
        
        nodes = []
        edges = []
        
        # Create a central node for the File
        file_node_id = "file_main"
        nodes.append({
            "id": file_node_id,
            "type": "input", # React Flow type
            "data": { "label": "File Analysis" },
            "position": { "x": 250, "y": 0 }
        })
        
        # Create nodes for definitions
        for i, defn in enumerate(definitions):
            node_id = f"def_{i}"
            nodes.append({
                "id": node_id,
                "type": "default",
                "data": { "label": f"{defn['type']}: {defn['name']}" },
                "position": { "x": 100 + (i % 3) * 200, "y": 100 + (i // 3) * 100 }
            })
            
            # Link to file
            edges.append({
                "id": f"e_file_{i}",
                "source": file_node_id,
                "target": node_id,
                "animated": True
            })
            
        # Create nodes for imports (limit to 3 for visual clarity in MVP)
        for i, imp in enumerate(imports[:3]):
            imp_id = f"imp_{i}"
            nodes.append({
                "id": imp_id,
                "type": "output",
                "data": { "label": imp },
                "position": { "x": 400 + (i * 150), "y": 300 }
            })
            
            # Link file to imports
            edges.append({
                "id": f"e_imp_{i}",
                "source": file_node_id,
                "target": imp_id,
                "style": { "stroke": "#FF0072" }
            })
            
        return {
            "nodes": nodes,
            "edges": edges
        }
