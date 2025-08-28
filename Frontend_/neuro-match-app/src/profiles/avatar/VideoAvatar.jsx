import React, { useEffect, useRef } from "react";

const phases = {
  starting: ["starting1.png", "starting2.png"],
  asking: ["asking1.png", "asking2.png"],
  finishing: ["finishing1.png", "finishing2.png"],
};

export default function VideoAvatar({ phase = "starting", duration = 3000, audioBase64 }) {
  // const [currentImg, setCurrentImg] = useState(phases[phase][0]);
  const intervalRef = useRef(null);
  useEffect(() => {
    const images = phases[phase] || phases.starting;
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % images.length;

      // setCurrentImg(images[idx]);
    }, duration);

    return () => clearInterval(intervalRef.current);
  }, [phase, duration]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
       <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at center, rgb(255, 255, 255), transparent 70%)",
          animation: "pulse 6s infinite alternate",
          zIndex: 0,
        }}
      />
      {/* <video
        src={`/static/interview/123456.mp4`}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(45px) brightness(0.6)", 
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      /> */}

      {/* 🔹 Centered main video */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
           overflow: "hidden",
        }}
      >
        <video
          src={`/static/interview/Hailuo2.mp4`}
          autoPlay
          loop
          muted
          playsInline
          style={{
          // width: "100%",
          height: "100%",
          objectFit: "fill",
          // position: "absolute",
          top: 0,
          left: 0,
          outline: "none",     
          userSelect: "none",  
          pointerEvents: "none", 
          backgroundColor: "black",
        }}
        tabIndex={-1} 
        controls={false}
        />
      </div>
    </div>
  );
}
