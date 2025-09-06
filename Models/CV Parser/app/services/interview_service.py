import google.generativeai as genai
from ..config import CONFIG
from typing import Dict
import uuid

genai.configure(api_key=CONFIG["api_key"])
model = genai.GenerativeModel(CONFIG["model_name"])

# chat_sessions will store: { session_id: { "chat": chat, "question_count": int } }
chat_sessions = {}

class InterviewService:

    MAX_QUESTIONS = 10

    @staticmethod
    def start_general_interview(request_data: Dict) -> Dict:
        """Handles general interviews (when no job ID is provided)"""
        cv_data = request_data.get("cv_data")
        session_id = str(uuid.uuid4())
        chat = model.start_chat()

        chat_sessions[session_id] = {
            "chat": chat,
            "question_count": 1,
            "max_questions": request_data.get("numberOfQuestions", 10),
            "interview_type": "general"
        }

        prompt = f"""
You are a technical interviewer. 
Your name is "Neuro". 
Begin with your introduction and ask the candidate to introduce themselves.

CV: {cv_data} 

At the end of your response, on a separate line, include a JSON object like this exactly:

{{ score: null, expected_time: <time in seconds> }}
"""
        response = chat.send_message(prompt)
        return {
            "session_id": session_id,
            "question": response.text.strip()
        }
    
    @staticmethod
    def start_job_specific_interview(request_data: Dict) -> Dict:
        """Handles job-specific interviews"""
        session_id = str(uuid.uuid4())
        chat = model.start_chat()

        chat_sessions[session_id] = {
            "chat": chat,
            "question_count": 1,
            "max_questions": request_data.get("numberOfQuestions", 10),
            "interview_type": "job-specific",
            "type": request_data.get("type"),
            "custom_parameters": request_data.get("customParameters"),
            "candidate_name": request_data.get("candidateName"),
            "candidate_bio": request_data.get("candidateBio"),
            "company_name": request_data.get("companyName"),
            "company_description": request_data.get("companyDescription"),
            "job_title": request_data.get("jobTitle"),
            "job_description": request_data.get("jobDescription"),
            "job_requirements": request_data.get("jobRequirement"),
        }

        candidate_name = request_data.get("candidateName", "")
        candidate_bio = request_data.get("candidateBio", "")
        company_name = request_data.get("companyName", "")
        company_desc = request_data.get("companyDescription", "")
        job_title = request_data.get("jobTitle", "a position")
        job_desc = request_data.get("jobDescription", "")
        job_reqs = request_data.get("jobRequirement", "")

        prompt = f"""
You are conducting a technical interview for {job_title}{f" at {company_name}" if company_name else ""}.

{f"Candidate name: {candidate_name}" if candidate_name else ""}
{f"Candidate bio: {candidate_bio}" if candidate_bio else ""}
{f"Company description: {company_desc}" if company_desc else ""}
{f"Job description: {job_desc}" if job_desc else ""}
{f"Job requirements: {job_reqs}" if job_reqs else ""}

Begin with your introduction (your name is "Neuro") and greet the candidate by name if available. 
ONLY ask them to introduce themselves. DO NOT ask any other interview question yet.


At the end of your response, on a separate line, include a JSON object like this exactly:

{{ score: null, expected_time: <time in seconds> }}
""".strip()

        response = chat.send_message(prompt)
        return {
            "session_id": session_id,
            "question": response.text.strip()
        }


    @staticmethod
    def continue_interview(session_id: str, candidate_answer: str) -> str:
        session = chat_sessions.get(session_id)
        if not session:
            return "Session not found. Please start a new interview."
        chat = session["chat"]
        question_count = session["question_count"]
        max_questions = session.get("numberOfQuestions", InterviewService.MAX_QUESTIONS)

        if question_count >= max_questions:
            end_prompt = f"""
The candidate answered: {candidate_answer}

Provide:
- A short final feedback summary on the candidate’s overall performance as your interviewer and finish interview.
- DO NOT ask another question.
- End with: {{ final_score: <average out of 10>, message: "Interview complete" }}
"""
            response = chat.send_message(end_prompt)
            chat_sessions.pop(session_id, None)
            return response.text.strip()

        prompt = f"""
The candidate answered: {candidate_answer}

Provide:
- Short feedback on the candidate's answer as your interviewer.
- The next interview question in the same paragraph.
- At the very end, on a new line, put: {{ score: <out of 10>, expected_time: <seconds> }}
"""
        response = chat.send_message(prompt)

        session["question_count"] += 1

        return response.text.strip()
