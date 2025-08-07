import React, { useRef, useEffect, useState } from "react";
import { FaMicrophone, FaPlay } from "react-icons/fa";

const VoiceChatPanel = ({
  conversation,
  isRecording,
  toggleRecording,
  liveTranscript = "",
  interviewStarted,
  startInterview
}) => {
  const chatEndRef = useRef(null);
  const [displayedMessages, setDisplayedMessages] = useState([]);

useEffect(() => {
  if (!conversation.length) return;
  const lastMessage = conversation[conversation.length - 1];
  if (lastMessage.speaker === "ai") {
    let i = 0;
    const charsPerSecond = 120;
    const startTime = performance.now();
    let cursorVisible = true;
    let cursorBlinkTime = 0;

    const animate = (now) => {
      const elapsed = (now - startTime) / 1000; 
      const targetChars = Math.min(
        Math.floor(elapsed * charsPerSecond),
        lastMessage.text.length
      );
      if (now - cursorBlinkTime > 300) {
        cursorVisible = !cursorVisible;
        cursorBlinkTime = now;
      }
      if (targetChars !== i) {
        i = targetChars;
      }
      const currentText = lastMessage.text.slice(0, i);
      setDisplayedMessages([
        ...conversation.slice(0, -1),
        { 
          ...lastMessage, 
          text: currentText + (cursorVisible ? "▋" : "") 
        }
      ]);

      if (i < lastMessage.text.length) {
        requestAnimationFrame(animate);
      } else {
        setDisplayedMessages([...conversation]);
      }
    };
    requestAnimationFrame(animate);
  } else {
    setDisplayedMessages(conversation);
  }
}, [conversation]);





  useEffect(() => {
   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
 }, [displayedMessages]);


  return (
    <div className="fixed right-0 top-0 h-screen w-full md:w-1/3 lg:w-1/4 bg-gradient-to-b from-gray-50 to-gray-100 border-l border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {displayedMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.speaker === "ai" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[90%] p-3 rounded-2xl ${
                msg.speaker === "ai"
                  ? "bg-indigo-100 text-gray-800 rounded-tl-none"
                  : "bg-indigo-600 text-white rounded-tr-none"
              } shadow-sm relative`}
            >
              {msg.speaker === "ai" && (
                <div
                  className="absolute -left-2 top-0 w-0 h-0 
                  border-t-8 border-t-transparent
                  border-r-8 border-r-indigo-100
                  border-b-8 border-b-transparent"
                ></div>
              )}
              {msg.speaker === "user" && (
                <div
                  className="absolute -right-2 top-0 w-0 h-0 
                  border-t-8 border-t-transparent
                  border-l-8 border-l-indigo-600
                  border-b-8 border-b-transparent"
                ></div>
              )}
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}

        {liveTranscript && (
          <div className="flex justify-end">
            <div className="max-w-[80%] p-3 rounded-2xl bg-indigo-600 bg-opacity-70 text-white rounded-tr-none shadow-sm relative">
              <div
                className="absolute -right-2 top-0 w-0 h-0 
                border-t-8 border-t-transparent
                border-l-8 border-l-indigo-600/70
                border-b-8 border-b-transparent"
              ></div>
              <p className="text-sm italic">{liveTranscript}</p>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 md:p-6 flex flex-col items-center justify-center border-t border-gray-200 bg-white min-h-[140px]">
        {!interviewStarted ? (
          <button
              onClick={startInterview}
              className="
                p-5 rounded-full bg-indigo-600 text-white flex items-center justify-center
                transition-transform duration-300 ease-in-out
                hover:scale-110 hover:shadow-lg hover:shadow-indigo-400
                animate-pulse-slow
                "
            >
              <FaPlay className="text-2xl drop-shadow-md" />
            </button>
        ) : (
          <>
            <button
              onClick={toggleRecording}
              className={`p-5 md:p-6 rounded-full flex items-center justify-center ${
                isRecording
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-indigo-600 text-white"
              } transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-200`}
            >
              <FaMicrophone className="text-xl md:text-2xl" />
            </button>

            <div className="mt-3 text-sm text-gray-600 h-[20px] flex items-center justify-center">
              {isRecording ? "Listening... Speak now" : "Press to speak"}
       </div>

            <div className="mt-3 flex space-x-1 h-[24px]">
              {isRecording &&
                [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-4 md:h-6 bg-indigo-600 rounded-full animate-voice"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: "0.8s"
                    }}
                  />
                ))}
            </div>
          </>
        )}
      </div>


      <style jsx>{`
        @keyframes voice {
          0%,
          100% {
            height: 6px;
          }
          50% {
            height: 20px;
          }
        }

        .animate-voice {
          animation: voice infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default VoiceChatPanel;
