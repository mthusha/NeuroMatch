// src/auth/Register.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] animated-bg">
      {/* Left side - Branding */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-md">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
            <i className="fas fa-brain text-5xl text-white"></i>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">NeuroMatch AI</h1>
          <p className="text-lg text-white/80 mb-8">The future of neural network matching technology</p>
          
          <div className="glass p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 text-white/70">
              <i className="fas fa-quote-left text-xl opacity-50"></i>
              <p className="italic">Join our community of innovators and thinkers</p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-blue-600/10 blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-purple-600/10 blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Right side - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md glass" style={{padding: "20px", borderRadius: '22px'}}>
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <i className="fas fa-user-plus text-3xl text-white"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white/70">Join NeuroMatch AI today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all duration-300"
                  placeholder="John Doe"
                  required
                />
                <i className="fas fa-user absolute right-3 top-3 text-white/30"></i>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all duration-300"
                  placeholder="you@example.com"
                  required
                />
                <i className="fas fa-envelope absolute right-3 top-3 text-white/30"></i>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all duration-300"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
                <i className="fas fa-lock absolute right-3 top-3 text-white/30"></i>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/5 px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all duration-300"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
                <i className="fas fa-lock absolute right-3 top-3 text-white/30"></i>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  isLoading ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20'
                }`}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Creating account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2"></i> Register
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-white/70">
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0f0c29] text-white/50">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="bg-white/5 py-2 px-4 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <i className="fab fa-google mr-2"></i> Google
              </button>
              <button
                type="button"
                className="bg-white/5 py-2 px-4 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <i className="fab fa-linkedin mr-2"></i> LinkedIn
              </button>
            </div>

            <p className="mt-8">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors duration-300"
              >
                Sign in
              </Link>
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