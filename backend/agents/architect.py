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
        class_nodes = {} # Store class positions to help layout methods
        
        for i, defn in enumerate(definitions):
            node_id = f"def_{i}"
            def_type = defn.get("type", "function")
            name = defn.get("name", "unknown")
            parent = defn.get("parent")
            
            # Styling based on type
            style = {}
            if def_type == "class":
                style = { "background": "#e1f5fe", "border": "1px solid #0288d1", "width": 180 }
            elif def_type == "function":
                style = { "background": "#f3e5f5", "border": "1px solid #7b1fa2", "width": 150 }
            
            # Basic Layout Logic
            x_pos = 100
            y_pos = 100
            
            if def_type == "class":
                x_pos = 250 + (len(class_nodes) * 250)
                y_pos = 200
                class_nodes[name] = { "x": x_pos, "y": y_pos, "child_count": 0 }
            elif parent and parent in class_nodes:
                # Position method relative to parent class
                p_info = class_nodes[parent]
                p_info["child_count"] += 1
                x_pos = p_info["x"] + 20
                y_pos = p_info["y"] + (p_info["child_count"] * 80)
            else:
                # Standalone functions
                x_pos = 100
                y_pos = 200 + (i * 80)

            nodes.append({
                "id": node_id,
                "type": "default",
                "data": { "label": f"{def_type}: {name}" },
                "position": { "x": x_pos, "y": y_pos },
                "style": style
            })
            
            # Edges
            if parent:
                # Find parent node id (inefficient O(N^2) but fine for small files)
                parent_id = next((f"def_{idx}" for idx, d in enumerate(definitions) if d["name"] == parent), file_node_id)
                edges.append({
                    "id": f"e_{parent_id}_{node_id}",
                    "source": parent_id,
                    "target": node_id,
                    "animated": True,
                    "style": { "stroke": "#7b1fa2" }
                })
            else:
                 # Link to main file if no parent class
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
                "position": { "x": 50 + (i * 150), "y": 600 }, # Move imports to bottom
                 "style": { "background": "#fff3e0", "border": "1px solid #ef6c00" }
            })
            
            # Link file to imports
            edges.append({
                "id": f"e_imp_{i}",
                "source": file_node_id,
                "target": imp_id,
                "style": { "stroke": "#ef6c00", "strokeDasharray": "5,5" }
            })
            
        return {
            "nodes": nodes,
            "edges": edges
        }
