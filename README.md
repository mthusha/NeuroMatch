NeuroMatch

NeuroMatch is an AI-powered recruitment platform designed to simplify hiring for companies and improve interview preparation for job seekers. The system integrates AI-based CV parsing, candidate-job matching, and virtual AI-driven interviews with scoring, chat, and video analysis.

Features

User Management: Register as Job Seeker or Employer, login with email or Google OAuth.

Job Posting & Recommendation: Post jobs and recommend candidates automatically using AI.

CV Upload & Parsing: Extract structured information from candidate CVs for analysis.

AI Interview Module: Conduct virtual interviews with automated Q&A, scoring, voice synthesis, and eye tracking.

Interview Results Dashboard: Visualize performance through charts, trends, and session summaries.

Notifications: Email and in-app notifications for job updates and interview results.

Multi-Payment Handling: (If integrated) Track payments for premium services.

Technology Stack
Backend (Java Spring Boot)

Spring Boot for REST API

Spring Security & JWT for authentication

Spring Data JPA with MySQL for database management

Google OAuth2 for login integration

Azure & ElevenLabs for Text-to-Speech (TTS) in interviews

Email Notifications via SMTP

application.properties Sample Configuration

spring.application.name=NeuroMatch
server.port=8084
server.address=0.0.0.0

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/neuromatch?useSSL=false
spring.datasource.username=root
spring.datasource.password=admin
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false

# Google OAuth2
spring.security.oauth2.client.registration.google.client-id=YOUR_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_CLIENT_SECRET
spring.security.oauth2.client.registration.google.scope=profile,email

# File Upload
interview.file.path=interview/video
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=500MB
spring.servlet.multipart.max-request-size=500MB

# Azure TTS
azure.tts.key=YOUR_AZURE_KEY
azure.tts.region=southeastasia

# ElevenLabs TTS
elevenlabs.tts.key=YOUR_ELEVENLABS_KEY
elevenlabs.voice.id=21m00Tcm4TlvDq8ikWAM
elevenlabs.api.url=https://api.elevenlabs.io/v1/text-to-speech

# Email
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_EMAIL
spring.mail.password=YOUR_EMAIL_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.protocol=smtp


AI Server (Python Flask)

Handles AI-powered CV parsing, interview question generation, candidate scoring, and recommendation logic.

config.py Sample
CONFIG = {
    "api_key": "YOUR_GOOGLE_API_KEY",
    "model_name": "gemini-1.5-flash-latest",
    "rate_limit": 60,  # seconds
    "max_retries": 3,
    "upload_folder": "uploads"
}

Installation
Java Backend

Clone the repository:
git clone https://github.com/yourusername/neuromatch.git
cd neuromatch/backend
Configure application.properties with your local MySQL credentials, OAuth2, TTS, and email settings.

Build and run:
./mvnw clean install
./mvnw spring-boot:run

Python AI Server

Navigate to AI server directory:
cd neuromatch/ai_server

cd neuromatch/ai_server
pip install -r requirements.txt

Install dependencies:

pip install -r requirements.txt

Configure config.py with API keys and upload folder.

Start the server:
python app.py

Usage

Access the frontend at http://localhost:3000 (if React frontend is used).

Register as a Job Seeker or Employer.
Upload CVs, post jobs, and schedule AI interviews.
Admins or employers can view AI-generated results, scores, and trends.
Testing
Frontend: Avatar animations, voice synchronization, eye tracking, responsive UI, single-threaded performance.
Backend: API endpoints for authentication, job posting, recommendations, and notifications.
AI Server: CV parsing, scoring, and interview simulations.
Note: Eye-tracking and heavy real-time calculations may block the single-threaded JS UI; test performance under load.
Future Recommendations
Real-time chat during interviews.
Live video conference interviews.
Full HRMS integration for employee management.
Multi-language support for AI interview questions and voice synthesis.

Project Structure
neuromatch/
│
├─ backend/        # Java Spring Boot server
├─ ai_server/      # Python AI server
├─ frontend/       # React frontend
└─ docs/           # Proposal, test cases, Gantt chart, appendix
