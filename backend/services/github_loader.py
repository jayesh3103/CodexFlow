import requests
import base64
from typing import Tuple

GITHUB_TOKEN = "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"  # fine-grained or classic

def parse_github_url(url: str) -> Tuple[str, str]:
    parts = url.rstrip("/").split("/")
    owner = parts[-2]
    repo = parts[-1]
    return owner, repo

def fetch_file_content(repo_url: str, file_path: str) -> str:
    owner, repo = parse_github_url(repo_url)
    file_path = file_path.replace("blob/main/", "").lstrip("/")

    # IMPORTANT: file_path must NOT contain `blob/main`
    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{file_path}"

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }

    response = requests.get(api_url, headers=headers)

    if response.status_code != 200:
        raise Exception(f"GitHub API error {response.status_code}: {response.text}")

    data = response.json()
    return base64.b64decode(data["content"]).decode("utf-8")
