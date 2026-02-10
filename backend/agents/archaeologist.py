from services.ast_parser import parser_service



class Archaeologist:
    def analyze_file(self, code: str, file_path: str):
        """
        Extracts structural information from the code using AST parsing.
        """
        # In a real system, this would use an LLM or complex static analysis.
        # Here we use the Tree-sitter parser wrapper.
        definitions = parser_service.extract_definitions(code, file_path)
        
        # Add basic import extraction (simplified)
        imports = []
        for line in code.splitlines():
            if line.strip().startswith("import ") or line.strip().startswith("from "):
                imports.append(line.strip())
            if line.strip().startswith("include "): # C/C++
                imports.append(line.strip())

        return {
            "definitions": definitions,
            "imports": imports,
            "raw_code": code
        }
