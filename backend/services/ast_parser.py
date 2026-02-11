from tree_sitter_languages import get_language, get_parser
import os

class AstParser:
    def __init__(self):
        self.parsers = {}
        
    def _get_parser(self, language_name: str):
        if language_name not in self.parsers:
            language = get_language(language_name)
            parser = get_parser(language_name)
            self.parsers[language_name] = parser
        return self.parsers[language_name]
    
    def parse_code(self, code: str, file_extension: str):
        lang_map = {
            ".py": "python",
            ".js": "javascript",
            ".jsx": "javascript",
            ".ts": "typescript",
            ".tsx": "typescript",
            ".java": "java",
            ".cpp": "cpp",
            ".c": "c"
        }
        
        lang = lang_map.get(file_extension.lower())
        if not lang:
            return None  # Unsupported language
            
        parser = self._get_parser(lang)
        tree = parser.parse(bytes(code, "utf8"))
        return tree, lang

    def extract_definitions(self, code: str, file_path: str):
        _, ext = os.path.splitext(file_path)
        result = self.parse_code(code, ext)
        if not result:
            return []
            
        tree, lang = result
        root_node = tree.root_node
        definitions = []
        
        # Simple extraction logic based on node types
        # This is a prototype simplification. Complete queries would be better.
        
        def traverse(node, parent_name=None):
            current_name = parent_name
            
            if node.type in ["function_definition", "class_definition", "function_declaration", "class_declaration"]:
                # Extract name
                name_node = node.child_by_field_name("name")
                if name_node:
                    name = code[name_node.start_byte:name_node.end_byte]
                    
                    def_type = "class" if "class" in node.type else "function"
                    
                    definitions.append({
                        "type": def_type,
                        "name": name,
                        "parent": parent_name,
                        "start_line": node.start_point[0],
                        "end_line": node.end_point[0]
                    })
                    
                    # If this is a class, it becomes the parent for its children
                    if def_type == "class":
                        current_name = name
            
            for child in node.children:
                traverse(child, current_name)
                
        traverse(root_node)
        return definitions

parser_service = AstParser()
