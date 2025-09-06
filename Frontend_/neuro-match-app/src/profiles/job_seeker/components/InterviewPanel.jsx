import React, { useState, useEffect,  useCallback, useRef  } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AvatarPanel from './../components/interview_componets/avatar/AvatarPanel';
import VoiceChatPanel from './../components/interview_componets/chat/VoiceChatPanel';
import { useAuth } from "../../../context/AuthContext";
import { fetchFirstQuestionApi, sendAnswerApi } from '../../../api/Interview';
import { useEyeTracking } from './../../../service/useEyeTracking';
import { completeAssessment  } from "../../../api/scheduledAssessmentService";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const InterviewPanel = () => {
  const [conversation, setConversation] = useState([]);
  // const [liveTranscript, setLiveTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [eyeTrackCameraReady, setEyeTrackCameraReady] = useState(false);
  const countdownRef = useRef(null);
  const [pendingAnswer, setPendingAnswer] = useState('');
  const pendingAnswerRef = useRef(''); 
  const sendTimerRef = useRef(null);
  const { user } = useAuth();
  const query = useQuery();
  const email = user?.email || query.get('email');
  const { jobId } = useParams();
  const finishCallbacksRef = useRef([]);
  const [currentAudioBase64, setCurrentAudioBase64] = useState(null);

  const { eyeDetected, trackingActive, lastDetectionTimeRef } = useEyeTracking(interviewStarted);


  const [avatarAnimation, setAvatarAnimation] = useState("Idle");
  const [facialExpression, setFacialExpression] = useState("default");
  // const lastAiMessageRef = useRef(null);

  
  const playAudio = useCallback((audioBase64) => { 
    if (!audioBase64) return;
    try {
      // const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
      // audio.play().catch(err => console.error('Audio play failed:', err));
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  }, []);

  

 const fetchFirstQuestion = useCallback(async () => {
    try {
      const response = jobId 
        ? await fetchFirstQuestionApi(email, jobId)
        : await fetchFirstQuestionApi(email);
      
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
  }, [email, playAudio, jobId]);


  const sendAnswer = useCallback(async (answer) => {
    if (!sessionId || !answer) return;

    try {

      const response = jobId 
        ? await sendAnswerApi(sessionId, answer, jobId)
        : await sendAnswerApi(sessionId, answer);
      // const response = await sendAnswerApi(sessionId, answer);
      
      if (response.statusCode === 200) {
        const aiResponse = {
          speaker: 'ai',
          text: response.data.response,
          audioBase64: response.data.audioBase64,
          score: response.data.score,
          expectTimeSeconds: response.data.expectTimeSeconds,
          actualTimeSeconds: response.data.actualTimeSeconds
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
        text: 'error'
      };
      setConversation(prev => [...prev, fallbackMessage]);
    }
  }, [sessionId, playAudio, jobId]);


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

      const displayText = `${pendingAnswerRef.current} ${interimTranscript}`.trim();

      setConversation((prev) => {
          if (prev.length > 0 && prev[prev.length - 1].speaker === 'user') {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              text: displayText,
            };
            return updatedMessages;
          } else {
            return [...prev, { speaker: 'user', text: displayText }];
          }
        });


      if (finalTranscript) {
          const updatedAnswer = pendingAnswerRef.current
            ? `${pendingAnswerRef.current} ${finalTranscript}`.trim()
            : finalTranscript;


          setPendingAnswer(updatedAnswer);
          pendingAnswerRef.current = updatedAnswer;

          setConversation((prev) => {
            if (prev.length > 0 && prev[prev.length - 1].speaker === 'user') {
              const updatedMessages = [...prev];
              updatedMessages[updatedMessages.length - 1] = {
                ...updatedMessages[updatedMessages.length - 1],
                text: updatedAnswer,
              };
              return updatedMessages;
            } else {
              return [...prev, { speaker: 'user', text: updatedAnswer }];
            }
          });

          if (sendTimerRef.current) clearTimeout(sendTimerRef.current);
          sendTimerRef.current = setTimeout(() => {
            if (pendingAnswerRef.current) {
              sendAnswer(pendingAnswerRef.current);
              setPendingAnswer('');
              pendingAnswerRef.current = '';
            }
          }, 15000);
        } else {
          if (sendTimerRef.current) {
            clearTimeout(sendTimerRef.current);
          }
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
  }, [isRecording, sendAnswer, interviewStarted, pendingAnswer]);

  useEffect(() => {
    pendingAnswerRef.current = pendingAnswer;
  }, [pendingAnswer]);

  // eye check
  useEffect(() => {
    if (!interviewStarted || !trackingActive) return; 

    const interval = setInterval(() => {
      const timeSinceLastDetection = Date.now() - lastDetectionTimeRef.current;

      if (!eyeDetected && timeSinceLastDetection > 5000 && countdown === null) {
        let timeLeft = 5;
        setCountdown(timeLeft);

        countdownRef.current = setInterval(() => {
          timeLeft -= 1;
          if (timeLeft > 0) {
            setCountdown(timeLeft);
          } else {
            clearInterval(countdownRef.current);
            setCountdown(null);
            if (!eyeDetected) {
              // alert("No eye detected for too long. Stopping interview.");
              // setInterviewStarted(false);
              // setIsRecording(false);
            }
          }
        }, 10);
      }

      if (eyeDetected && countdown !== null) {
        clearInterval(countdownRef.current);
        setCountdown(null);
      }
    }, 10);
     console.log(interviewStarted, trackingActive, eyeDetected, countdown)
    return () => {
      clearInterval(interval);
      clearInterval(countdownRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewStarted, trackingActive, eyeDetected, countdown]);

  useEffect(() => {
    if (trackingActive && !eyeTrackCameraReady) {
      setEyeTrackCameraReady(true);
    }
  }, [trackingActive, eyeTrackCameraReady]);

//   useEffect(() => {
//   const lastMessage = conversation[conversation.length - 1];
//   if (lastMessage?.speaker === 'ai' && lastMessage.audioBase64) {
//     setCurrentAudioBase64(lastMessage.audioBase64);
    
//   }
// }, [conversation]);






  const startInterview = () => {
    setInterviewStarted(true);
    setConversation([]);
    fetchFirstQuestion();
  };

  const toggleRecording = () => {
  if (!interviewStarted) return;
  if (isRecording) {
    if (sendTimerRef.current) clearTimeout(sendTimerRef.current);
    if (pendingAnswerRef.current || pendingAnswer) {
      sendAnswer(pendingAnswerRef.current || pendingAnswer);
      setPendingAnswer('');
      pendingAnswerRef.current = '';
    }
  }

  setIsRecording(prev => !prev);
};
const handleFinish = async () => {
  for (const cb of finishCallbacksRef.current) {
    await cb();
  }
  try {
    await completeAssessment(jobId);
    if (user?.email) {
      window.location.href = "/view-applied-jobs";
    } else if (query.get('email')) {
      window.location.href = "/interview-no-user-completed";
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Failed to complete assessment:", error);
    // user feedback
  }
};

useEffect(() => {
  // console.log("effect conversation:", conversation);
  const lastAiMessage = [...conversation].reverse().find(
    (msg) => msg.speaker === "ai" || "user"
  );
// console.log("picked message:", lastAiMessage);
  if (lastAiMessage) {
    if (lastAiMessage.audioBase64) {
      setCurrentAudioBase64(lastAiMessage.audioBase64);
      setAvatarAnimation(["Talking_0", "Talking_1", "Talking_2"][Math.floor(Math.random() * 3)]);
      setFacialExpression("smile");
    } else {
      setAvatarAnimation("Idle");
      setFacialExpression("default");
    }
  }
}, [conversation]);



  return (
    <div className="flex flex-col h-screen bg-gray-100">
       {/* {trackingActive && !eyeDetected && (
         <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-[99]">
           ⚠ No eye detected — ending in {countdown}s if you don't look back
         </div>
       )} */}

      <div className="flex flex-1">
        <div className="w-3/4">
          <AvatarPanel 
            showCamera={eyeTrackCameraReady}
            // showCamera={false}
            eyeDetected={eyeDetected}
            trackingActive={trackingActive}
            jobId = {jobId}
            onFinish={finishCallbacksRef}
            audioBase64={currentAudioBase64} 
            text={(() => {
              const lastAiMessage = [...conversation].reverse().find(msg => msg.speaker === 'ai');
              return lastAiMessage?.text || '';
            })()}
            score={conversation[conversation.length - 1]?.score}
            expectTime={conversation[conversation.length - 1]?.expectTimeSeconds}
            actualTime={conversation[conversation.length - 1]?.actualTimeSeconds}
            facialExpression={facialExpression}
            avatarAnimation={avatarAnimation}
            // onAudioEnd={() => {
            //     setAvatarAnimation("Idle");
            //     setFacialExpression("default");
            //   }}
            />
        </div>
        <VoiceChatPanel
          conversation={conversation}
          isRecording={isRecording}
          toggleRecording={toggleRecording}
          // liveTranscript={liveTranscript}
          interviewStarted={interviewStarted}
          startInterview={startInterview}
          jobId = {jobId}
           onFinish={handleFinish}
        />
      </div>
    </div>
  );
};

export default InterviewPanel;
