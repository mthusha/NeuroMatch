import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useRef } from 'react';
export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const googleButtonRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };
  const triggerGoogleLogin = () => {
    const button = googleButtonRef.current?.querySelector("div[role='button']");
    if (button) button.click();
    else console.warn("Google login button not found");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] animated-bg">
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-12 relative overflow-hidden">
  {/* Animated background grid */}
  <div className="absolute inset-0 z-0 opacity-20">
    <div 
      className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"
      style={{
        animation: 'gridPulse 8s infinite alternate'
      }}
    ></div>
  </div>
  
  {/* Neural connections animation */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <div
        key={`neuron-${i}`}
        className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.7)'
        }}
      ></div>
    ))}
  </div>
  
  {/* Main content */}
  <div className="relative z-10 text-center max-w-md">
    {/* Animated brain icon */}
    <div 
      className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-xl relative"
      style={{
        animation: 'brainFloat 6s ease-in-out infinite'
      }}
    >
      <i 
        className="fas fa-brain text-5xl text-white"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
          animation: 'brainPulse 3s ease-in-out infinite'
        }}
      ></i>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping opacity-0"></div>
    </div>
    
    <h1 
      className="text-4xl font-bold text-white mb-4"
      style={{
        textShadow: '0 0 10px rgba(129, 140, 248, 0.5)',
        animation: 'textGlow 3s ease-in-out infinite alternate'
      }}
    >
      NeuroMatch AI
    </h1>
    
    <p 
      className="text-lg text-white/80 mb-8"
      style={{
        animation: 'fadeIn 1.5s ease-out'
      }}
    >
      The future of neural network matching technology
    </p>
    
    {/* Animated quote box */}
    <div 
      className="glass p-6 rounded-xl border border-white/10 backdrop-blur-sm relative overflow-hidden"
      style={{
        animation: 'slideUp 1s ease-out',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Floating particles inside quote box */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          style={{
            top: `${10 + (i * 30)}%`,
            left: `${15 + (i * 20)}%`,
            animation: `particleFloat ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        ></div>
      ))}
      
      <div className="flex items-center justify-center space-x-2 text-white/70 relative z-10">
        <i 
          className="fas fa-quote-left text-xl opacity-50"
          style={{
            animation: 'quotePulse 4s ease-in-out infinite'
          }}
        ></i>
        <p className="italic">Revolutionizing connections through advanced artificial intelligence</p>
      </div>
    </div>
  </div>
  
  <div 
    className="absolute top-20 left-20 w-40 h-40 rounded-full bg-blue-600/10 blur-xl"
    style={{
      animation: 'orbFloat 15s ease-in-out infinite alternate'
    }}
  ></div>
  
  <div 
    className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-purple-600/10 blur-xl"
    style={{
      animation: 'orbFloat 18s ease-in-out infinite alternate-reverse',
      animationDelay: '2s'
    }}
  ></div>
  
  <style jsx>{`
    @keyframes gridPulse {
      0% { opacity: 0.1; }
      100% { opacity: 0.3; }
    }
    
    @keyframes brainFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(2deg); }
    }
    
    @keyframes brainPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes textGlow {
      0% { text-shadow: 0 0 10px rgba(129, 140, 248, 0.3); }
      100% { text-shadow: 0 0 15px rgba(129, 140, 248, 0.7); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes particleFloat {
      0%, 100% { transform: translate(0, 0); opacity: 0.3; }
      50% { transform: translate(10px, -10px); opacity: 0.7; }
    }
    
    @keyframes quotePulse {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.1); }
    }
    
    @keyframes orbFloat {
      0% { transform: translate(0, 0); }
      25% { transform: translate(20px, 20px); }
      50% { transform: translate(0, 40px); }
      75% { transform: translate(-20px, 20px); }
      100% { transform: translate(0, 0); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.7; }
    }
  `}</style>
</div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue to your dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              <i className="fas fa-exclamation-circle mr-2 text-red-500"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 transition-all duration-300"
                  placeholder="you@example.com"
                  required
                />
                <i className="fas fa-envelope absolute right-3 top-3 text-gray-400"></i>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <i className="fas fa-lock absolute right-3 top-3 text-gray-400"></i>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow hover:shadow-blue-200'}`}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Signing in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i> Sign In
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={triggerGoogleLogin}
                className="bg-white py-2 px-4 rounded-lg flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 border border-gray-300 shadow-sm"
              >
                <i className="fab fa-google mr-2 text-red-500"></i> Google
              </button>
              <div ref={googleButtonRef} style={{ display: "none" }}>
                <GoogleLogin
                  onSuccess={googleLogin}
                  onError={() => console.error("Google Login Failed")}
                />
              </div>
              <button
                type="button"
                className="bg-white py-2 px-4 rounded-lg flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 border border-gray-300 shadow-sm"
              >
                <i className="fab fa-linkedin mr-2 text-blue-600"></i> LinkedIn
              </button>
            </div>

            <p className="mt-8">
              Don't have an account?{' '}
              <a 
                href="/register" 
                className="font-semibold text-blue-600 hover:text-blue-500 underline underline-offset-4 transition-colors duration-300"
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}