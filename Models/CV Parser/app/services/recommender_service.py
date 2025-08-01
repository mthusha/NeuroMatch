SKILL_ALIASES = {
    "js": "javascript",
    "javascript": "javascript",
    "py": "python",
    "python": "python",
    "ml": "machine learning",
    "machine learning": "machine learning",
    "reactjs": "react",
    "react.js": "react",
    "react": "react",
    "sql": "sql",
    "structured query language": "sql",
    "html5": "html",
    "html": "html",
    "css3": "css",
    "css": "css",
}

def normalize_skill(skill: str) -> str:
    skill = skill.strip().lower()
    return SKILL_ALIASES.get(skill, skill) 

def predict_recommendation(user_skills: list, job_skills: list, threshold: float = 0.7):
    try:
        user_skills = set(normalize_skill(s) for s in user_skills if s.strip())
        job_skills = set(normalize_skill(s) for s in job_skills if s.strip())

        if not job_skills:
            return {"recommended": False, "confidence": 0.0}

        overlap = user_skills & job_skills
        match_ratio = len(overlap) / len(job_skills)

        recommended = match_ratio >= threshold

        return {
            "recommended": recommended,
            "confidence": round(match_ratio * 100, 2),
            "matched_skills": list(overlap)
        }

    except Exception as e:
        return {"error": str(e)}

