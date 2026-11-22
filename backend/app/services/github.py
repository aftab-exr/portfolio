import re
from typing import Any, Dict, Optional
import httpx

GITHUB_REPO_RE = re.compile(
    r"github\.com/(?P<owner>[A-Za-z0-9_.-]+)/(?P<repo>[A-Za-z0-9_.-]+?)(?:\.git|/|$)"
)


def parse_github_repo(url: str) -> Optional[tuple[str, str]]:
    match = GITHUB_REPO_RE.search(url.strip())
    if not match:
        return None
    return match.group("owner"), match.group("repo")


async def fetch_repo_context(github_url: str) -> Dict[str, Any]:
    parsed = parse_github_repo(github_url)
    if not parsed:
        return {"found": False, "reason": "Non-standard or unparseable GitHub URL"}

    owner, repo = parsed
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "Portfolio-AI-Builder",
    }

    context: Dict[str, Any] = {
        "found": False,
        "owner": owner,
        "repo": repo,
        "description": "",
        "language": "",
        "topics": [],
        "homepage": "",
        "readme_excerpt": "",
    }

    async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
        try:
            meta_resp = await client.get(
                f"https://api.github.com/repos/{owner}/{repo}",
                headers=headers,
            )
            if meta_resp.status_code == 200:
                data = meta_resp.json()
                context["found"] = True
                context["description"] = data.get("description") or ""
                context["language"] = data.get("language") or ""
                context["topics"] = data.get("topics") or []
                context["homepage"] = data.get("homepage") or ""
        except Exception:
            pass

        for branch in ("main", "master"):
            try:
                readme_resp = await client.get(
                    f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md",
                    headers=headers,
                )
                if readme_resp.status_code == 200 and readme_resp.text.strip():
                    context["found"] = True
                    context["readme_excerpt"] = readme_resp.text.strip()[:5000]
                    break
            except Exception:
                continue

    return context
