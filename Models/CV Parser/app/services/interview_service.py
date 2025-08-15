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
        session_id = str(uuid.uuid4())

        # Instead of calling Gemini API, return hardcoded response
        dummy_question = (
            "Hello, I am NeuroMatch. Let's start the interview. "
            "Please introduce yourself briefly. "
            "<feedback and next question in one paragraph>\n"
            "{ score: null, expected_time: 60 }"
        )

        # Store dummy chat session info (if needed for continue)
        chat_sessions[session_id] = {
            "chat": None,  # No real chat object in test mode
            "question_count": 1,
            "max_questions": request_data.get("numberOfQuestions", 10),
            "interview_type": "general"
        }

        return {
            "session_id": session_id,
            "question": dummy_question
        }

    @staticmethod
    def start_job_specific_interview(request_data: Dict) -> Dict:
        session_id = str(uuid.uuid4())

        candidate_name = request_data.get("candidateName", "Candidate")
        job_title = request_data.get("jobTitle", "a position")
        company_name = request_data.get("companyName", "our company")

        dummy_question = (
            f"You are conducting a technical interview for {job_title} at {company_name}. "
            f"Hello {candidate_name}, I am NeuroMatch. Please introduce yourself briefly. "
            "<feedback and next question in one paragraph>\n"
            "{ score: null, expected_time: 60 }"
        )

        # Store dummy chat session info (if needed for continue)
        chat_sessions[session_id] = {
            "chat": None,  # No real chat object in test mode
            "question_count": 1,
            "max_questions": request_data.get("numberOfQuestions", 10),
            "interview_type": "job-specific",
            "type": request_data.get("type"),
            "custom_parameters": request_data.get("customParameters"),
            "candidate_name": candidate_name,
            "candidate_bio": request_data.get("candidateBio"),
            "company_name": company_name,
            "company_description": request_data.get("companyDescription"),
            "job_title": job_title,
            "job_description": request_data.get("jobDescription"),
            "job_requirements": request_data.get("jobRequirement"),
        }

        return {
            "session_id": session_id,
            "question": dummy_question
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
