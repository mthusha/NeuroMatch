import google.generativeai as genai
import json
import time
from ..config import CONFIG

class GeminiParser:
    def __init__(self):
        genai.configure(api_key=CONFIG["api_key"])
        self.model = genai.GenerativeModel(CONFIG["model_name"])
        self.rate_limit = CONFIG["rate_limit"]
        self.last_call = 0
        self.max_retries = CONFIG["max_retries"]

    def _enforce_rate_limit(self):
        now = time.time()
        if now - self.last_call < self.rate_limit:
            delay = self.rate_limit - (now - self.last_call)
            print(f"Waiting {delay:.1f}s for rate limit...")
            time.sleep(delay)
        self.last_call = time.time()

    def _extract_json_from_response(self, text):
        try:
            start = text.find('{')
            end = text.rfind('}') + 1
            if start == -1 or end == 0:
                return None
            return json.loads(text[start:end])
        except json.JSONDecodeError:
            return None

    def parse_cv(self, cv_text):
        prompt = """Extract ALL information from this CV and return COMPLETE, DETAILED JSON output. Follow these rules:
        1. For experience entries:
           - Never leave position/company as null
           - Merge entries with same duration
           - Include ALL responsibilities
        2. For education:
           - Mark ongoing degrees as "Currently pursuing"
        3. Include ALL projects with full descriptions
        4. Never return null for required fields
        
        Required JSON format:
        {
            "personal_info": {
                "name": "Full name",
                "email": "Email address",
                "phone": "Phone number",
                "languages": ["list", "of", "languages"]
            },
            "skills": {
                "frameworks": ["list"],
                "languages": ["list"],
                "technologies": ["list"]
            },
            "education": [
                {
                    "degree": "Degree name",
                    "institution": "School name",
                    "year": "Graduation year/Status",
                    "awarding_body": "Certifier"
                }
            ],
            "experience": [
                {
                    "position": "Job title",
                    "company": "Company name (or 'Freelance' if none)",
                    "duration": "Employment period",
                    "responsibilities": ["detailed", "list"],
                    "technologies_used": ["list"]
                }
            ],
            "projects": [
                {
                    "name": "Project name",
                    "description": "Full description",
                    "duration": "Project period",
                    "technologies": ["list"],
                    "github_link": "URL if available"
                }
            ],
            "references": [
                {
                    "name": "Reference name",
                    "position": "Their position",
                    "contact": "Email/phone"
                }
            ]
        }

        CV CONTENT:
        """ + cv_text[:6000]

        for attempt in range(self.max_retries):
            try:
                self._enforce_rate_limit()
                print(f"Attempt {attempt + 1}/{self.max_retries}...")
                
                response = self.model.generate_content(
                    prompt,
                    generation_config={
                        "temperature": 0.1
                    }
                )
                
                if response.text:
                    result = self._extract_json_from_response(response.text)
                    if result:
                        return result
                    else:
                        print("Received non-JSON response, retrying...")
            except Exception as e:
                print(f"API Error (attempt {attempt + 1}): {str(e)}")
            
            if attempt < self.max_retries - 1:
                time.sleep(5)
        
        return None