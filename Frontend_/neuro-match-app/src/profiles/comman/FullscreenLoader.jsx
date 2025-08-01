const FullscreenLoader = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(10, 15, 30, 0.95)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    flexDirection: 'column',
    color: '#fff',
    backdropFilter: 'blur(3px)'
  }}>
    <div style={{ 
      position: 'relative',
      width: '120px',
      height: '120px',
      marginBottom: '30px'
    }}>
      {/* Main orb */}
      {/* <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #7b2ff7, #2575fc)',
        boxShadow: '0 0 40px rgba(123, 47, 247, 0.6)',
        animation: 'pulse 3s infinite ease-in-out'
      }}></div> */}
      
      {/* Floating particles */}
      {/* {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: `hsl(${i * 45}, 80%, 60%)`,
          animation: `orbit 4s infinite ease-in-out ${i * 0.2}s`,
          top: '50%',
          left: '50%',
          transformOrigin: `${(i % 2) ? '60px' : '80px'} center`
        }}></div>
      ))} */}
    </div>

    <p style={{
      marginTop: '20px',
      fontFamily: "'Inter', sans-serif",
      fontSize: '1.3rem',
      fontWeight: 300,
      letterSpacing: '1px',
      opacity: 0.9,
      textAlign: 'center',
      maxWidth: '300px',
      lineHeight: '1.6',
      animation: 'dots 2.5s infinite steps(100)'
    }}>
      Initializing<span style={{ animation: 'dots 2.5s infinite steps(100)' }}>...</span>
    </p>

    <div style={{
      marginTop: '40px',
      width: '200px',
      height: '4px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '4px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, #7b2ff7, transparent)',
        animation: 'progress 2.5s infinite linear',
        transform: 'translateX(-100%)'
      }}></div>
    </div>

    <style>{`
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 0.9;
          box-shadow: 0 0 40px rgba(123, 47, 247, 0.6);
        }
        50% {
          transform: scale(1.05);
          opacity: 1;
          box-shadow: 0 0 60px rgba(123, 47, 247, 0.8);
        }
      }
      
      @keyframes orbit {
        0% { transform: rotate(0deg) translateX(60px) rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) translateX(60px) rotate(-180deg) scale(0.7); }
        100% { transform: rotate(360deg) translateX(60px) rotate(-360deg) scale(1); }
      }
      
      @keyframes progress {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      @keyframes dots {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
    `}</style>
  </div>
);

export default FullscreenLoader;