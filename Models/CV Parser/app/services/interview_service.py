from typing import Dict

# In-memory session store (mocked)
chat_sessions = {}

class InterviewService:

    @staticmethod
    def start_interview(cv_data: Dict, session_id: str) -> str:
        # Simulate starting an interview without Gemini
        chat_sessions[session_id] = True  

        # Hardcoded first question with expected format
        return (
            "Hi Thusha, welcome! My name is Alex, and I'm a Technical Interviewer at NeuroMatch. "
            "Could you please introduce yourself and share your background in software engineering?\n"
            "{ score: null, expected_time: 120 }"
        )

    @staticmethod
    def continue_interview(session_id: str, candidate_answer: str) -> str:
        if not chat_sessions.get(session_id):
            return "Session not found. Please start a new interview."

        # Hardcoded feedback + next question with expected format
        return (
            "Good explanation of your background, but try to focus more on specific project achievements. "
            "Next question: Can you explain the difference between multithreading and multiprocessing in Java?\n"
            "{ score: 8, expected_time: 90 }"
        )
