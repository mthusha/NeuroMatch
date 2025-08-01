import React, { useState, useEffect, useCallback } from 'react';
import AvatarPanel from './../components/interview_componets/avatar/AvatarPanel';
import ChatPanel from './../components/interview_componets/chat/ChatPanel';
import { useAuth } from "../../../context/AuthContext";
import { fetchFirstQuestionApi, sendAnswerApi } from '../../../api/Interview';

const InterviewPanel = () => {
  const [conversation, setConversation] = useState([]);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const { user } = useAuth();
  const email = user?.email || '';

  const playAudio = useCallback((audioBase64) => {
    if (!audioBase64) return;
    try {
      const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
      audio.play().catch(err => console.error('Audio play failed:', err));
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  }, []);

  

 const fetchFirstQuestion = useCallback(async () => {
    try {
      const response = await fetchFirstQuestionApi(email);
      
      if (response.statusCode === 200) {
        setSessionId(response.data.sessionId);
        
        const newMessage = { 
          speaker: 'ai', 
          text: response.data.question,
          audioBase64: response.data.audioBase64 
        };
        
        setConversation(prev => [...prev, newMessage]);
        playAudio(response.data.audioBase64);
      } else {
        throw new Error(response.statusMessage || 'Failed to fetch question');
      }
    } catch (err) {
      console.error('Error fetching first question:', err);
      const errorMessage = {
        speaker: 'ai',
        text: "Sorry, I couldn't load the first question. Please try again."
      };
      setConversation(prev => [...prev, errorMessage]);
    }
  }, [email, playAudio]);


  const sendAnswer = useCallback(async (answer) => {
    if (!sessionId || !answer) return;

    try {
      const response = await sendAnswerApi(sessionId, answer);
      
      if (response.statusCode === 200) {
        const aiResponse = {
          speaker: 'ai',
          text: response.data.response,
          audioBase64: response.data.audioBase64
        };
        
        setConversation(prev => [...prev, aiResponse]);
        playAudio(response.data.audioBase64);

        // Handle session expiration
        if (response.data.response.includes("Session not found")) {
          setSessionId(null);
          setInterviewStarted(false);
        }
      } else {
        throw new Error(response.statusMessage || 'Failed to process answer');
      }
    } catch (err) {
      console.error('Error sending answer:', err);
      const fallbackMessage = {
        speaker: 'ai',
        text: 'Interesting. Can you tell me more about that?'
      };
      setConversation(prev => [...prev, fallbackMessage]);
    }
  }, [sessionId, playAudio]);


  useEffect(() => {
    if (!interviewStarted) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setLiveTranscript(interimTranscript);

      if (finalTranscript) {
        const userMessage = { speaker: 'user', text: finalTranscript };
        setConversation(prev => [...prev, userMessage]);
        setLiveTranscript('');
        sendAnswer(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    if (isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isRecording, sendAnswer, interviewStarted]);

  const startInterview = () => {
    setInterviewStarted(true);
    setConversation([]);
    fetchFirstQuestion();
  };

  const toggleRecording = () => {
    if (!interviewStarted) return;
    setIsRecording(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1">
        <div className="w-3/4">
          <AvatarPanel />
        </div>

        <ChatPanel
          conversation={conversation}
          isRecording={isRecording}
          toggleRecording={toggleRecording}
          liveTranscript={liveTranscript}
          interviewStarted={interviewStarted}
          startInterview={startInterview}
        />
      </div>
    </div>
  );
};

export default InterviewPanel;
