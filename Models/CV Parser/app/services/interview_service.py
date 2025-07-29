import google.generativeai as genai
from ..config import CONFIG
from typing import Dict
import uuid

genai.configure(api_key=CONFIG["api_key"])
model = genai.GenerativeModel(CONFIG["model_name"])

# In-memory session store (for demo purposes)
chat_sessions = {}

class InterviewService:

    @staticmethod
    def start_interview(cv_data: Dict, session_id: str) -> str:
        chat = model.start_chat()
        chat_sessions[session_id] = chat

        prompt = f"""You are a technical interviewer. Start an interview based on the following CV. Ask one technical question at a time. Wait for the candidate's response before continuing.

CV: {cv_data}

Begin by asking your first question."""
        response = chat.send_message(prompt)
        return response.text.strip()

    @staticmethod
    def continue_interview(session_id: str, candidate_answer: str) -> str:
        chat = chat_sessions.get(session_id)
        if not chat:
            return "Session not found. Please start a new interview."

        prompt = f"""The candidate answered: {candidate_answer}

Please provide:
1. A score out of 10
2. Feedback on the answer
3. The next interview question"""

        response = chat.send_message(prompt)
        return response.text.strip()
