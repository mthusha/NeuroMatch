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

        prompt = f"""You are a technical interviewer. Begin the interview by introducing yourself, mentioning your name and role, and welcoming the candidate.

Then, based on the following CV, ask the candidate to introduce themselves as your first question.
After they respond, you will proceed to ask one technical question at a time, waiting for their answer before continuing.

CV: {cv_data}

Begin now with your introduction and ask for the candidate's self-introduction."""


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
