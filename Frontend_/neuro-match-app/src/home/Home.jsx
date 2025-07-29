import React, { useEffect } from 'react';
import './Home.css';
// import myVideo from '../img/392332935793221636.mp4';


const NeuroMatch = () => {
  useEffect(() => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn?.addEventListener('click', () => {
        // mobileMenu?.classList.remove('translate-x-full');
        mobileMenu?.classList.add('open');
        
    });

    closeMenuBtn?.addEventListener('click', () => {
      mobileMenu?.classList.remove('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu?.classList.remove('open');
      });
    });

    const fadeElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

    const revealOnScroll = () => {
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = `${Math.random() * 5 + 3}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 20}s`;
      particle.style.background = `radial-gradient(circle, rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 246, 0.6), transparent)`;
      particlesContainer?.appendChild(particle);
    }

    const parallaxSections = document.querySelectorAll('.parallax');
    const handleScroll = () => {
      parallaxSections.forEach(section => {
        const offset = window.pageYOffset;
        section.style.backgroundPositionY = `${offset * 0.2}px`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    const nav = document.querySelector('nav');
    const handleNavScroll = () => {
      if (window.scrollY > 50) {
        nav?.classList.add('blurred');
      } else {
        nav?.classList.remove('blurred');
      }
    };

    window.addEventListener('scroll', handleNavScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('load', revealOnScroll);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleNavScroll);
    };
  }, []);

  return (
    <>

      <body className="text-white overflow-x-hidden">
        {/* Animated Background with Particles */}
        <div className="fixed inset-0 animated-bg-j -z-10">
            <div id="particles-container" className="absolute inset-0"></div>
        </div>
        <div className="hidden translate-x-0 translate-x-full"></div>

        {/* Navigation */}
        <nav className="fixed w-full top-0 z-50 glass blur-fade transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <div className="text-3xl font-black text-shimmer glow">
                            <i className="fas fa-brain mr-2"></i>NeuroMatch
                        </div>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="/home" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110 font-medium glow">Home</a>
                        <a href="/features" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110 font-medium glow">Features</a>
                        <a href="/how-it-works" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110 font-medium glow">How It Works</a>
                        <a href="/contact" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110 font-medium glow">Contact</a>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="/login" 
                           className="text-white/80 hover:text-white transition-all duration-300 font-medium glow">
                            Log In
                        </a>
                        <a href="/register" 
                           className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 neon-blue ">
                            Get Started
                        </a>
                    </div>
                    
                    <button id="mobile-menu-btn" className="md:hidden text-white hover:text-blue-400 transition-colors">
                        <i className="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            <div  style={{ height: 'fit-content !important' }}  id="mobile-menu" className="mobile-menu md:hidden fixed top-0 right-0 h-full w-80 max-h-screen bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-lg shadow-xl z-50 transform translate-x-full transition-transform duration-500 ease-in-out">
               <div className="p-6 flex flex-col h-full overflow-y-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-white glow tracking-wide">Menu</h2>
                        <button id="close-menu-btn" className="text-white hover:text-red-500 transition">
                            <i className="fas fa-times text-2xl"></i>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6 text-lg font-medium text-white glow">
                        <a href="#home" className="hover:text-cyan-400 transition-all">🏠 Home</a>
                        <a href="#features" className="hover:text-cyan-400 transition-all">✨ Features</a>
                        <a href="#how-it-works" className="hover:text-cyan-400 transition-all">⚙️ How It Works</a>
                        <a href="#contact" className="hover:text-cyan-400 transition-all">📞 Contact</a>
                    </nav>

                    <div className="border-t border-white/10 my-8"></div>

                    <div className="mt-auto space-y-4">
                        <a href="/login" className="block w-full text-center py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition">Log In</a>
                        <a href="/register" className="block w-full text-center py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold shadow-md transition">🚀 Get Started with NeuroMatch</a>
                    </div>
                </div>
            </div>
        </nav>
{/* Hero Section */}
<section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#1a1a2e] to-[#0f172a]">
    {/* Animated background elements */}
    <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl animate-float-slow animation-delay-4000"></div>
    </div>

    {/* Floating particles */}
    <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
            <div 
                key={i}
                className="particle absolute rounded-full"
                style={{
                    width: `${Math.random() * 6 + 3}px`,
                    height: `${Math.random() * 6 + 3}px`,
                    background: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 15 + 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`
                }}
            />
        ))}
    </div>

    {/* Side content - Left */}
    <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-64 px-8 slide-in-left">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-x-2">
            <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-white font-semibold">Candidate Profile</h3>
            </div>
            <div className="space-y-2">
                <div className="h-2 bg-white/10 rounded-full animate-pulse"></div>
                <div className="h-2 bg-white/10 rounded-full animate-pulse w-3/4"></div>
                <div className="h-2 bg-white/10 rounded-full animate-pulse w-1/2"></div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm text-white/70">
                    <span>Match Score</span>
                    <span className="text-green-400 font-medium">94%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
            </div>
        </div>
    </div>

    <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-80 px-8 slide-in-right">
        <div className="relative group overflow-hidden rounded-2xl transition-all duration-500 hover:translate-x-2">
            {/* <div className="relative">
                <video 
                    autoPlay 
                    muted 
                    loop
                    playsInline
                    className="w-full h-auto object-cover rounded-xl border border-white/10"
                    style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                >
                    <source src={myVideo} type="video/mp4" />

                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl pointer-events-none"></div>
            </div> */}
            
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-br from-purple-600/80 to-blue-600/80 backdrop-blur-sm p-4 rounded-lg border border-white/10 transform transition-all duration-300 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
                <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-white font-medium text-sm">AI Matching</h4>
                        <p className="text-white/80 text-xs">Real-time candidate analysis</p>
                    </div>
                </div>
            </div>
            
            {/* Static title */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <h3 className="text-white font-medium text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Live Demo Preview</span>
                </h3>
            </div>
        </div>
    </div>

    {/* Main content */}
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10 py-20">
        <div className="fade-in">
            {/* Tagline */}
            <div className="mb-8">
                <span className="inline-block bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-3 rounded-full text-sm font-semibold text-white/90 border border-blue-400/30 backdrop-blur-md hover:scale-105 transition-transform duration-300">
                    ✨ Next-Gen Talent Acquisition
                </span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100">
                <span className="block">AI-Powered</span>
                <span className="text-shimmer relative inline-block">
                    Hiring Intelligence
                </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Our <span className="font-semibold text-cyan-300">neural matching engine</span> analyzes candidates with <span className="font-semibold text-purple-300">unprecedented depth</span>, reducing hiring time by 70% while improving quality matches.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <a href="/demo" className="width-768-100 relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-lg font-semibold text-white shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] group">
                    <span className="relative z-10 flex items-center">
                        <span className="mr-2">Request Demo</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>

                <a href="/features" className="width-768-100 px-8 py-4 rounded-xl text-lg font-semibold text-white border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>How It Works</span>
                </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                    { value: "98%", label: "Accuracy", icon: "🔍" },
                    { value: "10x", label: "Faster", icon: "⚡" },
                    { value: "70%", label: "Cost Save", icon: "💰" },
                    { value: "4.9★", label: "Satisfaction", icon: "❤️" }
                ].map((stat, index) => (
                    <div 
                        key={index}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                    >
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-white/70 text-sm">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>

    <style jsx>{`
        .particle {
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        
        .text-shimmer {
            position: relative;
            display: inline-block;
        }
        
        .text-shimmer::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, rgba(100,200,255,0.8), rgba(200,160,255,0.8));
            border-radius: 2px;
            animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0%, 100% { opacity: 0.8; background-position: 0% 50%; }
            50% { opacity: 1; background-position: 100% 50%; }
        }
        
        .fade-in {
            animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float-slow {
            animation: floatSlow 12s ease-in-out infinite;
        }
        
        .animation-delay-4000 {
            animation-delay: 4s;
        }
        
        @keyframes floatSlow {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-40px) translateX(20px); }
        }
        
        .slide-in-left {
            animation: slideInLeft 1s ease-out forwards;
        }
        
        .slide-in-right {
            animation: slideInRight 1s ease-out forwards;
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translate(-50px, -50%); }
            to { opacity: 1; transform: translate(0, -50%); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translate(50px, -50%); }
            to { opacity: 1; transform: translate(0, -50%); }
        }
    `}</style>
</section>

        {/* Features Section */}
        <section id="features" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 fade-up">
                    <h2 className="text-5xl md:text-6xl font-black mb-6">
                        <span className="text-shimmer glow">Powerful Features</span>
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto glow">
                        Experience the next generation of recruitment technology with AI-driven solutions that revolutionize how companies find and hire talent.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Feature 1 */}
                    <div className="glass p-8 rounded-3xl hover-lift card-3d fade-up group" style={{animationDelay: '0.1s'}}>
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                            <i className="fas fa-brain text-3xl text-white glow"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors glow">AI-Powered Matching</h3>
                        <p className="text-white/70 leading-relaxed glow">
                            Revolutionary algorithms analyze CV content, skills, and cultural fit to create perfect candidate-job matches with unprecedented accuracy.
                        </p>
                    </div>
                    
                    {/* Feature 2 */}
                    <div className="glass p-8 rounded-3xl hover-lift card-3d fade-up group" style={{animationDelay: '0.2s'}}>
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                            <i className="fas fa-video text-3xl text-white glow"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors glow">Virtual Interviews</h3>
                        <p className="text-white/70 leading-relaxed glow">
                            Immersive AI-driven interviews that assess communication skills, technical knowledge, and personality fit through natural conversations.
                        </p>
                    </div>
                    
                    {/* Feature 3 */}
                    <div className="glass p-8 rounded-3xl hover-lift card-3d fade-up group" style={{animationDelay: '0.3s'}}>
                        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                            <i className="fas fa-chart-line text-3xl text-white glow"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors glow">Scalable Platform</h3>
                        <p className="text-white/70 leading-relaxed glow">
                            Enterprise-grade infrastructure with real-time analytics, seamless integrations, and unlimited scalability for growing organizations.
                        </p>
                    </div>
                    
                    {/* Feature 4 */}
                    <div className="glass p-8 rounded-3xl hover-lift card-3d fade-up group" style={{animationDelay: '0.4s'}}>
                        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                            <i className="fas fa-balance-scale text-3xl text-white glow"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors glow">Bias Reduction</h3>
                        <p className="text-white/70 leading-relaxed glow">
                            Eliminate unconscious bias with objective, data-driven evaluations that focus purely on skills, qualifications, and job performance potential.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 fade-up">
                    <h2 className="text-5xl md:text-6xl font-black mb-6">
                        <span className="text-shimmer glow">How It Works</span>
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto glow">
                        Four simple steps to transform your hiring process with AI-powered intelligence and automation.
                    </p>
                </div>
                
                <div className="relative">
                    {/* Animated connecting line */}
                    <div className="hidden lg:block absolute left-1/2 top-20 bottom-20 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 transform -translate-x-1/2 rounded-full glow"></div>
                    
                    <div className="space-y-32">
                        {/* Step 1 */}
                        <div className="relative flex flex-col lg:flex-row items-center">
                            <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0 fade-left">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black mb-8 mx-auto lg:mx-0 pulse-glow">
                                    1
                                </div>
                                <h3 className="text-4xl font-bold mb-6 text-center lg:text-left glow">Create Smart Profiles</h3>
                                <p className="text-xl text-white/70 text-center lg:text-left leading-relaxed glow">
                                    Job seekers upload comprehensive profiles and CVs. Our AI analyzes skills, experience, career goals, and personality traits to build detailed candidate DNA profiles.
                                </p>
                            </div>
                            <div className="lg:w-1/2 lg:pl-16 fade-right">
                                <div className="glass p-12 rounded-3xl hover-lift">
                                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-8 rounded-2xl">
                                        <i className="fas fa-user-plus text-6xl text-blue-400 mb-6 floating-icon glow"></i>
                                        <div className="text-2xl font-bold text-blue-400 glow">Profile Intelligence</div>
                                        <div className="text-white/60 mt-2 glow">AI-powered analysis & matching</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Step 2 */}
                        <div className="relative flex flex-col lg:flex-row-reverse items-center">
                            <div className="lg:w-1/2 lg:pl-16 mb-12 lg:mb-0 fade-right">
                                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black mb-8 mx-auto lg:mx-0 pulse-glow">
                                    2
                                </div>
                                <h3 className="text-4xl font-bold mb-6 text-center lg:text-left glow">Smart Job Posting</h3>
                                <p className="text-xl text-white/70 text-center lg:text-left leading-relaxed glow">
                                    Employers create intelligent job postings with detailed requirements, company culture, and role expectations. AI understands nuanced job descriptions.
                                </p>
                            </div>
                            <div className="lg:w-1/2 lg:pr-16 fade-left">
                                <div className="glass p-12 rounded-3xl hover-lift">
                                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-8 rounded-2xl">
                                        <i className="fas fa-briefcase text-6xl text-purple-400 mb-6 floating-icon glow"></i>
                                        <div className="text-2xl font-bold text-purple-400 glow">Job Intelligence</div>
                                        <div className="text-white/60 mt-2 glow">Smart requirement analysis</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Step 3 */}
                        <div className="relative flex flex-col lg:flex-row items-center">
                            <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0 fade-left">
                                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black mb-8 mx-auto lg:mx-0 pulse-glow">
                                    3
                                </div>
                                <h3 className="text-4xl font-bold mb-6 text-center lg:text-left glow">AI Matching & Interviews</h3>
                                <p className="text-xl text-white/70 text-center lg:text-left leading-relaxed glow">
                                    Advanced AI matches candidates to perfect roles and conducts immersive virtual interviews, assessing technical skills and cultural fit simultaneously.
                                </p>
                            </div>
                            <div className="lg:w-1/2 lg:pl-16 fade-right">
                                <div className="glass p-12 rounded-3xl hover-lift">
                                    <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 p-8 rounded-2xl">
                                        <i className="fas fa-robot text-6xl text-cyan-400 mb-6 floating-icon glow"></i>
                                        <div className="text-2xl font-bold text-cyan-400 glow">AI Interview Engine</div>
                                        <div className="text-white/60 mt-2 glow">Intelligent assessment & matching</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Step 4 */}
                        <div className="relative flex flex-col lg:flex-row-reverse items-center">
                            <div className="lg:w-1/2 lg:pl-16 mb-12 lg:mb-0 fade-right">
                                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black mb-8 mx-auto lg:mx-0 pulse-glow">
                                    4
                                </div>
                                <h3 className="text-4xl font-bold mb-6 text-center lg:text-left glow">Intelligent Hiring</h3>
                                <p className="text-xl text-white/70 text-center lg:text-left leading-relaxed glow">
                                    Receive ranked candidate profiles with comprehensive insights, interview scores, and compatibility metrics to make data-driven hiring decisions.
                                </p>
                            </div>
                            <div className="lg:w-1/2 lg:pr-16 fade-left">
                                <div className="glass p-12 rounded-3xl hover-lift">
                                    <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 p-8 rounded-2xl">
                                        <i className="fas fa-chart-bar text-6xl text-indigo-400 mb-6 floating-icon glow"></i>
                                        <div className="text-2xl font-bold text-indigo-400 glow">Smart Analytics</div>
                                        <div className="text-white/60 mt-2 glow">Data-driven hiring decisions</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden parallax" >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="fade-up">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8">
                        <span className="text-shimmer typing-animation inline-block glow">Ready to Transform Hiring?</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed glow">
                        Join NeuroMatch today and revolutionize your recruitment process with AI-driven efficiency, fairness, and precision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a href="#signup" target="_blank" 
                           className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-5 rounded-full text-xl font-bold transition-all duration-500 hover:scale-110 neon-blue relative overflow-hidden ripple glow">
                            <span className="relative z-10">Sign Up with NeuroMatch</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                        </a>
                        <a href="#login" target="_blank" 
                           className="group glass px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-all duration-500 hover:scale-110 border-2 border-white/20 hover:border-white/40 ripple glow">
                            <span className="flex items-center">
                                <i className="fas fa-sign-in-alt mr-3"></i>
                                Log In to NeuroMatch
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer Section */}
        <footer id="contact" className="py-20 border-t border-white/10 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* About NeuroMatch */}
                    <div className="fade-up" style={{animationDelay: '0.1s'}}>
                        <h3 className="text-3xl font-bold text-shimmer mb-6 glow">About NeuroMatch</h3>
                        <p className="text-white/70 leading-relaxed glow">
                            NeuroMatch is a cutting-edge AI-powered recruitment platform designed to streamline hiring, reduce bias, and connect top talent with perfect opportunities.
                        </p>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="fade-up" style={{animationDelay: '0.2s'}}>
                        <h3 className="text-3xl font-bold text-shimmer mb-6 glow">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="/home" className="text-white/70 hover:text-blue-400 text-lg font-medium transition-colors duration-500 glow">Home</a></li>
                            <li><a href="/features" className="text-white/70 hover:text-blue-400 text-lg font-medium transition-colors duration-500 glow">Features</a></li>
                            <li><a href="/how-it-works" className="text-white/70 hover:text-blue-400 text-lg font-medium transition-colors duration-500 glow">How It Works</a></li>
                            <li><a href="/contact" className="text-white/70 hover:text-blue-400 text-lg font-medium transition-colors duration-500 glow">Contact</a></li>
                            <li><a href="/" className="text-white/70 hover:text-blue-400 text-lg font-medium transition-colors duration-500 glow">Privacy Policy</a></li>
                            <li><a href="/" className="text-white/70 hover:text-blue-400 text-lg font-medium transition-colors duration-500 glow">Terms of Service</a></li>
                        </ul>
                    </div>
                    
                    {/* Social Media */}
                    <div className="fade-up" style={{animationDelay: '0.3s'}}>
                        <h3 className="text-3xl font-bold text-shimmer mb-6 glow">Connect With Us</h3>
                        <div className="flex space-x-6">
                            <a href="/" className="text-white/70 hover:text-blue-400 transition-colors duration-500 glow">
                                <i className="fab fa-linkedin text-2xl"></i>
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="/" className="text-white/70 hover:text-blue-400 transition-colors duration-500 glow">
                                <i className="fab fa-twitter text-2xl"></i>
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="/" className="text-white/70 hover:text-blue-400 transition-colors duration-500 glow">
                                <i className="fab fa-facebook text-2xl"></i>
                                <span className="sr-only">Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-16 text-center">
                    <p className="text-white/70 text-xl text-shimmer glow">
                        NeuroMatch: Smarter Hiring, Powered by AI
                    </p>
                    <p className="text-white/50 text-sm mt-4 glow">
                        © 2025 NeuroMatch. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
      </body>
    </>
  );
};

export default NeuroMatch;