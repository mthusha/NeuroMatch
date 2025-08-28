import React, { useEffect, useRef, useState } from "react";

export default function AIAnimation({ audioBase64 }) {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioBase64) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
    // const audio = new Audio("/static/test_audio.mp3");
    audio.crossOrigin = "anonymous"; 

    audio.addEventListener("ended", () => setIsPlaying(false));

    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.75;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    audio.play().then(() => setIsPlaying(true)).catch(console.error);

    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      const amplitude = (canvas.height / 2) * (avg / 128) * 0.8;

      const gradient1 = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient1.addColorStop(0, "#7c3aed");
      gradient1.addColorStop(1, "rgba(124, 58, 237, 0.3)");

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let x = 0; x <= canvas.width; x += 2) {
        const phase = (x * 0.05) + (Date.now() / 800);
        const y = canvas.height / 2 + Math.sin(phase) * amplitude * Math.sin(x * 0.01);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = gradient1;
      ctx.lineWidth = 4;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(124, 58, 237, 0.5)";
      ctx.stroke();

      const gradient2 = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient2.addColorStop(0, "#4f46e5");
      gradient2.addColorStop(1, "rgba(79, 70, 229, 0.3)");

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let x = 0; x <= canvas.width; x += 2) {
        const phase = (x * 0.03) + (Date.now() / 600);
        const y = canvas.height / 2 + Math.cos(phase) * (amplitude * 0.7) * Math.cos(x * 0.015);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = gradient2;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(79, 70, 229, 0.4)";
      ctx.stroke();

      ctx.shadowBlur = 0;
    }

    draw();

    return () => {
      audio.pause();
      audio.src = "";
      if (audioCtx.state !== "closed") audioCtx.close();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [audioBase64]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "20px",
        background: "#ffffff",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "50%",
          display: "block",
          background: "transparent",
          filter: "brightness(1.05)",
        }}
      />
      <div
        style={{
          marginTop: "15px",
          color: isPlaying ? "#7c3aed" : "#4f46e5",
          fontSize: "14px",
          fontFamily: "system-ui, sans-serif",
          fontWeight: "500",
          textShadow: isPlaying ? "0 0 6px rgba(124, 58, 237, 0.4)" : "none",
        }}
      >
        {/* {isPlaying ? "Asking..." : ""} */}
      </div>
    </div>
  );
}
