# CodexFlow

An AI-powered agentic coding platform that helps users understand codebases through interactive lessons and visualizations.

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Python 3.10+**
- **Node.js 18+** & **npm**

### 🛠️ Backend Setup

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Create a virtual environment (optional but recommended):

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4.  Configure Environment:
    - Copy `.env.example` to `.env`
    - Add your Gemini API Key:

    ```bash
    cp .env.example .env
    # Edit .env and set GEMINI_API_KEY
    ```

5.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.
    Swagger Docs: `http://localhost:8000/docs`.

### 🎨 Frontend Setup

1.  Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will be running at `http://localhost:5173`.

## 🧪 Running Tests

To verify the backend logic:

```bash
# From the root directory
pytest backend/tests
```
