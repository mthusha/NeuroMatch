import pdfplumber
import re

class CVChecker:
    @staticmethod
    def extract_text(file_path):
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
        return text.lower()

    @staticmethod
    def extract_email(text):
        match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
        return match.group(0) if match else None

    @staticmethod
    def extract_name(text):
        first_line = text.strip().split("\n")[0]
        words = first_line.split()
        if len(words) >= 2:
            return words[0] + " " + words[1]
        return first_line

    @staticmethod
    def calculate_skill_match(cv_text, job_skills):
        found = sum(1 for skill in job_skills if skill.lower() in cv_text.lower())
        return round((found / len(job_skills)) * 100, 2) if job_skills else 0
